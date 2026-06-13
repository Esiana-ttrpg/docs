# Notifications

In-app notification inbox with optional email delivery when SMTP is configured.

---

## What it does

- **Bell inbox** — unread badge, `/notifications` page, deep links to relevant content
- **Per-type preferences** — toggle in-app and email per event type; global mute-until
- **Email channel** — nodemailer SMTP when Admin SMTP is valid
- **Transactional email** — password reset links; DMs can email campaign invite URLs (requires SMTP)
- **Session scheduling alerts** — publish, change, cancel, 24h reminder
- **RSVP digest** — debounced updates to DMs when players RSVP
- **Ownership transfer** — offer/accept/decline notifications
- **Async export** — ready/failed alerts for background ZIP jobs

Polling interval is admin-configurable (default 60s); pauses when the browser tab is hidden.

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **Any user** | View own notifications; set preferences in User Settings |
| **System admin** | Configure SMTP and poll interval |

---

## Where to find it

| Area | Location |
|------|----------|
| Notification bell | Header (all authenticated pages) |
| Full inbox | `/notifications` |
| User preferences | User Settings → Notifications |
| Admin SMTP / poll | Admin → General Settings |

---

## Key options

| Option | Where |
|--------|-------|
| SMTP host, port, credentials | [System admin settings](../options/system-admin-settings.md) |
| Poll interval (30–300 s) | Admin → Notifications |
| `FRONTEND_ORIGIN` | Backend `.env` — email link base |
| Per-type in-app / email toggles | [User account settings](../options/user-account-settings.md) |

---

## Notification types (summary)

| Type | Typical recipient |
|------|-------------------|
| Join request received / accepted / denied | DM or applicant |
| Role changed | Affected member |
| Ownership transfer | Offer target, initiator, roster |
| Member departed | DM / Co-DM |
| Session published / changed / cancelled / 24h reminder | Party |
| RSVP updated | DM / Co-DM |
| Export ready / failed | Requesting user |
| Import complete / failed | Wizard creator |

---

## Deep dive

Full channel architecture, API details, and scheduling notes:

**[`esiana-core/docs/notifications.md`](../esiana-core/docs/notifications.md)**

---

## Related docs

- [Sessions & notes](sessions-and-notes.md) — OOC scheduling & RSVP
- [Recruitment & LFG](recruitment-lfg.md) — join requests
- [Data backup & export](data-backup-and-export.md) — export notifications
- [System admin settings](../options/system-admin-settings.md)
