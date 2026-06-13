# Narrative Threads

Track unresolved narrative arcs — mysteries, promises, foreshadowing, clues, and player theories — as wiki-canonical pages under the **Threads** system category.

In practice, a thread is a **state object** with lifecycle and status metadata, not a freeform note. The Threads hub groups authored setup vectors separately from player-submitted theories.

---

## What it does

- **Thread kinds** — `mystery`, `promise`, `foreshadowing`, `clue`, `theory` (fixed enum pre-1.0)
- **Lifecycle** — `LOCKED` → `DISCOVERED` / `ACTIVE` → `COMPLETED` / `FAILED` controls party visibility
- **Status pacing** — `OPEN`, `DORMANT`, `RESOLVED`, `ABANDONED` (constrained by lifecycle)
- **Create Thread wizard** — classify at creation; seeds kind-specific editor prompts
- **Living Threads widget** — Campaign Home surfaces open authored threads and recent resolutions
- **GM signals** — stale, dangling foreshadowing, unresolved promise heuristics (elevated warnings)

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **Game Master / Writer** | Create threads, edit lifecycle, all kinds including clues |
| **Player** | Submit **theory** threads (non-canonical); view party-visible threads |
| **Observer** | Read party-visible resolved/open threads |

---

## Where to find it

| Area | Route / nav |
|------|-------------|
| Threads hub | Wiki sidebar → **Threads** category (Narrative Threads index) |
| Single thread page | Under Threads category in wiki tree |
| Create thread | Threads hub → New thread, or entity page → Track narrative thread |
| Living Threads widget | [Campaign Home](campaign-home-and-sidebar.md) → `livingThreads` widget |
| Investigation topology | Adventure → Investigation (clue aggregation; does not replace Threads hub) |

API hub: `GET /campaigns/:handle/wiki/threads-hub`

---

## Open thread (system terms)

An **open thread** means lifecycle `ACTIVE` or `DISCOVERED` with status `OPEN` or `DORMANT`, party-visible, and not a player theory. Campaign Home **Living Threads** shows up to eight such authored threads plus recent resolutions.

**In practice:** Lock a thread (`LOCKED` lifecycle) while you prep payoff — party surfaces hide it until you advance lifecycle to `DISCOVERED` or `ACTIVE`.

---

## Key options

| Option | Where |
|--------|-------|
| Thread kind & weight | Create Thread wizard / thread metadata block |
| Lifecycle state | Thread page tools / narrative lifecycle PATCH |
| Related pages & payoff links | Thread metadata (`relatedPageIds`, `payoffPageId`) |
| Preview as player | Threads hub toolbar (Game Master) |

---

## Export note

Thread **pages** export in sovereign ZIP (Tier A). Lifecycle DB rows rebuild on restore (Tier B) — see [Data backup & export](data-backup-and-export.md) and [Sovereignty](../architecture/sovereignty.md).

---

## Related docs

- [Discovery & revelation](discovery-and-revelation.md)
- [World advance](world-advance.md)
- [Architecture: narrative foundation](../architecture/narrative-foundation.md)
- [`esiana-core/docs/architecture-internal/narrative-threads.md`](../../esiana-core/docs/architecture-internal/narrative-threads.md) — engineering spec
