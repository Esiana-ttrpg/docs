# Installation

Quick start for self-hosting Esiana with Docker Compose.

For local Node development, see **Options: installation**.

---

## Prerequisites

- Docker 24+ and Docker Compose v2
- Recommended: **4 GB RAM** for PostgreSQL and multi-user campaigns
- 1–2 CPU cores minimum
- Port `8080` free, or set `COMPOSE_HTTP_PORT`

---

## 1. Get the compose files

```bash
git clone https://github.com/Esiana-ttrpg/esiana-core.git
cd esiana-core
cp ../docs/options/compose.env.example .env
```

Edit `.env` — at minimum set `JWT_SECRET` and `POSTGRES_PASSWORD` (see step 3).

---

## 2. Architecture

Compose runs two services:

| Service | Role |
|---------|------|
| **postgres** | PostgreSQL 16 persistence |
| **esiana** | nginx + Express API + SPA; proxies `/api` and `/uploads` to the embedded backend |

Startup order: Postgres healthcheck → esiana entrypoint runs `prisma migrate deploy` (with retry) → backend health → nginx serves the app.

Released image: `ghcr.io/esiana-ttrpg/esiana` (set `ESIANA_VERSION=vX.Y.Z` for pull-based upgrades).

See [Docker deployment](docker.md) for volumes, logs, and troubleshooting.

---

## 3. Configure .env

```env
JWT_SECRET=<openssl rand -hex 32>

PUBLIC_ORIGIN=http://localhost:8080
CORS_ORIGIN=http://localhost:8080
FRONTEND_ORIGIN=http://localhost:8080

POSTGRES_PASSWORD=<strong-password>

# Local HTTP trial only
COOKIE_SECURE=false
```

Full reference: [Environment variables](../options/environment-variables.md)

---

## 4. Start

```bash
docker compose up -d --build
```

Open `http://localhost:8080`

Migrations run automatically when the esiana container starts — no manual `prisma migrate deploy` required.

---

## 5. First login

- Register at `/register`
- First account automatically becomes system admin

Then configure:

- registration settings
- SMTP configuration
- branding / identity

---

## Next steps

- [Docker deployment](docker.md) — services, volumes, troubleshooting
- [PostgreSQL](postgres.md) — credentials and backups
- [Capacity planning](capacity-and-sizing.md)
- [Reverse proxy setup](reverse-proxy.md) (HTTPS production)
- Federated identity (OIDC / external login)
