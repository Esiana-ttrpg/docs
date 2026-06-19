# Plugin manifests

`manifest.json` declares identity, capabilities, and entry points for a plugin package.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Core fields

| Field | Purpose |
|-------|---------|
| `id` | Stable plugin identifier (slug) |
| `name` | Display name |
| `version` | Artifact semver for your package (display only in admin UI) |
| `capabilities` / `permissions` | Granted powers — see [Capabilities](capabilities.md) |
| `engines` | Hard runtime constraint, e.g. `{ "esiana-core": "^1.0.0" }` — enforced only when enabling/loading; not shown in registry browse UI |
| `compatibility` | Optional history metadata: `{ "lastVerified": "2025-06-01T00:00:00.000Z", "lastVerifiedCore": "1.0.0" }` — informational trust signal; never enforced |
| `lastUpdated` | Optional ISO date when the artifact last changed |
| `tags` | Optional discovery tags (max 5) for registry search |
| `backend.entry` | Node module for hooks |
| `frontend.entry` | Vite bundle entry (optional) |
| `events` | Domain event subscriptions |
| `configSchema` | Campaign settings UI schema (optional) |

---

## Install authority

Only **system administrators** install plugin packages on the server. Campaign admins **enable and configure** already-installed plugins — they cannot fetch new code.

---

## Full reference

[`community-plugins/README.md`](../../community-plugins/README.md) — manifest schema and registry layout.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
