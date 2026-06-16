# PostgreSQL

Database engine choice, Compose configuration, and backups.

---

## Choosing an engine

| Engine | Best for |
|--------|----------|
| **PostgreSQL** | Official Docker Compose, production, multi-user, `pg_dump` backups |
| **SQLite** | Local Node development, solo GM hacking on core |

Both are supported via Prisma — no engine-specific SQL in application code (`backend/src/`). See [database-portability-audit.md](https://github.com/Esiana-ttrpg/esiana-core/blob/main/docs/audits/database-portability-audit.md).

---

## Docker Compose

Official [`docker-compose.yml`](https://github.com/Esiana-ttrpg/esiana-core/blob/main/docker-compose.yml) includes a `postgres` service. Set `POSTGRES_PASSWORD` in `.env` — compose generates `DATABASE_URL` automatically.

No SQLite profile in official Compose. For SQLite, use local Node dev ([Options: installation](../options/installation.md)).

---

## Backups

PostgreSQL: `pg_dump` against the `postgres_data` volume (docs template; `pgdata` in esiana-core clone).

Campaign lore: sovereign ZIP from Campaign Settings — see [Backups](backups.md).

Full reference: [Database & persistence](../options/database-and-persistence.md)
