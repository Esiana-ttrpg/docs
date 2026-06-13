# Plugin development — getting started

**Goal:** Hello-world plugin in ~30 minutes.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Prerequisites

- Esiana core running locally (`npm run dev` from [`esiana-core`](../../esiana-core))
- Node 20+
- [`community-plugins`](../../community-plugins) checked out beside `esiana-core`

---

## Quick path

1. Copy [`example-plugin`](../../community-plugins/example-plugin/) to `my-first-plugin`
2. Edit `manifest.json` — unique `id`, display `name`, `version`
3. Link: `npm run plugins:link -- ../community-plugins/my-first-plugin` from `esiana-core`
4. Restart backend; enable plugin in Campaign Settings → Integrations
5. Verify domain event hook in backend logs when editing a wiki page

Full walkthrough: [Hello world](hello-world.md)

---

## REST reference

Open **`http://localhost:3001/api/docs`** on your running backend — version-locked to that instance.

Human API guides: [API catalog](../api/README.md)

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
