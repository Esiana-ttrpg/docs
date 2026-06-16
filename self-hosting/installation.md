# Installation

Quick start for self-hosting Esiana with Docker Compose.

Esiana runs as a single application container that serves both the API and web UI; Postgres is the only required external service.

For local Node development, see [Options: installation](../options/installation.md).

---

## What runs in Docker

```text
esiana   — app + API + UI (internal nginx on container port 80)
postgres — database
```

No separate frontend or backend containers. Optional integrations (OIDC, plugins, object storage, HTTPS) are configured after install — see [Next steps](#next-steps).

---

## Prerequisites

- Docker 24+ and Docker Compose v2
- **4 GB RAM** recommended for multi-user campaigns
- 1–2 CPU cores minimum
- Port `8080` free, or set `COMPOSE_HTTP_PORT` in `.env`

---

## Quick start

```bash
git clone https://github.com/Esiana-ttrpg/esiana-core.git
cd esiana-core
cp .env.example .env
```

Edit `.env` and set:

- `POSTGRES_PASSWORD` — database password
- `JWT_SECRET` — session signing secret (`openssl rand -hex 32`)

Start:

```bash
docker compose up -d
```

Open **http://localhost:8080**, register, and use Esiana. The first account becomes system admin.

Migrations run automatically when the esiana container starts.

---

## First login

After registering:

- Configure registration settings, SMTP, and branding in **Admin**
- See [Next steps](#next-steps) for HTTPS, external sign-in, and plugins

---

## Sizing

The application layer is lightweight. Most scaling considerations come from database load, campaign size, and file storage — not the API server.

See [Capacity and sizing](capacity-and-sizing.md) for hardware guidance.

---

## Next steps

| Guide | Topic |
|-------|-------|
| [Docker](docker.md) | Services, volumes, GHCR upgrades, troubleshooting |
| [Reverse proxy](reverse-proxy.md) | HTTPS production (Caddy, nginx) |
| [Federated identity (OIDC)](../options/federated-identity.md) | External sign-in |
| [Plugins overview](../features/plugins-overview.md) | Runtime plugins and registry |
| [Environment variables](../options/environment-variables.md) | Full `.env` reference |
| [Upgrades](upgrades.md) | Image pulls and migrations |
