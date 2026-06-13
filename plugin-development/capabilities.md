# Plugin capabilities

What plugins can do today — permissions, extension points, and deferred surfaces.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Permission model

Capabilities are declared in `manifest.json` as `permissions[]` or `capabilities[]`. Campaign admins grant them when enabling a plugin. The host enforces permissions at runtime — undeclared access is rejected.

Common permissions:

| Permission | Access |
|------------|--------|
| `plugin:data` | Campaign-scoped JSON KV |
| `plugin:config` | Campaign plugin settings |
| `plugin:secrets` | Encrypted store (excluded from export) |
| `campaign:read-lore` | Revelation-aware lore reads |
| `campaign:read-calendar` | Current in-world date |
| `wiki:decorate` | Read-only wiki decoration hooks |

---

## Extension surfaces

| Surface | Doc |
|---------|-----|
| Domain events | [Events](events.md) |
| Data interceptors | Internal: [`data-interceptors.md`](../../esiana-core/docs/plugins/data-interceptors.md) |
| Frontend slots | [UI extensions](ui-extensions.md) |
| Plugin runtime HTTP | `/api/plugin-runtime/:pluginId/...` |

---

## Full matrix

Shipped vs deferred capability audit: [`esiana-core/docs/plugins/capability-matrix.md`](../../esiana-core/docs/plugins/capability-matrix.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
