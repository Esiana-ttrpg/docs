# Esiana Documentation

How to install, operate, extend, and integrate Esiana — self-hosted narrative infrastructure for TTRPG campaigns.

**Audience:** operators, developers, and advanced campaign designers. Players use the application UI; this is not a player guide.

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
| Self-hosting operators | [Installation](self-hosting/installation.md) |
| Plugin developers | [Getting started](plugin-development/getting-started.md) |
| API integrators | [API overview](api/overview.md) · `/api/docs` on your instance |
| Advanced GMs & writers | [Campaign hub](features/campaign-hub.md) |
| Platform learners | [Campaign model](architecture/campaign-model.md) |
| Core contributors | [Local development](options/installation.md) |
| Migrating from Obsidian / Notion / Kanka | [Import formats](data-management/import-formats.md) |

---

## Documentation

Repo folders are the **source of truth**. A future published docs site will use a lighter, curated sidebar (~15–20 items) focused on product workflows — not a mirror of every folder.

### Hosting & administration

Install, configure, and run your instance.

- [Self-hosting](self-hosting/README.md) — Docker, Postgres, backups, upgrades, reverse proxy
- [Options reference](options/README.md) — environment variables, Admin settings, OIDC, limits

### Using Esiana

What staff can do in a campaign and where to find it in the UI.

- [Features catalog](features/README.md) — wiki, sessions, chronology, maps, discovery, Campaign Home
- [Data management](data-management/README.md) — import formats, export, backups

### Building & extending

Architecture, APIs, and plugins for integrators and contributors.

- [Architecture](architecture/README.md) — campaign model, narrative foundation, sovereignty
- [API guides](api/README.md) — human-readable REST docs; live reference at `/api/docs`
- [Plugin development](plugin-development/README.md) — manifests, capabilities, examples

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

Maintainer engineering: [esiana-core/docs](../esiana-core/docs/README.md) · Plan archives: [plans/](plans/README.md) (not user-facing)
