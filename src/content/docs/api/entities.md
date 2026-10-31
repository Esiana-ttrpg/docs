---
title: "Entities API"
---

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

Internal: [`entity-graph.md`](https://github.com/Esiana-ttrpg/esiana-core/blob/main/docs/architecture-internal/entity-graph.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.

## Sheet fields and external apps

Managed entity sheets use the existing Wiki page tabs and custom-field APIs:

- `GET/POST /api/campaigns/{campaignHandle}/wiki/{pageId}/entity-fields`
- `PUT/DELETE /api/campaigns/{campaignHandle}/wiki/{pageId}/entity-fields/{fieldId}`
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/entity-pages`

The `character-fields` and `character-pages` route names remain compatible aliases. Field values live on the field record; moving a field changes only its sheet placement, preserving its ID, source identity, value, and synchronization endpoint.

External apps authenticate with an API token. The trusted token ID and display name identify the API source; request bodies cannot claim plugin or custom ownership. There is no separate external-app sheet registry.

To register a field with a default destination:

```json
{
  "sourceKey": "campaign-memory",
  "label": "Campaign memory",
  "type": "JSON",
  "value": { "clues": [] },
  "defaultSheetName": "Shared history"
}
```

`defaultSheetName` is an optional nonempty name of up to 100 characters. When an API field omits `pageId`, registration reuses or lazily creates an API-origin canvas sheet with that title, scoped to the campaign, entity, and authenticated API source. If the name is omitted, the token's registered display name is used (or `External app` when unavailable). Existing sheet visibility is checked before reuse. Plugin definitions continue to use their existing page `title`, page lifecycle, and field declarations.

An explicit `pageId` selects an existing entity sheet, including `core:appearance` and other valid core IDs. An explicit `null` means Overview. Session-authenticated user fields do not acquire app provenance or an app-named default; Manage Custom Fields supplies the current sheet when creating them.

`sourceKey` is an optional nonempty stable app field key of up to 100 characters, unique within the API token and entity. A new registration returns `201`; registering the same key again returns `200`, refreshes the label/type/validation, and preserves the existing ID, value, order, and placement. Incompatible type/validation changes are rejected. Treat `value`, `pageId`, and `defaultSheetName` in registration as creation defaults. Use `PUT` with `{ "value": ... }` to synchronize a stored value; it does not rewrite placement or order. Apps without a stable `sourceKey` retain the existing create-new-field behavior and should retain the returned field ID.

Authorized editors can move user, API, and plugin fields between existing visible sheets through Manage Custom Fields. The response's `capabilities.placeable` controls placement/order management independently of `writable`, which governs values. Plugin labels and deletion remain provider managed. API re-registration and plugin definition refreshes preserve user placement overrides.

Supported types are `STRING`, `NUMBER`, `BOOLEAN`, `JSON`, `DATE`, and `ENUM`. The native information box displays labels, typed values, empty values, and field ordering across core and canvas sheets. Editing follows entity authorization and field writability. Its sidebox/topbox selector is a per-browser, campaign/entity/sheet view preference; the sidebox stacks above content on mobile.

Existing placements are not migrated. Legacy `null` and `core:overview` destinations both render on Overview. Legacy records do not identify whether Overview was an automatic default or an explicit choice, so they cannot be safely reassigned by inference. Move them explicitly through Manage Custom Fields when desired.
