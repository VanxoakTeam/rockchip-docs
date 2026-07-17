export default class DocsOnlyIndexer {
  constructor() {
    this.name = 'docs-json';
    this.docsIndex = {};
    this.baseUrl = '';
  }

  async initialize(context) {
    this.baseUrl = (context.baseUrl ?? '').replace(/\/$/, '');
    this.docsIndex = {};
  }

  async indexDocuments(docs) {
    for (const doc of docs) {
      const fullUrl = `${this.baseUrl}${doc.route}`;
      this.docsIndex[fullUrl] = doc;
    }
  }

  async finalize() {
    return new Map([
      ['docs.json', this.docsIndex],
      ['search-index.json', {}],
    ]);
  }
}
