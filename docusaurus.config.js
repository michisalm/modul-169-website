// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";
const modulConfig = require("./modul.config");
const remarkEmbedPlugin = require("./src/plugins/remark-embed");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: modulConfig.title || "Unbenanntes Modul",
  tagline: modulConfig.tagline || "Tolles Modul!",
  url: modulConfig.url,
  baseUrl: `/${modulConfig.repoName}/`,
  onBrokenLinks: "log",
  favicon: "img/favicon.png",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    experimental_faster: true,
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
      onBrokenMarkdownImages: "warn",
    },
  },

  plugins: [
    "@orama/plugin-docusaurus-v3",
    [
      "devserver-config",
      {
        proxy: [
          {
            context: `/${modulConfig.repoName}/slides`,
            target: "http://localhost:4001",
            secure: false,
            pathRewrite: function (
              /** @type {string} */ path,
              /** @type {any} */ _req,
            ) {
              if (path.match(/.*\..*$/)) {
                return path.replace(`/${modulConfig.repoName}/slides`, "");
              }
              return (
                path.replace(`/${modulConfig.repoName}/slides`, "") + ".md"
              );
            },
          },
        ],
      },
    ],
  ],

  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: modulConfig.organizationName || "noname-corp", // Usually your GitHub org/user name.
  projectName: modulConfig.repoName, // Usually your repo name.

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "de",
    locales: ["de"],
  },

  themes: [
    require.resolve("@docusaurus/theme-mermaid"),
    // require.resolve("docusaurus-theme-github-codeblock"),
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `${modulConfig.url}/${modulConfig.repoName}`,
          beforeDefaultRemarkPlugins: [remarkEmbedPlugin],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: "img/docusaurus-social-card.jpg",
      mermaid: {
        theme: { light: "neutral", dark: "forest" },
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: modulConfig.title,
        logo: {
          alt: "BBZBL Logo",
          src: "img/bbzbl-logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Unterlagen",
          },
          {
            type: "dropdown",
            label: "Referenzen",
            position: "left",
            href: "",
            items: [
              {
                label: "Dockerfile",
                href: `/${modulConfig.repoName}/docs/woche02/docker-images#dockerfile-1`,
              },
              {
                label: "Docker CLI",
                href: `/${modulConfig.repoName}/docs/woche01/docker-referenz`,
              },
              {
                label: "Docker Volume",
                href: `/${modulConfig.repoName}/docs/woche03/docker-volume-referenz`,
              },
              {
                label: "Docker Network",
                href: `/${modulConfig.repoName}/docs/woche05/network-referenz`,
              },
              {
                label: "Docker Compose",
                href: `/${modulConfig.repoName}/docs/woche06/docker-compose-referenz`,
              },
            ],
          },
          {
            href: `https://github.com/${modulConfig.organizationName}/${modulConfig.repoName}`,
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} BBZBL, Made with ❤️ in Pratteln`,
      },
      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
        additionalLanguages: [
          "java",
          "bash",
          "docker",
          "python",
          "yaml",
          "markdown",
        ],
        magicComments: [
          // Remember to extend the default highlight class name as well!
          {
            className: "theme-code-block-highlighted-line",
            line: "highlight-next-line",
            block: { start: "highlight-start", end: "highlight-end" },
          },
          {
            className: "code-block-red-line",
            line: "highlight-red-next-line",
            block: { start: "highlight-red-start", end: "highlight-red-end" },
          },
          {
            className: "code-block-green-line",
            line: "highlight-green-next-line",
            block: {
              start: "highlight-green-start",
              end: "highlight-green-end",
            },
          },
          {
            className: "code-block-yellow-line",
            line: "highlight-yellow-next-line",
            block: {
              start: "highlight-yellow-start",
              end: "highlight-yellow-end",
            },
          },
          {
            className: "code-block-orange-line",
            line: "highlight-orange-next-line",
            block: {
              start: "highlight-orange-start",
              end: "highlight-orange-end",
            },
          },
          {
            className: "code-block-blue-line",
            line: "highlight-blue-next-line",
            block: { start: "highlight-blue-start", end: "highlight-blue-end" },
          },
        ],
      },
    }),
};

export default config;
