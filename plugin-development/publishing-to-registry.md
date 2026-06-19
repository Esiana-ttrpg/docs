# Publishing to the plugin registry

Add your plugin to the official [`community-plugins`](../../community-plugins/) catalog so operators can install via Admin → Sync Registry.

**Prerequisite:** [Hello world](hello-world.md) working locally

---

## How the catalog works

| Layer | What it is |
|-------|------------|
| **Registry** | [`registry.json`](../../community-plugins/registry.json) — discoverable entries |
| **First-party code** | Packages under `community-plugins/<plugin>/` (Esiana-maintained) |
| **External code** | Stays in **your** GitHub repo — registry PR adds an entry only |
| **Runtime** | Host `PLUGINS_DIR` after Admin install (not vendored in `esiana-core`) |

Default registry URL (operators paste in Admin):

```text
https://github.com/Esiana-ttrpg/community-plugins/blob/main/registry.json
```

---

## External contributors (plugin in your repo)

1. Host `manifest.json` in your repository (root or subdirectory).
2. Open a PR to `community-plugins` that adds **one entry** to `registry.json` — no plugin source files.
3. Pin a 40-character `commitSha` from **your** repo.
4. Set `manifestUrl` to the raw GitHub URL of your manifest.
5. Set `source.repo`, `source.path`, and `source.type: "github"`.

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "Short catalog description.",
  "scope": "campaign",
  "category": "utility",
  "manifestUrl": "https://raw.githubusercontent.com/you/esiana-my-plugin/main/manifest.json",
  "source": {
    "type": "github",
    "repo": "you/esiana-my-plugin",
    "commitSha": "<40-char-sha-from-your-repo>",
    "path": "."
  },
  "installable": true
}
```

Maintainers review permissions, pinned SHA, and repository trustworthiness.

**GitLab / self-hosted git:** use `"installable": false` for catalog-only listing, or Admin → Install from URL for global manifest installs.

---

## Esiana first-party (package in community-plugins)

1. Add or update `community-plugins/<plugin>/` with `manifest.json`.
2. Add the matching entry in `registry.json` with `source.repo: "Esiana-ttrpg/community-plugins"`.
3. Run `node scripts/pin-registry-shas.mjs` from `community-plugins/`.
4. Commit package + updated `registry.json`.

---

## Operator install path

1. Admin → **Plugins & Integrations** — confirm registry URL (blob link above)
2. **Sync Registry** — discover entries
3. **Install** → **Enable** → grant capabilities on campaigns

---

## Version bumps

| Maintainer type | Steps |
|-----------------|-------|
| External | Bump manifest version, push to your repo, open registry PR with new `commitSha` |
| First-party | Bump manifest, push to `community-plugins`, run `pin-registry-shas.mjs` |

Operators sync registry and upgrade from Admin.

---

## Further reading

- [community-plugins CONTRIBUTING](../../community-plugins/CONTRIBUTING.md)
- [Troubleshooting](troubleshooting.md)
- Engineering: [`esiana-core/docs/plugins/capability-matrix.md`](../../esiana-core/docs/plugins/capability-matrix.md)
