# Features Catalog

Esiana is a self-hosted TTRPG worldbuilding and campaign manager. This section explains the features in plain language: what each one is for, how game masters and players use it, and what can be configured.

For configuration references (environment variables, admin console, campaign tabs), see the Options section. For the ideas underneath the features, see Architecture.

## By role

### Game masters & writers

| Feature | Page |
|---------|------|
| Create campaigns, import lore, manage members | [Campaign hub](campaign-hub.md) |
| Shape Campaign Home and sidebar navigation | [Campaign Home & sidebar](campaign-home-and-sidebar.md) |
| Hierarchical wiki, character sheets, backlinks | [Wiki & lore](wiki-and-lore.md) |
| Hidden content, lore claims, revelation | [Discovery & revelation](discovery-and-revelation.md) |
| Open arcs, mysteries, player theories | [Narrative threads](narrative-threads.md) |
| Fantasy calendars, timeline events, advance time | [Chronology & calendars](chronology-and-calendars.md) |
| Campaign history snapshots and compare | [Campaign history & snapshots](campaign-history-and-snapshots.md) |
| Living-world batch simulation | [World advance](world-advance.md) |
| Havens, projects, ledger, suggestions | [Downtime & projects](downtime-and-projects.md) |
| In-world press, series, release rules | [Journal & publishing](journal-and-publishing.md) |
| Session timeline, combined notes, compile export | [Sessions & notes](sessions-and-notes.md) |
| Interactive maps, pins, hover previews | [Maps & cartography](maps-and-cartography.md) |
| LFG listings, join requests | [Recruitment & LFG](recruitment-lfg.md) |
| Bell inbox, session reminders, email (when configured) | [Notifications](notifications.md) |
| ZIP backup, restore, Markdown import | [Data backup & export](data-backup-and-export.md) · [Data management](../data-management/README.md) |
| Install campaign-scoped plugins | [Plugins overview](plugins-overview.md) |

### Players & viewers

| Feature | Access |
|---------|--------|
| Read party-visible wiki pages | Wiki tree (visibility: Public / Party) |
| Revealed discovery content | Same surfaces after game master revelation |
| Follow open threads, submit theories | Threads hub |
| Read the campaign journal | Library |
| Session notes (own + party-visible) | Sessions → timeline or combined view |
| RSVP to scheduled sessions | Campaign Home schedule or session page |
| Private scratch notes | Sessions sandbox |
| Public LFG pages | Recruitment directory (no login required for public listings) |

### System administrators

| Feature | Where |
|---------|-------|
| Registration, SMTP, maintenance, branding | Admin → General / Appearance |
| External sign-in providers | Admin → Identity Providers — [Federated identity](../options/federated-identity.md) |
| Plugin registry, system backup | Admin → Plugins / Utilities |
| Global page templates | Admin → Page Templates |
| User management, API usage | Admin → Memberships / API Usage |

See the system admin settings guide for the full console reference.

## How these guides are written

Each guide explains the feature as its users meet it: the idea first, then the mental model, then the normal workflow with concrete steps, then configuration for those allowed to change it, then the player experience where it differs, and finally limitations worth knowing. Simple features get short pages; complex systems get the room they need.
