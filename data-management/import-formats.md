# Markdown Vault Import

If your campaign already exists as notes somewhere else — an Obsidian vault, a Kanka export — you should not retype it. Esiana imports external archives during campaign creation, mapping your folders onto its own organization and converting your links, images, and structure along the way. This guide covers the two vault paths: Obsidian-style Markdown and Kanka JSON. Restoring a prior Esiana backup is a different wizard card with its own behavior, documented in the backup and export guide rather than here.

A few boundaries up front. Notion, Logseq, OneNote, and Google Docs have no direct importer; export Markdown from those tools and use the Obsidian path if the folder layout fits. Kanka imports from its JSON campaign export, not from Markdown. Content packs and sample data are separate wizard sources, not vault imports. Custom calendars never come from Markdown folders — calendars arrive as Fantasy-Calendar JSON, either on the same wizard step or later from chronology, and folders named for calendars simply become ordinary wiki pages.

## Wizard workflow

1. Hub → **Create campaign** → **Campaign Source** → **Obsidian**.
2. Upload a `.zip` of your vault. The wizard scans it and lists discovered top-level folders for mapping (see ZIP layout below).
3. Review **Source Folder Mapping** — familiar folders (Characters, Locations, Sessions, …) map themselves; anything idiosyncratic (your `Midnight Foxes` folder) waits for you to pick its destination before creation can proceed.
4. Optionally attach a **Fantasy-Calendar `.json`** on the same step.
5. Finish identity and access steps; the import runs in the background after the campaign is created.

The wizard strips a shared wrapper folder when your whole export sits inside one parent, and places imported notes into the campaign's typed hubs — Characters, Locations, Session Notes, and so on — rather than a generic pile. Notes it cannot classify are skipped, not dumped; after import, an Import Report page under the rules and resources area lists skipped files and classification warnings, which is your punch list for finishing the job by hand.

### Classification precedence

When several signals disagree about what a note is, explicit beats implicit in this order — frontmatter first, then your wizard mapping, then folder-name synonyms, then tags, then filename guesswork, then skipping:

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

## Kanka JSON export

Use this path for a **Kanka campaign JSON export** — the `.zip` from Kanka's own export tool. It is separate from both Obsidian vault import and Esiana backup restore.

### Wizard workflow

1. Hub → **Create campaign** → **Campaign Source** → **Kanka.io**.
2. Upload the Kanka `.zip`. The wizard detects the format, lists **entity folders** for mapping, and shows **skipped modules** (abilities, items, settings, etc.).
3. Review **Source Folder Mapping** — Kanka folder names (`characters`, `locations`, `organisations`, …) auto-map to Esiana modules where possible.
4. Campaign title may prefill from `campaign.json` when the title field is empty.
5. Finish identity and access steps; import runs in the background after creation.

### ZIP layout

```
kanka-export.zip
├── info.json
├── campaign.json
├── characters/
│   └── anya-nightshadow_6401071.json
├── locations/
│   └── elderhelm_6359027.json
├── organisations/
│   └── guild_123.json
├── maps/
│   └── world_6358560.json   ← map image + pins (linked to imported entities)
├── abilities/          ← skipped (system data)
├── items/              ← skipped (system data)
├── settings/           ← skipped (campaign config)
├── tags/               ← skipped (metadata only)
└── w/                  ← image assets (ingested when referenced)
```

Each entity file is JSON with HTML in `entity.entry` (and optional `posts`). Internal links like `[character:6362082]` are rewritten to `[[Entity Name]]` wikilinks when the target entity is in the same export.

Map JSON files import as wiki pages with a linked **map asset** and **pins** at Kanka longitude/latitude positions. Pins link to imported location (or other entity) pages when `entity.entity_id` resolves in the same export.

When the wizard does not supply a cover image, `campaign.json` `image` (a `w/` asset path) may be ingested as the Campaign Home hero banner.

Re-importing the same Kanka export is **idempotent**: wiki pages, assets, map pins, and the import report upsert by stable Kanka provenance keys instead of duplicating content.

### Skipped modules (v1)

| Kanka folder | Reason |
|--------------|--------|
| `abilities` | System / sheet data — not lore pages |
| `items` | System / inventory data |
| `settings` | Campaign configuration |
| `tags` | Metadata only |
| `w` | Image assets only (resolved when referenced in body or portrait) |

Skipped counts appear in the wizard and in the post-import **Import Report**.

### Folder mapping

Kanka export folders use lowercase names. Auto-match includes:

| Kanka folder | Esiana module |
|--------------|---------------|
| `characters` | Characters |
| `locations` | Locations |
| `organisations` | Organizations |
| `creatures` | Bestiary |
| `races` | Ancestries |
| `families` | Families (tree) |
| `quests` | Game/Quests |
| `maps` | Maps |
| `journals` | Game/Journals |
| `events` | Game/Events |
| `timelines` | Game/Timelines |
| `calendars` | Game/Calendars |
| `notes` | Characters (misc notes) |

Placement precedence matches Obsidian import: entity `type` in JSON → wizard folder mapping → folder synonyms → skip.

### Character field mapping

Kanka D&D-style sheet fields are **not** imported as full stat blocks. Esiana maps narrative-relevant fields only:

| Kanka source | Esiana field |
|--------------|--------------|
| `Player Character` type | Active party participation; virtual path under `characters/party/` |
| `NPC` type | Inactive NPC ally participation |
| `Class` attribute | `profession` |
| `Level` attribute | Import metadata / quick info |
| `Player_Name` attribute | Import metadata only |
| Appearance traits (section 1) | `appearance` metadata |
| `character_races` | `ancestry` + deferred `ancestryId` |
| `organisation_memberships` | deferred `primaryAffiliationId` |
| `entityLocations` | deferred `currentLocationId` |
| Other sheet attributes (Background, Alignment, attacks, spells, …) | Appended to biography as **Sheet notes** / **Notable gear** |

---

## Frontmatter and links

Esiana reads a standard `---` block at the top of each note. Frontmatter wins over folder mapping for template and category, so a note that declares itself is believed over the folder it sits in.

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

Custom calendars never come from Markdown folders. Supply them as JSON — the drop zone on the wizard import step, or chronology import after the campaign exists
(see the chronology guide). JSON must be exported from [Fantasy-Calendar.com](https://www.fantasy-calendar.com/) or a compatible spec.

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

- [Campaign hub](../features/campaign-hub.md) — creation wizard entry point
- [Data backup & export](../features/data-backup-and-export.md) — Esiana ZIP restore and sovereign export
- [Wiki & lore](../features/wiki-and-lore.md) — post-import wiki operations
- [Chronology & calendars](../features/chronology-and-calendars.md) — calendar JSON import
- [Import & export API](../api/import-export.md) — programmatic backup and import routes
