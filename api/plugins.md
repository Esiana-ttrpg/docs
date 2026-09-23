# Plugins API

Esiana's core contract covers plugin management and discovery routes implemented by core. Runtime routes registered by installed plugins are extension-owned APIs.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

## Core surfaces

| Area | Path pattern |
|------|--------------|
| System plugin administration | `/api/admin/plugins/...` |
| Global plugin catalog/runtime descriptors | `/api/plugins/...` |
| Campaign plugin enablement and configuration | `/api/campaigns/{campaignId}/plugins/...` |
| Identity-aware plugin runtime | `/api/plugin-runtime/:pluginId/...` |
| Public plugin runtime | `/api/public/plugin-runtime/:pluginId/...` |

System administrators install packages. Campaign-level privileged users can enable and configure already-installed plugins for their campaign; campaign authority does not grant system installation authority.

Global plugin API bearer calls enforce `plugins:read` or `plugins:manage` as documented per operation. Those scopes do not bypass user, campaign, or content authorization.

## Extension-owned routes

The core OpenAPI document does not enumerate dynamically registered plugin-host operations because their paths, schemas, and authorization rules belong to the installed extension and can change independently of core. Consult that plugin's documentation and manifest.

The `/api/plugin-runtime` host attaches a valid session or bearer identity when supplied, but the host does not globally reject anonymous requests. Each plugin owns its route-level authentication and authorization contract and remains subject to Esiana's permission boundaries. Public plugin routes are mounted separately under `/api/public/plugin-runtime`.

The static `/api/plugin-assets/{pluginId}/...` host is a core route for plugin-provided files and is included in the core OpenAPI contract.

## Author documentation

- [Plugin development](../plugin-development/getting-started.md)
- [Plugin architecture](../architecture/plugin-architecture.md)

**Core endpoint reference:** open `/api/docs` on your running Esiana instance.
