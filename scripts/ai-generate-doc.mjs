import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const currentFile = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(currentFile);
const repoRoot = path.resolve(scriptDir, '..');

const HELP_TEXT = `Usage:
  npm run ai:generate -- --output-path docs/PRODUCT/path/file.md --title "Title" --summary "Short summary"

Environment variables:
  ASK100_BASE_URL   Required. 100ask AI base URL.
  ASK100_API_KEY    Required. 100ask AI API key.
  ASK100_MODEL      Optional. Default model name.
  ASK100_API_PATH   Optional. Default: /v1/chat/completions
  ASK100_AUTH_HEADER Optional. Default: Authorization
  ASK100_AUTH_SCHEME Optional. Default: Bearer

Document options:
  AI_DOC_OUTPUT_PATH
  AI_DOC_TITLE
  AI_DOC_SUMMARY
  AI_DOC_LANGUAGE
  AI_DOC_PRODUCT
  AI_DOC_CATEGORY
  AI_DOC_AUDIENCE
  AI_DOC_KEYWORDS
  AI_DOC_SOURCE_NOTES
  AI_DOC_OVERWRITE
`;

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (!current.startsWith('--')) {
      continue;
    }

    const content = current.slice(2);
    const equalIndex = content.indexOf('=');
    if (equalIndex >= 0) {
      const key = content.slice(0, equalIndex);
      const value = content.slice(equalIndex + 1);
      args[key] = value;
      continue;
    }

    const next = argv[index + 1];
    if (!next || next.startsWith('--')) {
      args[content] = 'true';
      continue;
    }

    args[content] = next;
    index += 1;
  }

  return args;
}

function readOption(args, key, envName, fallback = '') {
  const value = args[key] ?? process.env[envName] ?? fallback;
  return typeof value === 'string' ? value.trim() : value;
}

function isTruthy(value) {
  return ['1', 'true', 'yes', 'y', 'on'].includes(String(value ?? '').toLowerCase());
}

function ensureRequired(value, name) {
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

function toPosixPath(value) {
  return value.replace(/\\/g, '/');
}

function ensureOutputPath(outputPath) {
  const normalized = toPosixPath(outputPath).replace(/^\/+/, '');
  if (!normalized.startsWith('docs/') && !normalized.startsWith('blog/')) {
    throw new Error('output-path must be inside docs/ or blog/');
  }

  if (!normalized.endsWith('.md') && !normalized.endsWith('.mdx')) {
    throw new Error('output-path must end with .md or .mdx');
  }

  const absolute = path.resolve(repoRoot, normalized);
  if (!absolute.startsWith(repoRoot)) {
    throw new Error('output-path is outside the repository');
  }

  return {
    relativePath: normalized,
    absolutePath: absolute,
    targetType: normalized.startsWith('blog/') ? 'blog' : 'docs',
  };
}

function sanitizeYamlText(value) {
  return String(value ?? '')
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/"/g, '\\"')
    .trim();
}

function splitKeywords(value) {
  return String(value ?? '')
    .split(/[,\n|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildFrontmatter({ targetType, title, summary, keywords }) {
  const lines = ['---', `title: "${sanitizeYamlText(title)}"`];

  if (summary) {
    lines.push(`description: "${sanitizeYamlText(summary)}"`);
  }

  if (targetType === 'blog' && keywords.length > 0) {
    lines.push('tags:');
    for (const keyword of keywords) {
      lines.push(`  - ${sanitizeYamlText(keyword)}`);
    }
  }

  lines.push('---', '');
  return lines.join('\n');
}

function buildPrompt({
  targetType,
  title,
  summary,
  language,
  product,
  category,
  audience,
  keywords,
  sourceNotes,
  outputPath,
}) {
  const sections = [
    `Target type: ${targetType}`,
    `Target output path: ${outputPath}`,
    `Language: ${language || 'zh-CN'}`,
    `Title: ${title}`,
    `Summary: ${summary || 'N/A'}`,
    `Product: ${product || 'N/A'}`,
    `Category: ${category || 'N/A'}`,
    `Audience: ${audience || 'N/A'}`,
    `Keywords: ${keywords.join(', ') || 'N/A'}`,
    '',
    'Write a complete Docusaurus-ready markdown body only.',
    'Do not include YAML frontmatter.',
    'Do not wrap the answer in code fences.',
    'Do not invent screenshots, files, commands, links, or test results that are not supported by the source notes.',
    'Use concise headings, practical steps, and a verification section.',
    'If source notes are incomplete, state assumptions clearly in the document.',
    '',
    'Source notes:',
    sourceNotes || 'No source notes were provided. Produce a practical draft based on the title and summary only.',
  ];

  return sections.join('\n');
}

function extractMessageContent(payload) {
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        }
        if (item?.type === 'text') {
          return item.text ?? '';
        }
        return '';
      })
      .join('');
  }

  throw new Error('No message content returned from AI provider');
}

function extractJsonObject(text) {
  const trimmed = String(text ?? '').trim();
  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fencedMatch ? fencedMatch[1].trim() : trimmed;

  try {
    return JSON.parse(raw);
  } catch {
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start >= 0 && end > start) {
      return JSON.parse(raw.slice(start, end + 1));
    }
    throw new Error('Failed to parse JSON response from AI provider');
  }
}

function joinUrl(baseUrl, apiPath) {
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return new URL(apiPath.replace(/^\/+/, ''), normalizedBase).toString();
}

async function requestDocumentFromAi({
  title,
  summary,
  language,
  product,
  category,
  audience,
  keywords,
  sourceNotes,
  outputPath,
  targetType,
  model,
}) {
  const baseUrl = ensureRequired(process.env.ASK100_BASE_URL, 'ASK100_BASE_URL');
  const apiKey = ensureRequired(process.env.ASK100_API_KEY, 'ASK100_API_KEY');
  const apiPath = process.env.ASK100_API_PATH ?? '/v1/chat/completions';
  const authHeader = process.env.ASK100_AUTH_HEADER ?? 'Authorization';
  const authScheme = process.env.ASK100_AUTH_SCHEME ?? 'Bearer';

  const headers = {
    'Content-Type': 'application/json',
    [authHeader]: `${authScheme} ${apiKey}`,
  };

  const prompt = buildPrompt({
    targetType,
    title,
    summary,
    language,
    product,
    category,
    audience,
    keywords,
    sourceNotes,
    outputPath,
  });

  const response = await fetch(joinUrl(baseUrl, apiPath), {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content:
            'You write production-ready Docusaurus documentation. Return strict JSON only: {"content":"markdown body only"}.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`AI request failed: ${response.status} ${response.statusText} - ${details}`);
  }

  const payload = await response.json();
  const message = extractMessageContent(payload);
  const parsed = extractJsonObject(message);
  const content = String(parsed.content ?? '').trim();
  if (!content) {
    throw new Error('AI response did not contain document content');
  }

  return content;
}

export async function generateDocument(inputOptions = {}) {
  const args = inputOptions.args ?? parseArgs(process.argv.slice(2));

  if (args.help || args.h) {
    console.log(HELP_TEXT);
    return { help: true };
  }

  const outputValue = ensureRequired(
    readOption(args, 'output-path', 'AI_DOC_OUTPUT_PATH'),
    'output-path / AI_DOC_OUTPUT_PATH',
  );
  const { relativePath, absolutePath, targetType } = ensureOutputPath(outputValue);

  const title = ensureRequired(readOption(args, 'title', 'AI_DOC_TITLE'), 'title / AI_DOC_TITLE');
  const summary = readOption(args, 'summary', 'AI_DOC_SUMMARY');
  const language = readOption(args, 'language', 'AI_DOC_LANGUAGE', 'zh-CN');
  const product = readOption(args, 'product', 'AI_DOC_PRODUCT');
  const category = readOption(args, 'category', 'AI_DOC_CATEGORY');
  const audience = readOption(args, 'audience', 'AI_DOC_AUDIENCE');
  const keywords = splitKeywords(readOption(args, 'keywords', 'AI_DOC_KEYWORDS'));
  const sourceNotes = readOption(args, 'source-notes', 'AI_DOC_SOURCE_NOTES');
  const overwrite = isTruthy(readOption(args, 'overwrite', 'AI_DOC_OVERWRITE'));
  const model = readOption(args, 'model', 'ASK100_MODEL', 'qwen-max');

  try {
    await fs.access(absolutePath);
    if (!overwrite) {
      throw new Error(`Target file already exists: ${relativePath}`);
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }

  const body = await requestDocumentFromAi({
    title,
    summary,
    language,
    product,
    category,
    audience,
    keywords,
    sourceNotes,
    outputPath: relativePath,
    targetType,
    model,
  });

  const frontmatter = buildFrontmatter({ targetType, title, summary, keywords });
  const finalContent = `${frontmatter}${body.trim()}\n`;

  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, finalContent, 'utf8');

  return {
    outputPath: relativePath,
    absolutePath,
    targetType,
    title,
    model,
  };
}

async function main() {
  const result = await generateDocument();
  if (!result.help) {
    console.log(JSON.stringify(result, null, 2));
  }
}

if (process.argv[1] === currentFile) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
