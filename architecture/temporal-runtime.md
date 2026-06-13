# Temporal runtime

Deep dive on **Temporal projection** — see [Campaign model § Temporal projection](campaign-model.md#temporal-projection).

---

## Campaign clock

Each campaign has an in-world **current date** on a custom fantasy calendar (months, moons, leap days). Advancing time affects which timeline events, lore, and map states project to surfaces.

**In practice:** Stepping the campaign clock updates `campaignNow` for projection. **[World advance](../features/world-advance.md)** is a separate Game Master action that applies living-world domain effects in a batch — use both when downtime should change factions and economy, not just the date label.

---

## Projection primitives

[`shared/narrativeProjection.ts`](../../esiana-core/shared/narrativeProjection.ts) defines shared semantics:

| Primitive | Role |
|-----------|------|
| `NarrativeViewerContext` | Viewer perspective, role, capabilities, `campaignNow` |
| `projectRevelation` | Fog / discovery state |
| `projectRoleVisibility` | Public / Party / GM tiers |
| `resolveTemporalView` | Surface-specific temporal policy |
| Domain adapters | Wiki, timeline, map, lore, entity graph |

The goal is **intentional, documented asymmetry** — not identical historical simulation on every surface.

---

## Temporal snapshots

**Since-last-visit** snapshots let returning players see what changed in a region since their last session. See internal doc: [`temporal-snapshots.md`](../../esiana-core/docs/architecture-internal/temporal-snapshots.md).

---

## See also

- [World advance (feature guide)](../features/world-advance.md)
- [Chronology & calendars (feature guide)](../features/chronology-and-calendars.md)
- [Narrative foundation](narrative-foundation.md)
- [Discovery system](discovery-system.md)
- Internal: [`narrative-projection-semantics.md`](../../esiana-core/docs/architecture-internal/narrative-projection-semantics.md)
