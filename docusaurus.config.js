// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mcpIndexerPath = pathToFileURL(path.join(__dirname, 'mcp-docs-indexer.mjs')).href;
const mcpSearchProviderPath = pathToFileURL(path.join(__dirname, 'mcp-basic-search-provider.mjs')).href;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '万象奥科',
  tagline: 'HD-RK3506-EVB 产品文档',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  // future: {
  //   v4: true, // Improve compatibility with the upcoming Docusaurus v4
  // },

  url: 'https://wiki.dshanpi.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dshanpi', // Usually your GitHub org/user name.
  projectName: 'Docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {
        label: '中文',
        direction: 'ltr',
        htmlLang: 'zh-CN',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
    },
  },

  plugins: [
    [
      'docusaurus-plugin-mcp-server',
      {
        server: {
          name: 'dshanpi-docs',
          version: '0.0.0',
        },
        indexers: [mcpIndexerPath],
        search: mcpSearchProviderPath,
        excludeRoutes: [
          '/en/**',
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dshanpi/Docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      navbar: {
        title: 'HD-RK3506-EVB文档中心',
        logo: {
          alt: 'HD-RK3506-EVB',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'dropdown',
            label: 'RK3506系列',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'rk3506Sidebar',
                label: 'HD-RK3506-EVB',
              },
            ],
          },
          {
            href: 'https://github.com/dshanpi/Docs',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub Repository',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} VanxoakTeam, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
  // Add the Mermaid plugin and enable it in markdown
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};


export default config;
