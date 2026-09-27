# Import and export API

Campaign backup ZIP, sovereign export, and external import pipelines.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Sovereign export

GM portable archive — Markdown pages + JSON sidecars including `sovereign/knowledge.json`.

Guarantees: [Sovereign export](../architecture/sovereignty.md)

---

## Import pipelines

| Pipeline | Source |
|----------|--------|
| Sovereign restore | Esiana ZIP |
| Obsidian vault | Markdown ZIP |
| Content pack | Plugin / sample seed |

`GET /api/import-providers` returns `{ core, plugins }` — core built-in pipelines plus plugin-registered providers. See `/api/docs` for the version-locked schema.

User guide: [Data backup & export](../features/data-backup-and-export.md) · [Import formats](../data-management/import-formats.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
