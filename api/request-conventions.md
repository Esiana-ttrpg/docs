# API request and response conventions

Use `/api/docs` on the running instance for exact parameters, media types,
schemas, and status codes. The following conventions apply across the core API.

## Request formats

- Most request and response bodies use `application/json`.
- File and image uploads use `multipart/form-data`; field names and size limits
  are operation-specific (`image` for asset uploads, `document` for wiki
  imports, `avatar` for profile avatars, wizard fields such as `coverImage`,
  `markdownZipFile`, and `backupZipFile` for campaign creation).
- Download operations may stream content directly or return a `302` redirect to
  a storage-provider URL. Clients should follow redirects and use the returned
  `Content-Type`; do not assume every successful asset response is JSON.
- Query parameters are operation-specific. Unknown fields and parameters are
  not guaranteed to be retained or ignored in future releases.

## Campaign identifiers

Most narrative and campaign-scoped paths use `{campaignHandle}`, the URL handle
resolved by the campaign scope. Several campaign container, plugin, pin,
and administration operations use a database campaign `{id}` or `{campaignId}`
instead — those top-level routes generally accept either the ID or the handle.

One current compatibility route for campaign applications is mounted with both
`:id` and `:campaignId`; the OpenAPI contract represents the equivalent URL
shape once. Follow the parameter documented for the operation rather than
substituting an ID for a handle or vice versa.

## Responses

Successful JSON responses commonly return a resource, a named collection, or
`{ "ok": true }`:

| Code | Meaning |
|------|---------|
| `200` | Success (including deletes that return a confirmation body) |
| `201` | Resource created (pages, claims, webhooks, notebooks, aliases, keyframes, pins, tokens, campaigns) |
| `202` | Background work accepted (async backup export/restore, webhook test/redeliver, Discord test) — follow up via tasks or the returned `taskId` |
| `204` | Success with an empty body (many capability-gated deletes, no-op writing sessions) |

Creation generally returns `201`; queued background work returns `202`.
Downloads use the media type documented by the operation. Server-sent events
(`GET /api/campaigns/{campaignHandle}/events`) stream `text/event-stream` with
a 25-second heartbeat and per-event visibility filtering — they are transient
invalidation signals, so refetch the canonical resource on receipt.

## Errors

Errors normally use:

```json
{
  "error": "Human-readable explanation"
}
```

Some conflict responses add a machine-readable `code` (for example
`INVALID_LIFECYCLE_TRANSITION` with `fromState`/`toState`/`allowedTargets`, or
`archived_compare` for snapshot comparison). Common statuses are:

| Status | Meaning |
|--------|---------|
| `400` | Invalid parameters, body, upload, or state transition |
| `401` | Authentication required or invalid |
| `403` | Authenticated but not authorized |
| `404` | Missing resource, or protected resource intentionally concealed |
| `409` | Conflict with existing state (already a member, pending transfer, terminal project, archived snapshot) |
| `410` | Resource, such as a temporary asset or stale ownership transfer, has expired |
| `422` | Semantically unprocessable (recursive-delete confirmation mismatch, releasing not-ready journal content) |
| `429` | Rate limit exceeded; inspect `Retry-After` |
| `500` | Unexpected server error |

Clients should branch on HTTP status and treat `error` as explanatory text, not
a stable machine-readable code unless an operation explicitly documents a
`code` field.

## Pagination, filtering, and sorting

There is no single global pagination scheme; each list documents its own
parameters in `/api/docs`, but the recurring patterns are:

- `page` / `limit` with clamping (activity feed defaults `page=1, limit=20`,
  clamped `1–100`; journal library `limit` clamped `1–100`, default `30`;
  admin user lists default `1/10`, max `50`; recruitment lists cap `48`).
- Cursor pagination with `cursor` + `nextCursor` (journal library/planner,
  notifications with `limit 1–50`, default `20`).
- Bounded recent lists without pagination (webhook/Discord deliveries return
  the latest 100; snapshots list the latest 50).
- CSV query values for multi-select (`subjectIds`, `ids`, `kinds`, `checks`,
  `layerIds`, `domains`) and `field==='true'` string flags (`comparableOnly`,
  `includeTerminal`, `includeArchived`, `sessionLinkedOnly`,
  `includeSuppressed`, `previewOnly`).
- `days` windows for activity aggregates, clamped `1–90` and defaulting to
  `30`.
- Sort options where offered (`newest|oldest|type` on the journal library;
  `orderBy=timeline|updated` on session-note compilation; name/title ordering
  on categories, layers, and maps).

## Identifiers and idempotency

- Wiki pages, assets, and most resources use opaque string IDs; calendar epoch
  positions serialize `BigInt` values as strings (`currentEpochMinute`,
  `targetEpochMinute`, `anchorEpochMinute`).
- Lore-scoped pages use stable prefixed IDs (`event-<id>`); event-consequence
  lore pages are addressable as `event-{eventId}`.
- World-advance application accepts an optional `batchIdempotencyKey`
  (generated when omitted); workshop bootstrap is idempotent per
  author-plus-anchor; quest dismissal receipts are idempotent per
  page-plus-deadline.
- Empty-string semantics vary by operation: schedule PATCH treats `""` as
  null, while some PATCH operations treat absent and null differently (clear vs.
  keep). Follow the per-operation notes in these guides.

## Rate limits

Limiters guard authentication, campaign applications, invite email, token
minting, workshop drafts, and asset URL imports. Quotas and windows are
operator configuration, not contract; on `429`, back off per `Retry-After`
rather than inferring limits from these guides.
