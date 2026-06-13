# Options Reference

This section documents **where and how** Esiana is configured — environment variables, Admin console fields, campaign settings tabs, and user account preferences.

For feature walkthroughs (wiki, sessions, maps), see [Features](../features/README.md).

---

## Where is this set?

| Layer | Who changes it | How | Reference |
|-------|----------------|-----|-----------|
| **Environment variables** | Operator (server `.env`) | `backend/.env`, `frontend/.env`, Compose `.env` | [Environment variables](environment-variables.md) |
| **System admin settings** | System admin | Admin console UI → stored in DB | [System admin settings](system-admin-settings.md) |
| **Campaign settings** | DM / Co-DM | Campaign Settings tabs → `Campaign` row | [Campaign settings](campaign-settings.md) |
| **User account** | Each user | User Settings | [User account settings](user-account-settings.md) |

Some values exist in **both** env and Admin UI. When both apply, Admin DB settings typically win at runtime (e.g. map processing limits). See each page for overrides.

---

## Operator quick path

1. [Self-hosting: installation](../self-hosting/installation.md) — Docker Compose + `.env` (PostgreSQL or SQLite profile)
2. [Database & persistence](database-and-persistence.md) — choose SQLite vs Postgres by use case
3. [Environment variables](environment-variables.md) — full reference; template: [compose.env.example](compose.env.example)
4. [Federated identity (OIDC)](federated-identity.md) — when using external IdPs
5. [Reverse proxy & security](reverse-proxy-and-security.md) — HTTPS, cookies, rate limits
6. [Limits & quotas](limits-and-quotas.md) — uploads, compile caps, polling

Developers hacking on core: [Installation](installation.md) instead of Docker.

---

## Options index

| Page | Covers |
|------|--------|
| [Quick install](quick-install.md) | Docker Compose, `.env`, Postgres vs SQLite profiles |
| [Installation](installation.md) | Local Node dev setup |
| [Environment variables](environment-variables.md) | All backend + frontend env vars |
| [Federated identity (OIDC)](federated-identity.md) | External IdP setup, `AUTH_SECRETS_KEY`, user link flows |
| [System admin settings](system-admin-settings.md) | Registration, SMTP, uploads, branding, plugins |
| [Campaign settings](campaign-settings.md) | General, access, recruitment, sidebar, themes, backup |
| [User account settings](user-account-settings.md) | Profile, appearance, notifications, API tokens |
| [Database & persistence](database-and-persistence.md) | Prisma provider, migrations, backups |
| [Deployment & Docker](deployment-and-docker.md) | Image layout, Compose architecture |
| [Reverse proxy & security](reverse-proxy-and-security.md) | Caddy/nginx, CORS, cookies, rate limits |
| [Limits & quotas](limits-and-quotas.md) | Upload MB, map edges, compile limits, polling |
