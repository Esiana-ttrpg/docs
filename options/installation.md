# Installation

Local development setup with **Node.js**. For self-hosting, use [Self-hosting: installation](../self-hosting/installation.md) instead.

---

## Requirements

- **Node.js** ≥ 20
- **npm** (workspaces monorepo at [`esiana-core`](../esiana-core/))
- **SQLite** (default for dev) or **PostgreSQL** — see [Database & persistence](database-and-persistence.md)

---

## Development quick start

From the `esiana-core` repository root:

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run db:generate
npm run db:push
```

Terminal 1 — backend:

```bash
npm run dev:backend
```

Terminal 2 — frontend:

```bash
npm run dev:frontend
```

Open **http://localhost:5173**.

### Port alignment

| Service | Default port | Config |
|---------|--------------|--------|
| Backend API | **3001** | `PORT` in `backend/.env` |
| Vite dev server | **5173** | Vite default |
| Vite proxy target | **3000** (example) | `VITE_API_PROXY_TARGET` in `frontend/.env` |

The backend defaults to port **3001**, but `frontend/.env.example` proxies to **3000**. If you keep backend on 3001, set:

```env
VITE_API_PROXY_TARGET=http://localhost:3001
```

See [Environment variables](environment-variables.md) for the full list.

### First user bootstrap

The **first registered account** becomes **system admin** automatically. Use this account to open **Admin** and configure registration, SMTP, and branding.

---

## Database setup (dev)

Default dev database: SQLite with `DATABASE_URL="file:./dev.db"`.

After schema changes:

```bash
npm run db:generate
npm run db:push    # dev prototyping
# or
npm run db:migrate # when using migrations
```

For engine choice and production settings, see [Database & persistence](database-and-persistence.md).

---

## Production without Docker

Before exposing Esiana to the internet:

| Item | Setting | Doc |
|------|---------|-----|
| Strong JWT secret | `JWT_SECRET` — long random string | [Environment variables](environment-variables.md) |
| HTTPS cookies | `COOKIE_SECURE=true` | [Reverse proxy & security](reverse-proxy-and-security.md) |
| CORS origin | `CORS_ORIGIN=https://your-domain` | [Reverse proxy & security](reverse-proxy-and-security.md) |
| Behind reverse proxy | `TRUST_PROXY=true` | [Reverse proxy & security](reverse-proxy-and-security.md) |
| Production mode | `NODE_ENV=production` | [Environment variables](environment-variables.md) |
| Email notification links | `FRONTEND_ORIGIN=https://your-domain` | [Environment variables](environment-variables.md) |
| PostgreSQL | Recommended for production | [Database & persistence](database-and-persistence.md) |
| Backups | Campaign ZIP + system DB backup | [Data backup & export](../features/data-backup-and-export.md) |

Build:

```bash
npm run build
npm run start   # backend (from backend workspace)
# Serve frontend/dist via nginx — see reverse-proxy doc
```

---

## npm scripts (reference)

Run from `esiana-core` root:

| Script | Action |
|--------|--------|
| `dev:backend` | Backend watch mode |
| `dev:frontend` | Vite dev server |
| `build` | Build all workspaces |
| `db:generate` | `prisma generate` |
| `db:migrate` | `prisma migrate dev` |
| `db:push` | `prisma db push` |
| `db:migrate-registry-url` | One-off plugin registry URL migration |

Configuration is via `.env` files and Admin UI — there is no standalone Esiana CLI.

---

## Related docs

- [Self-hosting: installation](../self-hosting/installation.md) — Docker Compose self-hosting
- [Environment variables](environment-variables.md)
- [Deployment & Docker](deployment-and-docker.md)
- [Database & persistence](database-and-persistence.md)
- [`esiana-core/README.md`](../esiana-core/README.md) — monorepo overview
