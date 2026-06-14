# Docker deployment

Compose services, images, volumes, and operational commands.

See [Installation](installation.md) for first-time setup.

---

## Architecture

```mermaid
flowchart LR
  subgraph compose [docker-compose]
    PG[(postgres)]
    BE[backend]
    FE[frontend_nginx]
  end
  RP[reverse_proxy] --> FE
  BE --> PG
  BE --> VolUploads[(uploads)]
  BE --> VolPlugins[(plugins)]
```

| Service | Role |
|---------|------|
| **postgres** | PostgreSQL persistence |
| **backend** | Express API, Prisma, uploads, plugins |
| **frontend** | nginx serving SPA; proxies `/api` and `/uploads` |

Startup order:

1. Postgres passes `pg_isready` healthcheck
2. Backend entrypoint runs `prisma migrate deploy` (with retry)
3. Backend passes `/api/health` healthcheck
4. Frontend starts (waits for backend healthy)

---

## Useful commands

```bash
docker compose up -d --build          # first start or rebuild from source
docker compose logs -f backend
docker compose ps
docker compose down                    # stop; volumes preserved
```

### Released images (GHCR)

Published backend and frontend images are available from GitHub Container Registry:

| Image | Registry path |
|-------|---------------|
| Backend | `ghcr.io/esiana-ttrpg/esiana-backend` |
| Frontend | `ghcr.io/esiana-ttrpg/esiana-frontend` |

Set `ESIANA_VERSION` to a release tag (e.g. `v1.0.0`) before pulling:

```bash
export ESIANA_VERSION=v1.0.0
docker compose pull
docker compose up -d
```

Omit `ESIANA_VERSION` to use `latest`. Local development can still build from source with `docker compose up -d --build` — compose defines both `image:` and `build:`.

---

## Volumes

| Volume | Contents |
|--------|----------|
| `pgdata` | PostgreSQL data |
| `uploads` | Maps, media |
| `plugins` | Runtime plugin packages |

---

## API docs in production

`/api/docs` is disabled in production unless `OPENAPI_DOCS_ENABLED=true`. The OpenAPI spec ships version-locked inside the backend image.

---

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Blank page / API errors | `docker compose logs backend` — migration failed? |
| Backend stuck starting | `docker compose ps` — backend healthcheck waiting on migrate |
| Login cookie not set | `COOKIE_SECURE=true` requires HTTPS |
| CORS errors | `CORS_ORIGIN` must match browser URL |
| Postgres restart loop | `POSTGRES_PASSWORD` set? |

Legacy detail: [Options: deployment & Docker](../options/deployment-and-docker.md) (redirect stub).
