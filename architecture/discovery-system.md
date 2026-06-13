# Discovery system

Deep dive on **Discovery** — see [Campaign model § Discovery](campaign-model.md#discovery).

---

## Purpose

Discovery answers: *has this viewer found this content epistemically?* It powers:

- Party knowledge and codex surfaces
- Revelation fog on wiki, maps, and links
- Browse and search filtering for non-GM actors

---

## Distinct from other visibility axes

| Axis | Question |
|------|----------|
| **Discovery** | Has the party learned this exists? |
| **Role visibility** | Is this page Party / Public / GM-only? |
| **GM editorial status** | Is this draft, published, or archived? |
| **Temporal projection** | Is this visible at the current campaign date? |

All four compose through shared narrative projection primitives — they must not drift per surface.

**In practice:** A party-visible page can still be **hidden from discovery** until the Game Master reveals it — browse and backlinks omit it until then. See [Discovery & revelation](../features/discovery-and-revelation.md).

---

## Implementation contract

Browse, search, links, and party-knowledge surfaces use **`shared/discoveryProjection.ts`** as the mandatory contract. Plugins and core features should project through this layer rather than reimplementing fog rules.

Overlay entity types include `historical_alias`, `lore_interpretation`, and `lore_claim` on `ContentPresenceState`.

---

## See also

- [Discovery & revelation (feature guide)](../features/discovery-and-revelation.md)
- [Knowledge model](knowledge-model.md)
- [Temporal runtime](temporal-runtime.md)
- Internal: [`lore-knowledge-extension-points.md`](../../esiana-core/docs/architecture-internal/lore-knowledge-extension-points.md)
