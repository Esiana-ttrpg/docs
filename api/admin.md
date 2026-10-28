# Administration API

System administration is application-wide and strictly separated from campaign
authority: every `/api/admin/...` route requires a session-authenticated
`SYSTEM_ADMIN` user (`401` without a session, `403` for non-admins). Bearer
API tokens are never accepted here, and campaign ownership or Gamemaster
status grants nothing.

## Users

- `GET /api/admin/users?page=&limit=` — user list newest-first with campaign
  counts and pagination (defaults 1/10, max 50).
- `PATCH /api/admin/users/{userId}/role` — sets `USER|SYSTEM_ADMIN` (`400`
  self-demotion or unknown role; `404` unknown user).
- `DELETE /api/admin/users/{userId}` — deletes the user together with related
  plugin connection state (`400` self-deletion).

## Campaigns

- `GET /api/admin/campaigns` — all campaigns for operational oversight.
- `GET /api/admin/campaigns/{campaignId}/backup` — campaign ZIP download
  (octet-stream). Campaign-scoped downloads live in
  [Import & export](import-export.md).
- `DELETE /api/admin/campaigns/{campaignId}` — removes a campaign.

## Settings and mail

- `GET /api/admin/settings` / `PATCH /api/admin/settings` — reads and updates
  system settings.
- `POST /api/admin/settings/smtp/test` — sends a test message through the
  configured SMTP relay.

## Tasks, analytics, and storage

- `GET /api/admin/tasks` and `GET /api/admin/tasks/history` — live and
  historical background tasks (backup exports/restores surface here; the
  async campaign backup returns a `taskId` for this queue — see
  [Import & export](import-export.md)).
- `POST /api/admin/tasks/{id}/dismiss` and `POST /api/admin/tasks/{id}/abort` —
  closes or cancels a task.
- `GET /api/admin/analytics/usage` and `GET /api/admin/analytics/top-usage` —
  usage aggregates.
- `GET /api/admin/storage/status`, `GET /api/admin/storage/metrics`, and
  `GET /api/admin/system/storage-stats` — storage health and accounting.
- `GET /api/admin/system/backup` — system-level backup.
- `GET /api/admin/system/logs` — system logs.
- `POST /api/admin/system/prune-media` — prunes unreferenced media.
- `GET /api/admin/system/check-version` — compares against the latest
  upstream release (never errors — unavailable or unparsable remotes yield a
  no-update payload).

## Sample data and identity providers

- `GET /api/admin/sample-data` — available sample-data definitions.
- `POST /api/admin/sample-data/generate-campaign` — generates a sample
  campaign.
- `GET /api/admin/identity-providers` — configured OIDC providers.
- `PUT /api/admin/identity-providers/{providerId}` — replaces a provider
  configuration.
- `DELETE /api/admin/identity-providers/{providerId}` — removes a provider.

Related: OIDC login flows in [Authentication](authentication.md); plugin
system administration in [Plugins](plugins.md).

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
