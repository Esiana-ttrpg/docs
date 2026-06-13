# Sovereign export

What can leave Esiana in a portable campaign archive — and what cannot.

Esiana treats **lore sovereignty** as a product guarantee: GMs can export narrative content in open formats and restore it elsewhere.

---

## Pipelines

| Pipeline | Audience |
|----------|----------|
| **Sovereign ZIP** | GM portable archive (Markdown + JSON) |
| **Content pack** | Plugin and sample-data seeding |
| **Obsidian ZIP** | External vault import |

Operator guide: [Data backup & export](../features/data-backup-and-export.md)

---

## Included in sovereign export

These entity types round-trip in the GM sovereign path:

- Characters, locations, organizations, families
- Objects, species/ancestry pages
- Adventures (quest/arc/scene/objective pages)
- Session notes, journals
- **Lore claims and historical aliases** (`sovereign/knowledge.json`)
- Downtime havens and projects (`sovereign/operational.json`)
- Plugin KV data (`PluginData`)

---

## Rebuilt on restore

Projection and derived state — acceptable when metadata is sufficient:

- Narrative lifecycle tables (from page metadata)
- Entity relation graph (from wiki links and metadata)
- Narrative thread lifecycle
- Map pins and assets (partial — see gaps below)
- Calendar JSON (separate from page tree)
- Content presence / fog rows (visibility metadata round-trips; projection rows rebuild)

---

## Not included

Operational and administrative records — by design:

- Campaign memberships and role grants
- Standing / reputation tables
- Session timeline operations (separate from note content)
- Webhooks and delivery queues
- Plugin secrets store
- System admin configuration

---

## Known gaps (acceptable for 1.0)

| Area | Tier | Notes |
|------|------|-------|
| Map layers | B | Pins and assets yes; layer config not fully serialized |
| Fog presence rows | B | Visibility metadata round-trips |
| Reputation / ledger | C | Post-1.0 |

---

## See also

- [Campaign model](campaign-model.md) — Knowledge section
- [Import & export API](../api/import-export.md)
- Engineering audit: [`esiana-core/docs/audits/pre-1.0-export-audit.md`](../../esiana-core/docs/audits/pre-1.0-export-audit.md)
