# API overview

Esiana exposes a REST API for campaign narrative infrastructure: campaigns,
wiki lore, narrative knowledge, chronology, downtime, journals, maps, assets,
plugins, and system administration. These guides explain the access model and
common integration patterns; the running instance's `/api/docs` reference
remains authoritative for exact schemas.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

## Base URL

| Environment | URL |
|-------------|-----|
| Local development | `http://localhost:3001` |
| Docker Compose | `http://localhost:8080` through nginx, or `http://localhost:3001` directly |

API paths already begin with `/api`. For example, the direct development health
URL is `http://localhost:3001/api/health`.

## API versioning

The OpenAPI contract is versioned with the release (`info.version`, currently
`1.5.0` in `esiana-core/backend/openapi/openapi.yaml`). There is no `/v1`-style
URL versioning: the backend serves the specification packaged with that
release, and clients should use the running instance's reference rather than
this wiki for exact shapes. Behavior documented here as release-specific (for
example legacy unscoped tokens) may change in later releases; the coverage
audit notes known sunset plans.

## Interactive and machine-readable reference

Open `/api/docs` on the running instance for Swagger UI. The same
release-locked contract is available as:

- `/api/docs/openapi.yaml`
- `/api/docs/openapi.json`

The backend serves the specification packaged with that release; it does not
fetch the contract from this wiki. In production, documentation routes are
disabled unless `OPENAPI_DOCS_ENABLED=true` (forced on when explicitly set;
otherwise enabled in non-production). See
[Environment variables](../options/environment-variables.md).

Use the running instance's reference for exact paths, parameters, request
bodies, response schemas, and status codes.

## Authentication and authorization

Browser clients normally use the `esiana_token` session cookie. Integrations
can use a bearer API token on routes whose OpenAPI `security` declaration
includes `bearerAuth`.

Authentication establishes identity; it does not grant campaign access, content
access, a campaign role, or system-administrator authority. See
[Authentication](authentication.md) and [Access control](access-control.md).

## Campaign scope

Most narrative routes use:

```text
/api/campaigns/{campaignHandle}/...
```

These routes resolve `{campaignHandle}` as the campaign's URL handle and then
require membership. Additional role, capability, ownership, and
content-visibility checks may follow.

Some container-management routes under `/api/campaigns/{id}` or
`/api/campaigns/{campaignId}` use the database campaign ID instead (they
generally accept either the ID or the handle). Consult the parameter name and
description in `/api/docs`; do not assume handles and IDs are interchangeable.
See [Campaigns](campaigns.md) for the addressing rules.

## Content types and conventions

- Most request and response bodies use `application/json`.
- File and image uploads use `multipart/form-data`; field names and size limits
  are operation-specific.
- Downloads may stream content directly or return a `302` redirect to a
  storage-provider URL.
- Errors normally use `{ "error": "Human-readable explanation" }`; branch on
  HTTP status, not on the text.

Full details: [Request conventions](request-conventions.md).

## Error model (summary)

| Status | Meaning |
|--------|---------|
| `400` | Invalid parameters, body, upload, or state transition |
| `401` | Authentication required or invalid |
| `403` | Authenticated but not authorized |
| `404` | Missing resource, or protected resource intentionally concealed |
| `409` | Conflict with existing state |
| `410` | Expired resource (temporary assets, stale ownership transfers) |
| `422` | Semantically unprocessable (recursive-delete confirmation, not-ready content) |
| `429` | Rate limit exceeded; inspect `Retry-After` |
| `500` | Unexpected server error |

## First request

The health endpoint is public:

```http
GET /api/health
```

For an authenticated integration, create an API token from account settings and
send it as a bearer token. Before calling a campaign-scoped endpoint, use the
campaign list to obtain the correct ID or handle and confirm that the token's
owning user is a campaign member.

## Guides

| Topic | Guide |
|-------|-------|
| Authentication and tokens | [Authentication](authentication.md) |
| Authorization boundaries | [Access control](access-control.md) |
| Requests and errors | [Request conventions](request-conventions.md) |
| Campaign addressing and collaboration | [Campaigns](campaigns.md) |
| Wiki and lore | [Wiki pages](wiki-pages.md), [Narrative knowledge](narrative-knowledge.md) |
| Time and world | [Chronology](chronology.md), [Downtime](downtime.md), [World state](world-state.md) |
| Writing flows | [Journal](journal.md), [Workshop](workshop.md) |
| Media | [Maps](maps.md), [Assets](assets.md) |
| Portability and extensions | [Import & export](import-export.md), [Plugins](plugins.md) |
| Operations and identity | [Administration](admin.md), [Account, notifications & discovery](users-notifications.md) |

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
