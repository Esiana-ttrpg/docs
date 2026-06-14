# Upgrades

Upgrade a self-hosted Esiana instance safely.

---

## Procedure

1. **Backup** — database (`pg_dump` or SQLite volume), uploads volume, and campaign sovereign ZIPs
2. **Pull** the release images (recommended) or checkout the git tag and rebuild
3. **Restart:**
   ```bash
   export ESIANA_VERSION=v1.0.0   # match your target release tag
   docker compose pull
   docker compose up -d
   ```
   Backend entrypoint runs `prisma migrate deploy` automatically.

   **Build from source** (no GHCR pull):
   ```bash
   git fetch --tags
   git checkout v1.0.0
   docker compose up -d --build
   ```
4. **Smoke test** — login, wiki edit, export ZIP

---

## Migration notes

Schema changes ship as Prisma migrations in the backend image. Do not use `db:push` in production containers.

If migration fails, check `docker compose logs backend` and restore from backup before retrying.

Engineering record: [`esiana-core/docs/audits/migration-audit.md`](../../esiana-core/docs/audits/migration-audit.md)

---

## Rollback

Restore database and uploads from backup, then run the previous image tag. Campaign sovereign ZIPs are independent of system DB version — test restore on a staging campaign first.
