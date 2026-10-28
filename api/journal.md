# Journal API

The journal publishes in-world writing: series define recurring publications,
drafts become scheduled issues through release rules, evaluation previews
readiness without mutating, and release moves an issue into the library.

```text
POST /journal/series (optional nextIssueRule)
    ↓
POST /journal/series/{id}/generate-next → draft publication (seriesId, issueNumber)
    ↓
edit → PUT /journal/publications/{id}/rule → POST /journal/publications/{id}/evaluate → POST /journal/publications/{id}/release
    ↓
GET /journal/library?section=released; GET /journal/planner shows the queue + recentReleases
```

Publication types: `newsletter|letter|notice|dispatch|obituary|rumor_sheet|
journal_entry|proclamation` (default `notice`); statuses
`draft|scheduled|released|archived`. Content readiness is `ready` only with a
non-blank title plus Markdown or blocks. Release rules are AND/ANY trees over
chronology (session counts, in-world dates, event states, elapsed time),
narrative (character/quest states), discovery (page revealed, visibility
floors), downtime (project/haven states, progress), reputation, real-world
dates, and manual gates.

Creating, updating, and deleting publications requires page-creation
authority; the planner, rules, evaluation, and release require the journal
planner capability. Series creation needs page creation, while series
mutation and issue generation need planner access.

## Library and planner

### `GET /api/campaigns/{campaignHandle}/journal/library`

Lightweight published/upcoming rows (`{ items, nextCursor }`, no bodies or
diagnostics). Query: `section=released|upcoming|all` (default `released`),
`type`, `seriesId`, `linkedPageId`, `q` (title contains), `tag` (post-filter,
disables the cursor), `sort=newest|oldest|type` (upcoming forces updated-at
order), `limit` clamped 1–100 (default 30), cursor-based paging.
Member-only.

### `GET /api/campaigns/{campaignHandle}/journal/planner`

The working queue: draft/scheduled rows newest-first with per-row
`perceivedState` (`needs_plan|pending|blocked`), content readiness, rule
presence, and unmet counts, plus all series and the last three releases.
Same cursor/limit conventions. Requires planner access.

## Publications

### `POST /api/campaigns/{campaignHandle}/journal/publications`

Creates a draft (`title` may start empty; unknown types/source kinds fall back
to `notice`/`quick_draft`; `seriesId`/`linkedPageId`/`workshopDraftId`,
Markdown or blocks, trimmed `tags`, blank-to-null `summary`). Attaching a
series requires the series to exist **and** either planner authority or
authorship of that series (`400` otherwise). Always starts as `draft`;
`releaseNow: true` releases immediately when content is ready (unknown series
maps to `404`, not-ready content to `422`, other release failures to `409`).
Returns `201 { publication }`.

### `GET /api/campaigns/{campaignHandle}/journal/publications/{id}`

Full detail: the issue plus a fresh release evaluation and linked-page
resolution. When the issue is `scheduled`, callers without planner access get
null bodies. Member-only; `404` for cross-campaign IDs.

### `PATCH /api/campaigns/{campaignHandle}/journal/publications/{id}`

Partial update (unknown type/source values ignored; series revalidated;
`issueNumber` floored to at least 1; present-but-non-array `tags` become
`[]`). Status moves allow only `archived|draft` — released issues cannot
return to the planner here (`409`), and `scheduled` is set exclusively through
the rule endpoint.

### `DELETE /api/campaigns/{campaignHandle}/journal/publications/{id}`

Drafts and scheduled issues hard-delete (`204`). Released or archived issues
require `{ force: true }` **and** campaign ownership (`204`); otherwise `409`
advising archival instead of deletion. `404` unknown.

### `PUT /api/campaigns/{campaignHandle}/journal/publications/{id}/rule`

Attaches or clears the release rule: a valid rule node schedules the issue,
null clears it back to draft. Released issues cannot be rescheduled (`409`).
Requires planner access.

### `POST /api/campaigns/{campaignHandle}/journal/publications/{id}/evaluate`

Evaluates readiness without changing status and returns
`{ planState, perceivedState, contentReadiness, releasable, diagnostics[] }`.
Requires planner access.

### `POST /api/campaigns/{campaignHandle}/journal/publications/{id}/release`

Releases (`override: true` records an override trigger; otherwise manual).
Content must be ready even for overrides. Maps not-found to `404`, not-ready
to `422`, already-released to `409`. Requires planner access plus an
authenticated user, and returns the full issue. Releasable issues can also
release automatically in the background.

## Series

### `GET /api/campaigns/{campaignHandle}/journal/series`

Lists series. Planners see all series; other callers see only series they
created. Requires page-creation authority.

### `POST /api/campaigns/{campaignHandle}/journal/series`

Creates a series (`name` required, else `400`; `defaultType` falls back to
`notice`, `seriesMode` to `live`). Only planners may set `nextIssueRule`,
`linkedPageId`, `templateWorkshopDraftId`, or `namingScheme` — other callers
have those fields silently nulled. Records the caller as author. Returns
`201 { series }`.

### `PATCH /api/campaigns/{campaignHandle}/journal/series/{id}`

Partial update (clearing `nextIssueRule` with null). Requires planner access.
`404` unknown.

### `DELETE /api/campaigns/{campaignHandle}/journal/series/{id}`

Deletes the series and detaches its issues. Requires planner access. Returns
`204`; `404` unknown.

### `POST /api/campaigns/{campaignHandle}/journal/series/{id}/generate-next`

Mints the next issue as a new draft (`201 { created: true, publicationId }`),
always minting rather than reusing an existing one. Requires planner access plus an
authenticated user; series errors map to `404`.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
