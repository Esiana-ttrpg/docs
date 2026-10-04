# API route coverage audit

Working audit of human-readable documentation coverage for Esiana's API.
Source of the operation inventory: `esiana-core/backend/openapi/openapi.yaml`
(note: the task brief cited `esiana-core/backend/openapi.yaml`; the actual
contract lives at `esiana-core/backend/openapi/openapi.yaml` — see
discrepancy D1).

- Total operations in `openapi.yaml`: **454** (209 GET, 126 POST, 57 PATCH, 45 DELETE, 17 PUT)
- Documented operations: **454**
- Operations documented as part of grouped sections: **454** (grouped CRUD plus
  substantial standalone sections per guide; "documented" means meaningful
  human-readable documentation exists, not a generated list entry)
- Currently undocumented operations: **0**

## Coverage by guide

| Guide | Operations |
|-------|-----------|
| campaigns.md | 85 |
| wiki-pages.md | 75 |
| users-notifications.md | 44 |
| narrative-knowledge.md | 38 |
| downtime.md | 37 |
| maps.md | 32 |
| plugins.md | 31 |
| admin.md | 27 |
| chronology.md | 23 |
| world-state.md | 16 |
| journal.md | 14 |
| authentication.md | 9 |
| workshop.md | 8 |
| assets.md | 7 |
| import-export.md | 7 |
| overview.md (health) | 1 |

## Operation inventory (METHOD + PATH → guide)

| Operation | Documented in | Section | Status |
|-----------|---------------|---------|--------|
| `GET /api/health` | overview.md | First request | documented |
| `POST /api/auth/register` | authentication.md | Auth flows | documented |
| `POST /api/auth/login` | authentication.md | Auth flows | documented |
| `POST /api/auth/logout` | authentication.md | Auth flows | documented |
| `GET /api/auth/me` | authentication.md | Auth flows | documented |
| `GET /api/campaigns` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns` | campaigns.md | Campaigns | documented |
| `PATCH /api/campaigns/{campaignHandle}` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}` | campaigns.md | Campaigns | documented |
| `DELETE /api/campaigns/{campaignHandle}` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/wiki` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}` | wiki-pages.md | Wiki | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}` | wiki-pages.md | Wiki | documented |
| `DELETE /api/campaigns/{campaignHandle}/wiki/{pageId}` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/tree` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/link-index` | wiki-pages.md | Wiki | documented |
| `GET /api/admin/plugins/{pluginId}/connection` | plugins.md | System plugin administration | documented |
| `DELETE /api/admin/plugins/{pluginId}/connection` | plugins.md | System plugin administration | documented |
| `POST /api/admin/plugins/{pluginId}/connection/static` | plugins.md | System plugin administration | documented |
| `POST /api/admin/plugins/{pluginId}/connection/oauth/start` | plugins.md | System plugin administration | documented |
| `GET /api/campaigns/{campaignId}/source-providers` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignId}/sources/search` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignId}/sources/resolve` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignId}/sources/open-target` | campaigns.md | Campaigns | documented |
| `GET /api/assets/{assetId}` | assets.md | Reading assets | documented |
| `GET /api/campaigns/{campaignHandle}/backup` | import-export.md | Sovereign export | documented |
| `POST /api/campaigns/{campaignHandle}/backup/async` | import-export.md | Sovereign export | documented |
| `POST /api/campaigns/{campaignHandle}/backup/restore` | import-export.md | Sovereign export | documented |
| `GET /api/import-providers` | import-export.md | Import pipelines | documented |
| `GET /api/plugins` | plugins.md | Global plugin catalog | documented |
| `GET /api/admin/analytics/top-usage` | admin.md | Administration | documented |
| `GET /api/admin/analytics/usage` | admin.md | Administration | documented |
| `GET /api/admin/campaigns` | admin.md | Administration | documented |
| `DELETE /api/admin/campaigns/{campaignId}` | admin.md | Administration | documented |
| `GET /api/admin/campaigns/{campaignId}/backup` | admin.md | Administration | documented |
| `GET /api/admin/identity-providers` | admin.md | Administration | documented |
| `DELETE /api/admin/identity-providers/{providerId}` | admin.md | Administration | documented |
| `PUT /api/admin/identity-providers/{providerId}` | admin.md | Administration | documented |
| `GET /api/admin/plugins` | plugins.md | System plugin administration | documented |
| `POST /api/admin/plugins/{pluginId}/config` | plugins.md | System plugin administration | documented |
| `GET /api/admin/plugins/{pluginId}/oauth-client` | plugins.md | System plugin administration | documented |
| `PUT /api/admin/plugins/{pluginId}/oauth-client` | plugins.md | System plugin administration | documented |
| `GET /api/plugin-connections/oauth/callback` | plugins.md | Connections | documented |
| `GET /api/plugin-connection-fixtures/oauth/authorize` | plugins.md | Fixtures (dev-only) | documented |
| `POST /api/plugin-connection-fixtures/oauth/token` | plugins.md | Fixtures (dev-only) | documented |
| `POST /api/plugin-connection-fixtures/oauth/revoke` | plugins.md | Fixtures (dev-only) | documented |
| `GET /api/plugin-connection-fixtures/oauth/library` | plugins.md | Fixtures (dev-only) | documented |
| `GET /api/plugin-connection-fixtures/api-key/library` | plugins.md | Fixtures (dev-only) | documented |
| `POST /api/admin/plugins/install-from-link` | plugins.md | System plugin administration | documented |
| `POST /api/admin/plugins/install-from-registry` | plugins.md | System plugin administration | documented |
| `POST /api/admin/plugins/register-manifest` | plugins.md | System plugin administration | documented |
| `GET /api/admin/plugins/registry` | plugins.md | System plugin administration | documented |
| `POST /api/admin/plugins/reload-runtime` | plugins.md | System plugin administration | documented |
| `GET /api/admin/sample-data` | admin.md | Administration | documented |
| `POST /api/admin/sample-data/generate-campaign` | admin.md | Administration | documented |
| `GET /api/admin/settings` | admin.md | Administration | documented |
| `PATCH /api/admin/settings` | admin.md | Administration | documented |
| `POST /api/admin/settings/smtp/test` | admin.md | Administration | documented |
| `GET /api/admin/storage/metrics` | admin.md | Administration | documented |
| `GET /api/admin/storage/status` | admin.md | Administration | documented |
| `GET /api/admin/system/backup` | admin.md | Administration | documented |
| `GET /api/admin/system/check-version` | admin.md | Administration | documented |
| `GET /api/admin/system/logs` | admin.md | Administration | documented |
| `POST /api/admin/system/prune-media` | admin.md | Administration | documented |
| `GET /api/admin/system/storage-stats` | admin.md | Administration | documented |
| `GET /api/admin/tasks` | admin.md | Administration | documented |
| `POST /api/admin/tasks/{id}/abort` | admin.md | Administration | documented |
| `POST /api/admin/tasks/{id}/dismiss` | admin.md | Administration | documented |
| `GET /api/admin/tasks/history` | admin.md | Administration | documented |
| `GET /api/admin/users` | admin.md | Administration | documented |
| `DELETE /api/admin/users/{userId}` | admin.md | Administration | documented |
| `PATCH /api/admin/users/{userId}/role` | admin.md | Administration | documented |
| `POST /api/auth/forgot-password` | authentication.md | Auth flows | documented |
| `GET /api/auth/oidc/{providerId}/callback` | authentication.md | Auth flows | documented |
| `GET /api/auth/oidc/{providerId}/start` | authentication.md | Auth flows | documented |
| `GET /api/auth/providers` | authentication.md | Auth flows | documented |
| `POST /api/auth/reset-password` | authentication.md | Auth flows | documented |
| `GET /api/campaign-themes` | users-notifications.md | Catalogs | documented |
| `GET /api/campaigns/{campaignHandle}/activity` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/adventure/storyboard` | narrative-knowledge.md | Adventure storyboard | documented |
| `PATCH /api/campaigns/{campaignHandle}/adventure/storyboard` | narrative-knowledge.md | Adventure storyboard | documented |
| `POST /api/campaigns/{campaignHandle}/assets/import-url` | assets.md | Uploads | documented |
| `GET /api/campaigns/{campaignHandle}/authoring/growth-metrics` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/authoring/writing-session` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/backup/download/{assetId}` | import-export.md | Sovereign export | documented |
| `POST /api/campaigns/{campaignHandle}/calendar-events/{eventId}/apply-consequences` | chronology.md | Chronology | documented |
| `GET /api/campaigns/{campaignHandle}/calendar-events/{eventId}/consequences` | chronology.md | Chronology | documented |
| `PUT /api/campaigns/{campaignHandle}/calendar-events/{eventId}/consequences` | chronology.md | Chronology | documented |
| `GET /api/campaigns/{campaignHandle}/calendars` | chronology.md | Chronology | documented |
| `POST /api/campaigns/{campaignHandle}/calendars` | chronology.md | Chronology | documented |
| `DELETE /api/campaigns/{campaignHandle}/calendars/{calendarId}` | chronology.md | Chronology | documented |
| `PATCH /api/campaigns/{campaignHandle}/calendars/{calendarId}` | chronology.md | Chronology | documented |
| `GET /api/campaigns/{campaignHandle}/calendars/{calendarId}/events` | chronology.md | Chronology | documented |
| `POST /api/campaigns/{campaignHandle}/calendars/{calendarId}/events` | chronology.md | Chronology | documented |
| `DELETE /api/campaigns/{campaignHandle}/calendars/{calendarId}/events/{eventId}` | chronology.md | Chronology | documented |
| `PATCH /api/campaigns/{campaignHandle}/calendars/{calendarId}/events/{eventId}` | chronology.md | Chronology | documented |
| `GET /api/campaigns/{campaignHandle}/calendars/{calendarId}/fantasy-calendar-export` | chronology.md | Chronology | documented |
| `GET /api/campaigns/{campaignHandle}/capability-overrides` | campaigns.md | Campaigns | documented |
| `PUT /api/campaigns/{campaignHandle}/capability-overrides` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/capacity-hint` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/chronology/categories` | chronology.md | Chronology | documented |
| `POST /api/campaigns/{campaignHandle}/chronology/categories` | chronology.md | Chronology | documented |
| `DELETE /api/campaigns/{campaignHandle}/chronology/categories/{categoryId}` | chronology.md | Chronology | documented |
| `PATCH /api/campaigns/{campaignHandle}/chronology/categories/{categoryId}` | chronology.md | Chronology | documented |
| `POST /api/campaigns/{campaignHandle}/chronology/import-preview` | chronology.md | Chronology | documented |
| `GET /api/campaigns/{campaignHandle}/chronology/overlay` | chronology.md | Chronology | documented |
| `GET /api/campaigns/{campaignHandle}/chronology/timeline` | chronology.md | Chronology | documented |
| `GET /api/campaigns/{campaignHandle}/dashboard` | campaigns.md | Campaigns | documented |
| `PATCH /api/campaigns/{campaignHandle}/dashboard/layout` | campaigns.md | Campaigns | documented |
| `PUT /api/campaigns/{campaignHandle}/downtime/gap-overlays/{gapId}` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/havens` | downtime.md | Downtime | documented |
| `POST /api/campaigns/{campaignHandle}/downtime/havens` | downtime.md | Downtime | documented |
| `DELETE /api/campaigns/{campaignHandle}/downtime/havens/{id}` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/havens/{id}` | downtime.md | Downtime | documented |
| `PATCH /api/campaigns/{campaignHandle}/downtime/havens/{id}` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/havens/{id}/overview` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/havens/by-wiki/{wikiPageId}` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/ledger` | downtime.md | Downtime | documented |
| `PATCH /api/campaigns/{campaignHandle}/downtime/ledger` | downtime.md | Downtime | documented |
| `POST /api/campaigns/{campaignHandle}/downtime/ledger/entries` | downtime.md | Downtime | documented |
| `DELETE /api/campaigns/{campaignHandle}/downtime/ledger/entries/{id}` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/ledger/entries/{id}` | downtime.md | Downtime | documented |
| `PATCH /api/campaigns/{campaignHandle}/downtime/ledger/entries/{id}` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/ledger/suggestions` | downtime.md | Downtime | documented |
| `POST /api/campaigns/{campaignHandle}/downtime/ledger/suggestions/{id}/accept` | downtime.md | Downtime | documented |
| `POST /api/campaigns/{campaignHandle}/downtime/ledger/suggestions/{id}/dismiss` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/projects` | downtime.md | Downtime | documented |
| `POST /api/campaigns/{campaignHandle}/downtime/projects` | downtime.md | Downtime | documented |
| `DELETE /api/campaigns/{campaignHandle}/downtime/projects/{id}` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/projects/{id}` | downtime.md | Downtime | documented |
| `PATCH /api/campaigns/{campaignHandle}/downtime/projects/{id}` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/projects/{id}/overview` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/projects/by-wiki/{wikiPageId}` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/reputation/suggestions` | downtime.md | Downtime | documented |
| `POST /api/campaigns/{campaignHandle}/downtime/reputation/suggestions/{id}/accept` | downtime.md | Downtime | documented |
| `POST /api/campaigns/{campaignHandle}/downtime/reputation/suggestions/{id}/dismiss` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/scheduled-effects` | downtime.md | Downtime | documented |
| `POST /api/campaigns/{campaignHandle}/downtime/scheduled-effects` | downtime.md | Downtime | documented |
| `DELETE /api/campaigns/{campaignHandle}/downtime/scheduled-effects/{id}` | downtime.md | Downtime | documented |
| `PATCH /api/campaigns/{campaignHandle}/downtime/scheduled-effects/{id}` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/scheduled-effects/{id}/occurrences` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/downtime/world-events/suggestions` | downtime.md | Downtime | documented |
| `POST /api/campaigns/{campaignHandle}/downtime/world-events/suggestions/{id}/accept` | downtime.md | Downtime | documented |
| `POST /api/campaigns/{campaignHandle}/downtime/world-events/suggestions/{id}/dismiss` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/ensemble` | campaigns.md | Campaigns | documented |
| `PATCH /api/campaigns/{campaignHandle}/ensemble` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/entity-graph` | narrative-knowledge.md | Entity graph | documented |
| `GET /api/campaigns/{campaignHandle}/entity-graph/diagnostics` | narrative-knowledge.md | Entity graph | documented |
| `GET /api/campaigns/{campaignHandle}/entity-graph/projection` | narrative-knowledge.md | Entity graph | documented |
| `POST /api/campaigns/{campaignHandle}/entity-graph/rebuild` | narrative-knowledge.md | Entity graph | documented |
| `GET /api/campaigns/{campaignHandle}/events` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/files` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/invite` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/invite/rotate` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/invite/send` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/join-requests` | campaigns.md | Campaigns | documented |
| `PATCH /api/campaigns/{campaignHandle}/join-requests/{requestId}` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/journal/library` | journal.md | Journal | documented |
| `GET /api/campaigns/{campaignHandle}/journal/planner` | journal.md | Journal | documented |
| `POST /api/campaigns/{campaignHandle}/journal/publications` | journal.md | Journal | documented |
| `DELETE /api/campaigns/{campaignHandle}/journal/publications/{id}` | journal.md | Journal | documented |
| `GET /api/campaigns/{campaignHandle}/journal/publications/{id}` | journal.md | Journal | documented |
| `PATCH /api/campaigns/{campaignHandle}/journal/publications/{id}` | journal.md | Journal | documented |
| `POST /api/campaigns/{campaignHandle}/journal/publications/{id}/evaluate` | journal.md | Journal | documented |
| `POST /api/campaigns/{campaignHandle}/journal/publications/{id}/release` | journal.md | Journal | documented |
| `PUT /api/campaigns/{campaignHandle}/journal/publications/{id}/rule` | journal.md | Journal | documented |
| `GET /api/campaigns/{campaignHandle}/journal/series` | journal.md | Journal | documented |
| `POST /api/campaigns/{campaignHandle}/journal/series` | journal.md | Journal | documented |
| `DELETE /api/campaigns/{campaignHandle}/journal/series/{id}` | journal.md | Journal | documented |
| `PATCH /api/campaigns/{campaignHandle}/journal/series/{id}` | journal.md | Journal | documented |
| `POST /api/campaigns/{campaignHandle}/journal/series/{id}/generate-next` | journal.md | Journal | documented |
| `GET /api/campaigns/{campaignHandle}/locations/{pageId}/rumors` | narrative-knowledge.md | Rumors | documented |
| `GET /api/campaigns/{campaignHandle}/locations/{pageId}/since-last-visit` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/locations/{pageId}/visit-suggestions` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/locations/{pageId}/visit-suggestions/{suggestionId}/dismiss` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/locations/{pageId}/visit-suggestions/{suggestionId}/promote` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/locations/{pageId}/visits` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/locations/{pageId}/visits/latest` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/lore-claims/{claimId}/circulations` | narrative-knowledge.md | Lore claims | documented |
| `GET /api/campaigns/{campaignHandle}/maps` | maps.md | Maps | documented |
| `GET /api/campaigns/{campaignHandle}/maps/{assetId}` | maps.md | Maps | documented |
| `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}` | maps.md | Maps | documented |
| `GET /api/campaigns/{campaignHandle}/maps/{assetId}/groups` | maps.md | Maps | documented |
| `POST /api/campaigns/{campaignHandle}/maps/{assetId}/groups` | maps.md | Maps | documented |
| `DELETE /api/campaigns/{campaignHandle}/maps/{assetId}/groups/{groupId}` | maps.md | Maps | documented |
| `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/groups/{groupId}` | maps.md | Maps | documented |
| `GET /api/campaigns/{campaignHandle}/maps/{assetId}/layers` | maps.md | Maps | documented |
| `POST /api/campaigns/{campaignHandle}/maps/{assetId}/layers` | maps.md | Maps | documented |
| `DELETE /api/campaigns/{campaignHandle}/maps/{assetId}/layers/{layerId}` | maps.md | Maps | documented |
| `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/layers/{layerId}` | maps.md | Maps | documented |
| `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/link-page` | maps.md | Maps | documented |
| `POST /api/campaigns/{campaignHandle}/maps/{assetId}/objects` | maps.md | Maps | documented |
| `DELETE /api/campaigns/{campaignHandle}/maps/{assetId}/objects/{objectId}` | maps.md | Maps | documented |
| `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/objects/{objectId}` | maps.md | Maps | documented |
| `POST /api/campaigns/{campaignHandle}/maps/{assetId}/objects/{objectId}/confirm-flow` | maps.md | Maps | documented |
| `GET /api/campaigns/{campaignHandle}/maps/{assetId}/pins` | maps.md | Maps | documented |
| `POST /api/campaigns/{campaignHandle}/maps/{assetId}/pins` | maps.md | Maps | documented |
| `DELETE /api/campaigns/{campaignHandle}/maps/{assetId}/pins/{pinId}` | maps.md | Maps | documented |
| `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/pins/{pinId}` | maps.md | Maps | documented |
| `GET /api/campaigns/{campaignHandle}/maps/{assetId}/presentation-presets` | maps.md | Maps | documented |
| `POST /api/campaigns/{campaignHandle}/maps/{assetId}/presentation-presets` | maps.md | Maps | documented |
| `DELETE /api/campaigns/{campaignHandle}/maps/{assetId}/presentation-presets/{presetId}` | maps.md | Maps | documented |
| `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/presentation-presets/{presetId}` | maps.md | Maps | documented |
| `POST /api/campaigns/{campaignHandle}/maps/{assetId}/reveal` | maps.md | Maps | documented |
| `GET /api/campaigns/{campaignHandle}/maps/{assetId}/scene` | maps.md | Maps | documented |
| `GET /api/campaigns/{campaignHandle}/maps/objects/{objectId}/keyframes` | maps.md | Maps | documented |
| `POST /api/campaigns/{campaignHandle}/maps/objects/{objectId}/keyframes` | maps.md | Maps | documented |
| `DELETE /api/campaigns/{campaignHandle}/maps/objects/{objectId}/keyframes/{keyframeId}` | maps.md | Maps | documented |
| `GET /api/campaigns/{campaignHandle}/maps/pins/{pinId}/preview` | maps.md | Maps | documented |
| `GET /api/campaigns/{campaignHandle}/members` | campaigns.md | Campaigns | documented |
| `DELETE /api/campaigns/{campaignHandle}/members/{userId}` | campaigns.md | Campaigns | documented |
| `PATCH /api/campaigns/{campaignHandle}/members/{userId}` | campaigns.md | Campaigns | documented |
| `PATCH /api/campaigns/{campaignHandle}/members/{userId}/identity` | campaigns.md | Campaigns | documented |
| `DELETE /api/campaigns/{campaignHandle}/members/me` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/momentum` | world-state.md | World state | documented |
| `PUT /api/campaigns/{campaignHandle}/momentum` | world-state.md | World state | documented |
| `GET /api/campaigns/{campaignHandle}/narrative-branches/{subjectId}` | narrative-knowledge.md | Narrative branches | documented |
| `PATCH /api/campaigns/{campaignHandle}/narrative-branches/{subjectId}` | narrative-knowledge.md | Narrative branches | documented |
| `GET /api/campaigns/{campaignHandle}/narrative-lifecycle` | narrative-knowledge.md | Narrative lifecycle | documented |
| `PATCH /api/campaigns/{campaignHandle}/narrative-lifecycle/{subjectKind}/{subjectId}` | narrative-knowledge.md | Narrative lifecycle | documented |
| `POST /api/campaigns/{campaignHandle}/narrative-lifecycle/rebuild` | narrative-knowledge.md | Narrative lifecycle | documented |
| `POST /api/campaigns/{campaignHandle}/narrative-publish/quest/{pageId}` | narrative-knowledge.md | Quest publishing | documented |
| `GET /api/campaigns/{campaignHandle}/narrative-publish/quest/{pageId}/preview` | narrative-knowledge.md | Quest publishing | documented |
| `GET /api/campaigns/{campaignHandle}/narrative-snapshots` | narrative-knowledge.md | Narrative snapshots | documented |
| `POST /api/campaigns/{campaignHandle}/narrative-snapshots` | narrative-knowledge.md | Narrative snapshots | documented |
| `GET /api/campaigns/{campaignHandle}/narrative-snapshots/{snapshotId}` | narrative-knowledge.md | Narrative snapshots | documented |
| `GET /api/campaigns/{campaignHandle}/narrative-snapshots/compare` | narrative-knowledge.md | Narrative snapshots | documented |
| `GET /api/campaigns/{campaignHandle}/narrative/creative-drift` | narrative-knowledge.md | Creative drift | documented |
| `PATCH /api/campaigns/{campaignHandle}/narrative/creative-drift/dispositions` | narrative-knowledge.md | Creative drift | documented |
| `POST /api/campaigns/{campaignHandle}/notebooks` | campaigns.md | Campaigns | documented |
| `DELETE /api/campaigns/{campaignHandle}/notebooks/{notebookId}` | campaigns.md | Campaigns | documented |
| `PUT /api/campaigns/{campaignHandle}/notebooks/{notebookId}` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/pacing/simulation-runs` | world-state.md | World state | documented |
| `POST /api/campaigns/{campaignHandle}/presence/reveal` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/presence/reveal/preview` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/quests/{pageId}/time-pressure/resolve` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/quests/{pageId}/time-pressure/touch` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/rumors/retract` | narrative-knowledge.md | Rumors | documented |
| `POST /api/campaigns/{campaignHandle}/rumors/spread` | narrative-knowledge.md | Rumors | documented |
| `GET /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/attendance` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/attendance/me` | campaigns.md | Campaigns | documented |
| `PATCH /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/attendance/me` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/notes/me` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/schedule` | campaigns.md | Campaigns | documented |
| `PATCH /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/schedule` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/schedule/publish` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/session-timeline/new` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/session-timeline/next-published` | campaigns.md | Campaigns | documented |
| `PATCH /api/campaigns/{campaignHandle}/settings/sidebar` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/settings/sidebar/{sectionId}/icon` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/status` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/time-tracking` | chronology.md | Chronology | documented |
| `PATCH /api/campaigns/{campaignHandle}/time-tracking/advance` | chronology.md | Chronology | documented |
| `POST /api/campaigns/{campaignHandle}/time-tracking/import-json` | chronology.md | Chronology | documented |
| `POST /api/campaigns/{campaignHandle}/transfer-gamemaster` | campaigns.md | Campaigns | documented |
| `DELETE /api/campaigns/{campaignHandle}/transfer-ownership` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/transfer-ownership/accept` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/transfer-ownership/decline` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/transfer-ownership/initiate` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/transfer-ownership/status` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/uploads` | assets.md | Uploads | documented |
| `POST /api/campaigns/{campaignHandle}/uploads` | assets.md | Uploads | documented |
| `DELETE /api/campaigns/{campaignHandle}/uploads/{assetId}` | assets.md | Uploads | documented |
| `GET /api/campaigns/{campaignHandle}/visual-atlas` | campaigns.md | Campaigns | documented |
| `DELETE /api/campaigns/{campaignHandle}/wiki-pages/{pageId}` | wiki-pages.md | Wiki | documented |
| `PUT /api/campaigns/{campaignHandle}/wiki-pages/{pageId}` | wiki-pages.md | Wiki | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki-pages/assign-notebook` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki-pages/bulk-delete` | wiki-pages.md | Wiki | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki-pages/bulk-move` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki-pages/upload` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/aliases` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/aliases` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/backlinks` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/continuity` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/delete-preview` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/gossip` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/historical-aliases` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/historical-aliases` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretation-accounts` | narrative-knowledge.md | Interpretations | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretation-groups` | narrative-knowledge.md | Interpretations | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretations` | narrative-knowledge.md | Interpretations | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretive-summary` | narrative-knowledge.md | Interpretations | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/layout` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/link-integrity` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/lore-claims` | narrative-knowledge.md | Lore claims | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/lore-claims` | narrative-knowledge.md | Lore claims | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/map-asset` | maps.md | Map bindings | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/map-object-impact` | maps.md | Map bindings | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/mention-snippet` | wiki-pages.md | Wiki | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/metadata` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/narrative-status` | narrative-knowledge.md | Narrative status | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/narrative-status` | narrative-knowledge.md | Narrative status | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/outlinks` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/party-knowledge` | wiki-pages.md | Wiki | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/pin` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/preview` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/transform` | wiki-pages.md | Wiki | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/visibility` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/adventure-hub` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/adventure-hub/{pageId}` | wiki-pages.md | Wiki | documented |
| `DELETE /api/campaigns/{campaignHandle}/wiki/aliases/{aliasId}` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/character-hub/{pageId}` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/continuity-summary` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/downtime-hub` | downtime.md | Downtime | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/downtime-hub/{pageId}` | downtime.md | Downtime | documented |
| `DELETE /api/campaigns/{campaignHandle}/wiki/historical-aliases/{aliasId}` | wiki-pages.md | Wiki | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/historical-aliases/{aliasId}` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/import-markdown-preview` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/index/{pageId}` | wiki-pages.md | Wiki | documented |
| `DELETE /api/campaigns/{campaignHandle}/wiki/interpretation-accounts/{accountId}` | narrative-knowledge.md | Interpretations | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/interpretation-accounts/{accountId}` | narrative-knowledge.md | Interpretations | documented |
| `DELETE /api/campaigns/{campaignHandle}/wiki/interpretation-groups/{groupId}` | narrative-knowledge.md | Interpretations | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/interpretation-groups/{groupId}` | narrative-knowledge.md | Interpretations | documented |
| `DELETE /api/campaigns/{campaignHandle}/wiki/lore-claims/{claimId}` | narrative-knowledge.md | Lore claims | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/lore-claims/{claimId}` | narrative-knowledge.md | Lore claims | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/mention-targets` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/narrative-status` | narrative-knowledge.md | Narrative status | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/pins` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/quests-hub` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/quests-hub/{pageId}` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/session-notes/{pageId}/perspectives` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/session-notes/combined` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/session-notes/compile` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/session-notes/index` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/session-notes/player/{playerId}` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/tags` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/tags-hub` | wiki-pages.md | Wiki | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/tags/{tagId}` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/tags/{tagId}/icon` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/threads-hub` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/threads-hub/{pageId}` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/unresolved-wikilinks` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/unresolved-wikilinks/{id}/ignore` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/unresolved-wikilinks/merge` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/world-activity` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/writing-pulse` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/workshop/drafts` | workshop.md | Workshop | documented |
| `POST /api/campaigns/{campaignHandle}/workshop/drafts` | workshop.md | Workshop | documented |
| `GET /api/campaigns/{campaignHandle}/workshop/drafts/{draftId}` | workshop.md | Workshop | documented |
| `PATCH /api/campaigns/{campaignHandle}/workshop/drafts/{draftId}` | workshop.md | Workshop | documented |
| `POST /api/campaigns/{campaignHandle}/workshop/drafts/{draftId}/apply` | workshop.md | Workshop | documented |
| `POST /api/campaigns/{campaignHandle}/workshop/drafts/{draftId}/formalize` | workshop.md | Workshop | documented |
| `GET /api/campaigns/{campaignHandle}/workshop/drafts/{draftId}/writing-context` | workshop.md | Workshop | documented |
| `POST /api/campaigns/{campaignHandle}/workshop/drafts/bootstrap` | workshop.md | Workshop | documented |
| `GET /api/campaigns/{campaignHandle}/workspace/{workspaceSegment}/{pathKey}` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/world-development/history` | world-state.md | World state | documented |
| `GET /api/campaigns/{campaignHandle}/world-development/pending` | world-state.md | World state | documented |
| `GET /api/campaigns/{campaignHandle}/world-development/settings` | world-state.md | World state | documented |
| `PUT /api/campaigns/{campaignHandle}/world-development/settings` | world-state.md | World state | documented |
| `POST /api/campaigns/{campaignHandle}/world-development/suggest` | world-state.md | World state | documented |
| `POST /api/campaigns/{campaignHandle}/world-development/suggestions/{id}/requeue` | world-state.md | World state | documented |
| `POST /api/campaigns/{campaignHandle}/world-development/suggestions/{id}/resolve` | world-state.md | World state | documented |
| `GET /api/campaigns/{campaignHandle}/world-pressure` | world-state.md | World state | documented |
| `GET /api/campaigns/{campaignHandle}/world-pressure/preview` | world-state.md | World state | documented |
| `POST /api/campaigns/{campaignHandle}/world-state/apply` | world-state.md | World state | documented |
| `GET /api/campaigns/{campaignHandle}/world-state/batches` | world-state.md | World state | documented |
| `GET /api/campaigns/{campaignHandle}/world-state/batches/{eventId}` | world-state.md | World state | documented |
| `POST /api/campaigns/{campaignHandle}/world-state/preview` | world-state.md | World state | documented |
| `GET /api/campaigns/{campaignHandle}/world-stats` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignId}/apply` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignId}/plugins` | plugins.md | Campaign plugins | documented |
| `DELETE /api/campaigns/{campaignId}/plugins/{pluginId}` | plugins.md | Campaign plugins | documented |
| `POST /api/campaigns/{campaignId}/plugins/{pluginId}/config` | plugins.md | Campaign plugins | documented |
| `POST /api/campaigns/{campaignId}/plugins/{pluginId}/enable` | plugins.md | Campaign plugins | documented |
| `GET /api/campaigns/{campaignId}/plugins/frontend-runtime` | plugins.md | Campaign plugins | documented |
| `GET /api/campaigns/{campaignId}/plugins/search` | plugins.md | Campaign plugins | documented |
| `PUT /api/campaigns/{campaignId}/requests/{requestId}` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{id}/duplicate` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/fantasy-calendar/import-preview` | chronology.md | Time tracking / interop | documented |
| `GET /api/campaigns/public` | campaigns.md | Campaigns | documented |
| `GET /api/content-packs` | import-export.md | Content packs | documented |
| `GET /api/game-systems` | users-notifications.md | Catalogs | documented |
| `GET /api/plugin-assets/{pluginId}/{assetPath}` | assets.md | Plugin assets | documented |
| `DELETE /api/plugins/{name}` | plugins.md | Global plugin catalog | documented |
| `PATCH /api/plugins/{name}/enable` | plugins.md | Global plugin catalog | documented |
| `POST /api/plugins/{name}/install` | plugins.md | Global plugin catalog | documented |
| `GET /api/plugins/frontend-runtime` | plugins.md | Global plugin catalog | documented |
| `POST /api/plugins/sync` | plugins.md | Global plugin catalog | documented |
| `GET /api/public-directory` | users-notifications.md | Recruitment | documented |
| `GET /api/public/system/status` | users-notifications.md | Catalogs | documented |
| `GET /api/recruitment/all` | users-notifications.md | Recruitment | documented |
| `GET /api/recruitment/featured` | users-notifications.md | Recruitment | documented |
| `GET /api/recruitment/lobby/{handle}` | users-notifications.md | Recruitment | documented |
| `GET /api/sample-data/profiles` | import-export.md | Content packs | documented |
| `DELETE /api/user/account` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/activity` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/campaign-defaults` | users-notifications.md | Account/notifications | documented |
| `PATCH /api/user/campaign-defaults` | users-notifications.md | Account/notifications | documented |
| `PATCH /api/user/campaign-pins/reorder` | users-notifications.md | Account/notifications | documented |
| `DELETE /api/user/campaigns/{campaignId}/pin` | users-notifications.md | Account/notifications | documented |
| `PUT /api/user/campaigns/{campaignId}/pin` | users-notifications.md | Account/notifications | documented |
| `POST /api/user/change-password` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/creator-attribution` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/developer/quota` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/hub` | users-notifications.md | Account/notifications | documented |
| `POST /api/user/hub/attention/dismiss` | users-notifications.md | Account/notifications | documented |
| `DELETE /api/user/hub/attention/dismiss/{dismissKey}` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/linked-accounts` | users-notifications.md | Account/notifications | documented |
| `DELETE /api/user/linked-accounts/{providerId}` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/notification-capabilities` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/notification-preferences` | users-notifications.md | Account/notifications | documented |
| `PATCH /api/user/notification-preferences` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/notifications` | users-notifications.md | Account/notifications | documented |
| `DELETE /api/user/notifications/{id}` | users-notifications.md | Account/notifications | documented |
| `PATCH /api/user/notifications/{id}/read` | users-notifications.md | Account/notifications | documented |
| `POST /api/user/notifications/read-all` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/notifications/unread-count` | users-notifications.md | Account/notifications | documented |
| `DELETE /api/user/password` | users-notifications.md | Account/notifications | documented |
| `POST /api/user/password` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/profile` | users-notifications.md | Account/notifications | documented |
| `PUT /api/user/profile` | users-notifications.md | Account/notifications | documented |
| `POST /api/user/profile/avatar` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/template-resources/{kind}` | users-notifications.md | Account/notifications | documented |
| `PUT /api/user/template-resources/{kind}` | users-notifications.md | Account/notifications | documented |
| `GET /api/user/tokens` | users-notifications.md | Account/notifications | documented |
| `POST /api/user/tokens` | users-notifications.md | Account/notifications | documented |
| `DELETE /api/user/tokens/{tokenId}` | users-notifications.md | Account/notifications | documented |
| `GET /api/users/{id}/activity` | users-notifications.md | Public profiles | documented |
| `GET /api/users/{id}/avatar` | users-notifications.md | Public profiles | documented |
| `GET /api/users/{id}/creator-attribution` | users-notifications.md | Public profiles | documented |
| `GET /api/users/{id}/public-profile` | users-notifications.md | Public profiles | documented |
| `GET /uploads/{filename}` | assets.md | Reading assets | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/character-fields` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/character-fields` | wiki-pages.md | Wiki | documented |
| `DELETE /api/campaigns/{campaignHandle}/wiki/{pageId}/character-fields/{fieldId}` | wiki-pages.md | Wiki | documented |
| `PUT /api/campaigns/{campaignHandle}/wiki/{pageId}/character-fields/{fieldId}` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages` | wiki-pages.md | Wiki | documented |
| `DELETE /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}` | wiki-pages.md | Wiki | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}` | wiki-pages.md | Wiki | documented |
| `PUT /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}/blocks` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}/duplicate` | wiki-pages.md | Wiki | documented |
| `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}/plugin-data` | wiki-pages.md | Wiki | documented |
| `PUT /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}/plugin-data` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}/remove-plugin` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/materialize` | wiki-pages.md | Wiki | documented |
| `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/order` | wiki-pages.md | Wiki | documented |
| `POST /api/campaigns/{campaignHandle}/webhook-deliveries/{deliveryId}/redeliver` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/webhooks` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/webhooks` | campaigns.md | Campaigns | documented |
| `DELETE /api/campaigns/{campaignHandle}/webhooks/{webhookId}` | campaigns.md | Campaigns | documented |
| `PATCH /api/campaigns/{campaignHandle}/webhooks/{webhookId}` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/webhooks/{webhookId}/deliveries` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/webhooks/{webhookId}/rotate-secret` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/webhooks/{webhookId}/test` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/webhooks/catalog` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/discord` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/discord` | campaigns.md | Campaigns | documented |
| `DELETE /api/campaigns/{campaignHandle}/discord/{destinationId}` | campaigns.md | Campaigns | documented |
| `PATCH /api/campaigns/{campaignHandle}/discord/{destinationId}` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/discord/{destinationId}/deliveries` | campaigns.md | Campaigns | documented |
| `POST /api/campaigns/{campaignHandle}/discord/{destinationId}/test` | campaigns.md | Campaigns | documented |
| `GET /api/campaigns/{campaignHandle}/discord/catalog` | campaigns.md | Campaigns | documented |

## OpenAPI / implementation discrepancies (for human review)

- **D1 — Spec location.** Brief cited `esiana-core/backend/openapi.yaml`;
  actual file is `esiana-core/backend/openapi/openapi.yaml`.
- **D2 — Generic schemas.** Most operations declare generic `ApiRequest` /
  `ApiResponse`; query params, body fields, and response envelopes
  documented in these guides were verified in controllers, not the spec.
- **D3 — Status codes.** Implementation returns 201 (creates), 202 (queued
  work), 204 (empty deletes), 409 (conflicts), 410 (expired), 422
  (semantic failures); the spec generally lists 200 + 400/401/403/404/429/500.
- **D4 — Wiki delete.** `DELETE /wiki/{pageId}` and
  `DELETE /wiki-pages/{pageId}` return `200 { ok, mode, deletedPageIds }`;
  the spec documents `204`. Delete-gated child deletes (layers, groups,
  objects, keyframes, presets, pins, character tabs/fields) return 204 while
  the spec says 200.
- **D5 — Plugin assets auth.** The spec note implies open access for
  `GET /api/plugin-assets/{pluginId}/{assetPath}`; the implementation
  requires session authentication plus a plugin-access check (403/404).
- **D6 — Auth extension understates.** `GET /api/auth/me` (and some
  session-only user/admin ops) carry `x-esiana-authorization requires: []`
  despite requiring `cookieAuth`.
- **D7 — Stale 400.** `GET /activity` lists 400 in the spec; no 400 path
  was found in the controller.
- **D8 — Suggestion conflicts.** Re-resolving a ledger suggestion returns
  400, while reputation/world-event queues return 409 for the same situation.
  Real behavioral inconsistency, not just docs.
- **D9 — Gated consequence read.** All three event-consequence routes
  (including GET) require chronology management; players have no consequence
  read path. Confirm intent.
- **D10 — Open preview, gated apply.** `POST /chronology/import-preview`
  is member-open while `POST /time-tracking/import-json` is
  manager-only (assumed intentional; confirm).
- **D11 — Snapshot get restriction.** The snapshot collection lists visit
  snapshots, but `GET /narrative-snapshots/{snapshotId}` resolves only
  `MILESTONE` rows (visits 404). Undocumented and surprising.
- **D12 — Silent coercion.** Rumor stance/scope/visibility, entity-graph
  kinds/checks, and summary view-dates coerce or drop invalid values instead
  of returning 400.
- **D13 — Recruitment counts.** `GET /recruitment/all` totals may overcount
  when no genre filter is applied (full campaigns filtered post-map).
- **D14 — Role example.** Spec examples show `GAMEMASTER` as a user role;
  code roles are `USER`/`SYSTEM_ADMIN` (GAMEMASTER is a campaign role).
- **D15 — Timeline window.** Timeline `from`/`to` appear echoed in
  metadata; server-side date filtering was not verified in the handler.
- **D16 — Files accounting.** `GET /files` measures only the local uploads
  directory; S3-backed installations report 0.
- **D17 — ID-or-handle.** Campaign-ID routes accept either form; the spec
  shows one shape. One compatibility apply route is mounted with both
  `:id` and `:campaignId`.
- **D18 — Unverified spec twin.** The owner-level
  `PUT /:campaignId/requests/:requestId` route's spec entry was not
  verified against the scoped PATCH twin.
- **D19 — Stripped variants.** By-wiki haven/project variants omit blocks
  (and wiki metadata); the spec gives no hint.
- **D20 — Stripped journal bodies.** Scheduled-issue bodies are nulled for
  callers without planner access; planner-vs-owner series visibility and the
  owner-force delete rule have no spec analogue.
- **D21 — Legacy tokens.** Empty-scope tokens act as full-scope (sunset
  planned v1.2 per code comment).
- **D22 — Gap-overlay caps.** 6-item display caps exist; write-time
  enforcement was not verified.
- **D23 — Discovery vocabulary.** Guides and code confirm `Public | Party |
  DM_Only` storage plus presence/discovery projections; no `HIDDEN` enum
  value was found in code despite display-tier helpers.

## Unclear behavior requiring human review

U1. Default role-to-capability grants (which roles hold quest.edit,
notes.moderate, discovery.reveal, page.edit_any by default).
U2. Exact DM/Co-DM mapping for notebook authority and elevated-wiki-role
mapping.
U3. Webhook/Discord catalog event names; announcementOptions shape.
U4. Ensemble/dashboard/widget identifiers and metric IDs.
U5. Limiter windows/quotas (auth, apply, invites, tokens, drafts, URL import).
U6. Ownership-transfer expiry duration.
U7. Full create-campaign body schema and clone copy-option keys.
U8. Delete cascade semantics (wiki subtrees, havens, projects, ledger rows,
relations, assets).
U9. World-event dismiss permission path and accept title validation.
U10. Batch narrative-status behavior for missing IDs; branch GET on unknown
subjects; circulations empty-vs-404 for unknown claims.
U11. Lore service field-level validation; rumor spread/retract fan-out
(events, notifications, webhooks); quest-publish hub sync; lifecycle/branch
consequence payloads; snapshot compression and retention.
U12. Projection-window defaults and viewer-context rules beyond
LOCKED/SECRET masking.
U13. Tag color format; confirm-phrase locale/case behavior beyond trim
equality; temporal-envelope contract; default page-ownership matrix; tag-icon
SVG constraints.
U14. Calendar metadata/moon-override/recurrence-rule shapes;
limitRepetitions upper bound; Fantasy-Calendar import error mapping.
U15. Password-reset token TTL enforcement location; system-log retention.

## Documentation TODOs

- [ ] Verify the spec entry for `PUT /:campaignId/requests/:requestId`
  against the scoped join-request PATCH.
- [ ] Confirm intended readership for event consequences (D9) with the
  backend owner.
- [ ] Confirm ledger-400 vs reputation/world-409 intent (D8).
- [ ] Reconcile the plugin-assets auth note in the spec (D5).
- [ ] Re-check role→capability defaults (U1) against
  `shared/campaignPolicy/` when documenting permission tables further.
- [ ] Re-run this audit when `openapi.yaml` changes: rebuild the
  operation list and diff against the inventory table below.
