# Entities API

Typed narrative entities — characters, locations, organizations, and more.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Entity model

An entity is typically a **wiki page with a template** plus **metadata JSON**.
The entity graph is derived from wiki links and metadata — not authored
separately.

Start with [Wiki pages](wiki-pages.md) for page mechanics (including character
fields, character sheets, aliases, and tags), then use
[Narrative knowledge](narrative-knowledge.md) for the derived layer:

- `GET /api/campaigns/{campaignHandle}/entity-graph` — seeded neighborhood queries over synced relations.
- `GET /api/campaigns/{campaignHandle}/entity-graph/projection` — filtered relation projections.
- `GET /api/campaigns/{campaignHandle}/entity-graph/diagnostics` — cycles, orphans, dangling and
  unreachable checks.
- `POST /api/campaigns/{campaignHandle}/entity-graph/rebuild` — refreshes relations after bulk changes.

---

## Relations

`EntityRelation` edges sync from wiki links, metadata fields, calendar
prerequisites, and map pin targets. Query neighborhood via entity-graph routes.

Internal: [`entity-graph.md`](../../esiana-core/docs/architecture-internal/entity-graph.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
