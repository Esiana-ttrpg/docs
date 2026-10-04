# World state API

World state applies batched world changes (advancing the clock, writing
receipts, and creating chronology records), while momentum, pressure, pacing,
and world development observe and steer the simulation around those batches.

```text
GET /world-development/settings → POST /world-development/suggest → GET /world-development/pending
    → resolve (accept creates a world object; dismiss closes)
    → GET /world-development/history; requeue revives archived items
```

Separately:

```text
POST /world-state/preview → POST /world-state/apply → GET /world-state/batches[/{eventId}]
GET|PUT /momentum and GET /world-pressure[/preview] observe and steer pressure
```

## World advance

Batches carry versioned effects (`world-advance-v1`) across faction,
territorial, economic, conflict, seasonal, and NPC-mobility domains, with an
optional `batchIdempotencyKey` (generated when omitted) and calendar-relative
time steps (`amount > 0` with a known unit; invalid entries are dropped, and
empty effect lists are rejected). All four routes require chronology
management.

### `POST /api/campaigns/{campaignHandle}/world-state/preview`

Dry-runs a batch without mutating: version, as-of and projected epoch labels,
per-effect previews (summary, warnings, pending confirmations), condition
surfaces, narrative synthesis, and warnings. `400` on unparseable requests.

### `POST /api/campaigns/{campaignHandle}/world-state/apply`

Applies a batch: advances `campaign.currentEpochMinute`, runs time hooks,
records the batch as a `DM_ONLY` calendar event under a `World advance`
category, applies each effect, and records receipts.
Requires an authenticated user. Missing master calendars return `400`; success
returns the preview plus `{ batchId, chronologyEventId, appliedCount,
skippedCount, receiptKeys[] }`.

### `GET /api/campaigns/{campaignHandle}/world-state/batches`

Lists batch summaries (`{ batches }`).

### `GET /api/campaigns/{campaignHandle}/world-state/batches/{eventId}`

One batch's detail payload (`400` without the parameter, `404` unknown).

Related: [Chronology](chronology.md) (time advance, event consequences).

## Momentum

### `GET /api/campaigns/{campaignHandle}/momentum`

Reads the momentum state (`{ semanticsVersion, state: { version, eras[],
worldPressurePaused }, updatedAt }`), auto-creating defaults when absent.
Requires world-pressure access (`403` otherwise).

### `PUT /api/campaigns/{campaignHandle}/momentum`

Replaces eras (cleaned up and ordered, exactly one current — defaulting to the
first, or default eras when empty) and the pause flag (preserved when
omitted). Requires chronology management. `400` on save errors.

## World pressure and pacing

- `GET /api/campaigns/{campaignHandle}/world-pressure` — current pressure projection. Requires
  world-pressure access.
- `GET /api/campaigns/{campaignHandle}/world-pressure/preview?targetEpochMinute=` — projects pressure at
  an unsigned epoch (`400` when missing or non-numeric; no session forecast
  included). Same access rule.
- `GET /api/campaigns/{campaignHandle}/pacing/simulation-runs` — read-only listing of pacing simulation
  runs (`{ runs }`). Same access rule.

## World development

Development suggestions are proposal queues with role-filtered presentation;
resolving `accept` creates a world object (calendar event, rumor, quest hook,
faction change, or narrative consequence, plus a lore stub) and records the
application.

- `GET /api/campaigns/{campaignHandle}/world-development/settings` — settings payload. Member-only.
- `PUT /api/campaigns/{campaignHandle}/world-development/settings` — replaces settings (flat or nested
  payloads parsed accordingly). Requires an authenticated GM/Writer (`403`
  otherwise).
- `GET /api/campaigns/{campaignHandle}/world-development/pending` — pending suggestions, role-filtered
  presentation. Member-only.
- `GET /api/campaigns/{campaignHandle}/world-development/history[?status=&q=&from=&to=]` — terminal
  history. Requires Gamemaster settings authority.
- `POST /api/campaigns/{campaignHandle}/world-development/suggest` —
  generates on-demand developments and records a proposal. Requires an
  authenticated GM/Writer.

#### `POST /api/campaigns/{campaignHandle}/world-development/suggestions/{id}/resolve`

Resolves with `{ action: accept|dismiss (default accept), source,
acceptTarget, title, narrative }`; reputation-sourced items follow the
reputation accept/dismiss rules in [Downtime](downtime.md). Requires an
authenticated caller with GM/Writer authority (unless auto-apply).

**Errors:** `403` forbidden; `404` unknown suggestion; `409` no longer
pending; `400` other failures.

- `POST /api/campaigns/{campaignHandle}/world-development/suggestions/{id}/requeue` —
  revives an archived suggestion to pending (`{ ok: true }`). Requires an
  authenticated caller with role checks.

Related: downtime reputation and world-event queues in
[Downtime](downtime.md) share the accept/dismiss vocabulary.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
