import http from 'http';
import fs from 'fs';
import { Readable } from 'stream';
import { createNodeHandler } from 'docusaurus-plugin-mcp-server/adapters';

const searchProviderPath = new URL('./mcp-basic-search-provider.mjs', import.meta.url).href;

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex <= 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile('.env.production');
loadEnvFile('.env');

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-MCP-Key');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

function writeJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function requireMcpAuth(req, res) {
  const expectedKey = process.env.MCP_API_KEY;
  if (!expectedKey) {
    setCorsHeaders(res);
    writeJson(res, 500, { error: 'MCP_API_KEY is required' });
    return false;
  }

  const headerValue = req.headers['x-mcp-key'];
  const providedKey = Array.isArray(headerValue) ? headerValue[0] : headerValue;
  if (providedKey !== expectedKey) {
    setCorsHeaders(res);
    writeJson(res, 401, { error: 'Unauthorized' });
    return false;
  }

  return true;
}

const mcpHandler = createNodeHandler({
  docsPath: './build/mcp/docs.json',
  indexPath: './build/mcp/search-index.json',
  name: process.env.MCP_SERVER_NAME ?? 'dshanpi-docs',
  baseUrl: process.env.DOCS_BASE_URL ?? 'https://wiki.dshanpi.org',
  search: searchProviderPath,
});

async function handle100AskProxy(req, res, { pathname, search }) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const baseUrlRaw = getRequiredEnv('ASK100_BASE_URL');
  const baseUrl = baseUrlRaw.endsWith('/') ? baseUrlRaw : `${baseUrlRaw}/`;
  const base = new URL(baseUrl);

  const forwardPath = pathname.replace(/^\/api\/100ask\/?/, '');
  const target = new URL(`${forwardPath}${search}`, base);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value == null) continue;
    if (key.toLowerCase() === 'host') continue;
    if (key.toLowerCase() === 'content-length') continue;
    if (key.toLowerCase() === 'connection') continue;
    if (key.toLowerCase() === 'accept-encoding') continue;
    headers.set(key, Array.isArray(value) ? value.join(',') : value);
  }

  const apiKey = process.env.ASK100_API_KEY;
  const authHeaderName = process.env.ASK100_AUTH_HEADER ?? 'Authorization';
  const authScheme = process.env.ASK100_AUTH_SCHEME ?? 'Bearer';
  if (apiKey && !headers.has(authHeaderName)) {
    headers.set(authHeaderName, `${authScheme} ${apiKey}`);
  }

  const body =
    req.method === 'GET' || req.method === 'HEAD' ? undefined : await readRequestBody(req);

  const upstream = await fetch(target, {
    method: req.method,
    headers,
    body,
    redirect: 'manual',
  });

  res.statusCode = upstream.status;

  for (const [key, value] of upstream.headers.entries()) {
    if (key.toLowerCase() === 'transfer-encoding') continue;
    res.setHeader(key, value);
  }
  setCorsHeaders(res);

  if (!upstream.body) {
    res.end();
    return;
  }

  Readable.fromWeb(upstream.body).pipe(res);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', 'http://localhost');
    if (url.pathname === '/healthz') {
      writeJson(res, 200, { ok: true });
      return;
    }

    if (url.pathname.startsWith('/mcp')) {
      setCorsHeaders(res);
      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
      }
      if (!requireMcpAuth(req, res)) {
        return;
      }
      mcpHandler(req, res);
      return;
    }

    if (url.pathname.startsWith('/api/100ask')) {
      await handle100AskProxy(req, res, { pathname: url.pathname, search: url.search });
      return;
    }

    writeJson(res, 404, { error: 'Not Found' });
  } catch (error) {
    writeJson(res, 500, { error: error?.message ?? String(error) });
  }
});

const port = Number(process.env.PORT ?? '3456');
server.listen(port, () => {
  console.log(`MCP server at http://localhost:${port}/mcp`);
});
