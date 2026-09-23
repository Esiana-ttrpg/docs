# API overview

Esiana exposes a REST API for campaign narrative infrastructure. These guides explain the access model and common integration patterns; they do not reproduce the endpoint catalog.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

## Base URL

| Environment | URL |
|-------------|-----|
| Local development | `http://localhost:3001` |
| Docker Compose | `http://localhost:8080` through nginx, or `http://localhost:3001` directly |

API paths already begin with `/api`. For example, the direct development health URL is `http://localhost:3001/api/health`.

## Interactive and machine-readable reference

Open `/api/docs` on the running instance for Swagger UI. The same release-locked contract is available as:

- `/api/docs/openapi.yaml`
- `/api/docs/openapi.json`

The backend serves the specification packaged with that release; it does not fetch the contract from this wiki. In production, documentation routes are disabled unless `OPENAPI_DOCS_ENABLED=true`. See [Environment variables](../options/environment-variables.md).

Use the running instance's reference for exact paths, parameters, request bodies, response schemas, and status codes.

## Authentication and authorization

Browser clients normally use the `esiana_token` session cookie. Integrations can use a bearer API token on routes whose OpenAPI `security` declaration includes `bearerAuth`.

Authentication establishes identity; it does not grant campaign access, content access, a campaign role, or system-administrator authority. See [Authentication](authentication.md) and [Access control](access-control.md).

## Campaign scope

Most narrative routes use:

```text
/api/campaigns/{campaignHandle}/...
```

These routes resolve `{campaignHandle}` as the campaign's URL handle and then require membership. Additional role, capability, ownership, and content-visibility checks may follow.

Some container-management routes under `/api/campaigns/{id}` use the database campaign ID instead. Consult the parameter name and description in `/api/docs`; do not assume handles and IDs are interchangeable.

## First request

The health endpoint is public:

```http
GET /api/health
```

For an authenticated integration, create an API token from account settings and send it as a bearer token. Before calling a campaign-scoped endpoint, use the campaign list to obtain the correct ID or handle and confirm that the token's owning user is a campaign member.

## Guides

| Topic | Guide |
|-------|-------|
| Authentication and tokens | [Authentication](authentication.md) |
| Authorization boundaries | [Access control](access-control.md) |
| Requests and errors | [Request conventions](request-conventions.md) |
| Campaign addressing | [Campaigns](campaigns.md) |
| Assets | [Assets](assets.md) |
| Plugin API boundaries | [Plugins](plugins.md) |

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
