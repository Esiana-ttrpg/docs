# Backups

Protect campaign lore and system data before upgrades or host changes.

---

## Campaign sovereign export

GM → Campaign Settings → Data & backup → **Export**

Portable ZIP with Markdown pages and JSON sidecars. Guarantees: [Sovereign export](../architecture/sovereignty.md)

User guide: [Data backup & export](../features/data-backup-and-export.md)

---

## System tier

| Tier | Method |
|------|--------|
| Database | `pg_dump` (Postgres) or volume copy (SQLite) |
| Uploads | Copy `uploads` Docker volume or `UPLOADS_DIR` |
| Plugins | Copy `plugins` volume |

---

## Restore

- Sovereign ZIP: campaign wizard or in-campaign restore
- Database: restore dump before starting backend, or fresh migrate on empty DB

API guide: [Import & export](../api/import-export.md)
