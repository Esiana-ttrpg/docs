# Campaigns API

Campaigns are Esiana's authorization and data-isolation boundary. Nearly every
narrative route lives under a campaign scope, and campaign membership is the
first gate everything else builds on.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

## Addressing campaigns

Narrative routes are normally addressed by URL handle:

```text
/api/campaigns/{campaignHandle}/...
```

The campaign scope resolves that handle and requires membership (`401`
for anonymous callers, `403` for non-members). Some container-management routes
instead use the database campaign ID (`{id}` or `{campaignId}`); those
top-level routes generally accept either the ID or the handle. Consult the
parameter name in `/api/docs`; do not substitute an ID for a handle or vice
versa on scoped routes.

## Authorization layers

| Layer | Meaning |
|-------|---------|
| Application authentication | Identifies the session user or API-token owner |
| Campaign membership | Grants access to the addressed campaign, subject to later checks |
| Campaign capability | Permits an action such as editing, managing chronology, or uploading assets |
| Content visibility | Filters individual pages, maps, assets, journals, and knowledge projections |
| System administration | Separate application-wide `SYSTEM_ADMIN` authority |

Bearer tokens act as their owning user; token possession does not bypass
membership. Mutations can require campaign roles or configurable capabilities.
Reads can apply content-level visibility after membership succeeds.

See [API access control](access-control.md) for the full boundary model.

## Campaign lifecycle

Workflow:

```text
create campaign (POST /api/campaigns)
    ↓
invite members / accept applications (invite, apply, join-requests)
    ↓
configure settings, sidebar, dashboard, ensemble, capability overrides
    ↓
run the campaign (wiki, chronology, sessions, downtime, journal…)
    ↓
duplicate or delete
```

### `GET /api/campaigns`

Lists campaigns visible to the caller: own non-archived memberships plus
public campaigns the caller is not a member of (returned with `role: null`,
`isMember: false`). Requires authentication.

### `GET /api/campaigns/public`

Public campaign listing. No authentication required; returns only campaigns
with public discoverability.

### `POST /api/campaigns`

Creates a campaign through the setup wizard (multipart: `coverImage`,
`markdownZipFile`, `backupZipFile`, `calendarConfigFile` subject to upload
limits). Requires authentication. Validates the name (required), handle, and
game system/template choice, applies the caller's campaign defaults, seeds the
wiki skeleton, and finishes any requested imports in the background. Returns `201`.

**Errors:** `400` validation (missing name, bad handle, unparseable wizard
files, invalid game system); `403` disallowed template.

### `GET /api/campaigns/{campaignHandle}`

Returns the campaign plus the caller's `role`, `isMember`,
`isCampaignOwner`, `chronologyContributor`, and `partyId`, auto-backfilling a
blank sidebar configuration. Requires membership.

### `PATCH /api/campaigns/{campaignHandle}`

Updates campaign settings, recruitment, and appearance. Membership plus
Gamemaster-level settings authority is required; changing visibility additionally
requires owner-level authority. Renaming regenerates a unique handle.
Validation includes non-negative `currentSession`/`maxSeats`, `maxPlayers`
1–99, `themePreset` in `light|dark|auto|fantasy|cyberpunk|parchment`, and an
object-or-null `appearanceProfile`. Setting `isLookingForGroup: true` forces
public discoverability.

### `POST /api/campaigns/{id}/duplicate`

Clones a campaign. Requires authentication plus Gamemaster authority in the
source campaign. The body requires a new `name`
and accepts discoverability and copy/preset options; failures return `400`,
missing campaigns `404`, and load failures `500`. The caller owns the clone as
`GAMEMASTER`.

### `DELETE /api/campaigns/{campaignHandle}`

Deletes a campaign including its asset files. Requires campaign ownership;
non-owners get `403`, missing campaigns `404`.

### `POST /api/campaigns/{campaignId}/apply`

Applies to join, or joins directly with an invite token. Authenticated, with
global and per-campaign rate limiters. With a valid `inviteToken`, creates a
`PARTICIPANT` membership immediately (`201 { joined: true }`) and notifies.
Without a token, requires a `message` (sanitized, max 2000 characters), an
actively recruiting campaign (`isLookingForGroup`, else `400`), and a public
listing (else `403`); honors seat caps and returns `201` with a pending
request, notifying campaign managers.

**Errors:** `404` campaign; `400` not recruiting, message required, seats full,
or token-plus-message absent; `403` bad invite token or closed campaign; `409`
already a member or already applied; `429` rate limited.

### Supporting reads

#### `GET /api/campaigns/{campaignHandle}/status`

Campaign at-a-glance statistics: word/page/map/asset counts, asset storage,
enabled plugin count, discoverability, language, and game system. Member-only.

#### `GET /api/campaigns/{campaignHandle}/activity`

Member activity feed ordered newest-first. Query `page` (default 1) and `limit`
(default 20, clamped 1–100); the page clamps to the last page. Returns
`{ activity[], pagination }`.

#### `GET /api/campaigns/{campaignHandle}/files`

Lists campaign assets with on-disk sizes (filesystem accounting; S3-backed
installations report 0 — see [Assets](assets.md)). Member-only.

#### `GET /api/campaigns/{campaignHandle}/capacity-hint`

Deployment sizing hint (`tier`, `headroom`, next tier, recommended deployment).
Member-only.

#### `GET /api/campaigns/{campaignHandle}/visual-atlas`

Role-filtered visual-atlas projection of the campaign. Member-only.

#### `GET /api/campaigns/{campaignHandle}/world-stats`

Cached world statistics with `?days=` (default 30, clamped 1–90): computed-at
stamp, refresh cadence, period snapshot, and recent editors with
member-privacy filtering. Member-only.

#### `GET /api/campaigns/{campaignHandle}/events`

Server-sent events (`text/event-stream`, 25s heartbeat, `retry: 3000`) carrying
transient invalidation signals with per-event visibility filtering. Revalidates
membership on heartbeat and ends the stream when membership lapses. Treat
events as "refetch the canonical resource" hints. Member-only. Related:
membership changes, role changes, and capability-override saves close live
streams so clients re-authorize.

## Members, invites, and join requests

Workflow:

```text
GET /invite → share token URL (or POST /invite/send email)
    ↓
applicant POST /api/campaigns/{campaignId}/apply (token → instant join; message → pending)
    ↓
owner GET /join-requests → PATCH accept/reject (or PUT /api/campaigns/{campaignId}/requests/{requestId})
    ↓
owner PATCH /members/{userId} manages roles; POST /transfer-gamemaster hands off the table
```

### Members

#### `GET /api/campaigns/{campaignHandle}/members`

Lists members with role, chronology-contributor flag, party, join date, owner
marker, and identity bindings. Member-only.

#### `PATCH /api/campaigns/{campaignHandle}/members/{userId}`

Changes a member's role (`GAMEMASTER|WRITER|PARTICIPANT|OBSERVER`; the owner
role is not assignable here). Requires campaign ownership. Moving to
`PARTICIPANT` resets the chronology-contributor flag as appropriate; changes
close the target's live event streams and send a `ROLE_CHANGED` notification.

**Errors:** `400` bad role; `403` non-owner; `404` unknown member.

#### `DELETE /api/campaigns/{campaignHandle}/members/{userId}`

Removes a member: deletes the membership, closes live event streams, notifies
managers. Requires campaign ownership. Returns `409` when the target is the
campaign owner (transfer ownership first).

#### `DELETE /api/campaigns/{campaignHandle}/members/me`

Leaves the campaign. Closes the caller's live event streams and notifies managers.
Returns `409` when the caller is the owner and `404` when not a member.

#### `PATCH /api/campaigns/{campaignHandle}/members/{userId}/identity`

Binds a member to a character identity page (`{ identityPageId }`, null
clears). Members may always edit their own binding; editing someone else's
requires membership-management authority. The page must exist in the campaign
and be visible to the assignee's role, else `400`. Page ownership updates
together with the binding.

#### `POST /api/campaigns/{campaignHandle}/transfer-gamemaster`

Hands the Gamemaster role to another member (`{ targetUserId,
demoteCallerToWriter = true }`). Requires Gamemaster settings authority and
that the caller actually holds `GAMEMASTER`; the target must be a member
(`404` otherwise). Promotes the target, demotes the caller to `WRITER` unless
opted out, closes live event streams, and notifies.

### Invites

All three invite routes require Gamemaster settings authority.

#### `GET /api/campaigns/{campaignHandle}/invite`

Returns `{ slug, inviteToken, emailAvailable }`, generating and persisting a
token when none exists. The shareable URL is
`{FRONTEND_ORIGIN}/campaigns/{handle}?invite={token}`.

#### `POST /api/campaigns/{campaignHandle}/invite/rotate`

Replaces the invite token and returns the new `{ slug, inviteToken }`.
Rotate after any suspected leak; previously shared URLs stop working.

#### `POST /api/campaigns/{campaignHandle}/invite/send`

Sends the invite URL to `{ email }` (normalized; `400` when invalid or when
SMTP is unconfigured, `500` when delivery fails). Rate limited.

### Join requests

#### `GET /api/campaigns/{campaignHandle}/join-requests`

Lists pending applications. Requires campaign ownership.

#### `PATCH /api/campaigns/{campaignHandle}/join-requests/{requestId}`

Accepts or rejects an application: `{ action: accept|reject,
declineReasonCode?, declineMessage? }`. Requires campaign ownership.
Acceptance rechecks seats and membership at accept time, so the membership and
the acceptance land together, and notifies the applicant. Rejection validates the
decline-reason code and requires a message for reasons that need one.

**Errors:** `400` bad action, already processed, seats full, or bad decline
reason; `404` unknown request; `409` applicant already a member.

#### `PUT /api/campaigns/{campaignId}/requests/{requestId}`

Container-level accept/reject (`{ status: ACCEPTED|REJECTED, ... }`) addressed
by campaign ID. Requires campaign ownership. Same accept/reject semantics as
the scoped PATCH route.

## Ownership transfer

Transferring campaign ownership is a handshake, not a single call:

```text
owner POST /transfer-ownership/initiate { targetUserId }
    ↓
recipient POST /transfer-ownership/accept (or /decline)
    ↓
owner GET /transfer-ownership/status polls; owner DELETE /transfer-ownership cancels
```

#### `GET /api/campaigns/{campaignHandle}/transfer-ownership/status`

Member-level; returns `{ transfer: null }` or the pending transfer with expiry
and both parties.

#### `POST /api/campaigns/{campaignHandle}/transfer-ownership/initiate`

Requires campaign ownership; validates the target (required, not self, must be
a member, no existing pending `409`) and notifies the recipient with an expiry
time.

#### `POST /api/campaigns/{campaignHandle}/transfer-ownership/accept`

Recipient-only. Expired transfers are cleared before processing then ownership
transfers, acceptance is recorded, and other pendings cancel — together. Late
acceptance returns `410 TRANSFER_EXPIRED`; unknown transfers return
`404 TRANSFER_EXPIRED_OR_MISSING`.

#### `POST /api/campaigns/{campaignHandle}/transfer-ownership/decline`

Recipient-only; marks declined and notifies the initiator.

#### `DELETE /api/campaigns/{campaignHandle}/transfer-ownership`

Initiator-only cancellation.

Related: the owner cannot leave via `DELETE /members/me` or be removed until
ownership moves.

## Dashboard, ensemble, and settings surfaces

### `GET /api/campaigns/{campaignHandle}/dashboard`

Role-filtered dashboard bundle: quest pages (limit 8), thread bundle (plus a
deprecated `openThreads` alias), summary including schedule, recent lore,
narrative snapshot, and optional widgets (recent entities, world events,
faction conflict). Member-only.

### `PATCH /api/campaigns/{campaignHandle}/dashboard/layout`

Replaces the dashboard layout (`{ hero, widgets: [{ id, x, y, w, h, enabled
}] }`, else `400`). Requires Gamemaster settings authority. Hero cover image
references are validated (asset-reference failures return `400`).

### `GET /api/campaigns/{campaignHandle}/ensemble` and `PATCH /api/campaigns/{campaignHandle}/ensemble`

The ensemble (cast/party presentation) bundle, role-filtered on read
(member-only). Writes require Gamemaster settings authority, validate the
configuration payload (`400`), validate banner image references, and store a
normalized config.

### `GET /api/campaigns/{campaignHandle}/capability-overrides` and `PUT /api/campaigns/{campaignHandle}/capability-overrides`

Reads/replaces the campaign's per-role capability overrides (campaign-owner
only). `GET` also returns the configurable capability matrix (collaborative vs.
operational groups). `PUT` replaces all overrides atomically and rejects
unknown capabilities, non-overridable capabilities (`campaign.delete`,
`campaign.transfer_ownership`, `campaign.manage_roles`,
`campaign.visibility.edit`, `billing.manage`), bad effects (must be
`GRANT|REVOKE`), and immutable roles (`400`). Saving closes **all** campaign
event streams.

### Sidebar settings

- `PATCH /api/campaigns/{campaignHandle}/settings/sidebar` — updates sidebar
  configuration. Requires Gamemaster settings authority.
- `POST /api/campaigns/{campaignHandle}/settings/sidebar/{sectionId}/icon` —
  uploads a section icon (multipart). Requires Gamemaster settings authority.

## Notebooks and session timeline

Notebooks group session notes into arcs; the session timeline anchors
scheduling, attendance, and per-author notes.

```text
POST /notebooks → PUT renames → PATCH /wiki-pages/assign-notebook files pages
POST /session-timeline/new → schedule → publish → attendance → notes
```

### `POST /api/campaigns/{campaignHandle}/notebooks`, `PUT /api/campaigns/{campaignHandle}/notebooks/{notebookId}`, `DELETE /api/campaigns/{campaignHandle}/notebooks/{notebookId}`

Creates (default title `New Arc`, truncated to 80 characters, appended display
order), renames (non-blank title required), and deletes notebook arcs.
Managing notebooks requires DM/Co-DM notebook authority (`403` otherwise).
Deletion unlinks pages (`notebookArcId = null`) before deleting. Creation
returns `201`.

**Errors:** `400` blank title; `404` unknown notebook; `403` without notebook
authority.

### `PATCH /api/campaigns/{campaignHandle}/wiki-pages/assign-notebook`

Files a page into an arc (`{ pageId, notebookArcId | null }`, both validated
as belonging to the campaign). Same notebook authority as above.

### `POST /api/campaigns/{campaignHandle}/session-timeline/new`

Creates a session timeline point. Requires membership.

### `GET /api/campaigns/{campaignHandle}/session-timeline/next-published`

Returns the nearest future published session, or `{ session: null }`.
Member-only.

### `GET /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}`

Returns the timeline point. Member-only; `404` when unknown.

### Session schedule

#### `GET /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/schedule`

Reads the schedule (planned start/end, timezone, venue, location page,
status). Member-only.

#### `PATCH /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/schedule`

Upserts the schedule (empty strings become null). Requires the
notes-moderation capability. Changing time, venue, or location on a published
session notifies all members (`SESSION_CHANGED`); moving to cancelled
notifies (`SESSION_CANCELLED`).

#### `POST /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/schedule/publish`

Publishes (`PUBLISHED`, `publishedAt = now`) and notifies
(`SESSION_PUBLISHED`, with or without a start time). Requires the
notes-moderation capability.

### Attendance and personal notes

#### `GET /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/attendance`

Full member roster with status/note plus attending/absent/late/maybe/no-response
totals. Requires notes moderation.

#### `GET /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/attendance/me` and `PATCH /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/attendance/me`

Reads/updates the caller's RSVP. Updating validates `status` against the enum
(`400` otherwise), trims the note, saves, and schedules a debounced (5-minute)
RSVP digest to operational managers.

#### `POST /api/campaigns/{campaignHandle}/session-timeline/{timelinePointId}/notes/me`

Saves the caller's personal notes for the session. Requires membership.

## Webhooks and Discord

Outbound integrations are Gamemaster-configured, campaign-scoped delivery
surfaces. Secrets and webhook URLs are never returned in full: list responses
expose `hasSecret` / `connected` markers instead, and create/rotate calls
reveal the secret exactly once.

### Webhooks

All webhook routes require Gamemaster settings authority.

- `GET /api/campaigns/{campaignHandle}/webhooks/catalog` — available event
  subscriptions.
- `GET /api/campaigns/{campaignHandle}/webhooks` — registered endpoints (URLs
  masked).

#### `POST /api/campaigns/{campaignHandle}/webhooks`

Registers an endpoint: trimmed `name` (max 120, required), validated
subscriptions, a valid HTTPS URL, and a secret of at least 24 characters (or
a server-generated 32-byte secret; `enabled` defaults true). Returns
`201 { endpoint, secret }`.

**Errors:** `400` bad name, subscriptions, URL, or short secret.

#### `PATCH /api/campaigns/{campaignHandle}/webhooks/{webhookId}`

Updates name, URL, subscriptions, or enabled flag; re-enabling clears
suspension and failure counters. `404` when unknown.

#### `DELETE /api/campaigns/{campaignHandle}/webhooks/{webhookId}`

Removes the endpoint (`204`).

#### `POST /api/campaigns/{campaignHandle}/webhooks/{webhookId}/rotate-secret`

Issues a new secret (returned once).

#### `POST /api/campaigns/{campaignHandle}/webhooks/{webhookId}/test`

Queues a `webhook.test` delivery for background dispatch (`202`).

#### `GET /api/campaigns/{campaignHandle}/webhooks/{webhookId}/deliveries`

Latest 100 deliveries.

#### `POST /api/campaigns/{campaignHandle}/webhook-deliveries/{deliveryId}/redeliver`

Re-queues only terminal (`FAILED|SUCCEEDED`) deliveries to pending (`202`);
anything else returns `409`.

**Errors:** `400` bad name, subscriptions, URL, or short secret; `404`
unknown endpoint; `409` redelivering a non-terminal delivery.

### Discord destinations

Same authority and shape as webhooks, targeting Discord webhook URLs.

- `GET /api/campaigns/{campaignHandle}/discord/catalog` — available Discord
  subscriptions.
- `GET /api/campaigns/{campaignHandle}/discord` — registered destinations
  (URLs never exposed).

#### `POST /api/campaigns/{campaignHandle}/discord`

Registers a destination: name (max 120), validated subscriptions, a URL
matching `https://discord.com|discordapp.com/api/webhooks/{id}/{token}`
(query/hash stripped), and defaulted `announcementOptions`. Returns `201`.

**Errors:** `400` bad name, subscriptions, or URL.

- `PATCH /api/campaigns/{campaignHandle}/discord/{destinationId}` — same
  validation; re-enabling clears suspension/failures. `404` when unknown.
- `DELETE /api/campaigns/{campaignHandle}/discord/{destinationId}` — removes
  the destination (`204`).
- `POST /api/campaigns/{campaignHandle}/discord/{destinationId}/test` —
  queues a `discord.test` delivery for background dispatch (`202`).
- `GET /api/campaigns/{campaignHandle}/discord/{destinationId}/deliveries` —
  latest 100 deliveries.

## Quests, locations, and presence

### Quest time pressure

#### `POST /api/campaigns/{campaignHandle}/quests/{pageId}/time-pressure/touch`

Refreshes the quest timeline at the campaign epoch. Requires the quest-edit
capability plus an elevated wiki role.

#### `POST /api/campaigns/{campaignHandle}/quests/{pageId}/time-pressure/resolve`

Resolves pressure with `{ action: fail|extend|dismiss, extendEpochMinute? }`:
`fail` transitions the lifecycle to failed; `dismiss` writes an idempotent
dismissal receipt keyed by page-plus-deadline; `extend` requires a parseable
`extendEpochMinute` and merges quest-time rules into page metadata. Same
authority as touch.

**Errors:** `400` bad action, no authored deadline, or missing/invalid
`extendEpochMinute`; `404` quest not found.

Related: [Narrative knowledge](narrative-knowledge.md) (lifecycle, branches),
[Chronology](chronology.md) (time advance drives pressure).

### Location visits

#### `POST /api/campaigns/{campaignHandle}/locations/{pageId}/visits`

Records a party visit at the current epoch (optional
`{ sessionTimelinePointId }`), capturing separate GM and party views and
creating a `PARTY_VISIT` snapshot plus a region-visit row. Requires
chronology management. Returns `201 { visit }`.

**Errors:** `400` without a resolvable scope; `404` unknown location.

- `GET /api/campaigns/{campaignHandle}/locations/{pageId}/visits/latest` and
  `GET /api/campaigns/{campaignHandle}/locations/{pageId}/since-last-visit` —
  latest visit and what changed since. Member-only.
- `GET /api/campaigns/{campaignHandle}/locations/{pageId}/visit-suggestions` —
  suggested visits. Requires Gamemaster settings authority.
- `POST /api/campaigns/{campaignHandle}/locations/{pageId}/visit-suggestions/{suggestionId}/promote` —
  promotes a suggestion. Requires chronology management.
- `POST /api/campaigns/{campaignHandle}/locations/{pageId}/visit-suggestions/{suggestionId}/dismiss` —
  dismisses a suggestion. Requires Gamemaster settings authority.

Related: [Narrative knowledge](narrative-knowledge.md) (snapshots).

### Presence reveal

#### `POST /api/campaigns/{campaignHandle}/presence/reveal`

Bulk-sets discovery state for entity references (`{ refs: [{ entityType,
entityId, subEntityId? }], state = REVEALED|HIDDEN|DRAFT,
availableFromEpochMinute?, workflowKey?, reason? }`; empty refs return `400`).
Requires the discovery-reveal capability. Returns `{ updated }`.

- `POST /api/campaigns/{campaignHandle}/presence/reveal/preview` — counts
  targets by type without mutating. Same authority.

Related: [Wiki pages](wiki-pages.md) (visibility vs. discovery),
[Maps](maps.md) (map reveal).

### Creative drift

Creative-drift signals and dispositions are documented in
[Narrative knowledge](narrative-knowledge.md).

## Authoring metrics, source providers, and applications

### `GET /api/campaigns/{campaignHandle}/authoring/growth-metrics`

Computed growth counters (NPCs, active threads, scenes, factions, active
quests). Requires page-edit-any authority.

### `POST /api/campaigns/{campaignHandle}/authoring/writing-session`

Logs a writing session (`{ pageId, pageTitle?, durationMs, wordDelta,
linksAdded }`). Requires page-edit-any authority. Sessions under one second
with no words and no links are a no-op `204`; otherwise records the session
(`204`). `400` when `pageId` is missing.

### Source providers (campaign-ID addressed)

Mounted on the top-level router with campaign-ID attachment plus membership
(note `{campaignId}`, not handle):

- `GET /api/campaigns/{campaignId}/source-providers` — enabled providers.
- `GET /api/campaigns/{campaignId}/sources/search` — searches enabled
  providers (`q` required, trimmed, max 256; `limit` default 20 clamped 1–50;
  optional `providerId`). `400` when `q` is empty.
- `POST /api/campaigns/{campaignId}/sources/resolve` and
  `POST /api/campaigns/{campaignId}/sources/open-target` — refresh
  cached source metadata / resolve a safe open target from `{ reference }`.
  Unresolvable references return `404`.

### `POST /api/campaigns/fantasy-calendar/import-preview`

Validates a fantasy-calendar payload for the creation wizard (no campaign
scope). See [Chronology](chronology.md) for the import model.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
