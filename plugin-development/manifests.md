# Plugin manifests

`manifest.json` declares identity, capabilities, and entry points for a plugin package.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Core fields

| Field | Purpose |
|-------|---------|
| `id` | Stable plugin identifier (slug) |
| `name` | Display name |
| `version` | Semver for your package |
| `capabilities` / `permissions` | Granted powers — see [Capabilities](capabilities.md) |
| `engines` | e.g. `{ "esiana-core": "^0.9.0" }` — semver gate at sync/enable; mismatch auto-disables. Target `^1.0.0` after core tags v1.0.0. |
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
