# World Advance

Run a **batch simulation** of living-world effects when time moves forward — factions, territory, economy, conflict, seasons, and NPC mobility — distinct from simply advancing the campaign clock.

In practice, when you **Advance world state**, Esiana previews domain-grouped effects, derived condition chips (stability, prosperity, pressure), and template narrative synthesis before you apply the batch to canon.

---

## What it does

- **World advance batch** — Game Master-triggered bundle of effects + optional clock step
- **Six domain projectors** — faction, territorial, economic, conflict, seasonal, npc_mobility
- **Condition surfaces** — deterministic readability labels (not stored as wiki canon)
- **Narrative synthesis** — causal prose preview (projection only, not authoritative lore text)
- **Chronology receipt** — batch recorded as chronology events with category **World advance**
- **Canonical writes** — wiki metadata appends, calendar event JSON (`world-advance-v1`), `WorldAdvanceReceipt`

**Not included:** autonomous AI simulation, procedural map geometry mutation, or rumor auto-diffusion (rumors spread manually).

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **Game Master** (operational manager) | Preview and apply batches |
| **Writer** | No apply unless granted operational manager capability |
| **Player / Observer** | No access |

---

## Where to find it

| Area | Route / nav |
|------|-------------|
| Advance world UI | `/c/:slug/world-advance` (linked from Time tracking / chronology) |
| Batch detail | `/c/:slug/world-advance/batches/:eventId` |
| API preview | `POST /c/:slug/world-state/preview` |
| API apply | `POST /c/:slug/world-state/apply` |
| Batch history | `GET /c/:slug/world-state/batches` |

---

## Clock vs world advance

| Action | What changes |
|--------|--------------|
| **Advance campaign date** ([Chronology](chronology-and-calendars.md)) | Master epoch, temporal projections, time-gated discovery |
| **Advance world state** (this page) | Domain effects, scheduled consequences, faction/territory/economic deltas in one batch |

**In practice:** Stepping the calendar forward one day updates "what day is it." World advance answers "what changed in the world because time passed" — use after downtime between sessions or era transitions.

---

## Key options

| Option | Where |
|--------|-------|
| Batch parameters | World advance UI (duration, domains, anchors) |
| Scheduled effects | Pre-authored hooks evaluated during apply — internal [`scheduled-effects`](../../esiana-core/docs/architecture-internal/scheduled-effects.md) |
| Map border suggestions | GM-confirmed overlays — [Maps](maps-and-cartography.md) |

---

## Related docs

- [Chronology & calendars](chronology-and-calendars.md) — campaign clock
- [Narrative threads](narrative-threads.md)
- [Architecture: temporal runtime](../architecture/temporal-runtime.md)
- [`esiana-core/docs/architecture-internal/world-advance.md`](../../esiana-core/docs/architecture-internal/world-advance.md) — engineering spec
