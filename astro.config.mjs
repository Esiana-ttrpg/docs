import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import documentationLinks from './scripts/documentation-links.mjs';

export default defineConfig({
  site: 'https://esiana-ttrpg.github.io',
  base: '/docs',
  trailingSlash: 'always',
  // Content sync runs through Vite's module runner. Prebundle these CommonJS
  // dependencies so Windows builds do not evaluate them as unwrapped ESM.
  vite: {
    environments: {
      ssr: { optimizeDeps: { include: ['yaml', 'picomatch'] } },
      astro: { optimizeDeps: { include: ['yaml', 'picomatch'] } },
    },
  },
  markdown: { processor: unified({ remarkPlugins: [documentationLinks] }) },
  integrations: [
    mermaid({ autoTheme: true, enableLog: false }),
    starlight({
      title: 'Esiana Documentation',
      logo: { src: './public/favicon.svg', alt: 'Esiana', replacesTitle: false },
      favicon: '/favicon.png?v=20261104',
      description: 'Install, operate, extend, and explore Esiana campaign narrative infrastructure.',
      editLink: { baseUrl: 'https://github.com/Esiana-ttrpg/docs/edit/main/' },
      social: [
        { icon: 'github', label: 'Esiana on GitHub', href: 'https://github.com/Esiana-ttrpg/esiana-core' },
        { icon: 'discord', label: 'Join the Esiana Discord', href: 'https://discord.gg/2K4bQVNbUZ' },
        { icon: 'reddit', label: 'Visit the Esiana Reddit community', href: 'https://www.reddit.com/r/esiana/' },
      ],
      components: {
        SocialIcons: './src/components/header/SocialIcons.astro',
        Sidebar: './src/components/navigation/Sidebar.astro',
      },
      pagefind: true,
      expressiveCode: {
        shiki: { langAlias: { env: 'dotenv', caddy: 'text', caddyfile: 'text' } },
      },
      sidebar: [
        { label: 'Docs · Getting Started', items: [
          { slug: 'index', label: 'Documentation home' },
          { slug: 'architecture/campaign-model', label: 'About Esiana' },
          { slug: 'self-hosting/installation' },
        ] },
        { label: 'Docs · Features & Guides', items: [{ autogenerate: { directory: 'features' } }], collapsed: true },
        { label: 'Docs · Campaign Management', items: [
          { slug: 'options/campaign-settings' },
          { label: 'Data management', items: [{ autogenerate: { directory: 'data-management' } }] },
          { label: 'Reference catalogs', items: [{ autogenerate: { directory: 'reference' } }] },
        ], collapsed: true },
        { label: 'Docs · Instance Administration', items: [
          { label: 'Self-hosting', items: [
            { slug: 'self-hosting' }, { slug: 'self-hosting/docker' },
            { slug: 'self-hosting/backups' }, { slug: 'self-hosting/capacity-and-sizing' },
            { slug: 'self-hosting/postgres' }, { slug: 'self-hosting/reverse-proxy' },
            { slug: 'self-hosting/upgrades' },
          ] },
          { label: 'Authentication & SSO', items: [{ autogenerate: { directory: 'authentication' } }] },
          { label: 'Configuration', items: [
            { slug: 'options' }, { slug: 'options/environment-variables' },
            { slug: 'options/database-and-persistence' }, { slug: 'options/limits-and-quotas' },
            { slug: 'options/reverse-proxy-and-security' }, { slug: 'options/system-admin-settings' },
            { slug: 'options/user-account-settings' }, { slug: 'options/installation' },
          ] },
        ], collapsed: true },
        { label: 'Docs · Extensions & Apps', items: [
          { slug: 'extensions', label: 'Community showcase' },
          { label: 'Plugin development', items: [{ autogenerate: { directory: 'plugin-development' } }] },
        ], collapsed: true },
        { label: 'Docs · Contributing', items: [
          { slug: 'contributing' },
          { label: 'Suggest an improvement', link: 'https://github.com/Esiana-ttrpg/docs/issues/new' },
        ] },
        { label: 'API · API', items: [
          { slug: 'api/overview', label: 'Overview' },
          { slug: 'api/authentication', label: 'Authentication & API keys' },
          { label: 'OpenAPI reference', link: '/api/overview/' },
        ] },
        { label: 'API · API Guides', items: [
          { slug: 'api', label: 'Guide index' }, { slug: 'api/access-control' },
          { slug: 'api/request-conventions' }, { slug: 'api/campaigns' }, { slug: 'api/entities' },
          { slug: 'api/wiki-pages' }, { slug: 'api/narrative-knowledge' }, { slug: 'api/chronology' },
          { slug: 'api/downtime' }, { slug: 'api/world-state' }, { slug: 'api/journal' },
          { slug: 'api/workshop' }, { slug: 'api/maps' }, { slug: 'api/assets' },
          { slug: 'api/import-export' }, { slug: 'api/admin' }, { slug: 'api/users-notifications' },
          { slug: 'api/route-coverage' },
        ], collapsed: true },
        { label: 'API · Extensions', items: [
          { slug: 'api/plugins' },
          { label: 'Custom fields', link: '/features/wiki-and-lore/' },
          { label: 'Plugin development', link: '/plugin-development/' },
          { label: 'Webhooks', link: '/options/campaign-settings/' },
        ], collapsed: true },
        { label: 'API · Architecture', items: [
          { slug: 'architecture', label: 'Overview' },
          { slug: 'architecture/discovery-system' },
          { slug: 'architecture/knowledge-model' },
          { slug: 'architecture/narrative-foundation' },
          { slug: 'architecture/plugin-architecture' },
          { slug: 'architecture/sovereignty' },
          { slug: 'architecture/temporal-runtime' },
        ], collapsed: true },
      ],
    }),
  ],
});
