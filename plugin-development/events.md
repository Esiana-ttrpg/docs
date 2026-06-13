# Domain events

Observational fan-out after core mutations — for logging, sync, and side effects.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Guarantees

- Events are **immutable snapshots** (DTOs only)
- Dispatch is **non-blocking**
- Core types use `core:` prefix; plugins emit `{pluginId}:` prefixed types

---

## Non-guarantees

Do **not** assume:

- Transactional coupling to the originating mutation
- Delivery ordering across event types
- Retry or at-least-once delivery
- Persistent event log or replay

Treat events as notifications — not a source of truth.

---

## Subscribing

Declare event subscriptions in `manifest.json` and handle them in your backend `register()` hook.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
