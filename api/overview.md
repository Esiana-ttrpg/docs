# API overview

Human guide to Esiana's REST API.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Base URL

| Environment | URL |
|-------------|-----|
| Local dev | `http://localhost:3001` |
| Docker Compose | `http://localhost:8080/api` (nginx proxy) or backend `:3001` direct |

---

## Authentication

Session cookie (`esiana_token`) for browser clients, or **Bearer API token** with explicit scopes for integrations.

See [Authentication](authentication.md).

---

## Campaign scope

Most lore routes live under:

```text
/api/campaigns/{campaignHandle}/...
```

`campaignHandle` is the campaign slug — not numeric id.

---

## Interactive reference

Open **`/api/docs`** on your running Esiana instance. The OpenAPI spec is version-locked to that release — not fetched from this wiki.

Product version comes from root `package.json` (currently Beta **v0.9.0**; **v1.0.0** locks the public API contract). Plugin manifests declare compatibility via `engines.esiana-core`.

Disabled in production unless `OPENAPI_DOCS_ENABLED=true`. See [Environment variables](../options/environment-variables.md) and [Self-hosting: Docker](../self-hosting/docker.md).

---

## Not in core (v1.0)

- **Unified search** — no `/search` REST endpoint; use wiki hubs, link-index, or plugin search
- **Webhooks** — outbound delivery queue deferred post-1.0

---

## Guides

| Topic | Doc |
|-------|-----|
| Auth | [Authentication](authentication.md) |
| Campaigns | [Campaigns](campaigns.md) |
| Wiki | [Wiki pages](wiki-pages.md) |
| Entities | [Entities](entities.md) |
| Maps | [Maps](maps.md) |
| Assets | [Assets](assets.md) |
| Backup / import | [Import & export](import-export.md) |
| Plugins | [Plugins](plugins.md) |

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
