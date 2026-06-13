# Discovery & Revelation

Control what the party can **find** versus what they can **read**. Esiana separates role-based page visibility from discovery (hidden-until-revealed content).

In practice, a page can be party-visible in principle but still omitted from browse, search, backlinks, and map lists until the Game Master reveals it.

---

## What it does

- **Entity unlock** — `ContentPresenceState` on wiki pages (`HIDDEN`, `DRAFT`, `VISIBLE`, …)
- **Epistemic beliefs** — lore claims with knowledge states (`KNOWN`, `SUSPECTED`, `DISPROVEN`, …)
- **Temporal gates** — `availableFromEpochMinute` hides content until campaign date reaches a threshold
- **Cross-link policy** — unrevealed link targets render as plain text for the party (no broken-link styling)
- **Codex badges** — rumor, partial, contested chips on browse surfaces; `known` omits badge
- **Map & index projection** — maps hub and link index respect the same revelation rules

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **Game Master / Writer** | Set presence, reveal content, edit lore claims, see hidden badges |
| **Player / Observer** | See only revealed + permitted visibility; count-only summaries for hidden categories |

Game Masters can use **preview as player** on Threads and Adventure surfaces to sanity-check party view.

---

## Where to find it

| Area | Route / nav |
|------|-------------|
| Page presence tools | Wiki page editor / page settings |
| Lore claims & knowledge | Entity Codex rail → Discovery / Lore sections |
| Batch reveal | `POST /c/:slug/presence/reveal` (API) |
| Party knowledge API | `GET /c/:slug/wiki/:pageId/party-knowledge` |

---

## Two axes (do not conflate)

| Axis | Controls | Party UX |
|------|----------|----------|
| **Page visibility** | Public / Party / GM only | Who may read once the page is known |
| **Discovery / presence** | Hidden, draft, temporal gate | Whether the page appears in browse, search, links |

**In practice:** Mark a faction page **Party** visibility but **HIDDEN** presence — players cannot stumble on it in the codex until you reveal it after a session discovery beat.

---

## GM workflow

1. Import or author content with `HIDDEN` presence (or set via page tools)
2. When the party learns it, **reveal** — updates presence and records provenance (`SESSION`, `MANUAL`, `IMPORT`, `QUEST`, `SCENE`)
3. Set claim `knowledgeState` and party visibility in the Lore inspector for beliefs and rumors
4. Optional: schedule availability with `availableFromEpochMinute` for time-gated lore

---

## Key options

| Option | Where |
|--------|-------|
| Page visibility | Per wiki page |
| Content presence | Per wiki page / import defaults |
| Lore claim knowledge state | Entity Lore inspector |
| Campaign date gates | Presence `availableFromEpochMinute` + [Chronology](chronology-and-calendars.md) |

---

## Related docs

- [Wiki & lore](wiki-and-lore.md) — visibility levels
- [Maps & cartography](maps-and-cartography.md) — pin revelation, Ghost Mode
- [Architecture: discovery system](../architecture/discovery-system.md)
- [Architecture: knowledge model](../architecture/knowledge-model.md)
- [`esiana-core/docs/plans/phase-23-discovery-knowledge.md`](../../esiana-core/docs/plans/phase-23-discovery-knowledge.md) — engineering contract
