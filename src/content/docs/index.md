---
title: "Esiana Documentation"
description: Install, operate, extend, and explore Esiana campaign narrative infrastructure.
---

How to install, operate, extend, integrate — and play — Esiana: self-hosted narrative infrastructure for TTRPG campaigns.

**Audience:** game masters and players, operators, developers, and advanced campaign designers. The feature guides are written for the table; the operations and extension tracks are written for the people who run and build the software.

---

## Quick start (Docker)

The fastest way to run Esiana: Docker Compose with Postgres and `ghcr.io/esiana-ttrpg/esiana`.

```bash
git clone https://github.com/Esiana-ttrpg/esiana-core.git
cd esiana-core
cp .env.example .env
# Edit .env: set POSTGRES_PASSWORD and JWT_SECRET (openssl rand -hex 32)
docker compose up -d
```

Open **http://localhost:8080**, register, and use Esiana. The first account becomes system admin.

**Next:** [Installation](self-hosting/installation.md) · [Docker config](self-hosting/docker.md) · [Reverse proxy](self-hosting/reverse-proxy.md) · [Upgrades](self-hosting/upgrades.md)

---

## Choose your path

| Audience | Start here |
|----------|------------|
| Game masters & players | [Features catalog](features/index.md) |
| Self-hosting operators | [Installation](self-hosting/installation.md) |
| Plugin developers | [Getting started](plugin-development/getting-started.md) |
| API integrators | [API overview](api/overview.md) · `/api/docs` on your instance |
| Advanced GMs & writers | [Campaign hub](features/campaign-hub.md) |
| Platform learners | [Campaign model](architecture/campaign-model.md) |
| Core contributors | [Local development](options/installation.md) |
| Migrating from Obsidian / Notion / Kanka | [Import formats](data-management/import-formats.md) |

---

## Documentation

The Markdown files in this repository are the **source of truth** for the published documentation. Use the sidebar to browse guides by audience and workflow.

### Hosting & administration

Install, configure, and run your instance.

- [Self-hosting](self-hosting/index.md) — Docker, Postgres, backups, upgrades, reverse proxy
- [Options reference](options/index.md) — environment variables, Admin settings, OIDC, limits

### Using Esiana

Guides for the table — game masters, players, and campaign managers.

- [Features catalog](features/index.md) — wiki, sessions, chronology, maps, discovery, downtime, journals, Campaign Home
- [Data management](data-management/index.md) — import formats, export, backups

### Building & extending

Architecture, APIs, and plugins for integrators and contributors.

- [Architecture](architecture/index.md) — campaign model, narrative foundation, sovereignty
- [API guides](api/index.md) — human-readable REST docs; live reference at `/api/docs`
- [Plugin development](plugin-development/index.md) — manifests, capabilities, examples

---

## What Esiana is

Esiana is a **campaign state and narrative continuity system** for:

- persistent world memory across sessions
- structured lore with multi-player collaboration
- knowledge revelation and player discovery
- plugin-extensible campaign logic
- self-hosted deployments (single GM to multi-table groups)

It is **not** a VTT and does not simulate tactical combat.

---

Maintainer engineering: [esiana-core/docs](https://github.com/Esiana-ttrpg/esiana-core/blob/main/docs/README.md) · Plan archives: [plans/](https://github.com/Esiana-ttrpg/docs/tree/main/plans/README.md) (not user-facing)

## Improve the documentation

[Contribute a page or correction](contributing.md) or [suggest an improvement](https://github.com/Esiana-ttrpg/docs/issues/new).
