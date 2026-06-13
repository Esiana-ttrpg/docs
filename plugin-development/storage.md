# Plugin storage

Campaign-scoped data for plugins — KV, config, secrets, and assets.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Plugin data (KV)

`context.data` / `context.storage` — JSON keyed store per campaign. Included in sovereign export.

Requires `plugin:data` permission.

---

## Config

`context.config` — reads `CampaignPluginSetting.config` shaped by optional `configSchema` in manifest.

Requires `plugin:config` permission.

---

## Secrets

`context.secrets` — encrypted store; GM write. **Excluded from sovereign export.**

Requires `plugin:secrets` permission.

---

## Assets

`context.assets.upload` — scoped storage pointer with per-campaign quota.

Requires `plugin:assets` permission.

---

## Curated read services

Revelation-aware reads via `PluginHostContext` services (`context.lore`, `context.maps`, `context.calendar`, etc.) — not raw Prisma.

Matching HTTP routes: `/api/plugin-runtime/:pluginId/campaign/*`

See [Security](security.md).

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
