---
title: Contributing to the documentation
description: Edit guides, add Markdown pages, and preview and deploy Esiana documentation.
---

Use **Edit this page** on any guide to open its Markdown source and submit a pull request. To report a correction or request a guide, [suggest an improvement](https://github.com/Esiana-ttrpg/docs/issues/new).

## Local development

Use Node.js 26 and pnpm 9.15.9. The site builds independently of the Esiana application.

Corepack selects the pinned `pnpm@9.15.9` from `package.json`. If Corepack is unavailable, install it once with `npm install --global corepack`, then enable it:

```bash
corepack enable
```

```bash
git clone https://github.com/Esiana-ttrpg/docs.git
cd docs
pnpm install --frozen-lockfile
pnpm run dev
```

Open the printed URL including `/docs/` (normally `http://localhost:4321/docs/`). Search is generated during production builds. To build, validate, and test search locally:

```bash
pnpm run check
pnpm run preview
```

`pnpm run check` validates generated internal links, heading anchors, assets, page counts, search files, and edit links. Do not commit generated `dist/` or `.astro/` files.

## Add or edit a page

1. Edit or add a Markdown file under `src/content/docs/` in the appropriate section.
2. Add YAML frontmatter with a `title` and an optional short `description`.
3. Start sections at `##`; Starlight renders the title as the page heading.
4. Link to guides with relative Markdown paths, such as `../features/wiki-and-lore.md`. Use `index.md` for section introductions. These work in GitHub and convert to `/docs/` website URLs during builds.
5. Run `pnpm run check` and submit a pull request. Pages appear automatically in existing sidebar groups. Configure new groups in `astro.config.mjs` when needed.

```yaml
---
title: Your guide title
description: What the reader will learn.
---
```

Keep operator instructions, API references, and campaign guides in their respective sections. Preserve existing content and examples, with one canonical source per guide. Planning records remain in `plans/` and are not published or indexed as current guides.

Use ordinary Markdown tables, fenced code blocks, and blockquotes. Starlight supports `:::note`, `:::tip`, `:::caution`, and `:::danger` asides. Mermaid fences render in the browser through `astro-mermaid`; all diagram scripts are served locally by the website. Diagrams require JavaScript.

Put downloads in `public/` and use relative source links: from a guide in `src/content/docs/self-hosting/`, link to `../../../../public/options/compose.env.example`. The build converts this to `/docs/options/compose.env.example`. Use absolute GitHub URLs for files in other repositories and unpublished plans.

## Deployment

Pull requests run a production build and link validation. Pushes to the default branch, `main`, build and deploy using `.github/workflows/deploy.yml`. Maintainers can also run the workflow manually from the Actions tab. Only the deploy job receives Pages write and OIDC permissions.

A repository maintainer must complete this one-time GitHub setup:

1. Ensure `Esiana-ttrpg/docs` is public and GitHub Actions is enabled.
2. Under **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. Ensure any `github-pages` environment rules allow deployment from `main`.
4. Merge through normal maintainer review, check the workflow, and open [Esiana Documentation](https://esiana-ttrpg.github.io/docs/).

No custom domain, hosting subscription, or deployment secret is required. Leave the custom domain field empty. The workflow installs the committed `pnpm-lock.yaml` with `--frozen-lockfile`, uploads `dist/`, and deploys through GitHub's official Pages actions. If the default branch changes, update workflow filters and `editLink.baseUrl` in `astro.config.mjs` together.

After deployment, check a nested guide directly, desktop and mobile navigation, both themes, a Mermaid diagram, a template download, and a search for “campaign” or “OIDC”.
