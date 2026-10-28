# Chronology API

Chronology is Esiana's world clock: fantasy calendars define time, calendar
events populate it, consequences attach world effects to events, categories
organize them, the timeline/overlay project occurrences, and time tracking
advances the epoch (triggering quest and world hooks).

```text
POST /calendars (first becomes master) → optionally import or PATCH the definition
    ↓
GET /time-tracking reads currentEpochMinute + calendar state
    ↓
POST /chronology/categories as needed
    ↓
POST /calendars/{calendarId}/events (target defaults to now) → PUT consequences
    ↓
POST /calendar-events/{eventId}/apply-consequences (previewOnly first, then apply)
    ↓
PATCH /time-tracking/advance { amount, unit } → GET /chronology/timeline|overlay to verify
    ↓
GET fantasy-calendar-export for backup / interop
```

Reads are member-level with visibility filtering (non-managers see only
`PUBLIC`/`PARTY` events; `DM_ONLY` is hidden). All mutations, the export, and
the consequence read/write trio require chronology management
(`GAMEMASTER`/`WRITER` always; `PARTICIPANT` only when the campaign allows
player chronology management) — `403` otherwise. The import preview is the
exception: any member may validate a payload, while applying it requires
management.

## Calendars

### `GET /api/campaigns/{campaignHandle}/calendars`

Lists fantasy calendars (master first in timeline views). Member-only.

### `POST /api/campaigns/{campaignHandle}/calendars`

Creates a calendar from `{ name?, isMasterTime? }`. The name defaults to `New
chronology`; the first calendar in a campaign becomes the master clock unless
told otherwise. Setting `isMasterTime: true` demotes all others at the same
time. New calendars start with a 7-day week, three months (including an
intercalary festival month), two seasons, one moon, and epoch offset zero.
Returns `201`.

### `PATCH /api/campaigns/{campaignHandle}/calendars/{calendarId}`

Merges a full or partial calendar definition (`name`, `epochOffset`,
`weekdays`, non-empty `months`, `seasons`, `moons`, `leapDays`); unparseable
patches return `400`. Promoting to master demotes the rest. `404` unknown
calendar.

### `DELETE /api/campaigns/{campaignHandle}/calendars/{calendarId}`

Deletes a non-master calendar (`400` for the master — promote another first;
`404` unknown). Scoped to the campaign.

## Calendar events

### `GET /api/campaigns/{campaignHandle}/calendars/{calendarId}/events`

Lists events ordered by epoch, then Y/M/D, then creation. `404` unknown
calendar. Visibility-filtered for non-managers.

### `POST /api/campaigns/{campaignHandle}/calendars/{calendarId}/events`

Creates an event. `title` is required (`400` without it). References
(`categoryId`, `prerequisiteId`) must stay in-campaign; `visibility` is
`PUBLIC|PARTY|DM_ONLY` (case-insensitive, default `PARTY`); `duration`
defaults to 1; repeating events require `repeatInterval` plus `repeatUnit`
(`DAYS|MONTHS|YEARS|ERAS`); `conditions` must form a valid condition tree
(group operators `AND|OR|NAND|XOR`, criteria on year/month/day/weekday/moon
phase/season/cycle, moon-phase criteria requiring `moonId`). Epoch targets
accept whole-number strings or numbers; omitting all targets resolves the
campaign's current epoch into the calendar and stamps it. Creation updates the
entity graph. Returns `201`.

### `PATCH /api/campaigns/{campaignHandle}/calendars/{calendarId}/events/{eventId}`

Same validators with preserve-on-`undefined` and clear-on-`null` semantics for
nullable references; a prerequisite may not reference the event itself
(`400`). `404` unknown event.

### `DELETE /api/campaigns/{campaignHandle}/calendars/{calendarId}/events/{eventId}`

Removes the event's graph relations, then deletes it. `404` unknown event.

## Event consequences

Unusually, all three consequence routes — including the read — require
chronology management. There is no player-visible consequence read; players see
effects only through projections.

### `GET /api/campaigns/{campaignHandle}/calendar-events/{eventId}/consequences`

Reads consequences from the event's lore page (`event-{eventId}`),
returning `{ eventId, lorePageId, consequences[] }` (missing lore pages yield
`[]`). `404` unknown event.

### `PUT /api/campaigns/{campaignHandle}/calendar-events/{eventId}/consequences`

Replaces the consequence set (`{ consequences }` parsed as an
`event-consequence-v1` set, deduped by ID; `400` invalid). Creates a stub lore
page when missing, merges otherwise. Requires an authenticated user (`401`
without one). Returns `{ eventId, lorePageId,
consequences }`.

### `POST /api/campaigns/{campaignHandle}/calendar-events/{eventId}/apply-consequences`

Executes consequences at the campaign's current epoch via
`?previewOnly=true|1` or `{ previewOnly: true }` (preview skips writes and
reports `appliedCount/partialCount/blockedCount/skippedCount` with
`pendingConfirmations` and warnings). Execution covers quest hooks,
location alterations, trade-route changes (requires two locations), and haven
threat patches (requires a haven plus label); unknown kinds are reported as
blocked, not failed. Results return `200` with row-level detail.

## Chronology categories

Event categories (`{ name, color }`, listed alphabetically):

- `GET /api/campaigns/{campaignHandle}/chronology/categories` — lists.
  Member-only.

#### `POST /api/campaigns/{campaignHandle}/chronology/categories`

Creates a category. Requires a trimmed `name` (`400` without). Requires
chronology management. Returns `201 { category }`.

- `PATCH /api/campaigns/{campaignHandle}/chronology/categories/{categoryId}` —
  updates (`color: undefined` keeps, other values trim-or-null; `400` on empty
  names; `404` unknown). Requires chronology management.
- `DELETE /api/campaigns/{campaignHandle}/chronology/categories/{categoryId}` —
  deletes, clearing member events' category references first (`{ ok: true }`).
  Requires chronology management.

## Timeline and overlay

Both bundles are member-only reads with layered visibility (managers see all;
others pass calendar visibility **and** presence/narrative projection).

### `GET /api/campaigns/{campaignHandle}/chronology/timeline`

Full occurrence expansion: base events plus expanded occurrences
(max 100 per event, 2000 total; multi-day durations emit one occurrence per
day; repeat stepping clips to month ends) with `expansionMetadata` (window
echo, limits, truncation flags, warnings such as forced caps). Query window
parameters (`windowMode` default `YEAR_RANGE`, `from` default 0, `to` default
9999) are echoed in metadata; occurrence `tags` derive from `#hashtags` in
titles and descriptions.

### `GET /api/campaigns/{campaignHandle}/chronology/overlay`

Convergence overlay over a window (`windowMode/from/to`,
`sessionLinkedOnly=true`, `domains` CSV, `includeSuppressed=true` honored only
for managers).

## Time tracking and fantasy-calendar interop

### `GET /api/campaigns/{campaignHandle}/time-tracking`

Reads `{ currentEpochMinute, calendars[] }` with each calendar's computed
state. Member-only; `404` when the campaign is missing.

### `PATCH /api/campaigns/{campaignHandle}/time-tracking/advance`

Moves the world clock: `{ amount, unit }` with units
`minutes|hours|days|weeks|months` (a positive truncated number and a known
unit, else `400`). Month steps are calendar-relative and require a master
calendar (`400` without one); other units convert to minutes. Only one advance
runs at a time (`409` while another is in flight); hook failures return `500`
with hook identity and partial results. Success updates the epoch, runs time
hooks (quest deadlines, offscreen progress, escalation), records activity, and
returns the new
epoch with per-calendar states, optional day-clamping, and a simulation
receipt.

### `POST /api/campaigns/{campaignHandle}/time-tracking/import-json`

Imports a fantasy-calendar definition as a **new** calendar (months, weekdays,
moons persisted; seasons/leap days reset; epoch offset zero). When the
campaign has no calendars yet, the import becomes master and sets the campaign
epoch; otherwise it is a non-master side timeline and the epoch is untouched.
Requires chronology management.

### `POST /api/campaigns/{campaignHandle}/chronology/import-preview`

Validates an import payload without persisting (`{ ok, calendarName,
monthCount, weekdayCount, moonCount, intercalaryCount, resolvedDate,
currentEpochMinute, warnings }`; import errors map to their own statuses).
Any member may preview — the open-validation / gated-apply pairing is
intentional.

### `GET /api/campaigns/{campaignHandle}/calendars/{calendarId}/fantasy-calendar-export`

Exports one calendar as downloadable Fantasy-Calendar JSON
(`application/json`, attachment filename `{slug}-fantasy-calendar.json`).
Requires chronology management; `404` unknown calendar.

### `POST /api/campaigns/fantasy-calendar/import-preview`

Wizard-scoped variant of the import preview used during campaign creation (no
campaign scope).

Related: quest time-pressure in [Campaigns](campaigns.md) is evaluated by the
same time-advance hooks; world-advance batches in
[World state](world-state.md) also move the epoch.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
