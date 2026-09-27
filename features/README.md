# Features Catalog

Esiana is a self-hosted TTRPG worldbuilding and campaign manager. This section explains **what staff can operate** in a campaign and **where to find it** in the UI.

For configuration (env vars, Admin console, campaign tabs), see [Options](../options/README.md).

> Operational docs target Game Masters, writers, and hosts debugging campaign behavior — not casual players.

---

## By role

### Game Master & Writer

| Feature | Page |
|---------|------|
| Create campaigns, import lore, manage members | [Campaign hub](campaign-hub.md) |
| Hierarchical wiki, templates, backlinks | [Wiki & lore](wiki-and-lore.md) |
| Hidden content, lore claims, revelation | [Discovery & revelation](discovery-and-revelation.md) |
| Open arcs, mysteries, player theories | [Narrative threads](narrative-threads.md) |
| Living-world batch simulation | [World advance](world-advance.md) |
| Session timeline, combined notes, compile export | [Sessions & notes](sessions-and-notes.md) |
| Fantasy calendars, timeline events, advance time | [Chronology & calendars](chronology-and-calendars.md) |
| Campaign History snapshots and compare | [Campaign History & snapshots](campaign-history-and-snapshots.md) |
| Interactive maps, pins, hover previews | [Maps & cartography](maps-and-cartography.md) |
| Campaign Home widgets, sidebar layout | [Campaign Home & sidebar](campaign-home-and-sidebar.md) |
| LFG listings, join requests | [Recruitment & LFG](recruitment-lfg.md) |
| Bell inbox, session reminders, email (when configured) | [Notifications](notifications.md) |
| ZIP backup, restore, Markdown import | [Data backup & export](data-backup-and-export.md) · [Data management](../data-management/README.md) |
| Install campaign-scoped plugins | [Plugins overview](plugins-overview.md) |

### Players & viewers

| Feature | Access |
|---------|--------|
| Read party-visible wiki pages | Wiki tree (visibility: Public / Party) |
| Revealed discovery content | Same surfaces after Game Master revelation |
| Session notes (own + party-visible) | Sessions → timeline or All View |
| RSVP to scheduled sessions | Campaign Home Session Schedule or session page |
| Player sandbox notes | Sessions (private scratch space) |
| Public LFG pages | Recruitment directory (no login required for public listings) |

### System admin

| Feature | Where |
|---------|-------|
| Registration, SMTP, maintenance, branding | Admin → General / Appearance |
| OIDC identity providers | Admin → Identity Providers — [Federated identity](../options/federated-identity.md) |
| Plugin registry, system backup | Admin → Plugins / Utilities |
| Global page templates | Admin → Page Templates |
| User management, API usage | Admin → Memberships / API Usage |

See [System admin settings](../options/system-admin-settings.md) for every toggle.

---

## Feature page template

Each guide covers:

1. **What it does**
2. **Who can use it** (roles)
3. **Where to find it** (routes / nav)
4. **Key options** (link to Options docs)
5. **Related docs** (esiana-core deep dives)
