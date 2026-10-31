---
title: "Plugin development — getting started"
---

**Goal:** Hello-world plugin in ~30 minutes.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Prerequisites

- Esiana core running locally (`pnpm run dev` from [`esiana-core`](https://github.com/Esiana-ttrpg/esiana-core))
- Node 26
- Your own plugin repo **or** [`community-plugins`](https://github.com/Esiana-ttrpg/community-plugins) checked out beside `esiana-core` for first-party examples

---

## Quick path

1. Copy [`example-plugin`](https://github.com/Esiana-ttrpg/community-plugins/blob/main/examples/example-plugin/) into your own repo (or `my-first-plugin` under `community-plugins`)
2. Edit `manifest.json` — unique `id`, display `name`, `version`
3. For local core dev:
   - **Option A:** `pnpm run plugins:link` from `esiana-core` (copies sibling `community-plugins` packages into `PLUGINS_DIR`)
   - **Option B:** Admin → Sync Registry → Install from the official catalog
4. Restart backend; enable plugin in Campaign Settings → Integrations (campaign scope) or Admin → Plugins (global scope)
5. Verify domain event hook in backend logs when editing a wiki page

Full walkthrough: [Hello world](hello-world.md)

---

## REST reference

Open **`http://localhost:3001/api/docs`** on your running backend — version-locked to that instance.

Human API guides: [API catalog](../api/index.md)

---

## Next steps

| Topic | Guide |
|-------|-------|
| Manifest fields | [Manifests](manifests.md) |
| Permissions | [Capabilities](capabilities.md) |
| Event bus | [Events](events.md) |
| KV storage | [Storage](storage.md) |
| UI slots | [UI extensions](ui-extensions.md) |
| Trust model | [Security](security.md) |
| Publish to catalog | [Publishing to registry](publishing-to-registry.md) |
| Debug install issues | [Troubleshooting](troubleshooting.md) |
