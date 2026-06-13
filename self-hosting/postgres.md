# PostgreSQL

Database engine choice, Compose configuration, and backups.

---

## Choosing an engine

| Engine | Best for |
|--------|----------|
| **PostgreSQL** | Production, multi-user, `pg_dump` backups |
| **SQLite** | Solo GM, minimal ops, LAN trial |

Both are supported via Prisma — no engine-specific SQL in application code (`backend/src/`). See [database-portability-audit.md](https://github.com/Esiana-ttrpg/esiana-core/blob/main/docs/audits/database-portability-audit.md).

---

## Compose (PostgreSQL)

```env
COMPOSE_PROFILES=postgresql
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://esiana:${POSTGRES_PASSWORD}@postgres:5432/esiana
```

---

## Compose (SQLite)

```env
COMPOSE_PROFILES=sqlite
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:/data/esiana.db
```

Database file lives on the `esiana-data` volume at `/data/esiana.db`.

---

## Backups

PostgreSQL: `pg_dump` against the `pgdata` volume (not in Admin UI).

SQLite: back up the entire `esiana-data` volume.

Campaign lore: sovereign ZIP from Campaign Settings — see [Backups](backups.md).

Full reference: [Database & persistence](../options/database-and-persistence.md)
