# Publishing to the plugin registry

Add your plugin to the official [`community-plugins`](../../community-plugins/) catalog so operators can install via Admin → Sync Registry.

**Prerequisite:** [Hello world](hello-world.md) working locally

---

## 1. Package layout

```
my-plugin/
  manifest.json
  backend/index.js      # optional
  frontend/index.js     # optional
  README.md
```

Manifest must include stable `id`, `scope` (`global` or `campaign`), `version`, and `description`.

---

## 2. Pin commit SHA

Registry installs require an immutable 40-character git SHA. After pushing to `community-plugins`:

```bash
cd community-plugins
node scripts/pin-registry-shas.mjs
git add registry.json
git commit -m "Pin registry SHAs"
```

Each entry in `registry.json` needs:

```json
{
  "id": "my-plugin",
  "manifestUrl": "https://raw.githubusercontent.com/Esiana-ttrpg/community-plugins/main/my-plugin/manifest.json",
  "source": {
    "type": "github",
    "repo": "Esiana-ttrpg/community-plugins",
    "commitSha": "<40-char-sha>",
    "path": "my-plugin"
  },
  "installable": true
}
```

---

## 3. Operator install path

1. Admin → **Plugins & Integrations** — confirm registry URL (default: `community-plugins` `registry.json`)
2. **Sync Registry** — discover new entry
3. **Install** → **Enable** → grant capabilities on campaigns

Self-hosted instances pull manifests from GitHub raw URLs at install time.

---

## 4. Version bumps

1. Bump `version` in `manifest.json`
2. Push to `community-plugins`
3. Re-run `pin-registry-shas.mjs` and commit updated SHAs
4. Operators sync registry and upgrade from Admin

---

## Further reading

- [Troubleshooting](troubleshooting.md)
- [Security](security.md)
- Engineering: [`esiana-core/docs/plugins/capability-matrix.md`](../../esiana-core/docs/plugins/capability-matrix.md)
