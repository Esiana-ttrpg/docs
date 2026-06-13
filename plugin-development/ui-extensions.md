# UI extensions

Frontend slots for campaign-scoped UI — sidebar zones, page widgets, and declared mount points.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Slot-only mount

Plugins inject into **declared slots only** — never replace app shells, global routes, or React roots.

Manifest declares `frontend.entry` and slot targets. CSP and error boundaries contain third-party bundles.

---

## Frontend RPC

Slot contexts expose:

```javascript
context.api.get('/campaign/...')  // → /api/plugin-runtime/:pluginId/...
context.api.upload(path, formData)
```

Campaign handle is required (`X-Campaign-Handle` header or query).

---

## See also

- [Plugin architecture](../architecture/plugin-architecture.md)
- [Security](security.md) — Tier 3 trust model
- Internal: [`phase-10-ecosystem.md`](../../esiana-core/docs/plugins/phase-10-ecosystem.md) Part 10D

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
