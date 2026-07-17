import fs from 'fs/promises';

function normalizeText(value) {
  return String(value ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function tokenize(query) {
  return normalizeText(query)
    .split(/[\s/\\|,.;:!?()[\]{}"'`<>+-]+/)
    .map((term) => term.trim())
    .filter(Boolean);
}

function scoreDocument(doc, terms) {
  if (terms.length === 0) {
    return 0;
  }

  const title = normalizeText(doc.title);
  const description = normalizeText(doc.description);
  const markdown = normalizeText(doc.markdown);
  const headings = doc.headings.map((heading) => normalizeText(heading.text));

  let score = 0;
  const matchingHeadings = new Set();

  for (const term of terms) {
    if (title.includes(term)) score += 10;
    if (description.includes(term)) score += 4;
    if (markdown.includes(term)) score += 2;

    for (const heading of headings) {
      if (heading.includes(term)) {
        score += 6;
        matchingHeadings.add(heading);
      }
    }
  }

  if (title.includes(terms.join(' '))) score += 10;
  if (markdown.includes(terms.join(' '))) score += 5;

  return {
    score,
    matchingHeadings: Array.from(matchingHeadings).slice(0, 3),
  };
}

function buildSnippet(markdown, terms) {
  const source = String(markdown ?? '').replace(/\s+/g, ' ').trim();
  if (!source) {
    return '';
  }

  const lower = source.toLowerCase();
  let index = -1;
  for (const term of terms) {
    const found = lower.indexOf(term);
    if (found !== -1 && (index === -1 || found < index)) {
      index = found;
    }
  }

  if (index === -1) {
    return source.slice(0, 200) + (source.length > 200 ? '...' : '');
  }

  const start = Math.max(0, index - 60);
  const end = Math.min(source.length, index + 160);
  return `${start > 0 ? '...' : ''}${source.slice(start, end)}${end < source.length ? '...' : ''}`;
}

export default class BasicSearchProvider {
  constructor() {
    this.name = 'basic-search';
    this.baseUrl = '';
    this.docs = {};
    this.ready = false;
  }

  async initialize(context, initData = {}) {
    this.baseUrl = (context.baseUrl ?? '').replace(/\/$/, '');

    if (initData.docs) {
      this.docs = initData.docs;
    } else if (initData.docsPath) {
      const raw = await fs.readFile(initData.docsPath, 'utf8');
      this.docs = JSON.parse(raw);
    } else {
      throw new Error('docsPath or docs is required');
    }

    this.ready = true;
  }

  isReady() {
    return this.ready;
  }

  async search(query, options = {}) {
    const limit = Math.min(Math.max(options.limit ?? 16, 1), 20);
    const terms = tokenize(query);
    const results = [];

    for (const [url, doc] of Object.entries(this.docs)) {
      const { score, matchingHeadings } = scoreDocument(doc, terms);
      if (score <= 0) {
        continue;
      }

      results.push({
        url,
        route: doc.route,
        title: doc.title,
        score,
        snippet: buildSnippet(doc.markdown, terms),
        matchingHeadings,
      });
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit);
  }

  async getDocument(url) {
    return this.docs[url] ?? null;
  }

  getDocCount() {
    return Object.keys(this.docs).length;
  }

  async healthCheck() {
    return {
      healthy: this.ready,
      message: this.ready
        ? `basic-search ready with ${this.getDocCount()} documents`
        : 'basic-search not initialized',
    };
  }
}
