# Maps API

Maps are world-history views, not tactical battle simulators: map assets with
pins targeting entity pages, scene objects with temporal projection, and
discovery-gated rendering. Each map is an asset of type `map` with wiki pages
optionally linked to them.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

```text
POST /uploads { type: map } (or POST /assets/import-url) → 201 { asset }
    ↓
PATCH /maps/{assetId} (displayName, visibility, imageCredit) + link a wiki page
    ↓
POST layers | groups | pins (or quickCreate) | objects (or auto scene objects from pins)
    ↓
POST presentation-presets + keyframes
    ↓
POST /maps/{assetId}/reveal (discovery-reveal) → verify via GET scene
```

Reads are member-level with two-stage visibility (role visibility **and**
party discovery for non-GM/Writer callers; GMs/Writers see everything with a
null discovery summary). Mutations require the map-editing capability.
Unknown, wrong-campaign, wrong-type, or invisible maps return `404` by design
(concealment, not `403`).

---

## User guide

[Maps & cartography](../features/maps-and-cartography.md)

## Map assets

### `GET /api/campaigns/{campaignHandle}/maps`

Lists maps newest-first with linked pages (first wiki page carrying the
asset, by title), pin counts, nested in/out map references, and
display titles. Party callers additionally pass discovery: undiscovered linked
maps are filtered, with `{ maps, discoverySummary:
{ discoveredCount, undiscoveredCount } }`.

### `GET /api/campaigns/{campaignHandle}/maps/{assetId}`

One map with `{ map, linkedWikiPages }`.

### `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}`

Updates `displayName` (trimmed, null-cleared), `visibility` (must be a valid
tier, else `400`), and `imageCredit` (object-or-null, normalized). At least
one field must be present. Requires map-editing authority.

### `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/link-page` · `PATCH /api/campaigns/{campaignHandle}/wiki/{pageId}/map-asset`

Two directions of the same binding: link a wiki page to a map asset, or set a
page's map asset (null unlinks). Linking a page clears other pages' bindings
at the same time. Unknown pages return `404`; non-map assets return `400`.
Both require map-editing authority.

### `GET /api/campaigns/{campaignHandle}/wiki/{pageId}/map-object-impact`

Counts map objects linked to a page (check before page deletes; returns a
count even for unknown pages). Member-only read.

## Layers and groups

Layers (`{ name, sortOrder, defaultEnabled, color }`, listed by sort order then
name) and groups (`{ name, sortOrder, color }`, editor-only and excluded from
presence) share CRUD semantics:

- `GET /api/campaigns/{campaignHandle}/maps/{assetId}/layers` and
  `GET /api/campaigns/{campaignHandle}/maps/{assetId}/groups` — member reads
  (maps must have dimensions set, else `404`).
- `POST /api/campaigns/{campaignHandle}/maps/{assetId}/layers` and
  `POST /api/campaigns/{campaignHandle}/maps/{assetId}/groups` — creates
  (trimmed `name` required, else `400`; layers default `defaultEnabled` to
  true unless explicitly false). Requires map editing.
- `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/layers/{layerId}` and
  `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/groups/{groupId}` —
  sparse updates (empty layer bodies are accepted no-ops; mismatched IDs
  return `404`). Requires map editing.
- `DELETE /api/campaigns/{campaignHandle}/maps/{assetId}/layers/{layerId}` and
  `DELETE /api/campaigns/{campaignHandle}/maps/{assetId}/groups/{groupId}` —
  nulls member objects' references first, then deletes (`204`; `404`
  unknown).

## Scene objects and overlays

Scene objects are positioned map features with visibility, revelation state,
epoch bounds, layer/group assignment, and optional target pages.

#### `POST /api/campaigns/{campaignHandle}/maps/{assetId}/objects`

Creates a scene object (`kind` defaulting to `region`, must be
`region|label|path`; geometry object **or** display-pixel `x,y` converted to
normalized coordinates, else `400`; visibility default `PUBLIC`, revelation
default `REVEALED`). Requires map editing. Returns `201 { object: { id } }` —
refetch the scene for the full object.

#### `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/objects/{objectId}`

Sparse patch (label, layer/group, visibility, revelation, targets, style, sort
order, geometry or `x,y`, epoch bounds). With `regenerateFlowOverlay: true`,
recomputes the flow overlay and returns `{ ok: true, regenerated: true }`
without applying other fields. Requires map editing.

#### `POST /api/campaigns/{campaignHandle}/maps/{assetId}/objects/{objectId}/confirm-flow`

Confirms a derived flow overlay (lifecycle `CONFIRMED`, derivation `FRESH`,
revelation forced to `REVEALED`; `400` when the object vanished). Requires map
editing.

- `DELETE /api/campaigns/{campaignHandle}/maps/{assetId}/objects/{objectId}` —
  deletes (`204`), but pin-backed objects are blocked (`400`: delete the pin
  instead). Requires map editing.
- `GET /api/campaigns/{campaignHandle}/maps/objects/{objectId}/keyframes` and
  `POST /api/campaigns/{campaignHandle}/maps/objects/{objectId}/keyframes` and
  `DELETE /api/campaigns/{campaignHandle}/maps/objects/{objectId}/keyframes/{keyframeId}` —
  temporal overrides listed by epoch (presence/style/geometry/visibility/
  revelation flags with string epochs). Creation requires
  `effectiveEpochMinute` (`201`); deletion returns `204` (`404` unknown). Note
  the path nests under `/maps/objects/`, not under the asset. Requires map
  editing throughout.

## Pins

Pins point at wiki pages, other map assets, or quick-created pages, and keep
synced scene objects plus graph relations up to date.

- `GET /api/campaigns/{campaignHandle}/maps/{assetId}/pins` — invalid pins
  are removed first, then invisible ones are dropped (not errored).
  Non-elevated callers get invisible targets nulled; elevated callers see all
  plus secrecy markers.

#### `POST /api/campaigns/{campaignHandle}/maps/{assetId}/pins`

Creates a pin (finite `x`/`y` or `x_coordinate`/`y_coordinate` required;
`pinType` validated, default `Location`). Requires a target: `targetPageId`
(must exist in-campaign), `targetAssetId` (must be a map asset), or
`quickCreate.title` (auto-creates a `Party`-visible wiki page under a
type-mapped folder). Requires map editing.

**Errors:** `400` missing coordinates, missing target, or bad target
reference.

#### `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/pins/{pinId}`

Updates coordinates, label, type, targets, or `revelation` (must be
`REVEALED|HIDDEN|DRAFT`; empty updates are `400`). Stripping both targets
deletes the pin in the same call and returns **`409 Pin would have no targets
and was removed`**. Revelation changes reach synced scene objects. Requires
map editing.

- `DELETE /api/campaigns/{campaignHandle}/maps/{assetId}/pins/{pinId}` —
  deletes, removing its graph relations. Requires map editing.
- `GET /api/campaigns/{campaignHandle}/maps/pins/{pinId}/preview` — hover
  card (`{ title, excerpt, visibility, wikiPageId, targetAssetId,
  thumbnailUrl }`), accepting pin or pin-backed scene-object IDs. `404`
  covers invisible pins. Member-only.

## Presentation presets, scene, and reveal

- `GET /api/campaigns/{campaignHandle}/maps/{assetId}/presentation-presets` and
  `POST /api/campaigns/{campaignHandle}/maps/{assetId}/presentation-presets` and
  `PATCH /api/campaigns/{campaignHandle}/maps/{assetId}/presentation-presets/{presetId}` / `DELETE /api/campaigns/{campaignHandle}/maps/{assetId}/presentation-presets/{presetId}` —
  saved views (`label` and whole-number `anchorEpochMinute` sent as a string,
  required on creation; `enabledLayerIds` filtered to non-blank strings
  defaulting to `[]`; `sortOrder` truncated, default 0). Reads are
  member-level; mutations require map editing; deletion returns `204`.
- `GET /api/campaigns/{campaignHandle}/maps/{assetId}/scene?viewEpochMinute=&layerIds=&editorGhostMode=&debugPresence=` —
  the rendered scene payload (`{ scene }`) for a role at an epoch, with layer
  filtering and editor ghost/debug modes. Member-only; dimension-less or
  invisible maps return `404`.

#### `POST /api/campaigns/{campaignHandle}/maps/{assetId}/reveal`

Bulk-reveals scene objects (`{ sceneObjectIds[] }`; empty sets return
`{ revealed: 0 }`; any out-of-map ID returns `400`; sets `REVEALED` and
updates discovery state). Requires the discovery-reveal capability.

Related: presence reveal in [Campaigns](campaigns.md); asset streaming and
variants in [Assets](assets.md).

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
