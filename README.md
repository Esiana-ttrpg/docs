# Esiana Documentation Wiki

This wiki documents how to operate, extend, and integrate with Esiana — a self-hosted narrative infrastructure platform for TTRPG campaigns.

It is not a player-facing guide.

Players interact through the application UI.  
This documentation is for operators, developers, and advanced campaign designers.

---

## Who this is for

Choose your path:

| Audience | Start here |
|----------|------------|
| Self-hosting operators | [Self-hosting → Installation](self-hosting/installation.md) |
| Plugin developers | [Plugin development → Getting started](plugin-development/getting-started.md) |
| API integrators | [API → Overview](api/overview.md) + `/api/docs` |
| Advanced GMs & writers | [Features → Campaign operations](features/campaign-hub.md) |
| Platform learners | [Campaign model → Narrative foundation](architecture/narrative-foundation.md) |
| Core contributors | [Local development](options/installation.md) |
| Migrating from Obsidian / Notion | [Import formats](import_formats.md) |

---

## What Esiana is

Esiana is a **campaign state and narrative continuity system**.

It is designed for:

- persistent world memory across sessions
- structured but flexible lore systems
- multi-player collaborative storytelling
- plugin-extensible campaign logic
- self-hosted deployments (single GM → multi-table groups)

It is **not** a VTT and does not simulate tactical combat.

---

## Start here (recommended reading order)

If you're new:

1. [Campaign model](architecture/campaign-model.md)
2. [Narrative foundation](architecture/narrative-foundation.md)
3. [Self-hosting installation](self-hosting/installation.md)
4. Explore a running instance via `/api/docs`

---

## Wiki sections

### 🧠 Architecture

How Esiana works internally:

- [Architecture catalog](architecture/README.md)
- [Campaign model](architecture/campaign-model.md)
- [Narrative foundation](architecture/narrative-foundation.md)
- [Sovereign export model](architecture/sovereignty.md)
- [Plugin architecture](architecture/plugin-architecture.md)

---

### 🔌 API

Human-readable API documentation:

- [API catalog](api/README.md)
- Live interactive reference: `/api/docs`

> Note: API documentation is version-locked to your running instance.

---

### 🧩 Plugin development

Extend Esiana with custom systems:

- [Plugin development overview](plugin-development/README.md)
- [Getting started](plugin-development/getting-started.md)
- [Hello world (example plugin)](plugin-development/hello-world.md)
- [Capabilities](plugin-development/capabilities.md) · [Capability matrix (advanced)](../esiana-core/docs/plugins/capability-matrix.md)

---

### 🏠 Self-hosting

Install and operate Esiana:

- [Self-hosting overview](self-hosting/README.md)
- [Installation](self-hosting/installation.md)
- [Docker configuration](self-hosting/docker.md)
- [Upgrades](self-hosting/upgrades.md)
- [Reverse proxy setup](self-hosting/reverse-proxy.md)
- [Federated identity (OIDC)](options/federated-identity.md)

---

### 🎲 Campaign features (advanced GMs)

Narrative and world systems:

- [Features catalog](features/README.md)
- [Campaign hub](features/campaign-hub.md)
- [Wiki & lore system](features/wiki-and-lore.md)
- [Narrative threads](features/narrative-threads.md)
- [Discovery & revelation mechanics](features/discovery-and-revelation.md)
- [World advance system](features/world-advance.md)
- [Session & notes system](features/sessions-and-notes.md)
- [Chronology & calendars](features/chronology-and-calendars.md)
- [Maps & cartography](features/maps-and-cartography.md)
- [Recruitment / LFG tools](features/recruitment-lfg.md)
- [Notifications](features/notifications.md)
- [Backup & export system](features/data-backup-and-export.md)

---

### ⚙️ Configuration & options

System configuration reference:

- [Options reference](options/README.md)
- [Environment variables](options/environment-variables.md)
- [OIDC configuration](options/federated-identity.md)
- [Admin settings](options/system-admin-settings.md)
- [Campaign settings](options/campaign-settings.md)
- [User settings](options/user-account-settings.md)
- [Limits & quotas](options/limits-and-quotas.md)

---

### 🚀 Getting started

Entry-level onboarding for contributors and integrators:

- [Local development](options/installation.md)

---

### 📦 Data migration

Importing external campaign data:

- [Import formats](import_formats.md)
- [Data backup & export](features/data-backup-and-export.md)
- [Import & export API](api/import-export.md)

---

## Engineering records (esiana-core)

Internal documentation for maintainers:

| Topic | Location |
|------|----------|
| Docs split policy | [esiana-core/docs/README.md](../esiana-core/docs/README.md) |
| Export & migration audits | [esiana-core/docs/audits/](../esiana-core/docs/audits/) |
| Security audits | [esiana-core/docs/security/](../esiana-core/docs/security/) |
| Deferred backlog | [esiana-core/docs/deferred-backlog.md](../esiana-core/docs/deferred-backlog.md) |
| Plugin capability matrix | [esiana-core/docs/plugins/capability-matrix.md](../esiana-core/docs/plugins/capability-matrix.md) |
| Pre-1.0 doc gaps | [known-gaps-1.0.md](known-gaps-1.0.md) |

---

## Design notes

Archived planning and system evolution notes live in:

- [Plans archive](plans/README.md)

These are not user-facing documentation.

---

## License

Documentation in this wiki is licensed under [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](./LICENSE).

- **Attribution:** Credit Esiana and link to the source page when reusing content.
- **ShareAlike:** If you remix or build upon this material, distribute your contributions under the same license.

Copyright (C) 2026 Esiana Contributors. Full legal text: [LICENSE](./LICENSE).
