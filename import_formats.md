# Markdown vault import

Guide for importing an external Markdown archive when **creating a campaign** via the hub wizard. This path is for Obsidian-style vault exports (`.zip` of `.md` notes and assets).

For restoring a prior Esiana export, use **Esiana backup** in the same wizard — that pipeline is documented in [Data backup & export](features/data-backup-and-export.md), not here.

---

## What this covers

- Obsidian (or compatible) Markdown ZIP upload on campaign creation
- Folder → module mapping in the wizard
- YAML frontmatter, wikilinks, and embedded images
- Optional Fantasy-Calendar `.json` on the same wizard step

## What this does not cover

| Source | Status |
|--------|--------|
| **Esiana backup ZIP** (`esiana-campaign-backup-v2`) | Separate wizard card — [Data backup & export](features/data-backup-and-export.md) |
| **Notion, Logseq, OneNote, Google Docs** | No direct importer. Export Markdown (or Obsidian-compatible Markdown), then use the Obsidian ZIP path if folder layout fits. |
| **Kanka.io** | Shown in the wizard as planned; not available yet. |
| **Content packs / sample data** | Separate wizard sources — not vault import. |

---

## Wizard workflow

1. Hub → **Create campaign** → **Campaign Source** → **Obsidian**.
2. Upload a `.zip` of your vault. The wizard **scans the ZIP** and lists discovered top-level folders for mapping (see [ZIP layout](#zip-layout)).
3. Review **Source Folder Mapping** — canonical folders (Characters, Locations, Sessions, …) auto-map; **custom folders** (e.g. `Midnight Foxes`) require you to pick a target module before you can proceed.
4. Optionally attach a **Fantasy-Calendar `.json`** (see [Calendars](#fantasy-calendars) below).
5. Finish identity and access steps; import runs in the background after the campaign is created.

The wizard scans the uploaded ZIP and lists **top-level content folders** (after stripping a shared wrapper folder like `Rays Pathfinder/` when present). Canonical names auto-map; unknown folders are highlighted for manual mapping.

During import, notes are placed into typed wiki hubs (Characters, Locations, Session Notes, …). **Unclassified notes are skipped**, not dumped into generic `/pages`. After import, review the **Import Report** page under Game → Rules/Resources for skipped files and classification warnings.

### Classification precedence

```text
Hard skip (dot-folders, Todo.md, …)
  → Explicit frontmatter type (type:, entityType:, …)
  → Wizard folder mapping
  → Canonical folder synonyms
  → Frontmatter tags (supporting)
  → Filename/content inference (loose root files only)
  → Skip
```

Explicit frontmatter wins over folder path. Example: `type: location` in `Characters/Citadel.md` imports as a **Location**.

---

## ZIP layout

```
my-vault.zip
├── NPCs/
│   └── Lord-Varian.md          ← source folder: NPCs
├── Locations/
│   └── Winterfort.md           ← source folder: Locations
├── Sessions/
│   └── Session-03.md           ← source folder: Sessions
└── assets/
    └── portrait.png
```

- Only **`.md`** files are ingested as wiki pages.
- Images (`.png`, `.jpg`, `.jpeg`, `.webp`) in the ZIP can be resolved for embeds.
- If your export wraps everything in one parent folder (`Rays Pathfinder/Characters/...`), the importer strips that wrapper automatically when it is not itself a canonical folder name.
- Imported pages attach to the **campaign wiki skeleton** (e.g. `World/Characters`, `Player Session Notes`) — not ad-hoc module folders or generic `/pages`.

---

## Folder mapping

Auto-match uses **case-insensitive substring** matching after normalizing underscores and hyphens to spaces. A folder named `01 - NPCs` can match `npcs` → **Characters**.

### Auto-match synonyms

| Target module | Synonyms matched |
|---------------|------------------|
| **Characters** | `npcs`, `characters`, `people`, `pc` |
| **Bestiary** | `monsters`, `bestiary`, `creatures`, `enemies` |
| **Ancestries** | `races`, `ancestries`, `lineages`, `species` |
| **Organizations** | `factions`, `guilds`, `organizations`, `sects` |
| **Locations** | `locations`, `settlements`, `cities`, `world` |
| **Maps** | `maps`, `cartography`, `scenes` |
| **Objects** | `items`, `artifacts`, `loot`, `objects` |
| **Families (tree)** | `houses`, `families`, `dynasties` |
| **Game/Rules & Resources** | `rules`, `mechanics`, `handouts` |
| **Game/Quests** | `quests`, `missions`, `plots` |
| **Game/Session Notes** | `session notes`, `sessions`, `recaps`, `logs` |
| **Game/Journals** | `journals`, `personal logs`, `diaries` |
| **Game/Calendars** | `calendar`, `calendars` |
| **Game/Timelines** | `timeline`, `timelines` |
| **Game/Events** | `events` |

### Manual targets

| Target | Use when |
|--------|----------|
| **Ignore Folder** | Skip all Markdown under that folder (`.obsidian`, templates, scratch) |

Custom folders (e.g. `Midnight Foxes`, `Act 3 Notes`) appear in the mapping UI — map them to the appropriate module. Unmapped custom folders block campaign creation.

There is **no Languages import module**. To file language lore under the Languages codex, set `entityCategory: languages` in frontmatter on a mapped folder import.

### Default template types by module

Folder mapping sets wiki **template type** and **entity category** unless frontmatter overrides them:

| Module | Template type | Entity category |
|--------|---------------|-----------------|
| Characters | `CHARACTER` | `characters` |
| Locations | `LOCATION` | `locations` |
| Organizations | `ORGANIZATION` | `organizations` |
| Families (tree) | `FAMILY` | `families` |
| Game/Session Notes | `SESSION_NOTE` | — |
| Game/Journals | `JOURNAL` | — |
| Game/Quests | `QUEST` | — |
| Bestiary | `DEFAULT` | `bestiary` |
| Ancestries | `DEFAULT` | `ancestries` |
| Objects | `DEFAULT` | `objects` |
| Maps | `DEFAULT` | `maps` |
| Other modules | `DEFAULT` | — |

---

## YAML frontmatter

Esiana reads a standard `---` block at the top of each note.

### Recognized fields

| Field | Purpose |
|-------|---------|
| `title` | Page title (falls back to filename if omitted) |
| `blurb` | Short summary stored in import metadata |
| `tags` / `tag` | Tag list (comma-separated string or YAML list) |
| `templateType` or `template` | Overrides module default template type |
| `entityCategory` | Overrides module default entity category (e.g. `languages`) |
| `type`, `entityType`, `entity_type`, `category`, `kind` | Obsidian-style entity type (normalized to Esiana categories) |
| `visibility` / `audience` | `Public`, `Party`, or `DM_Only` (also `gm`, `players`) |
| `esiana_created_at`, `esiana_updated_at` | Preserved created/updated timestamps when round-tripping Esiana exports |
| `date` | Fallback created timestamp on import |
| *Any other key* | Stored as infobox custom fields in import metadata — not auto-wired to entity relations |

Frontmatter wins over folder mapping for `templateType` and `entityCategory`.

### Character example

File: `NPCs/Lord-Varian.md`

```yaml
---
title: Lord Varian
blurb: The scarred regent of the North Watch
tags: [Nobility, Antagonist]
faction: The Iron Gauntlet
location: Winterfort
---
# Lord Varian

Body text supports standard Markdown, lists, and `[[wikilinks]]`.
```

Map source folder `NPCs` → **Characters**. Keys like `faction` and `location` are kept as custom infobox fields; link entities with wikilinks in the body or refine metadata after import.

### Location example

File: `Locations/Winterfort.md`

```yaml
---
title: Winterfort
blurb: Northern garrison city
templateType: LOCATION
entityCategory: locations
tags: [Settlement, Fortress]
---
# Winterfort
```

---

## Links and media

| Syntax | Behavior |
|--------|----------|
| `[[Note Title]]` | Resolved to wiki mentions when a imported note shares that title; otherwise created as stub mentions |
| `![[image.png]]` | Embedded image if the file exists in the ZIP (by path or basename) |
| `![](path/to/image.png)` | Same resolution as Obsidian-style embeds |
| `[label](https://…)` | External links kept |
| `[label](local/path.md)` | Local path links stripped to label text (avoids broken legacy paths) |

Supported image extensions: `.png`, `.jpg`, `.jpeg`, `.webp`.

---

## Fantasy calendars

Custom calendars are **not** imported from Markdown folders. Use either:

- The **Fantasy-Calendar JSON** drop zone on the campaign wizard import step, or
- Chronology → import after the campaign exists

See [Chronology & calendars](features/chronology-and-calendars.md). JSON must be exported from [Fantasy-Calendar.com](https://www.fantasy-calendar.com/) (or compatible `fantasy-calendar` spec).

Markdown folders mapped to **Game/Calendars** or **Game/Timelines** become ordinary wiki pages under those module folders — they do **not** configure the chronology engine.

---

## Practical checklist

Before upload:

1. Export a `.zip` with one top-level folder per lore area you want to map.
2. Name folders using synonyms from the table above, or plan manual mappings in the wizard.
3. Add `title` (and ideally `blurb`, `tags`) to frontmatter on key entities.
4. Keep calendar JSON separate from Markdown folders.
5. After creation, spot-check module folders, stub wikilinks, and infobox fields in the wiki tree.

---

## Related docs

- [Campaign hub](features/campaign-hub.md) — creation wizard entry point
- [Data backup & export](features/data-backup-and-export.md) — Esiana ZIP restore and sovereign export
- [Wiki & lore](features/wiki-and-lore.md) — post-import wiki operations
- [Chronology & calendars](features/chronology-and-calendars.md) — calendar JSON import
- [Import & export API](api/import-export.md) — programmatic backup and import routes
