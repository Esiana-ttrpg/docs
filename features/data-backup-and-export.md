# Data Backup & Export

Esiana emphasizes **data sovereignty** — download your world as portable archives and import from common TTRPG note tools. Backups are tiered: lore-sovereign export is the product's canonical path; full operational clone is a stricter bar Esiana does not fully meet.

---

## Portability tiers

| Tier | What | Sovereign ZIP | Restore |
|------|------|---------------|---------|
| **Lore sovereign** | Wiki Markdown + YAML frontmatter, entity metadata, relations, media, map pins, lore claims + historical aliases | Yes | Yes |
| **Wiki-linked operational** | Downtime haven/project simulation rows, plugin KV (`PluginData`), plugin enablement settings | Yes (`sovereign/operational.json`) | Yes |
| **Full clone** | Members, session timeline, ledger history, activities, calendar events, dashboard widgets | No (admin full bundle captures subset; restore replays less) | Partial |

**Score for "Can I export and back up my campaign?"** — **Mostly yes** for lore sovereignty and wiki-linked plugin/downtime state. Fails only if you require one-click full-state clone including members and session ops history.

---

## What works (routine GM need)

- **Sovereign ZIP export** (`esiana-campaign-backup-v2`) — Markdown wiki + frontmatter, relations, media, map pins, `sovereign/knowledge.json` (lore claims + aliases), operational layer
- **Sync + async export** from Campaign Settings → Data & backup
- **Restore on new campaign** via creation wizard (Esiana backup card)
- **Restore in existing campaign** via Campaign Settings → Data & backup → Restore from backup
- **Obsidian ZIP import** on campaign creation (Markdown vault export)
- **Fantasy-Calendar JSON** export/import (separate from campaign ZIP)

---

## Honest limitations

- **Sovereign export ≠ full campaign clone** — omits members, session timeline, ledger entries, reputation events, map layer/scene rows, content presence DB projection, activities, and most non-wiki operational history. Admin full ZIP captures more JSON but restore replays a subset.
- **Plugin data** round-trips only when plugins store campaign state in `PluginData`; external stores are not included.

**In practice:** A plugin that writes to an external database or SaaS will **not** appear in your sovereign ZIP. Before uninstalling or migrating hosts, export plugin-specific data through that plugin's own tools or API. Campaign-scoped `PluginData` and enablement flags in `sovereign/operational.json` do round-trip — verify each plugin's storage model in its manifest README.
- **GM-only fields** — `dmSecrets` are stripped on export (privacy by design).
- **Legacy templates** — `sovereign/templates/` from pre-v0.9.0 zips is ignored on restore (Template Studio removed).
- **Cross-campaign restore** — Wiki page IDs are globally unique. Restoring a backup into a *new* campaign while the source campaign still exists can collide on page IDs; prefer in-campaign restore or restore after retiring the source campaign. Wizard restore targets an empty new campaign and replays preserved IDs in place.
- **Postgres instance backup** — not wired in admin UI; `pg_dump` remains operator manual.

---

## Falsification test

To verify lore + operational portability:

1. Export sovereign ZIP from Campaign Settings.
2. Restore to a **new** campaign via the creation wizard (or in-campaign restore for replace-in-place).
3. Assert: wiki pages, media URLs, wikilinks, entity frontmatter (character, quest, thread, scene, etc.), downtime haven/project rows, and `PluginData` entries match.

Automated coverage: `campaignBackupRestore.integration.test.ts` and `campaignBackupRoundTrip.test.ts`.

Fails if you require members, session notes timeline, or ledger history to round-trip.

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **DM / Co-DM** | Export, async export, in-campaign restore (Campaign Settings → Data & backup) |
| **System admin** | System-wide DB backup, per-campaign full backup ZIP |

---

## Where to find it

| Action | Location |
|--------|----------|
| Campaign export (sync) | Campaign Settings → Data & backup → Download |
| Background export | Campaign Settings → Data & backup → Export in background |
| Restore from backup | Campaign Settings → Data & backup → Restore from backup |
| Import on create | Global hub → Create campaign wizard |
| System backup | Admin → System Utilities |
| Calendar JSON export | Campaign Settings → Data & backup (per calendar) |

---

## Import formats

For folder naming, front matter, and auto-matching modules when migrating from Obsidian or similar Markdown vaults:

**[Campaign Ingestion & Markdown Import Guide](../import_formats.md)**

Supported wizard sources today:

- **Obsidian** — Markdown ZIP with `[[Wikilinks]]`
- **Esiana backup** — prior `esiana-campaign-backup-v2` ZIP

Notion, OneNote, and Google Docs ingestion are not supported; export Markdown from those tools and use the Obsidian path if folder structure matches.

---

## Backup ZIP layout (`esiana-campaign-backup-v2`)

```
manifest.json
sovereign/
  wiki/              # hierarchical .md files
  relations.json     # links, tags, tree, map pins
  operational.json   # downtime satellites, PluginData, plugin settings (optional in older zips)
  media/
    manifest.json
    {assetId}.{ext}
esiana/              # admin full export only
  campaign.json
```

Treat backups as the **canonical migration path** when moving between SQLite and PostgreSQL ([Database & persistence](../options/database-and-persistence.md)).

---

## Related docs

- [Import formats](../import_formats.md)
- [Campaign hub](campaign-hub.md) — creation wizard
- [Notifications](notifications.md) — async export alerts
- [Database & persistence](../options/database-and-persistence.md) — Postgres migration via ZIP
- [Deployment & Docker](../options/deployment-and-docker.md) — persistent upload volumes
