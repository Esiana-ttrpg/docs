# Data Backup & Export

Your campaign is months of evenings. It should be able to leave Esiana — in open formats, readable without Esiana, restorable somewhere else — because software you cannot leave is software you do not own. Esiana treats that portability as a product guarantee, not a feature: the lore-sovereign export path is canonical, maintained, and tested, and this page is honest about exactly where it ends.

Start with the mental model. There are two different promises that sound similar. The first is *lore sovereignty*: everything the table wrote and made — pages, lore, relations, media, pins, downtime projects, plugin content — leaves as readable Markdown plus structured data, and comes back intact. Esiana meets this promise; it is the thing to rely on. The second is *full clone*: every operational trace — memberships, session history, ledgers, activity feeds — transferred one click to a twin campaign. Esiana does not fully meet this one, deliberately in some cases (memberships should not silently duplicate) and incompletely in others. Plan around the distinction: back up for sovereignty always, and never assume a restore resurrects the table's social state.

## How it works

The sovereign archive is a ZIP containing your wiki as Markdown files with structured headers, a relations file describing links, tags, tree, and map pins, a knowledge file with lore claims and past names, an operational file with downtime and plugin content, and the media itself. It is designed to be meaningful opened in a text editor, not just to Esiana's importer. Restoring replays it: pages return with their IDs where possible, relations rebuild, media reattaches, downtime rows and plugin content come back.

Exports come in two speeds. The immediate download builds the archive now and hands it over — right for ordinary backups before a big arc. The background export queues the job and notifies you when the download is ready — right for large campaigns where building takes minutes. Restoring works two ways as well: into a fresh campaign from the creation wizard (the migration path), or into an existing campaign from its data settings (the replace-in-place path). The administrator can additionally back up any campaign directly, and keeps system-level database backups outside any campaign's UI.

Imports run alongside. An Obsidian-style Markdown vault imports at campaign creation with folder mapping; a Kanka JSON export imports through its own wizard card with entity conversion; a Fantasy-Calendar file supplies custom time. The import formats guide covers each path's mapping rules, what is skipped, and how to prepare. Calendar JSON also exports and imports independently of campaign archives.

## Using backup and export

Build the habit first: download a sovereign archive before every major arc and before any migration, upgrade, or plugin surgery. The routine is thirty seconds from the campaign's data settings — download now for small campaigns, background export for large ones — and the archive is the thing you will be grateful for exactly once, completely.

Migrating hosts or moving between database backends uses the same path: export sovereign ZIP on the old instance, create a campaign from backup on the new one, and verify — pages, media, links, entity details, downtime rows, plugin entries — before retiring the source. Treat the archive as the canonical migration vehicle rather than copying database files.

Restoring over an existing campaign deserves a warning it gets below: it replaces in place. Prefer restoring into a fresh campaign when the goal is a copy, a test, or a migration; reserve in-place restore for genuine rollback.

To verify an archive actually holds your world, restore it to a scratch campaign and compare: wiki pages and their media, links resolving, character and quest details present, downtime projects intact, plugin content where expected. Anything members-only in the social sense — roster, session history, ledger trails — will be absent by design, and its absence confirms the archive is behaving, not broken.

## Campaign configuration

Backup controls live in Campaign Settings under data and backup, available to the GM: immediate download, background export, and restore from a prior archive. Calendar export sits alongside per calendar. There is nothing to configure about the format — sovereignty means the archive is standard every time — only when to take one and where to restore it.

## Administration

Administrators hold the instance side: per-campaign full backups beyond the sovereign path, system database backups through their own tooling, storage statistics, pruning of unreferenced media, and the background task queue where imports and exports run. Database-engine backup (the Postgres dump) remains operator tooling outside the app UI. On upgrades, the maintenance flow is admin business: announce, back up, upgrade, verify.

## Things to know

Read this section as the honest boundary of the guarantee. Sovereign export is not a full clone: memberships, session timelines, ledger and reputation trails, map layer configurations, revelation-projection internals, activity feeds, and most non-wiki operational history do not round-trip. Secrets marked GM-only are stripped on export by design. Plugin content round-trips only when the plugin stores it through Esiana's own campaign mechanisms — a plugin keeping its own external database takes its data with it, so export through that plugin's tools before migrating. Very old archives may contain a legacy templates folder that restore now ignores. Page identifiers are globally unique, so restoring a backup into a *new* campaign while the source still exists can collide — prefer in-place restore or retire the source first. And Notion, OneNote, and Google Docs have no direct importer: export Markdown from those tools and use the vault path if the folder layout fits.

## Related features

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

**[Campaign Ingestion & Markdown Import Guide](../data-management/import-formats.md)**

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

- [Import formats](../data-management/import-formats.md)
- [Campaign hub](campaign-hub.md) — creation wizard
- [Notifications](notifications.md) — async export alerts
- [Database & persistence](../options/database-and-persistence.md) — Postgres migration via ZIP
- [Self-hosting with Docker](../self-hosting/docker.md) — persistent upload volumes
