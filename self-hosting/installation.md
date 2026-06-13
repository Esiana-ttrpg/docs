# Installation

Quick start for self-hosting Esiana with Docker Compose.

For local Node development, see **Options: installation**.

---

## Prerequisites

- Docker 24+ and Docker Compose v2
- Minimum: **2 GB RAM (SQLite, single-user / light usage)**
- Recommended: **4 GB RAM (PostgreSQL, multi-user campaigns)**
- 1–2 CPU cores minimum
- Port `8080` free, or set `COMPOSE_HTTP_PORT`

> ⚠️ Note: Resource usage is driven primarily by database choice (PostgreSQL vs SQLite), number of active campaigns, and plugin usage. The application itself is lightweight.

---

## 1. Get the compose files

```bash
git clone https://github.com/Esiana-ttrpg/esiana-core.git
cd esiana-core
cp ../docs/options/compose.env.example .env
```

## 2. Quick Docker Compose

Esiana supports two database profiles:

PostgreSQL → recommended for production / multi-user campaigns
SQLite → lightweight setup for solo GM or LAN testing
```
services:
  esiana:
    build: .
    ports:
      - "8080:8080"
    env_file:
      - .env
    depends_on:
      - db

  db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: esiana
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: esiana
    volumes:
      - esiana_pg:/var/lib/postgresql/data

volumes:
  esiana_pg:
  ```

Run:
```
docker compose --profile postgresql up -d --build
```

## SQLite (solo / LAN / low-resource)
```
services:
  esiana:
    build: .
    ports:
      - "8080:8080"
    env_file:
      - .env
    environment:
      DATABASE_URL: "sqlite:/data/esiana.db"
    volumes:
      - esiana_sqlite:/data

volumes:
  esiana_sqlite:
```
Run
```
docker compose --profile sqlite up -d --build
```

## 3. Configure .env
```
JWT_SECRET=<openssl rand -hex 32>

PUBLIC_ORIGIN=http://localhost:8080
CORS_ORIGIN=http://localhost:8080
FRONTEND_ORIGIN=http://localhost:8080

COMPOSE_PROFILES=postgresql

POSTGRES_PASSWORD=<strong-password>

# Local HTTP trial only
COOKIE_SECURE=false
```
Full reference: [Environment variables](../options/environment-variables.md)


## 4. Start
```
docker compose --profile postgresql up -d --build
```
Open
```
http://localhost:8080
```

## 5. First login

- Register at `/register`
- First account automatically becomes system admin

Then configure:

- registration settings
- SMTP configuration
- branding / identity

---

## Notes on sizing

### SQLite mode

Best for:

- solo GM use
- LAN testing
- small or experimental campaigns

---

### PostgreSQL mode

Recommended for:

- multiple players
- long-running campaigns
- plugin-heavy setups
- frequent narrative updates

---

## Performance note

The application layer is lightweight.  
Most scaling considerations come from **database and file storage**, not the API server.

---

## Next steps

- Docker architecture (services, volumes, troubleshooting)
- PostgreSQL vs SQLite guidance
- Capacity planning (campaign scaling, plugin load)
- Reverse proxy setup (HTTPS production)
- Federated identity (OIDC / external login)