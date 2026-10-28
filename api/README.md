# API guides

These guides are the human-readable developer documentation for Esiana's REST API.
They explain what the API provides, how its resources relate, and how to
accomplish real workflows — not just what each endpoint returns.

They complement, rather than duplicate, the generated endpoint reference served
by each Esiana instance at `/api/docs` (Swagger UI plus
`/api/docs/openapi.yaml` / `/api/docs/openapi.json`). Use `/api/docs` for exact
paths, parameters, request bodies, response schemas, and status codes; use these
guides to understand intent, behavior, permissions, and sequencing.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

## Start here

| Guide | Topic |
|-------|-------|
| [Overview](overview.md) | What the API provides, base URL, versioning, reference formats |
| [Authentication](authentication.md) | Sessions, bearer tokens, scopes, OIDC, auth failures |
| [Access control](access-control.md) | Campaign membership, roles, capabilities, system administration, content visibility |
| [Request conventions](request-conventions.md) | JSON, uploads, responses, errors, identifiers, pagination, rate limits |

## API areas

| Guide | Topic |
|-------|-------|
| [Campaigns](campaigns.md) | Campaign lifecycle, members, invites, join requests, ownership, dashboard, sessions, webhooks, Discord, quests, visits, presence, ensemble |
| [Wiki pages](wiki-pages.md) | Pages, blocks, hierarchy, visibility, aliases, tags, session notes, hubs, character sheets |
| [Narrative knowledge](narrative-knowledge.md) | Entity graph, lore claims, interpretations, rumors, lifecycle, branches, snapshots, quest publishing |
| [Chronology](chronology.md) | Calendars, events, consequences, timeline/overlay, time tracking, fantasy-calendar interop |
| [Downtime](downtime.md) | Havens, projects, ledger, scheduled effects, reputation and world-event suggestions |
| [Journal](journal.md) | Library, planner, series, publications, release rules |
| [Workshop](workshop.md) | Drafts, writing context, apply, formalize |
| [World state](world-state.md) | World advance, momentum, pressure, pacing, world development |
| [Maps](maps.md) | Map assets, layers, groups, objects, pins, scenes, reveal |
| [Assets](assets.md) | Uploads, downloads, variants, import from URL, storage |
| [Import & export](import-export.md) | Backup ZIP, sovereign export/restore, import providers, content packs |
| [Plugins](plugins.md) | Core management APIs, campaign plugins, connections, extension-owned routes |
| [Administration](admin.md) | System administration: users, campaigns, settings, tasks, analytics, storage |
| [Account, notifications & discovery](users-notifications.md) | User account, tokens, notifications, public profiles, recruitment, catalogs |
| [Entities](entities.md) | Typed lore entities (concept bridge) |

## Coverage audit

[ROUTE-COVERAGE.md](ROUTE-COVERAGE.md) tracks every `METHOD + PATH` operation in
the OpenAPI contract, where it is documented, and any known
spec/implementation discrepancies flagged for human review.

The authoritative machine-readable contract is served at `/api/docs/openapi.yaml`
and `/api/docs/openapi.json` when API documentation is enabled.
