# Import and export API

Campaign backup ZIP, sovereign export, and external import pipelines.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Sovereign export

GM portable archive — Markdown pages + JSON sidecars including
`sovereign/knowledge.json`.

Guarantees: [Sovereign export](../architecture/sovereignty.md)

### `GET /api/campaigns/{campaignHandle}/backup`

Builds and downloads the live sovereign ZIP immediately (`application/zip`,
filename `esiana-campaign-<slug>-<stamp>.zip`). Requires Gamemaster settings
authority. `404` without a campaign, `500` on build failure.

### `POST /api/campaigns/{campaignHandle}/backup/async`

Queues the export as background work and returns `202 { taskId }`. Completion
stages a `campaign-export-zip` asset and notifies with an expiring download
link (`EXPORT_READY`/`EXPORT_FAILED`). Same authority as the sync download.

### `GET /api/campaigns/{campaignHandle}/backup/download/{assetId}`

Serves a staged export ZIP. `404` for unknown assets or missing files, `410`
for expired links. Same authority.

### `POST /api/campaigns/{campaignHandle}/backup/restore`

Restores a sovereign ZIP into the campaign (multipart `backupZipFile`).
Validates `manifest.json.format === CAMPAIGN_BACKUP_FORMAT` (`400` on missing
or invalid archives), stages a `campaign-backup-zip` asset, queues a restore
task, and returns `202 { taskId }`. Same authority.

### `GET /api/admin/campaigns/{campaignId}/backup`

Administrator variant of the campaign download (octet-stream ZIP,
session-only system administration). See [Administration](admin.md).

---

## Import pipelines

| Pipeline | Source |
|----------|--------|
| Sovereign restore | Esiana ZIP (above) |
| Obsidian vault | Markdown ZIP |
| Content pack | Plugin / sample seed |

`GET /api/import-providers` returns `{ core, plugins }` — core built-in
pipelines plus plugin-registered providers. Accepts a session or bearer token;
see `/api/docs` for the version-locked schema.

Campaign creation accepts wizard import files (`markdownZipFile`,
`backupZipFile`, `calendarConfigFile`) — see [Campaigns](campaigns.md).
Fantasy-calendar import preview/apply lives in
[Chronology](chronology.md).

---

## Content packs and sample data

- `GET /api/content-packs` — available content packs. Requires a session.
- `GET /api/sample-data/profiles` — sample-data profiles for seeding.
  Requires a session.

User guide: [Data backup & export](../features/data-backup-and-export.md) ·
[Import formats](../data-management/import-formats.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
