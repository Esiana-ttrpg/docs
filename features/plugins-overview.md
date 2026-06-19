# Plugins Overview

Extend Esiana with runtime plugins at **instance** scope (system admin) or **campaign** scope (DM).

---

## What it does

- **Plugin registry** — sync official manifest from remote JSON (default: community-plugins repo)
- **Install & enable** — toggle plugins without redeploying core
- **Config templates** — manifest-driven settings fields (text, URL, password, checkbox, textarea)
- **Runtime routes** — `/api/plugin-runtime/{pluginId}/…`
- **Official catalog** — [`community-plugins`](../../community-plugins/) (`registry.json`)
- **Runtime packages** — installed under `PLUGINS_DIR` (default `esiana-core/plugins/`)
- **Official catalog** — [`community-plugins/registry.json`](../../community-plugins/registry.json) (3 installable plugins)
- **Examples & stubs** — `examples/` and `stubs/` in community-plugins (local dev via `plugins:link`, not in registry)
- **Reference plugins** — catalog: `demo-content-packs`, `remote-object-storage`, `wiki-opds-feed`; examples: `example-plugin`, `player-journal`, `settlement-life`; stub: `foundry-vtt-sync`
- **OIDC / SSO** — built into core (Admin → Identity Providers); not a community plugin — see [Federated identity](../options/federated-identity.md)
- **Storage registry** — pluggable storage drivers (`filesystem` default)
- **Domain events & interceptors** — plugin lifecycle hooks (see in-repo doc)

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **System admin** | Instance plugins, registry URL, reload runtime |
| **DM / Co-DM** | Campaign-scoped plugins (when allowed) |
| **Developer** | API tokens with `plugins:read` / `plugins:manage` scopes |

---

## Where to find it

| Area | Location |
|------|----------|
| Admin plugins | Admin → Plugins & Integrations |
| Campaign plugins | Campaign Settings → Integrations |
| Local runtime dir | `esiana-core/plugins/` (`PLUGINS_DIR`) — populated by registry install or `npm run plugins:link` |
| Plugin source repo | [`community-plugins`](../../community-plugins/) |

---

## Key options

| Option | Where |
|--------|-------|
| `registryUrl` | [System admin settings](../options/system-admin-settings.md) |
| `PLUGINS_DIR` | [Environment variables](../options/environment-variables.md) |
| `STORAGE_PROVIDER` | Env — active storage driver |
| Plugin interceptor limits | `PLUGIN_INTERCEPTOR_TIMEOUT_MS`, etc. |
| API token scopes | [User account settings](../options/user-account-settings.md) |

---

## Installing plugins

1. **Registry sync** — Admin or Campaign → Sync registry → Install (default URL: community-plugins `registry.json`)
2. **Local dev** — `npm run plugins:link` in esiana-core copies packages from community-plugins
3. **Configure** — fill manifest `configTemplate` fields in Admin or Campaign UI
4. **Enable** — toggle on; runtime hot-reloads

---

## Deep dives

| Topic | Document |
|-------|----------|
| Catalog & authoring | [`community-plugins/README.md`](../../community-plugins/README.md) |
| Runtime directory | [`esiana-core/plugins/README.md`](../esiana-core/plugins/README.md) |
| Plugin ecosystem architecture | [`esiana-core/docs/plugins/phase-10-ecosystem.md`](../esiana-core/docs/plugins/phase-10-ecosystem.md) |
| OPDS wiki feed study | [`esiana-core/docs/plugins/opds-wiki-feed-study.md`](../esiana-core/docs/plugins/opds-wiki-feed-study.md) |

---

## Related docs

- [System admin settings](../options/system-admin-settings.md)
- [Campaign settings](../options/campaign-settings.md) → Integrations tab
- [Environment variables](../options/environment-variables.md)
- [Deployment & Docker](../options/deployment-and-docker.md) — mount `PLUGINS_DIR` volume
