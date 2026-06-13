# Plugins API

Plugin host routes — install authority, campaign enablement, runtime HTTP.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Routes

| Area | Path pattern |
|------|----------------|
| Admin plugin registry | `/api/admin/plugins/...` |
| Campaign enablement | Campaign settings API |
| Plugin runtime (slots) | `/api/plugin-runtime/:pluginId/...` |

Only system administrators **install** packages (registry sync or `PLUGINS_DIR`). Campaign admins **enable** and **configure** already-installed plugins per campaign — they cannot fetch new code.

| Action | Who | API surface |
|--------|-----|-------------|
| Install / sync registry | System admin | `/api/admin/plugins/...` |
| Enable + config template | Game Master | Campaign settings / campaign plugin routes |
| Runtime HTTP | Enabled plugin | `/api/plugin-runtime/:pluginId/...` |

---

## Author docs

[Plugin development](../plugin-development/getting-started.md) · [Plugin architecture](../architecture/plugin-architecture.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
