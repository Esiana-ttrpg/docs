# Hello world plugin

Step-by-step walkthrough — complements [Getting started](getting-started.md).

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## 1. Copy the example (5 min)

In your own repo (recommended) or under `community-plugins`:

```bash
cd community-plugins
cp -r example-plugin my-first-plugin
cd my-first-plugin
```

Edit `manifest.json`:

- `id`: unique slug (`my-first-plugin`)
- `name`: display name
- `version`: `0.1.0`

---

## 2. Load into core (2 min)

From `esiana-core`, either link a local package or install from the registry:

```bash
# Option A — copy sibling community-plugins packages into PLUGINS_DIR
pnpm run plugins:link

# Option B — Admin → Plugins → Sync Registry → Install example-plugin
pnpm run dev:backend
```

`plugins:link` is **local development materialization** — linked packages do not appear in the discovery catalog. Restart the backend after manifest changes.

---

## 3. Enable on a campaign (5 min)

1. Log in as GM
2. Campaign Settings → Integrations (campaign scope) or Admin → Plugins (global scope)
3. Enable your plugin
4. Grant capabilities listed in your manifest

---

## 4. Verify backend hook (5 min)

The example plugin registers a domain event listener. Create or edit a wiki page — check backend logs for the hook firing.

**HTTP smoke test** (global example plugin enabled):

```bash
curl -s http://localhost:3001/api/plugin-runtime/example-plugin/hello \
  -H "Authorization: Bearer <your-token>"
```

Expect JSON from the plugin route. See [Events](events.md).

---

## 5. Verify frontend slot (5 min)

If your manifest declares a frontend entry, reload the campaign shell — the example slot appears in the sidebar zone declared in `manifest.json`.

See [UI extensions](ui-extensions.md).

---

## 6. Storage API (5 min)

```javascript
await context.storage.set('greeting', { hello: 'world' });
```

See [Storage](storage.md).

---

## Further reading

- [Manifests](manifests.md)
- [Capabilities](capabilities.md)
- [Publishing to registry](publishing-to-registry.md)
- [Troubleshooting](troubleshooting.md)
- [`example-plugin` README](../../community-plugins/example-plugin/README.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
