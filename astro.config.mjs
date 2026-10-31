import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import documentationLinks from './scripts/documentation-links.mjs';

export default defineConfig({
  site: 'https://esiana-ttrpg.github.io',
  base: '/docs',
  trailingSlash: 'always',
  markdown: { processor: unified({ remarkPlugins: [documentationLinks] }) },
  integrations: [
    mermaid({ autoTheme: true, enableLog: false }),
    starlight({
      title: 'Esiana Documentation',
      favicon: '/favicon.png',
      description: 'Install, operate, extend, and explore Esiana campaign narrative infrastructure.',
      editLink: { baseUrl: 'https://github.com/Esiana-ttrpg/docs/edit/main/' },
      social: [
        { icon: 'github', label: 'Documentation repository', href: 'https://github.com/Esiana-ttrpg/docs' },
      ],
      pagefind: true,
      expressiveCode: {
        shiki: { langAlias: { env: 'dotenv', caddy: 'text', caddyfile: 'text' } },
      },
      sidebar: [
        { label: 'Getting Started', items: [
          { slug: 'index', label: 'Documentation home' },
          { slug: 'self-hosting/installation' },
          { slug: 'architecture/campaign-model' },
        ] },
        { label: 'Player & GM Guide', items: [{ autogenerate: { directory: 'features' } }], collapsed: true },
        { label: 'Campaign Management', items: [
          { slug: 'options/campaign-settings' },
          { label: 'Data management', items: [{ autogenerate: { directory: 'data-management' } }] },
          { label: 'Reference catalogs', items: [{ autogenerate: { directory: 'reference' } }] },
        ], collapsed: true },
        { label: 'Instance Administration', items: [
          { label: 'Self-hosting', items: [{ autogenerate: { directory: 'self-hosting' } }] },
          { label: 'Configuration reference', items: [{ autogenerate: { directory: 'options' } }] },
        ], collapsed: true },
        { label: 'Integrations & Providers', items: [
          { slug: 'options/federated-identity' },
          { label: 'Plugin development', items: [{ autogenerate: { directory: 'plugin-development' } }] },
        ], collapsed: true },
        { label: 'API & Development', items: [
          { label: 'API guides', items: [{ autogenerate: { directory: 'api' } }] },
          { label: 'Architecture', items: [{ autogenerate: { directory: 'architecture' } }] },
        ], collapsed: true },
        { label: 'Contributing', items: [
          { slug: 'contributing' },
          { label: 'Suggest an improvement', link: 'https://github.com/Esiana-ttrpg/docs/issues/new' },
        ] },
      ],
    }),
  ],
});
