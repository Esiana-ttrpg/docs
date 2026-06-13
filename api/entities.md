# Entities API

Typed narrative entities — characters, locations, organizations, and more.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Entity model

An entity is typically a **wiki page with a template** plus **metadata JSON**. The entity graph is derived from wiki links and metadata — not authored separately.

Entity routes share campaign wiki paths with template-specific metadata endpoints.

---

## Relations

`EntityRelation` edges sync from wiki links, metadata fields, calendar prerequisites, and map pin targets. Query neighborhood via entity-graph routes.

Internal: [`entity-graph.md`](../../esiana-core/docs/architecture-internal/entity-graph.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
