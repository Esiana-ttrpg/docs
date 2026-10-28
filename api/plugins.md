# Plugins API

Esiana's core contract covers plugin management and discovery routes
implemented by core. Runtime routes registered by installed plugins are
extension-owned APIs.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

## Core surfaces

| Area | Path pattern | Auth |
|------|--------------|------|
| System plugin administration | `/api/admin/plugins/...` | Session-only system admin |
| Global plugin catalog/runtime descriptors | `/api/plugins/...` | Session or bearer with `plugins:read` / `plugins:manage` |
| Campaign plugin enablement and configuration | `/api/campaigns/{campaignId}/plugins/...` | Session or bearer; Gamemaster settings or membership |
| Identity-aware plugin runtime | `/api/plugin-runtime/:pluginId/...` | Host-attached identity; plugin-owned contract |
| Public plugin runtime | `/api/public/plugin-runtime/:pluginId/...` | Plugin-owned contract |
| Plugin-provided files | `/api/plugin-assets/{pluginId}/...` | Session plus plugin-access check |

System administrators install packages. Campaign-level privileged users can
enable and configure already-installed plugins for their campaign; campaign
authority does not grant system installation authority.

Global plugin API bearer calls enforce `plugins:read` or `plugins:manage` as
documented per operation. Those scopes do not bypass user, campaign, or
content authorization.

## System plugin administration

Session-only system administration (see [Administration](admin.md) for the
shared gate):

- `GET /api/admin/plugins` — installed plugins enriched with global and
  campaign capabilities, runtime status, quarantine, checksum, provenance, and
  host core version.
- `GET /api/admin/plugins/registry` — remote registry with local fallback
  (`{ registryUrl, plugins, remoteLoaded, warnings? }`).
- `POST /api/admin/plugins/install-from-registry` — installs a registry entry
  (`{ entry }`; `400` invalid; `201`).
- `POST /api/admin/plugins/install-from-link` — installs from a manifest URL
  (valid HTTPS GitHub/GitLab manifests, global scope only).
- `POST /api/admin/plugins/register-manifest` — registers a validated
  manifest (campaign scope creates a campaign definition, otherwise global;
  `201`).
- `POST /api/admin/plugins/{pluginId}/config` — applies `{ config, isEnabled?
  }` (engine mismatches return `409`; campaign scope ignores `isEnabled`).
- `POST /api/admin/plugins/reload-runtime` — reloads the plugin host.
- `GET /api/admin/plugins/{pluginId}/oauth-client` /
  `PUT /api/admin/plugins/{pluginId}/oauth-client` — reads the
  redacted OAuth client configuration (`{ clientId, hasClientSecret,
  updatedAt }`) or upserts it (`clientId` non-empty up to 512 characters;
  `clientSecret` optional).
- `GET /api/admin/plugins/{pluginId}/connection` — app-level redacted
  connection.
- `POST /api/admin/plugins/{pluginId}/connection/static` — connects an API
  key or bearer token (`{ credential, accountLabel? }`; `201`).
- `POST /api/admin/plugins/{pluginId}/connection/oauth/start` — starts an
  OAuth2 authorization-code + PKCE flow (returns `{ authorizationUrl }`;
  `404` for non-OAuth plugins, `409` without a client or with an undeclared
  origin).
- `DELETE /api/admin/plugins/{pluginId}/connection` — disconnects (attempting
  remote revocation; `404` when nothing is connected).

## Global plugin catalog

Session or bearer token; bearer calls need the listed scope:

- `GET /api/plugins` (`plugins:read`) — installed system plugins
  (`{ plugins, loaded }`).
- `GET /api/plugins/frontend-runtime` (`plugins:read`) — frontend runtime
  descriptors.
- `POST /api/plugins/sync` (`plugins:manage`) — synchronizes with installed
  sources (`{ synced }`).
- `POST /api/plugins/{name}/install` (`plugins:manage`) — installs by name
  (`404` unknown).
- `PATCH /api/plugins/{name}/enable` (`plugins:manage`) — toggles
  `{ enabled: boolean }` (`400` non-boolean, `404` unknown; clears quarantine
  and reloads the host).
- `DELETE /api/plugins/{name}` (`plugins:manage`) — uninstalls (`400` on
  uninstall errors).

## Campaign plugins

Addressed by campaign ID on the top-level router (session or bearer; ID
generally accepts either form):

- `GET /api/campaigns/{campaignId}/plugins` — available and active plugins
  with connection status. Requires Gamemaster settings authority.
- `POST /api/campaigns/{campaignId}/plugins/{pluginId}/enable` — enables
  (`201 { plugin }`; `400` enable failure, `404` unknown campaign).
- `POST /api/campaigns/{campaignId}/plugins/{pluginId}/config` — applies
  `{ isEnabled? }` while preserving stored configuration.
- `DELETE /api/campaigns/{campaignId}/plugins/{pluginId}` — disables
  (`{ ok }`; `404` unknown).
- `GET /api/campaigns/{campaignId}/plugins/frontend-runtime` — campaign
  frontend runtime descriptors. Member-only.
- `GET /api/campaigns/{campaignId}/plugins/search?q=&limit=` — searches
  plugin collections (`limit` capped at 50). Member-only.

## Connections and fixtures

- `GET /api/plugin-connections/oauth/callback` — completes a plugin OAuth
  connection: validates state hash and expiry (10 minutes), initiator
  identity, admin role, and authorization code, then redirects to a sanitized
  same-origin return path. Failures are plain-text (`400` invalid state, `409`
  provider unavailable or changed, `502` exchange failed).

Development-only fixtures (return `404` in production or when fixtures are
disabled) emulate an OAuth provider and protected resources for connection
development:

- `GET /api/plugin-connection-fixtures/oauth/authorize`
- `POST /api/plugin-connection-fixtures/oauth/token`
- `POST /api/plugin-connection-fixtures/oauth/revoke`
- `GET /api/plugin-connection-fixtures/oauth/library` (bearer-protected)
- `GET /api/plugin-connection-fixtures/api-key/library` (API-key-protected)

## Extension-owned routes

The core OpenAPI document does not enumerate dynamically registered
plugin-host operations because their paths, schemas, and authorization rules
belong to the installed extension and can change independently of core.
Consult that plugin's documentation and manifest.

The `/api/plugin-runtime` host attaches a valid session or bearer identity
when supplied, but the host does not globally reject anonymous requests. Each
plugin owns its route-level authentication and authorization contract and
remains subject to Esiana's permission boundaries. Public plugin routes are
mounted separately under `/api/public/plugin-runtime`.

The static `/api/plugin-assets/{pluginId}/...` host is a core route for
plugin-provided files and is included in the core OpenAPI contract (see
[Assets](assets.md)).

## Author documentation

- [Plugin development](../plugin-development/getting-started.md)
- [Plugin architecture](../architecture/plugin-architecture.md)

**Core endpoint reference:** open `/api/docs` on your running Esiana instance.
