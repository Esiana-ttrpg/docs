# Maps & Cartography

Interactive high-resolution maps with coordinate pins linked to wiki entities.

---

## What it does

- **Maps hub** — list campaign cartography assets
- **Map viewer** — Leaflet canvas over display-resolution imagery
- **Map pins** — `x`, `y` coordinates linked to wiki pages or nested maps
- **Pin revelation** — pins respect discovery/presence like wiki entities
- **Temporal scrub** — view map state at a campaign date
- **Ghost Mode** — Game Master preview of party-visible pins only (map viewer toolbar)
- **Hover previews** — pin cards summarizing linked entities
- **Map settings** — display name, visibility, wiki location binding
- **Asset pipeline** — automatic display + thumbnail variants; optional full-resolution preserve for DMs

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **DM / Co-DM** | Upload maps, place pins, configure visibility |
| **Party** | View maps and pins at permitted visibility |
| **Viewer** | Public-visible maps only |

---

## Where to find it

| Area | Route / nav |
|------|-------------|
| Maps hub | `/c/:campaignSlug/maps` |
| Map viewer | `/c/:campaignSlug/maps/:mapId` |
| Map settings | Map viewer → Settings |
| Wiki-bound maps | Wiki pages in Maps category with `mapAssetId` |

---

## Key options

| Option | Where |
|--------|-------|
| Map upload size limit | [System admin settings](../options/system-admin-settings.md) → `mapMaxUploadSizeMb` |
| Display max edge | Admin Uploads or `MAP_DISPLAY_MAX_EDGE` env |
| Thumbnail max edge | Admin Uploads or `MAP_THUMB_MAX_EDGE` env |
| Preserve full resolution | Admin Uploads or `MAP_PRESERVE_FULL_RES` env |
| Page visibility | Wiki page visibility applies to linked content |
| Pin revelation | Per-pin presence — [Discovery & revelation](discovery-and-revelation.md) |

For large deployments, optional S3-compatible object storage (R2, MinIO, etc.) can offload media — see [`esiana-core/docs/deployment/object-storage.md`](../esiana-core/docs/deployment/object-storage.md).

---

## Upload tips

- Large battle maps are downscaled to **display** variant for the canvas; originals may be kept when preserve-full-res is on
- Pin coordinates lock to display variant dimensions stored on the `Asset` row
- Use **Locations** wiki folders during import to prep geo-linked lore ([Import formats](../data-management/import-formats.md))

---

## Related docs

- [Discovery & revelation](discovery-and-revelation.md)
- [Wiki & lore](wiki-and-lore.md)
- [System admin settings](../options/system-admin-settings.md)
- [Limits & quotas](../options/limits-and-quotas.md)
- [Environment variables](../options/environment-variables.md)
- [`esiana-core/docs/deployment/object-storage.md`](../esiana-core/docs/deployment/object-storage.md)
