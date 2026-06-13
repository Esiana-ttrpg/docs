# Sessions & Notes

Track what happened each session with per-user notes, a combined party view, compile-to-Markdown, and optional OOC scheduling with RSVP.

---

## What it does

- **Session timeline** — ordered session points linked to wiki pages
- **Per-author notes** — each roster member writes in their own column; DM notes visible to DMs with badge/masking
- **All View (combined grid)** — multi-column layout with entities-mentioned ribbon and aggregate references
- **Notebook arcs** — group related pages outside the strict session chronicle
- **Compile session notes** — bulk export timeline to Markdown (with size limits)
- **Session snapshot export** — combined-session Markdown from All View → Snapshot tab
- **Document upload** — `.txt` and `.docx` session note uploads
- **Player sandbox** — private player scratch notes
- **OOC scheduling & RSVP** — publish session times; party RSVPs from Session Clock (see [Notifications](notifications.md))

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **DM / Co-DM** | All sessions; view DM-only notes; publish schedules |
| **Player / Member** | Own session notes; party-visible combined view |
| **Viewer** | Read-only where visibility allows |

---

## Where to find it

| Area | Route / nav |
|------|-------------|
| Session timeline | `/c/:campaignSlug/sessions` |
| Session note editor | Sessions → select session |
| All View (combined) | Sessions → All View |
| Session snapshot | All View → Snapshot tab |
| Compile hub | `/c/:campaignSlug/sessions/compile` |
| Tag view | Sessions → tags |

---

## Key options

| Option | Where |
|--------|-------|
| Compile page/byte limits | `COMPILE_MAX_PAGES`, `COMPILE_MAX_BYTES` — [Environment variables](../options/environment-variables.md) |
| Player identity labels | [Campaign settings](../options/campaign-settings.md) → Access → identity wiki page |
| Session notifications | [Notifications](notifications.md) + SMTP in [System admin settings](../options/system-admin-settings.md) |
| Upload limits | [System admin settings](../options/system-admin-settings.md) |

---

## Session snapshot export

The **Snapshot** tab in All View produces a combined Markdown anthology of party session notes — useful for players who missed a session or for archival.

Full formatting details: [`esiana-core/docs/session-anthology.md`](../esiana-core/docs/session-anthology.md)

---

## References radar

The session sidebar includes a **References** widget showing incoming/outgoing wikilinks aggregated across session authors. Per-author filtering is a future optional enhancement.

---

## Related docs

- [Wiki & lore](wiki-and-lore.md) — session pages are wiki pages under the hood
- [Notifications](notifications.md) — session publish, change, cancel, 24h reminder
- [Campaign Home & sidebar](campaign-home-and-sidebar.md) — Session Clock widget
- [Limits & quotas](../options/limits-and-quotas.md) — compile caps
- [`esiana-core/docs/session-anthology.md`](../esiana-core/docs/session-anthology.md)
