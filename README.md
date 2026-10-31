# Esiana Documentation

Markdown-first documentation for Esiana, a campaign narrative platform for TTRPGs.

**Read the documentation:** <https://esiana-ttrpg.github.io/docs/>

The public guides live in [`src/content/docs/`](src/content/docs/index.md), the canonical source for the Astro Starlight website. Installation, configuration, campaign workflows, architecture, APIs, plugins, and reference catalogs are preserved there. Planning records remain in [`plans/`](plans/README.md) and are not published as current guides.

## Develop locally

Use Node.js 26 and pnpm 9.15.9:

Corepack selects the pinned `pnpm@9.15.9` from `package.json`. If Corepack is unavailable, install it once with `npm install --global corepack`, then enable it:

```bash
corepack enable
```

```bash
pnpm install --frozen-lockfile
pnpm run dev
```

Open <http://localhost:4321/docs/>. To build, validate internal links, and preview the production site (including Pagefind search):

```bash
pnpm run check
pnpm run preview
```

The site uses `https://esiana-ttrpg.github.io` with base path `/docs`. Generated `dist/`, `.astro/`, and dependencies are ignored. No Esiana application checkout is needed.

## Contribute and deploy

See the [contributor guide](src/content/docs/contributing.md) for adding pages, Markdown links, local validation, and one-time GitHub Pages setup. Each published guide has an **Edit this page** link to its Markdown source.

[Suggest an improvement](https://github.com/Esiana-ttrpg/docs/issues/new) or submit a pull request. Pull requests build and validate; pushes to `main` deploy through GitHub Actions once **Settings > Pages > Source** is set to **GitHub Actions**. Maintainers can also deploy manually from the Actions tab.
