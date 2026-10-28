# Narrative knowledge API

Esiana derives a knowledge layer — entity graph, lore claims, rumors, lifecycle
state, branches, snapshots — from wiki pages, links, and metadata rather than
requiring authors to maintain it separately. These endpoints query, advance,
and audit that derived state.

Concepts first: pages hold the prose; the entity graph holds typed relations
synced from links, metadata, calendar prerequisites, and map pins; lore claims
hold checkable statements about a page; rumors circulate claims through regions
and factions; lifecycles and branches track quest/thread/scene progress;
snapshots freeze DM/party views for comparison; publishing moves a quest from
authoring into the party-visible hub.

## Entity graph

The graph is derived, not authored: reads return role-filtered neighborhoods,
and rebuild refreshes relations after bulk changes.

```text
GET /entity-graph → GET /entity-graph/projection → GET /entity-graph/diagnostics
    → fix pages/links → POST /entity-graph/rebuild
```

### `GET /api/campaigns/{campaignHandle}/entity-graph`

Seeded neighborhood query. Requires `entityType` (`wiki_page`,
`calendar_event`, `map_pin`, `map_scene_object`, `scene`, or `clue`) and
`entityId`, else `400`. Optional `depth` (default 1), `kinds` CSV (unknown
kinds silently dropped), and `includeSuppressed=true`. Member-only; results
are filtered to what the caller's role may see.

### `GET /api/campaigns/{campaignHandle}/entity-graph/projection`

Filtered relations projection (`lens`, `mode`, `level`, `focus`, `at`,
`includeHistorical` window). Member-only; invalid window values are tolerated
rather than rejected with `400`.

### `GET /api/campaigns/{campaignHandle}/entity-graph/diagnostics`

Graph health checks (`checks` CSV defaulting to `cycles,orphans,dangling`,
plus `unreachable`; unknown checks dropped). Member-only.

### `POST /api/campaigns/{campaignHandle}/entity-graph/rebuild`

Refreshes campaign entity relations after bulk changes
(`200 { ok: true }` plus rebuild details). Requires
page-edit-any authority **plus** an elevated wiki role (`403` otherwise).

Related: [Wiki pages](wiki-pages.md) (links, backlinks), [Maps](maps.md)
(pins), [Chronology](chronology.md) (prerequisites).

## Lore claims and interpretations

### Lore claims

- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/lore-claims` — lists
  claims, filtered to the caller's role.
- `PATCH /api/campaigns/{campaignHandle}/wiki/lore-claims/{claimId}` /
  `DELETE /api/campaigns/{campaignHandle}/wiki/lore-claims/{claimId}` —
  edits or removes a claim (`404` unknown; delete returns `200 { ok: true }`).
  Mutations require page-edit-any authority.

#### `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/lore-claims`

Adds a claim with a non-blank `statement` (`400` without one). Confidence,
knowledge-state, weight, and source follow the lore-knowledge vocabulary
(`VERIFIED|PARTIAL|UNVERIFIED|CONTESTED`,
`KNOWN|SUSPECTED|CONFIRMED|DISPROVEN|UNDISCOVERED`,
`MINOR|MAJOR|FOUNDATIONAL|APOCRYPHAL`). Requires page-edit-any authority.
Returns `201 { claim }`; `404` for cross-campaign pages.

#### `GET /api/campaigns/{campaignHandle}/lore-claims/{claimId}/circulations`

Append-only propagation history for a claim (`{ circulations }`). Requires the
discovery-reveal capability; this is the audit trail for rumor
spread/retraction.

Workflow: create claim → spread rumor targeting it → read circulations to
audit → retract if needed.

### Interpretations

Aliases record names over time; groups record schools of thought; accounts
record specific tellings; the bundle and summary compose them.

- `GET` / `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/historical-aliases` and
  `PATCH /api/campaigns/{campaignHandle}/wiki/historical-aliases/{aliasId}` / `DELETE /api/campaigns/{campaignHandle}/wiki/historical-aliases/{aliasId}` —
  historical names (`name` required, `201` on creation; updates refresh the
  page's timestamp). Mutations require page-edit-any authority.
- `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretation-groups` and
  `PATCH /api/campaigns/{campaignHandle}/wiki/interpretation-groups/{groupId}` / `DELETE /api/campaigns/{campaignHandle}/wiki/interpretation-groups/{groupId}` —
  groups. Same authority.
- `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretation-accounts` and
  `PATCH /api/campaigns/{campaignHandle}/wiki/interpretation-accounts/{accountId}` / `DELETE /api/campaigns/{campaignHandle}/wiki/interpretation-accounts/{accountId}` —
  accounts (`title` required). Same authority.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretations` — full
  bundle, filtered to the caller's role.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretive-summary?viewDate=` — time-projected
  summary with temporal metadata; unparseable dates fall back silently.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/party-knowledge` — what the party currently knows.

## Rumors

Rumors circulate lore through regions and factions. Moderation-gated writes,
open reads:

```text
draft-or-claim + targets → POST /rumors/spread → verify in location rumors / gossip / circulations
    → POST /rumors/retract with circulationId if needed
```

### `POST /api/campaigns/{campaignHandle}/rumors/spread`

Spreads a claim or inline draft (`draft: { statement, subjectPageId,
stableKey? }`) to `targets[]` (required, else `400`). Optional `sourceClaimId`,
`stance` (default `asserts`; unknown values coerce rather than fail),
`awarenessScope` (default `regional`), and `visibility` (anything but exactly
`PARTY` becomes `GM_ONLY`). Targets must be regions or factions with valid
page references (`INVALID_TARGET → 400`); missing claims or subject pages map
to `404`; spreading without a master calendar returns `409
NO_MASTER_CALENDAR`. Requires the rumor-moderation capability. Returns `201`.

### `POST /api/campaigns/{campaignHandle}/rumors/retract`

Retracts one circulation (`{ circulationId }` required, else `400`; optional
`reason`). Unknown circulations return `404`. Same authority. Returns `201`.

### `GET /api/campaigns/{campaignHandle}/locations/{pageId}/rumors[?asOfEpoch=]`

Regional rumor projection (`{ feed, scope, circulations }`), role-filtered.
Member-only; `404` for unknown locations. `asOfEpoch` selects a historical
view.

### `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/gossip[?asOfEpoch=]`

Faction gossip projection, same shape and rules. `404` for non-organization
pages.

Watch for silent coercion: stance, scope, and visibility default instead of
returning `400`, and graph filter lists drop unknown values.

## Narrative lifecycle

Quest, thread, and scene subjects move through
`LOCKED → DISCOVERED → ACTIVE → COMPLETED|FAILED` (terminal states have no
outgoing transitions). Non-elevated viewers see locked subjects masked to
null; party visibility starts at `DISCOVERED`.

- `GET /api/campaigns/{campaignHandle}/narrative-lifecycle?subjectKind=&subjectIds=` —
  batch state (`{ subjectKind, semanticsVersion, items: [{ subjectId,
  lifecycleState, visible }] }`). Requires `subjectIds` CSV (`400` when
  empty); `subjectKind` defaults to `quest` and invalid kinds return `400`.
  Member-only.

#### `PATCH /api/campaigns/{campaignHandle}/narrative-lifecycle/{subjectKind}/{subjectId}`

Transitions lifecycle state (case-insensitive `lifecycleState`). Illegal moves
return `409 INVALID_LIFECYCLE_TRANSITION` with from/to/allowed; forbidden ones
return `403 FORBIDDEN`. Requires the quest-edit capability plus notebook
authority.

**Errors:** `400` missing/invalid state; `404` unknown subject.

- `POST /api/campaigns/{campaignHandle}/narrative-lifecycle/rebuild` —
  recomputes all subjects after bulk imports or backfills. Same authority as
  PATCH.

Related: quest hubs in [Wiki pages](wiki-pages.md), time pressure in
[Campaigns](campaigns.md).

## Narrative branches

Branch graphs (max 12 nodes, 24 edges; node kinds `outcome|hidden|failure|merge`)
model decision structure per subject. Entry resolution prefers explicit entry
nodes, then the active node, then structural roots.

- `GET /api/campaigns/{campaignHandle}/narrative-branches/{subjectId}` —
  branch state plus allowed next transitions. Requires the thread-edit
  capability.

#### `PATCH /api/campaigns/{campaignHandle}/narrative-branches/{subjectId}`

Saves `{ graph?, activeNodeId? }`: invalid graphs return `400`; setting the
active node executes that node's consequences. Requires the thread-edit
capability plus notebook authority.

Workflow: `GET` (state + allowed) → `PATCH { graph }` to author →
`PATCH { activeNodeId }` to advance → consequences fire → re-`GET`.

## Narrative snapshots

Snapshots freeze GM and party views at an epoch for comparison. Creation
is Gamemaster-gated; comparison is audience-aware (party callers get the party
view even when requesting DM perspective).

```text
POST /narrative-snapshots (milestone) → GET /narrative-snapshots (pick ids)
    → GET /api/campaigns/{campaignHandle}/compare?from=&to= → GET /api/campaigns/{campaignHandle}/:snapshotId for payload detail
```

#### `POST /api/campaigns/{campaignHandle}/narrative-snapshots`

Creates a milestone (`{ label?, anchorLocationPageId? }`). With an anchor,
captures GM and party region views (`404` unknown location); without, captures
campaign quest-status facets. Requires Gamemaster settings authority. Returns
`201 { snapshot }`.

- `GET /api/campaigns/{campaignHandle}/narrative-snapshots[?comparableOnly=true]` —
  latest 50 milestones and visit snapshots with display labels and
  comparability flags. Member-only.

#### `GET /api/campaigns/{campaignHandle}/narrative-snapshots/compare?from=&to=[&perspective=dm]`

Diffs two snapshots (`400` without both IDs or without a region anchor; `404`
unknown rows; `409 archived_compare` for elevated callers on archived
snapshots, while party callers receive a spoiler-safe summary instead).
Member-only.

- `GET /api/campaigns/{campaignHandle}/narrative-snapshots/{snapshotId}` —
  one snapshot's views (elevated callers see GM + party, others party-only).
  Only `MILESTONE` rows resolve here — visit snapshots listed by the
  collection return `404` individually. Member-only.

Related: location visits in [Campaigns](campaigns.md) provide automatic region
baselines (`visits/latest`, `since-last-visit`).

## Quest publishing and creative drift

- `GET /api/campaigns/{campaignHandle}/narrative-publish/quest/{pageId}/preview` —
  role-filtered publish artifact for a quest page (`404` unknown). Requires
  the quest-edit capability (party members cannot self-preview).

#### `POST /api/campaigns/{campaignHandle}/narrative-publish/quest/{pageId}`

Publishes the quest to the party (the quest appears in the published quest
hub with updated lifecycle/visibility). Requires the quest-edit capability
plus notebook authority. Workflow: author → preview → publish → confirm via
lifecycle reads and the quest hub.

**Errors:** `404` quest page not found.

- `GET /api/campaigns/{campaignHandle}/narrative/creative-drift` — member-level creative-drift signal.
- `PATCH /api/campaigns/{campaignHandle}/narrative/creative-drift/dispositions` — updates dispositions
  under elevated handling per the operation's authorization note.

## Adventure storyboard

- `GET /api/campaigns/{campaignHandle}/adventure/storyboard` — the adventure
  storyboard backing the adventure hub (quests, scenes, threads, pressure
  feed, topology, clue/foreshadowing/hidden scans, convergence overlay).
  Member-only.
- `PATCH /api/campaigns/{campaignHandle}/adventure/storyboard` — edits the storyboard. Requires the
  adventure-storyboard-edit capability.

Related: the adventure hub read endpoints in [Wiki pages](wiki-pages.md).

## Page narrative status and continuity

Page editorial state uses `ACTIVE|MISSING|DEAD|ARCHIVED|RUMORED|RETIRED|
HISTORICAL|LEGENDARY|SECRET` (`page-narrative-status-v1`); `SECRET` is masked
from party projections, and effective status merges the stored row with page
metadata and character life-status fallbacks.

- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/narrative-status` —
  effective plus stored status with viewer filtering
  (`{ narrativeStatus, stored }`). Member-only; `404` unknown page.

#### `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/narrative-status`

Sets editorial state (`{ status, reason? }`). Requires page-edit-any
authority plus elevated wiki authority.

**Errors:** `400` invalid status; `404` unknown page.
- `GET /api/campaigns/{campaignHandle}/wiki/narrative-status?ids=` — batch map keyed by found page
  (`400` without `ids`; missing IDs are silently absent). Member-only.
- `GET /api/campaigns/{campaignHandle}/wiki/continuity-summary` and
  `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/continuity` — campaign and per-page continuity
  payloads, role-filtered and spoiler-safe. Member-only.
- `GET /api/campaigns/{campaignHandle}/wiki/world-activity?days=` and `GET /api/campaigns/{campaignHandle}/wiki/writing-pulse?days=` —
  spoiler-safe campaign progress and per-user editing activity (`days` 1–90,
  default 30). Member-only (pulse additionally requires a user).

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
