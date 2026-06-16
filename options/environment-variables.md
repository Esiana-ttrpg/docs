# Environment Variables

Complete reference for backend and frontend environment variables. Copy templates from `esiana-core/.env.example` (Docker Compose), `esiana-core/backend/.env.example`, and `esiana-core/frontend/.env.example`. Docs mirror: [compose.env.example](compose.env.example).

**Legend:** **Env only** = server file only · **Overridden in Admin** = DB setting wins when set · **Dev only** = not needed in production static frontend · **Compose only** = Docker Compose operator file, not read by the app directly

---

## Docker Compose operator variables

Used in `.env` beside `docker-compose.yml` ([Self-hosting: Installation](../self-hosting/installation.md)). Canonical template: `esiana-core/.env.example`. Docs mirror: [compose.env.example](compose.env.example).

Official Compose ships **PostgreSQL only** (`esiana` + `postgres`). SQLite is for local Node development — not the Docker quick start.

| Variable | Default | Purpose | Set by |
|----------|---------|---------|--------|
| `POSTGRES_PASSWORD` | (required) | PostgreSQL container password; also used in app `DATABASE_URL` | Compose + app |
| `JWT_SECRET` | (required) | Session token signing secret | App |
| `ESIANA_VERSION` | `latest` | GHCR image tag (`ghcr.io/esiana-ttrpg/esiana`) | Compose only |
| `PUBLIC_ORIGIN` | `http://localhost:8080` | Single source of truth for external URL generation. Compose derives `FRONTEND_ORIGIN`, `CORS_ORIGIN`, and `BACKEND_PUBLIC_ORIGIN` at startup | Compose → app |
| `COMPOSE_HTTP_PORT` | `8080` | Host port mapped to esiana container port 80 | Compose only |
| `AUTH_SECRETS_KEY` | (empty) | AES key for encrypting OIDC client secrets stored in Admin — required in production when using Identity Providers | App |
| `TRUST_PROXY` | `false` | `true` when behind a reverse proxy with `X-Forwarded-*` headers | App |
| `COOKIE_SECURE` | `false` | `true` for HTTPS-only session cookies | App |
| `OPENAPI_DOCS_ENABLED` | `true` | `false` hides `/api/docs` on public hosts | App |

Fixed in compose (do not duplicate in `.env` unless overriding): `POSTGRES_USER=esiana`, `POSTGRES_DB=esiana`, `DATABASE_URL=postgresql://esiana:${POSTGRES_PASSWORD}@postgres:5432/esiana`.

See [Backend — core runtime](#backend--core-runtime) and [Backend — identity & OIDC](#backend--identity--oidc) for app variables compose passes through.

---

## Backend — core runtime

Defined in `esiana-core/backend/src/config/env.ts`.

| Variable | Default | Purpose | Set by |
|----------|---------|---------|--------|
| `NODE_ENV` | `development` | Runtime mode (`production` in prod) — see [Development & debug](#development--debug) | Env only |
| `PORT` | `3001` | HTTP server port | Env only |
| `DATABASE_URL` | `postgresql://esiana:esiana@localhost:5432/esiana` | Prisma connection string | Env only |
| `DATABASE_PROVIDER` | `postgresql` | Read into app config; **does not switch Prisma today** — see [Database & persistence](database-and-persistence.md) | Env only |
| `JWT_SECRET` | `dev-secret-change-me` | Auth token signing — **change in production** | Env only |
| `JWT_EXPIRES_IN` | `7d` | Session token lifetime | Env only |
| `COOKIE_NAME` | `esiana_token` | Session cookie name | Env only |
| `COOKIE_SECURE` | `false` | HTTPS-only cookies (`true` behind TLS) | Env only |
| `COOKIE_SAME_SITE` | `lax` | `strict` \| `lax` \| `none` | Env only |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed frontend origin | Env only |
| `TRUST_PROXY` | `false` | Express trust proxy (rate-limit client IP behind nginx/Caddy) | Env only |
| `UPLOADS_DIR` | `../uploads` | Local file storage root (relative to `backend/`) | Env only |
| `PLUGINS_DIR` | `../plugins` | Runtime plugin packages | Env only |
| `STORAGE_PROVIDER` | `filesystem` | Active storage driver ID | Env only |
| `STORAGE_REDIRECT_THRESHOLD_BYTES` | `5242880` (5 MB) | Prefer redirect delivery above this size | Env only |
| `ESIANA_CORE_VERSION` | `0.9.0` | Product version for plugin engine constraints | Env only |
| `OPENAPI_DOCS_ENABLED` | (unset) | `true` / `false`; when unset, `/api/docs` enabled in non-production only | Env only |

**In practice:** Set `OPENAPI_DOCS_ENABLED=true` in production Docker if integrators need Swagger on a private network. Set `false` on public-facing hosts to hide the explorer.

---

## Backend — identity & OIDC

Required for production OIDC ([Federated identity](federated-identity.md)).

| Variable | Default | Purpose | Set by |
|----------|---------|---------|--------|
| `AUTH_SECRETS_KEY` | (empty) | 32-byte base64 AES key for encrypting IdP client secrets | Env only |
| `BACKEND_PUBLIC_ORIGIN` | `http://localhost:3001` | Public API URL (OIDC redirect host) | Env only |
| `API_PUBLIC_ORIGIN` | (alias) | Same as `BACKEND_PUBLIC_ORIGIN` | Env only |
| `FRONTEND_ORIGIN` | `http://localhost:5173` | Post-login redirect target; email deep links | Env only |

**In practice:** `AUTH_SECRETS_KEY` is mandatory in production when storing OIDC client secrets. Generate with `openssl rand -base64 32`. `BACKEND_PUBLIC_ORIGIN` must match the URL your IdP accepts for the callback path.

---

## Backend — cartography pipeline

Env defaults; **Overridden in Admin** when Admin upload/map fields are set (see [System admin settings](system-admin-settings.md)).

| Variable | Default | Purpose | Set by |
|----------|---------|---------|--------|
| `MAP_PRESERVE_FULL_RES` | `false` (env); DB default `true` | Keep full-resolution map originals | Env + Admin (OR logic for preserve) |
| `MAP_DISPLAY_MAX_EDGE` | `8192` | Display variant max pixels | Env + Admin |
| `MAP_THUMB_MAX_EDGE` | `2048` | Thumbnail max pixels | Env + Admin |

---

## Backend — plugin runtime interceptors

| Variable | Default | Purpose | Set by |
|----------|---------|---------|--------|
| `PLUGIN_INTERCEPTOR_TIMEOUT_MS` | `200` | Plugin data-hook timeout (ms) | Env only |
| `PLUGIN_MAX_HOOKS_PER_PLUGIN` | `10` | Max interceptors per plugin | Env only |
| `PLUGIN_MAX_CONCURRENT_INTERCEPTORS` | `4` | Concurrent hook workers | Env only |
| `PLUGIN_WORKER_MAX_OLD_GENERATION_MB` | `32` | Plugin worker heap cap (MB) | Env only |

---

## Backend — demo users & sample data

Developer and QA fixtures. **Do not enable on public production hosts.**

| Variable | Default | Purpose | Set by |
|----------|---------|---------|--------|
| `ENABLE_DEMO_USERS` | `false` | Allow campaign generators to create seeded login accounts (`@seed.esiana.local`) | Env only |
| `ENABLE_SAMPLE_DATA` | `false` | Expose core Sample Data profiles (benchmark campaigns, Admin → Sample Data, Create Campaign dev section) | Env only |
| `ESIANA_BASE_URL` | `http://127.0.0.1:${PORT}` | Target URL for `seed-campaign`, `profile-capacity`, and capacity baseline scripts | Script env only |
| `ESIANA_SEED_TOKEN` | (unset) | API token with `campaign:seed` scope; script default for `--token` | Script env only |

**Demo users (`ENABLE_DEMO_USERS=true`):** Campaign generators may create fake player and DM accounts at `@seed.esiana.local`. All seeded accounts share the password `esiana-demo-seed`. Used by ensemble and player-experience demo generators — not for real players.

**Sample data (`ENABLE_SAMPLE_DATA=true`):** Enables built-in benchmark profiles (`benchmark-small` through `benchmark-extreme`). Does not gate Content Packs (plugin markdown). Pair with:

```bash
ENABLE_SAMPLE_DATA=true npm run seed-campaign -- --plan-only --profile benchmark-medium
ENABLE_SAMPLE_DATA=true npm run profile-capacity -- --slug my-campaign --token "$TOKEN"
```

See [Capacity & sizing](../self-hosting/capacity-and-sizing.md) for profiling workflows.

---

## Development & debug

Esiana has no separate `DEBUG` environment variable. Development behavior is controlled by `NODE_ENV` and Vite's build mode.

| Mode | Effect |
|------|--------|
| `NODE_ENV=development` | Prisma logs queries, warnings, and errors (`backend/src/lib/prisma.ts`) |
| `NODE_ENV=production` | Prisma logs errors only; `/api/docs` disabled unless `OPENAPI_DOCS_ENABLED=true` |
| Vite dev (`import.meta.env.DEV`) | Relaxed plugin CSP in the frontend runtime |

For local Node development, set `NODE_ENV=development` in `backend/.env`. Docker Compose defaults to `NODE_ENV=production`.

---

## Backend — internal & advanced

| Variable | Default | Purpose | Defined in |
|----------|---------|---------|------------|
| `API_INTERNAL_BASE_URL` | `http://127.0.0.1:${PORT}` | Server-side self-HTTP base for campaign bootstrap and generators | `campaignBootstrap.ts`, `campaignGenerators.ts` |
| `SNAPSHOT_HOT_VISITS_PER_REGION` | `1` | Hot narrative snapshot visits per region before cold compression | `snapshotCompressionQueue.ts` |

Set `API_INTERNAL_BASE_URL` when the backend cannot reach itself on `127.0.0.1` (unusual container networking setups).

---

## Backend — rate limits

Defined in `esiana-core/backend/src/config/rateLimitEnv.ts`. All optional — defaults are lenient for small self-hosted instances. See [Limits & quotas](limits-and-quotas.md).

| Variable | Default | Purpose |
|----------|---------|---------|
| `RATE_LIMIT_LOGIN_MAX` | `20` | Login attempts per window |
| `RATE_LIMIT_LOGIN_WINDOW_MS` | `900000` (15 min) | Login window |
| `RATE_LIMIT_LOGIN_EMAIL_MAX` | `30` | Per-email login attempts |
| `RATE_LIMIT_LOGIN_EMAIL_WINDOW_MS` | `3600000` (1 h) | Per-email window |
| `RATE_LIMIT_REGISTER_MAX` | `10` | Registrations per window |
| `RATE_LIMIT_REGISTER_WINDOW_MS` | `3600000` | Registration window |
| `RATE_LIMIT_PASSWORD_CHANGE_MAX` | `20` | Password changes per window |
| `RATE_LIMIT_PASSWORD_CHANGE_WINDOW_MS` | `3600000` | Password change window |
| `RATE_LIMIT_PASSWORD_RESET_MAX` | `5` | Password reset requests |
| `RATE_LIMIT_PASSWORD_RESET_WINDOW_MS` | `3600000` | Reset window |
| `RATE_LIMIT_INVITE_EMAIL_CAMPAIGN_MAX` | `10` | Invite emails sent per campaign |
| `RATE_LIMIT_INVITE_EMAIL_CAMPAIGN_WINDOW_MS` | `3600000` | Per-campaign invite email window |
| `RATE_LIMIT_APPLY_CAMPAIGN_MAX` | `10` | LFG apply per campaign |
| `RATE_LIMIT_APPLY_CAMPAIGN_WINDOW_MS` | `3600000` | Per-campaign apply window |
| `RATE_LIMIT_APPLY_GLOBAL_MAX` | `20` | Global LFG apply cap |
| `RATE_LIMIT_APPLY_GLOBAL_WINDOW_MS` | `3600000` | Global apply window |
| `RATE_LIMIT_TOKEN_MINT_MAX` | `10` | API token creations per day |
| `RATE_LIMIT_TOKEN_MINT_WINDOW_MS` | `86400000` (24 h) | Token mint window |

---

## Backend — compile limits

| Variable | Default | Purpose | Defined in |
|----------|---------|---------|------------|
| `COMPILE_MAX_PAGES` | `500` | Max wiki pages in one session compile | `sessionNotesCompile.ts` |
| `COMPILE_MAX_BYTES` | `2000000` | Max compiled Markdown output size | `sessionNotesCompile.ts` |

---

## Backend — object storage (optional)

When `STORAGE_PROVIDER=s3-compatible`, set S3 credentials. Layout and provider notes: [`esiana-core/docs/deployment/object-storage.md`](../esiana-core/docs/deployment/object-storage.md).

| Variable | Default | Purpose |
|----------|---------|---------|
| `STORAGE_PROVIDER` | `filesystem` | `filesystem` or `s3-compatible` |
| `S3_BUCKET` | (required for S3) | Target bucket name |
| `S3_REGION` | (required for S3) | AWS region or provider equivalent |
| `S3_ACCESS_KEY_ID` | (required for S3) | Access key |
| `S3_SECRET_ACCESS_KEY` | (required for S3) | Secret key |
| `S3_ENDPOINT` | (unset) | Custom endpoint URL (MinIO, R2, etc.) |
| `S3_FORCE_PATH_STYLE` | auto | Path-style URLs; defaults to `true` when `S3_ENDPOINT` is set unless explicitly `false` |

Filesystem mode uses `UPLOADS_DIR` only. See also `STORAGE_REDIRECT_THRESHOLD_BYTES` in core runtime.

---

## Frontend — Vite / build

| Variable | Default | Purpose | Set by |
|----------|---------|---------|--------|
| `VITE_API_PROXY_TARGET` | `http://localhost:3000` | Dev proxy for `/api` and `/uploads` | Dev env only |
| `VITE_API_BASE` | `/api` | API base for notification polling | Build / env |
| `VITE_API_BASE_URL` | (unset → page origin) | Plugin asset URLs | Build / env |
| `VITE_APP_BASE_URL` | `window.location.origin` | Invite link base URL | Build / env |

**Build metadata:** root `package.json` `version` is injected as `__ESIANA_VERSION__` at build time (`frontend/vite.config.ts`).

---

## Known inconsistencies

1. **Backend port 3001 vs Vite proxy 3000** — align `VITE_API_PROXY_TARGET` with `PORT` ([Installation](installation.md)).
2. **`DATABASE_PROVIDER`** — must match the literal `provider` in `schema.prisma` and your `DATABASE_URL` ([Database & persistence](database-and-persistence.md)).
3. **`MAP_PRESERVE_FULL_RES` env** defaults `false` while Admin DB default is `true` — either can enable preserve; Admin value participates in OR resolution.

---

## Related docs

- [Self-hosting: Installation](../self-hosting/installation.md) — Docker Compose quick start
- [System admin settings](system-admin-settings.md) — DB-backed overrides
- [Federated identity](federated-identity.md) — OIDC production vars
- [Installation](installation.md) — local Node development
- [Reverse proxy & security](reverse-proxy-and-security.md)
- [Limits & quotas](limits-and-quotas.md)
