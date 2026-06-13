# Chronology & Calendars

Track in-world time with custom fantasy calendars, timeline events, and a unified chronology hub.

---

## What it does

- **Fantasy calendars** — custom months, weekdays, moons, leap days, seasons, climate aspects
- **Master time** — campaign epoch; advance the campaign date to move the in-world clock forward
- **Calendar events** — titled events with visibility, categories, duration, recurrence
- **Chronology hub** — unified calendar + timeline views for browsing and editing events
- **JSON import/export** — bring calendars from external tools; export to `fantasy-calendar` spec
- **Player chronology management** — optional toggle for players to edit events (campaign setting)

**Advance campaign date** (chronology clock) updates the master epoch and temporal projections. It does **not** run the full living-world simulation bundle — see [World advance](world-advance.md) for batch domain effects (rumors, factions, scheduled effects).

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **Game Master / Writer** | Full calendar and event CRUD; advance campaign date |
| **Player** | View party-visible events; edit if `allowPlayerChronologyManagement` enabled |
| **Observer** | Read public-visible content |

---

## Where to find it

| Area | Route / nav |
|------|-------------|
| Chronology hub | `/c/:campaignSlug/chronology` |
| Calendar management | Chronology → calendars |
| Timeline / events | Chronology → events |
| Campaign Home widget | Fantasy Calendar widget on [Campaign Home](campaign-home-and-sidebar.md) |

---

## Key options

| Option | Where |
|--------|-------|
| Allow player chronology management | [Campaign settings](../options/campaign-settings.md) → Access & Roles → Collaboration permissions |
| Calendar JSON import | Chronology UI or campaign wizard drop-zone |
| Event visibility | Per-event: Public, Party, GM only |

> Calendars and timelines use **JSON configuration**, not plain Markdown folders. Do not organize them as text folders during import — use the wizard drop-zone or chronology import ([Import formats](../import_formats.md)).

---

## Related docs

- [World advance](world-advance.md) — living-world batch simulation (distinct from clock step)
- [Campaign Home & sidebar](campaign-home-and-sidebar.md) — World Clock, Fantasy Calendar widgets
- [Wiki & lore](wiki-and-lore.md) — link events to lore pages
- [Data backup & export](data-backup-and-export.md) — calendar in campaign ZIP
- [Campaign settings](../options/campaign-settings.md)
