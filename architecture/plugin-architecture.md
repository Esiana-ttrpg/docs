# Plugin architecture

How Esiana hosts campaign-scoped plugins — trust tiers, storage, and extension surfaces.

**Prerequisite:** [Campaign model](campaign-model.md)

---

## Host model

- Plugins are **packages** installed by system administrators; campaign admins enable and configure them per campaign.
- Backend hooks run in the main Node process (trusted-admin model). **Data interceptors** are the primary sandboxed surface (`worker_threads`).
- Frontend plugins mount in **declared slots only** — never replace app shells or global routes.

---

## Trust tiers

| Tier | Code | Isolation |
|------|------|-----------|
| 1 | Bundled / admin-installed `register()` | Coarse manifest `permissions[]` |
| 2 | Data interceptor scripts | Worker sandbox, timeouts, quarantine |
| 3 | Frontend slot bundles | CSP + error boundaries |

---

## Extension surfaces

| Surface | Mechanism |
|---------|-----------|
| Domain events | Observational fan-out after mutations |
| Data interceptors | Transform wiki payloads before persistence |
| Frontend slots | Sidebar, page zones, widgets |
| Plugin data | Campaign-scoped JSON KV |
| Storage registry | Optional `storage:provider` drivers |
| Plugin runtime API | `/api/plugin-runtime/:pluginId/...` |

Capability audit (shipped vs deferred): [`esiana-core/docs/plugins/capability-matrix.md`](../../esiana-core/docs/plugins/capability-matrix.md)

---

## See also

- [Plugin development](../plugin-development/getting-started.md)
- [Security](security.md) in plugin-development
- Internal: [`phase-10-ecosystem.md`](../../esiana-core/docs/plugins/phase-10-ecosystem.md)
