# Wiki & Lore

Esiana’s wiki is a hierarchical, block-based lore system for characters, locations, items, and custom folders. Pages support visibility levels, wikilinks, templates, and backlinks.

---

## What it does

- **Tree structure** — nested folders and pages with `parentId` hierarchy
- **Block editor** — rich text (TipTap), images, infoboxes, stat blocks, layout grids
- **Visibility** — Public, Party, or GM-only per page (who may read once known)
- **Discovery** — hidden-until-revealed presence; see [Discovery & revelation](discovery-and-revelation.md)
- **Narrative status** — GM-authored canon status on pages (active, rumored, secret, …) — distinct from discovery
- **Wikilinks** — `[[Page Title]]` syntax with backlink graph and broken-link guard
- **Template Studio** — per-folder page templates; system admins manage global defaults
- **Category index** — discover pages by entity type with ancestral location tags
- **Bookmarks** — pin frequently used pages
- **Character routes** — dedicated `/characters/:characterId` views

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **DM / Co-DM** | Create, edit, delete; all visibility levels; Template Studio |
| **Member / Player** | Edit party-visible pages (campaign policy dependent) |
| **Viewer** | Read public and party-visible content |
| **System admin** | Global default templates (Admin → Page Templates) |

---

## Where to find it

| Area | Route / nav |
|------|-------------|
| Wiki tree | `/c/:campaignSlug/wiki` |
| Single page | `/c/:campaignSlug/wiki/:pageId` |
| Category index | Wiki → category hubs |
| Tags hub | `/c/:campaignSlug/tags` |
| Template Studio | Campaign → Templates |
| Characters | `/c/:campaignSlug/characters/:characterId` |
| Recent changes | `/c/:campaignSlug/recent-changes` |

---

## Key options

| Option | Where |
|--------|-------|
| Page visibility (Public / Party / GM only) | Page editor → visibility control |
| Content presence / revelation | Page tools — [Discovery & revelation](discovery-and-revelation.md) |
| Sidebar section order | [Campaign settings](../options/campaign-settings.md) → Sidebar |
| Hide system default templates | Campaign Settings → Templates / `templateSettings` |
| Upload size limits | [System admin settings](../options/system-admin-settings.md) → Uploads |
| Global page templates | Admin → Page Templates |

---

## Tips for GMs

- Use **breadcrumbs** to navigate deep location hierarchies
- **Rename** pages carefully — wikilink integrity guard updates link text on rename
- **Parent deletion** uses secure workflows to prevent accidental cascading wipes
- Import bulk lore via the [campaign wizard](campaign-hub.md) and [import guide](../data-management/import-formats.md)

---

## Related docs

- [Discovery & revelation](discovery-and-revelation.md)
- [Campaign hub](campaign-hub.md) — creation wizard and import
- [Maps & cartography](maps-and-cartography.md) — link wiki locations to map pins
- [Data backup & export](data-backup-and-export.md) — sovereign Markdown export in ZIP
- [Import formats](../data-management/import-formats.md) — folder naming for Obsidian / Notion migration
- [`esiana-core/docs/viewport-audit.md`](../esiana-core/docs/viewport-audit.md) — mobile UX notes
