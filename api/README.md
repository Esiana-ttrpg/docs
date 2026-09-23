# API guides

These guides explain how to use Esiana's REST API. They complement, rather than duplicate, the endpoint reference served by each Esiana instance at `/api/docs`.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

| Guide | Topic |
|-------|-------|
| [Overview](overview.md) | Base URLs, reference formats, and first request |
| [Authentication](authentication.md) | Sessions, bearer tokens, scopes, and limits |
| [Access control](access-control.md) | Campaign membership, capabilities, system administration, and content visibility |
| [Request conventions](request-conventions.md) | JSON, uploads, responses, errors, and identifiers |
| [Campaigns](campaigns.md) | Campaign addressing and scoped routes |
| [Wiki pages](wiki-pages.md) | Pages, blocks, hierarchy, and visibility |
| [Entities](entities.md) | Typed lore entities |
| [Maps](maps.md) | Map assets and pins |
| [Assets](assets.md) | Uploads, downloads, and protected media |
| [Import & export](import-export.md) | Backup ZIP and import |
| [Plugins](plugins.md) | Core management APIs and extension-owned runtime routes |

The authoritative machine-readable contract is served at `/api/docs/openapi.yaml` and `/api/docs/openapi.json` when API documentation is enabled.
