# Database & Persistence

Esiana uses **Prisma** with a DB-agnostic schema. This page helps you **choose SQLite or PostgreSQL** and configure each engine.

For Docker setup, see [Quick install](quick-install.md).

---

## Choosing SQLite vs PostgreSQL

| Use case | Recommended engine | Why |
|----------|-------------------|-----|
| **Local dev / hacking on core** | SQLite | Zero setup; `file:./dev.db`; fast iteration with `db:push` |
| **Solo GM, one campaign, LAN-only** | SQLite | Single file to back up; low RAM; fine for small groups |
| **Docker trial (sqlite profile)** | SQLite | No Postgres container; one volume for `esiana.db` |
| **Production / internet-facing** | PostgreSQL | Concurrent writes, connection pooling, `pg_dump` backups |
| **Multi-campaign hub, LFG, many users** | PostgreSQL | Better under write load; standard ops tooling |
| **Automated testing** | Both | Run the same test suite against each engine to catch drift |

**Rule of thumb:** SQLite for **personal or dev**; PostgreSQL for **anything shared on the internet or with multiple simultaneous editors**.

---

## Settings by engine

### SQLite

**Best for:** development, solo self-host, quick trials.

| Setting | Value |
|---------|-------|
| `schema.prisma` | `provider = "sqlite"` |
| `DATABASE_PROVIDER` | `sqlite` |
| `DATABASE_URL` | `file:./dev.db` (dev) or `file:/data/esiana.db` (Docker volume) |
| Schema sync (dev) | `npm run db:push` |
| Migrations (prod) | `prisma migrate deploy` |
| System backup | Copy the `.db` file while backend is stopped, or Admin → System Utilities |
| Compose profile | `COMPOSE_PROFILES=sqlite` — [Quick install](quick-install.md) |

**Limitations:**

- Single-writer semantics — many concurrent uploads/edits can queue
- File must live on **persistent disk** (bind mount or Docker volume)
- No built-in replication — backup = file copy or campaign ZIP export

**Example `backend/.env` (manual dev):**

```env
DATABASE_PROVIDER=sqlite
DATABASE_URL="file:./dev.db"
```

**Example Docker `.env` (sqlite profile):**

```env
COMPOSE_PROFILES=sqlite
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:/data/esiana.db
```

---

### PostgreSQL

**Best for:** production, multi-user instances, Docker default profile.

| Setting | Value |
|---------|-------|
| `schema.prisma` | `provider = "postgresql"` |
| `DATABASE_PROVIDER` | `postgresql` |
| `DATABASE_URL` | `postgresql://USER:PASS@HOST:5432/DBNAME` |
| Schema sync (dev) | `npm run db:migrate` (prefer over `db:push` on shared DBs) |
| Migrations (prod) | `prisma migrate deploy` on container start |
| System backup | `pg_dump` + campaign ZIPs |
| Compose profile | `COMPOSE_PROFILES=postgresql` — [Quick install](quick-install.md) |

**Example `backend/.env` (local Postgres):**

```env
DATABASE_PROVIDER=postgresql
DATABASE_URL="postgresql://esiana:secret@localhost:5432/esiana"
```

**Example Docker `.env` (postgresql profile):**

```env
COMPOSE_PROFILES=postgresql
POSTGRES_USER=esiana
POSTGRES_PASSWORD=strong-secret-here
POSTGRES_DB=esiana
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://esiana:strong-secret-here@postgres:5432/esiana
```

**Operational notes:**

- Run migrations **before** serving traffic (Compose entrypoint handles this)
- Use managed Postgres (RDS, Neon, etc.) by pointing `DATABASE_URL` at the external host — omit the `postgres` Compose service
- Tune connection pool via Prisma datasource URL params if needed (`?connection_limit=10`)

---

## Side-by-side comparison

| Aspect | SQLite | PostgreSQL |
|--------|--------|------------|
| **Default in dev checkout** | Yes (`provider = "sqlite"` in repo) | Set `provider` literal + `DATABASE_URL` |
| **Docker Compose default** | `sqlite` profile | `postgresql` profile (recommended) |
| **Setup complexity** | None (embedded file) | Server or Compose service |
| **Backup** | Copy `.db` file | `pg_dump` / volume snapshot |
| **Move instance** | Copy file + uploads volume | Dump/restore + uploads volume |
| **Move campaigns only** | ZIP export/import | ZIP export/import |
| **Admin system backup** | File copy | `pg_dump` |
| **Concurrent writers** | Limited | Strong |
| **Compose dependency** | None (file on volume) | `postgres` service with `pg_isready` healthcheck |

---

## Prisma configuration

File: `esiana-core/backend/prisma/schema.prisma`

```prisma
datasource db {
  provider = "sqlite"   // change literal to "postgresql" for Postgres
  url      = env("DATABASE_URL")
}
```

Prisma requires a **literal** `provider` — it is not switched by `DATABASE_URL` alone. Match the Docker image build to your chosen engine, or change the literal before building.

### `DATABASE_PROVIDER` env

`backend/src/config/env.ts` reads `DATABASE_PROVIDER` for runtime behavior (backup strategy, health checks). It must agree with the Prisma `provider` literal and your `DATABASE_URL`.

### Switching engines on an existing install

There is no in-place engine conversion. Use sovereign data export:

1. Export all campaigns (ZIP) from the old instance
2. Stand up a new instance with the target engine ([Quick install](quick-install.md))
3. Restore campaigns from ZIP
4. Point DNS / reverse proxy at the new instance

---

## Migrations

| Environment | Command |
|-------------|---------|
| Local dev (SQLite) | `npm run db:push` for fast iteration, or `npm run db:migrate` for migration files |
| Local dev (Postgres) | `npm run db:migrate` |
| Docker / production | `prisma migrate deploy` in backend entrypoint — **never** `db:push` |

Keep migrations portable — avoid SQLite-only SQL so the same files apply on both engines.

---

## npm database commands

From `esiana-core` root:

| Command | Use |
|---------|-----|
| `npm run db:generate` | Regenerate Prisma Client after schema change |
| `npm run db:push` | Dev schema sync (SQLite prototyping only) |
| `npm run db:migrate` | Create/apply dev migrations |
| `npm run db:migrate-registry-url` | One-off plugin registry URL fix |
| `prisma migrate deploy` | Production / Docker startup |

---

## Related docs

- [Quick install](quick-install.md) — Docker Compose + `.env` for both profiles
- [Installation](installation.md) — local Node dev install
- [Deployment & Docker](deployment-and-docker.md) — container architecture
- [Environment variables](environment-variables.md)
- [`esiana-core/backend/prisma/README.md`](../esiana-core/backend/prisma/README.md)
- [Data backup & export](../features/data-backup-and-export.md)
