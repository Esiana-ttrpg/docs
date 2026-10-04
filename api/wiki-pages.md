# Wiki pages API

Wiki pages are Esiana's canonical content substrate: lore, characters, quests,
threads, session notes, and more are pages with TipTap block JSON, hierarchy
(`parentId`), a visibility tier, and an optional template.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

Routes are campaign-scoped:

```text
/api/campaigns/{campaignHandle}/wiki/...
```

## Page model and lifecycle

```text
POST /wiki (or markdown preview → create, or document upload)
    ↓
PATCH :pageId (rename / reparent / tags) + PATCH layout (blocks) + PATCH metadata + PATCH visibility
    ↓
POST :pageId/transform (optional module switch)
    ↓
preview / backlinks / outlinks / link-integrity / continuity checks
    ↓
GET :pageId/delete-preview → DELETE { mode, confirm (, confirmPhrase) }
```

### `POST /api/campaigns/{campaignHandle}/wiki`

Creates a page (`title` required; optional `parentId`, `metadata`, `blocks`,
`tags`, `visibility` defaulting to `Party`, thread/scene lifecycle seeds,
temporal envelope, and an `id` restricted to `event-<id>` lore pages).
Falls back to default blocks per entity category, seeds quest/thread lifecycles,
assigns the workspace path, applies default ownership, and prepares a
narrative-status row. Requires membership, non-observer status, and
page-creation authority.

**Errors:** `400` missing title, bad lore ID, or bad parent/tags/blocks;
`404` unknown parent; `409` lore page already exists.

### `GET /api/campaigns/{campaignHandle}/wiki/tree`

Navigation tree over non-deleted pages, with quick-access titles, the campaign
sidebar configuration, and role filtering. Returns `{ tree, campaign, players,
playerSessionNotesFolderTitle }`. Member-only; invisible pages are filtered,
not errored.

### `GET /api/campaigns/{campaignHandle}/wiki/{pageId}`

Returns the page (event-lore content included). Member-only with a `403`
(`page not visible to your role`) when visibility forbids it and `404` for
missing or soft-deleted pages.

### `GET /api/campaigns/{campaignHandle}/workspace/{workspaceSegment}/{pathKey}`

Stable workspace-path resolution for a page (unknown workspaces and unresolvable
keys return `404`), with the same visibility rules as reading the page
directly.

### `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}`

Renames, reparents, or retags (`parentId|title|tags` only). Rejects circular
parents and cross-module moves, updates the path key on title change, and
incoming links follow the new title. Requires membership, non-observer status,
and edit rights on the page.

**Errors:** `400` circular/invalid parent, cross-module parent, or bad tags;
`404` page or parent not found.

### `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/layout`

Replaces the block array (must be an array; asset references validated;
event-lore descriptions synced). Requires page-edit-any
authority plus edit rights.

### `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/metadata`

Large discriminated metadata patch (quest/thread/scene/objective/arc/org and
bestiary/ancestry/location/character/lineage inputs, appearance assets,
`clearQuest`). Quest edits and clearing require notebook (DM/Co-DM) authority.
Requires membership, non-observer status, and edit rights.

### `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/visibility`

Sets `Public|Party|DM_Only` (anything else is `400`) and returns
`{ visibility, linkedMapObjectCount }`. Requires the
page-visibility-edit capability — the only wiki route gated on it.

### `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/transform`

Switches a page's module (`{ targetModule }`): `character↔bestiary`,
`thread↔quests`, `event-lore→quests`. Rebuilds blocks, strips opposite-side
metadata, and seeds the new lifecycle state (quest `AVAILABLE`, thread
`OPEN`). Requires page-edit-any authority plus edit rights.

### `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/delete-preview` · `DELETE /api/campaigns/{campaignHandle}/wiki/{pageId}`

Deletion is a two-step flow. Preview computes the affected subtree; delete
requires a JSON body `{ mode: orphan|recursive, confirm: true, confirmPhrase?
}`. `orphan` reparents children; `recursive` deletes the subtree but demands
`confirmPhrase` equal to the page title (trimmed), else `422`. Both delete
variants require page-edit-any authority. Success returns `200 { ok, mode,
deletedPageIds }`, not `204`.

### `POST /api/campaigns/{campaignHandle}/wiki/import-markdown-preview`

Validates a Markdown import before creation. Requires non-observer membership
with creation authority.

## Links, backlinks, aliases, and integrity

The wiki has a link index, not full-text search: these endpoints answer "what
points here, what does this point at, and what is broken."

- `GET /api/campaigns/{campaignHandle}/wiki/link-index` — viewer-filtered wikilink index.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/backlinks` — inbound links, role-filtered.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/outlinks` — outbound links parsed from blocks.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/link-integrity` — broken-link report for the page.
- `GET /api/campaigns/{campaignHandle}/wiki/mention-targets` — mentionable users and characters.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/mention-snippet?targetPageId=` — excerpt for a
  mention target (`400` without `targetPageId`; peer visibility filtered).
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/preview` — summary card (`aliases`, inbound-link
  count, word count, codex type). `404` when invisible.

### Aliases

- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/aliases` — lists redirect
  aliases for the page.

#### `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/aliases`

Adds a redirect alias (`{ alias }`, normalized). The page shows a new updated
timestamp on success.

**Errors:** `400` missing/invalid alias; `404` page not found; `409` alias
already exists in this campaign. Returns `201 { alias }`.

- `DELETE /api/campaigns/{campaignHandle}/wiki/aliases/{aliasId}` — removes
  one alias (idempotent `{ ok: true }`).

Mutations require page-edit-any authority.

### Historical aliases

- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/historical-aliases` —
  lists names the subject held over time.

#### `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/historical-aliases`

Records a historical name (`{ name }` required). Patches update the page's
timestamp. Returns `201 { alias }`.

**Errors:** `400` missing name; `404` page not found.

- `PATCH /api/campaigns/{campaignHandle}/wiki/historical-aliases/{aliasId}` —
  renames a historical alias (`404` unknown).
- `DELETE /api/campaigns/{campaignHandle}/wiki/historical-aliases/{aliasId}` —
  removes one (`404` unknown).

Mutations require page-edit-any authority.

### Unresolved wikilinks

- `GET /api/campaigns/{campaignHandle}/wiki/unresolved-wikilinks?sourcePageId&scope&status` —
  open (`status=all` opts out of the default `OPEN` filter) stubs, newest
  first, capped at 200, source-visibility filtered.

#### `POST /api/campaigns/{campaignHandle}/wiki/unresolved-wikilinks/merge`

Points one or more stubs at a real page (`{ normalizedTexts[], targetPageId
}`) and marks the matches resolved.

**Errors:** `400` missing texts or target; `404` target page not found.

#### `POST /api/campaigns/{campaignHandle}/wiki/unresolved-wikilinks/{id}/ignore`

Marks one stub ignored (`404` when unknown).

Mutations require page-edit-any authority.

## Tags, pins, and page surfaces

- `GET /api/campaigns/{campaignHandle}/wiki/tags` — alphabetical tag list
  with icons.
- `GET /api/campaigns/{campaignHandle}/wiki/tags-hub?tagId?` — tag browser
  with visibility filtering, discovery maps, and a management summary for
  elevated callers.

#### `PATCH /api/campaigns/{campaignHandle}/wiki/tags/{tagId}` and `POST /api/campaigns/{campaignHandle}/wiki/tags/{tagId}/icon`

Renames or re-styles a tag (`{ label?, icon?, color? }`); the icon route takes
a multipart `file` (SVG only) and replaces the tag's previous icon. Both
require page-edit-any authority **plus** notebook (DM/Co-DM) authority.

**Errors:** `404` unknown tag; `400` empty label, bad icon/color, or no fields
to update.
- `GET /api/campaigns/{campaignHandle}/wiki/pins` — pinned pages (empty for non-members).
- `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/pin` — toggles the page shortcut (member-only),
  appending sort order and returning the full ordered list.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/party-knowledge` — what the party currently knows
  about the page. Member-only.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/gossip` — rumor feed for an organization page
  (`{ feed, scope, circulations }`; `404` for non-organizations).
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/continuity` and `GET /api/campaigns/{campaignHandle}/wiki/continuity-summary` —
  per-page and campaign continuity payloads, role-aware and spoiler-safe.
- `GET /api/campaigns/{campaignHandle}/wiki/writing-pulse?days=` — the caller's edited-page activity
  (`days` 1–90, default 30; top 20 pages with word counts).
- `GET /api/campaigns/{campaignHandle}/wiki/world-activity?days=` — spoiler-safe campaign activity
  summary (`pagesEdited`, `linksCreated`, `stubsResolved`, message).
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretive-summary` — time-projected interpretive
  summary (see [Narrative knowledge](narrative-knowledge.md)).

## Session notes and notebooks

Session notes are pages anchored to timeline points and optionally filed into
notebook arcs. Reads filter non-manager callers to `Public|Party` and omit
blocks the caller cannot see.

```text
POST /session-timeline/new → ensure author note → PUT /wiki-pages or document upload
    → index / combined / compile / perspectives → assign-notebook / bulk-move / bulk-delete
```

- `GET /api/campaigns/{campaignHandle}/wiki/session-notes/index` — arcs plus timeline anchors and legacy
  notes (`{ canManage, notebooks[{ id, title, displayOrder, pages[] }],
  uncategorized[] }` with per-page edit/delete flags and timeline anchors).
- `GET /api/campaigns/{campaignHandle}/wiki/session-notes/combined?timelinePointId|sessionGroupId|pageId` —
  aggregated author pages with entity titles and references (`404` unknown
  session).
- `GET /api/campaigns/{campaignHandle}/wiki/session-notes/compile?sessionPageId&notebookArcId&timelineFrom&timelineTo&orderBy=timeline|updated` —
  compiled notes for an elevated or own view.
- `GET /api/campaigns/{campaignHandle}/wiki/session-notes/{pageId}/perspectives` — per-author
  perspectives on one session page.
- `GET /api/campaigns/{campaignHandle}/wiki/session-notes/player/{playerId}` — one player's notes.
  Requires Gamemaster settings authority.
- `POST /api/campaigns/{campaignHandle}/wiki-pages/upload` — imports `.txt`/`.docx`/`.md` (frontmatter
  parsed for Markdown) into the Player Session Notes folder as a `Party`
  session note authored by the caller (`201 { page }`). Requires membership.
- `PUT /api/campaigns/{campaignHandle}/wiki-pages/{pageId}` — edits a session note's title (sliced to
  120) and content (single session-note block); links and renames follow the
  edit.
- `DELETE /api/campaigns/{campaignHandle}/wiki-pages/{pageId}` — deletes a session note (leaf directly;
  parents need the same orphan/recursive confirmation body as wiki delete).
- `PATCH /api/campaigns/{campaignHandle}/wiki-pages/assign-notebook`, `PATCH /api/campaigns/{campaignHandle}/wiki-pages/bulk-move`,
  `POST /api/campaigns/{campaignHandle}/wiki-pages/bulk-delete` — file one page into an arc, move many
  session notes, or delete many (expanding session groups, timelines, and
  pages; returns counts). All require notebook (DM/Co-DM) authority; bulk
  delete additionally requires page-edit-any authority.

Related: [Campaigns](campaigns.md) (timeline, schedule, attendance).

## Hubs and indexes

Hubs are composed, role-filtered entry points over page subtrees — not raw
page reads.

- `GET /api/campaigns/{campaignHandle}/wiki/index/{pageId}` — browses a category's children with
  visibility passthrough and per-child discovery state.
- `GET /api/campaigns/{campaignHandle}/wiki/quests-hub` and `GET /api/campaigns/{campaignHandle}/wiki/quests-hub/{pageId}` — quest
  hub by system key or subtree root (`404` without a quests category).
- `GET /api/campaigns/{campaignHandle}/wiki/threads-hub` and `GET /api/campaigns/{campaignHandle}/wiki/threads-hub/{pageId}` —
  narrative-thread hub, same addressing rules.
- `GET /api/campaigns/{campaignHandle}/wiki/adventure-hub` and `GET /api/campaigns/{campaignHandle}/wiki/adventure-hub/{pageId}` —
  adventure hub aggregating quests, scenes, threads, pressure feed, topology,
  and clue/foreshadowing scans.
- `GET /api/campaigns/{campaignHandle}/wiki/character-hub/{pageId}` — character hub payload
  (`?previewAsPlayer=` supported; `404` without a characters category).
- `GET /api/campaigns/{campaignHandle}/wiki/downtime-hub` and `GET /api/campaigns/{campaignHandle}/wiki/downtime-hub/{pageId}[?section=]` —
  downtime hub (`section` selects overview simulation snapshot vs.
  world-events/projects/havens/reputation/ledger branches; elevated callers
  see extra planning data). `404` for non-downtime categories. See
  [Downtime](downtime.md).
- `GET /api/campaigns/{campaignHandle}/wiki/tags-hub` — tag browser (above).

## Character sheets: fields and pages

Character pages carry structured fields and tabbed sheets. Both surfaces share
one access rule (no separate capability gate): unknown/non-character pages
return `404`, invisible characters return `403`, and writes require edit rights
on the character.

### Character fields

Typed fields (`STRING|NUMBER|BOOLEAN|DATE|ENUM|JSON`) on a character page.
Reads omit unreadable, unavailable, or hidden-tab fields, and plugin fields
appear automatically. Limits: `maxLength` 0–10000, `options` capped at 100
entries of 200 characters, optional required/min/max; regular-expression
patterns are rejected.

- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/character-fields` —
  lists fields.

#### `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/character-fields`

Adds a field (`label` plus a valid type required; values validated). Editing
someone else's character requires edit rights on that character (`403`
otherwise). Returns `201 { field }`.

**Errors:** `400` missing label, invalid type, or invalid value; `404`
character not found or `pageId` is not a page of this character.

#### `PUT /api/campaigns/{campaignHandle}/wiki/{pageId}/character-fields/{fieldId}`

Writes a field value (`{ value }`). Returns `{ field }`.

**Errors:** `400` invalid value; `403` read-only field; `404` unknown field;
`409` plugin provider unavailable.

#### `DELETE /api/campaigns/{campaignHandle}/wiki/{pageId}/character-fields/{fieldId}`

Deletes a field (`204`). Provider-managed fields cannot be deleted (`400`).

### Character pages (tabs)

- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages` —
  merges core tabs (overview-first) with stored custom tabs and virtual plugin
  definitions (editors only), filtering unavailable, elevated-only, hidden,
  and invisible tabs.
- `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages` —
  creates a custom tab (title 1–100, `201`).
- `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/order` —
  reorders tabs (`{ keys[] }`, overview first, unique; `204`).
- `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}` —
  renames or hides a tab (core tabs accept only `hidden`; overview is
  immutable).
- `PUT /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}/blocks` —
  replaces canvas-tab blocks (max 200, asset references validated).
- `DELETE /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}` —
  deletes custom/API tabs only (`204`; core tabs are never deletable).

#### `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/materialize`

Creates a stored tab from a plugin definition (`{ pluginId, sourceKey }`;
safe to retry). Returns `201`.

**Errors:** `404` definition not found.

#### `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}/duplicate`

Duplicates a non-core tab. Returns `201 { page, conversion }`.

#### `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}/plugin-data` and `PUT /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}/plugin-data`

Reads/writes plugin-owned tab data.

**Errors:** `409` provider unavailable or stale schema; `413` over 256 KB.

#### `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/character-pages/{tabId}/remove-plugin`

Detaches a plugin (`{ mode: RETAIN_DATA|CONVERT_TO_CUSTOM|DELETE_DATA }`).
Requires plugin-management authority. Returns `204`.

## Interpretations, lore claims, map bindings

These wiki-addressed writes belong to the knowledge layer; the mechanics live
here, the concepts in [Narrative knowledge](narrative-knowledge.md).

- `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretation-groups` and
  `PATCH` / `DELETE /api/campaigns/{campaignHandle}/wiki/interpretation-groups/{groupId}` —
  schools of thought over a page. Mutations require page-edit-any authority.
- `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretation-accounts` and
  `PATCH` / `DELETE /api/campaigns/{campaignHandle}/wiki/interpretation-accounts/{accountId}` —
  specific tellings (`title` required on creation). Same authority.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/interpretations` — the
  full interpretation bundle.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/lore-claims` — lists
  structured lore claims (role-filtered).
- `PATCH` / `DELETE /api/campaigns/{campaignHandle}/wiki/lore-claims/{claimId}` —
  edits or removes a claim (`404` unknown; delete returns `200 { ok: true }`).
  Mutations require page-edit-any authority.

#### `POST /api/campaigns/{campaignHandle}/wiki/{pageId}/lore-claims`

Adds a structured lore claim (`statement` required). Returns `201 { claim }`.

**Errors:** `400` missing statement; `404` page not found.
- `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/map-asset` — binds a map asset (`{ mapAssetId |
  null }`; non-null values must be real map assets, else `400`). Requires map
  editing authority. Inverse binding: `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/link-page`.
- `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/map-object-impact` — counts linked map objects (used
  before page deletes; returns a count even for unknown pages).
- `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/metadata` — quest/thread/scene lifecycle seeds
  (quest edits need notebook authority).

## User guide

[Wiki & lore](../features/wiki-and-lore.md) · [Discovery &
revelation](../features/discovery-and-revelation.md) ·
[Discovery system](../architecture/discovery-system.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
