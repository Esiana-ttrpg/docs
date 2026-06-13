# Wiki pages API

REST operations on wiki pages — Esiana's canonical content substrate.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Wiki page model

Pages contain TipTap block JSON, hierarchy (`parentId`), visibility tier, and optional template (character, location, etc.).

Routes are campaign-scoped:

```text
/api/campaigns/{campaignHandle}/wiki/...
```

---

## Visibility vs discovery

- **Role visibility** (Public / Party / GM) — enforced on read paths; answers who may read once known
- **Discovery** — epistemic fog via `ContentPresenceState`; party viewers omit `HIDDEN` pages from index/link surfaces even when visibility is Party

Reveal for integrators: `POST /api/campaigns/{campaignHandle}/presence/reveal` (operational manager). Both axes compose through narrative projection — see [Discovery system](../architecture/discovery-system.md) and [Discovery & revelation](../features/discovery-and-revelation.md).

---

## User guide

[Wiki & lore](../features/wiki-and-lore.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
