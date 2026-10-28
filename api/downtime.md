# Downtime API

Downtime tracks what happens between sessions: havens (safe places), projects
(undertakings with status machines), the ledger (treasury), scheduled effects
(recurring automation), and suggestion queues (reputation, world events) that
turn proposals into world objects.

```text
create haven / project (downtime management) → patch simulation fields / append activity
    ↓
overview cards or GET ?section= hub for the ops view
    ↓
GET ledger for balance + feed → POST entries (participants+) or triage suggestions (managers)
    ↓
scheduled-effects for recurring needs → occurrences preview
    ↓
reputation / world-event queues in parallel → gap-overlay annotations (chronology managers)
```

Reads are member-level with visibility filtering. Mutations require the
downtime-management capability **plus**, for most writes, notebook
(DM/Co-DM) authority — failing either returns `403`. Ledger entries and
suggestions use finer contributor/manager splits documented below. Gap
overlays are the exception: they require chronology management instead.

## Havens

Havens are wiki pages (under the Downtime-Havens folder) plus simulation rows.

- `GET /api/campaigns/{campaignHandle}/downtime/havens` — lists,
  visibility-filtered by role.
- `GET /api/campaigns/{campaignHandle}/downtime/havens/by-wiki/{wikiPageId}` —
  light detail without blocks.
- `GET /api/campaigns/{campaignHandle}/downtime/havens/{id}` — full detail.
- `GET /api/campaigns/{campaignHandle}/downtime/havens/{id}/overview` —
  presentation payload: current epoch, active (non-terminal) projects at the
  haven, resident titles, featured image. Resolves through the wiki page, so
  soft-deleted pages return `404 Haven not found.`

#### `POST /api/campaigns/{campaignHandle}/downtime/havens`

Creates the wiki page and haven together and updates the entity graph
(`title` required, `visibility` default `Party`, optional
description/fields/blocks). Returns `201`.

#### `PATCH /api/campaigns/{campaignHandle}/downtime/havens/{id}`

Updates title, visibility, appended activity (`appendActivity.summary` must
be non-empty; origin forced `manual`), simulation state, or direct keys
(type, status, location, scale, ownership, theme, discovery, residents,
factions, crew, upgrades, threats with `low|rising|critical` severity,
benefits, log, references). Invalid enum values coerce to null;
`establishedAt` defaults to now on creation.

- `DELETE /api/campaigns/{campaignHandle}/downtime/havens/{id}` — deletes
  (`204`).

Type defaults to `sanctuary`, status to `prosperous`; the remaining enums
(scale, ownership, theme, discovery) are nullable.

## Projects

Projects mirror havens under the Downtime-Projects folder, with a status
machine (`PLANNED|ACTIVE|PAUSED|SUSPENDED|COMPLETED|FAILED|ABANDONED`, default
`PLANNED`; terminal = completed/failed/abandoned), types
(`construction|research|training|operations|recovery`, default `operations`),
priorities (`low|normal|high|critical`, default `normal`), and nullable
postures.

- `GET /api/campaigns/{campaignHandle}/downtime/projects[?status=&havenPageId=&includeTerminal=]` —
  filtered list (`includeTerminal=true` keeps terminal rows).
- `GET /api/campaigns/{campaignHandle}/downtime/projects/by-wiki/{wikiPageId}` —
  light detail (strips blocks and wiki metadata).
- `GET /api/campaigns/{campaignHandle}/downtime/projects/{id}` — full detail.
- `GET /api/campaigns/{campaignHandle}/downtime/projects/{id}/overview` —
  presentation cards.

#### `POST /api/campaigns/{campaignHandle}/downtime/projects`

Creates a project (`title` required, `visibility` default `Party`,
brief/stakes/posture, `constraints[]` keeping entries with non-empty labels
and coercing kinds to `requirement|obstacle`). Returns `201`.

#### `PATCH /api/campaigns/{campaignHandle}/downtime/projects/{id}`

Status transitions follow an allowed-transition map (`400` on illegal moves);
terminal rows reject simulation patches with `409`; durations are counted in
minutes with derived progress; completing a project records its completion
time. Empty titles return `400`.

- `DELETE /api/campaigns/{campaignHandle}/downtime/projects/{id}` — deletes
  (`204`).

## Ledger

The ledger is a treasury (`openingBalance + Σ(treasuryDelta)`) plus an entry
feed. Balances ignore `debt_open` rows; open debts are summarized separately.

- `GET /api/campaigns/{campaignHandle}/downtime/ledger` — `{ ledger, feed }`
  detail plus hub feed. Member-only.
- `PATCH /api/campaigns/{campaignHandle}/downtime/ledger` — settings
  (`currencyLabel?`, `currencySuffix?`, numeric `openingBalance?`, boolean
  `sharedTreasuryEnabled?`). Requires downtime management plus an
  authenticated manager (GM/WRITER).
- `GET /api/campaigns/{campaignHandle}/downtime/ledger/entries/{id}` — one
  entry (`404` unknown).

#### `POST /api/campaigns/{campaignHandle}/downtime/ledger/entries`

Creates a manual-source entry: `entryKind` must be
`credit|debit|debt_open|debt_payment`, amount a positive floored integer,
title required, category defaulting to `other`, narrative truncated to 120
characters, `occurredAtEpochMinute` defaulting to now, link fields validated.
Requires contributor level (GM/WRITER/PARTICIPANT). Returns `201 { entry }`
and records activity.

**Errors:** `400` invalid kind, non-positive amount, or missing title;
`404` bad link reference.

- `PATCH /api/campaigns/{campaignHandle}/downtime/ledger/entries/{id}` —
  edits (managers may edit any; participants only their own).
- `DELETE /api/campaigns/{campaignHandle}/downtime/ledger/entries/{id}` —
  deletes (`204`, same ownership rule).
- `GET /api/campaigns/{campaignHandle}/downtime/ledger/suggestions` —
  pending auto-generated entries. Requires contributor level.

#### `POST /api/campaigns/{campaignHandle}/downtime/ledger/suggestions/{id}/accept`

Accepts a suggestion (optional `edits`, nested or top-level; invalid kinds
dropped, non-numeric amounts ignored), creating the entry and marking the
suggestion accepted with `acceptedEntryId` together. Requires manager level.
Amount is required at accept time.

#### `POST /api/campaigns/{campaignHandle}/downtime/ledger/suggestions/{id}/dismiss`

Dismisses a suggestion. Same manager requirement applies.

Note a real inconsistency: an already-resolved ledger suggestion returns
`400`, while the reputation and world-event queues return `409` for the same
situation (recorded in [ROUTE-COVERAGE.md](ROUTE-COVERAGE.md)).

## Scheduled effects

Recurring automation with treasury (`ledger_upkeep|ledger_income`) and
narrative (`world_development_prompt|haven_threat_prompt`) kinds and
`active|paused|archived` statuses. Time advances fire due schedules (up to 24
per advance), emitting ledger suggestions or world-event prompts plus
occurrence rows (`fired|suppressed` with reasons such as disabled development,
missing org/haven, or invalid authoring).

- `GET /api/campaigns/{campaignHandle}/downtime/scheduled-effects[?includeArchived&scope=treasury|narrative|all]` —
  schedules. Member-only.

#### `POST /api/campaigns/{campaignHandle}/downtime/scheduled-effects`

Creates a schedule (kind required, non-empty title, recurrence as a rule
object — duration with positive `intervalMinutes` or calendar-month with
`dayOfMonth` 1–28 and `monthInterval` 1–12 — or a preset
`weekly|biweekly|monthly_calendar|every_7|14|30_days`; amounts floored and
stored for treasury kinds only). Anchors to now. Returns `201`.

**Errors:** `400` missing kind, empty title, or invalid recurrence.

- `PATCH /api/campaigns/{campaignHandle}/downtime/scheduled-effects/{id}` —
  updates status, title, narrative, recurrence, or amount (`400` on bad
  recurrence).
- `DELETE /api/campaigns/{campaignHandle}/downtime/scheduled-effects/{id}` —
  archives (returns `200 { schedule }`, not `204`).
- `GET /api/campaigns/{campaignHandle}/downtime/scheduled-effects/{id}/occurrences[?limit=]` —
  occurrence preview (default 10). Requires downtime management plus
  schedule-management authority, unlike the list.

## Reputation and world-event suggestions

### Reputation

- `GET /api/campaigns/{campaignHandle}/downtime/reputation/suggestions` —
  pending suggestions (limit 50, newest first) with per-role resolvability
  flags. Member-only.

#### `POST /api/campaigns/{campaignHandle}/downtime/reputation/suggestions/{id}/accept`

Accepts with optional `narrative` (normalized, max 200), creating a reputation
event (`band_crossing|investigation|rumor_spread` on `trust|notoriety` axes,
`up|down|flat`). Requires GM/WRITER-level suggestion authority.

- `POST /api/campaigns/{campaignHandle}/downtime/reputation/suggestions/{id}/dismiss` —
  dismisses. Same authority as accept.

Resolved suggestions return `404` when unknown and `409` when no longer
pending.

### World events

- `GET /api/campaigns/{campaignHandle}/downtime/world-events/suggestions` —
  pending world-event suggestions (kinds `faction_pressure|era_trend`).
  Member-only.

#### `POST /api/campaigns/{campaignHandle}/downtime/world-events/suggestions/{id}/accept`

Accepts with optional `title?`/`narrative?` (max 500), creating a
`CalendarEvent` on the master calendar and returning
`acceptedCalendarEventId`. Advisory-only until accepted. Same authority as
reputation accept.

- `POST /api/campaigns/{campaignHandle}/downtime/world-events/suggestions/{id}/dismiss` —
  dismisses the suggestion.

Same `404`/`409` semantics as reputation.

## Gap overlays

### `PUT /api/campaigns/{campaignHandle}/downtime/gap-overlays/{gapId}`

Upserts a timeline-gap annotation (`promotedLabel?`, `annotations[]` each
needing `entityPageId` with kind `character|location|organization` and role
`present|absent|affected|occupied`, `locationMentions[]` each needing a note;
`400` on empty IDs or invalid payloads, `200 { overlay }` on success).
Requires chronology management.
Display caps of 6 items per period exist; whether they bind on write is
unverified (see coverage audit).

## Downtime hub

`GET /api/campaigns/{campaignHandle}/wiki/downtime-hub` (system key) and
`GET /api/campaigns/{campaignHandle}/wiki/downtime-hub/{pageId}[?section=]` compose the operations view:
overview simulation snapshot, world events (plus pending suggestions for
managers), project and haven cards, reputation, and ledger payloads. Reading
needs only membership; a staff flag toggles consequence, quest-time, pressure,
and batch data. `section` selects the branch; missing or non-downtime
categories return `404`. See [Wiki pages](wiki-pages.md) for hub conventions.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
