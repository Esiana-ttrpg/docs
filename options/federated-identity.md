# Federated Identity (OIDC)

Configure OpenID Connect for self-hosted Esiana. This page is the **canonical OIDC contract** — environment variables, login behavior, and provider setup guides.

Esiana uses standard OIDC discovery from a single **issuer URL** (`OIDC_ISSUER_URL`). It does not use provider-specific configuration URL variables.

---

## OIDC_ENABLED management mode

`OIDC_ENABLED` is a **management mode**, not a simple on/off flag:

| Value | Mode | Behavior |
|-------|------|----------|
| **unset / empty** | Admin-managed | Configure Identity Providers in **Admin → Identity Providers** (existing behavior). |
| **`true`** | Environment-managed | One provider (id `oidc`) owned by `OIDC_*` env vars. Admin fields for that provider are read-only. |
| **`false`** | Force disabled | All OIDC sign-in disabled, regardless of Admin settings. |

Do **not** set `OIDC_ENABLED=false` in Compose unless you intend to force OIDC off. Leaving it unset preserves Admin-managed mode.

---

## Environment variables

### Required when `OIDC_ENABLED=true`

| Variable | Purpose |
|----------|---------|
| `OIDC_ENABLED` | `true` — environment-managed provider |
| `OIDC_PROVIDER_NAME` | Button label (default: `OpenID Connect`) |
| `OIDC_ISSUER_URL` | OIDC issuer / discovery root (https URL) |
| `OIDC_CLIENT_ID` | OAuth client id |
| `OIDC_CLIENT_SECRET` | OAuth client secret |

Also set `AUTH_SECRETS_KEY` (32-byte base64) in **production** to encrypt the client secret in the database. Generate: `openssl rand -base64 32`. This key is **not** the same as `JWT_SECRET` (session signing).

### Local + OIDC hybrid

| Variable | Default | Purpose |
|----------|---------|---------|
| `LOCAL_LOGIN_ENABLED` | `true` | Email/password login, register, and forgot-password (authentication mode — not an OIDC provider setting) |

At least one of OIDC (available) or local login must remain enabled. Startup fails if both are off.

### Optional (advanced)

| Variable | Default | Purpose |
|----------|---------|---------|
| `OIDC_ALLOW_SIGNUP` | `true` when unset in env contract; otherwise follows Admin registration | First-time OIDC users must be allowed to sign up |
| `OIDC_AUTO_REDIRECT` | `false` | Auto-redirect login to OIDC when enabled |
| `OIDC_USER_GROUP` | (unset) | IdP group required to sign in (see pipeline) |
| `OIDC_ADMIN_GROUP` | (unset) | IdP group that grants `SYSTEM_ADMIN` |

Do not use `OIDC_REMEMBER_ME` or provider-specific metadata URL variables.

### Origins and callbacks (all OIDC modes)

| Variable | Purpose |
|----------|---------|
| `PUBLIC_ORIGIN` | Compose: derives `BACKEND_PUBLIC_ORIGIN`, `FRONTEND_ORIGIN`, `CORS_ORIGIN` |
| `JWT_SECRET` | Session JWT cookie signing — required; `openssl rand -hex 32` |
| `AUTH_SECRETS_KEY` | Encrypt IdP client secrets stored in the database — separate from `JWT_SECRET` |

Redirect URI pattern: `{BACKEND_PUBLIC_ORIGIN}/api/auth/oidc/{providerId}/callback`

---

## Secrets (do not conflate)

| Variable | Role |
|----------|------|
| `JWT_SECRET` | Signs application session cookies (JWT). Required in every deployment. |
| `AUTH_SECRETS_KEY` | Encrypts **stored** IdP client secrets in PostgreSQL. Required in production when using OIDC or Admin Identity Providers. |
| `OIDC_CLIENT_SECRET` | The OAuth client secret from your IdP — set only when `OIDC_ENABLED=true`, never commit to git |

Generate `JWT_SECRET` and `AUTH_SECRETS_KEY` as **different** random values. Store all secrets in `.env` / Compose `env_file`, not in `docker-compose.yml`.

---

## Configuration precedence

1. Environment variables  
2. Application settings (Admin UI / database)  
3. Built-in defaults  

Settings overridden by environment variables appear read-only in Admin with a **Managed by environment variable** notice.

---

## OIDC login pipeline

After the identity provider authenticates the user:

1. **Authenticate with OIDC** — PKCE callback; read `sub`, email, and groups from claims.  
2. **Group allowlist** — If `OIDC_USER_GROUP` is set, the user must belong to `OIDC_USER_GROUP` **or** `OIDC_ADMIN_GROUP`. Otherwise reject. If unset, skip.  
3. **First-time user signup** — If no existing linked account (empty-database bootstrap excepted), `OIDC_ALLOW_SIGNUP` must allow signup. Otherwise reject.  
4. **Create or update user** — Link by `(provider, sub)` only; email is profile data (never auto-link by email).  
5. **Role sync** — Authoritative `SYSTEM_ADMIN` from admin group mappings when configured (promote and demote on login).  
6. **Issue session** — Cookie JWT includes session version for invalidation after role or credential changes.

---

## Security model

### Identity and linking

- External identity key: **`(provider id, sub)`** on `Account`.
- Email is profile data only — not used to match users on OIDC login.
- First-time OIDC signup with an email already in use fails generically (use **Settings → Link** to attach OIDC to an existing account).
- Link flow requires an authenticated session and matching IdP email confirmation.

### Token validation

PKCE, **state**, and **nonce** on every login; `openid-client` validates issuer, audience, signature, expiration, and issued-at. Never log secrets, codes, or tokens.

### Groups and roles

- `OIDC_USER_GROUP` optional allowlist; `OIDC_ADMIN_GROUP` satisfies allowlist and grants admin when mapped.
- Admin mappings are **authoritative** on each login (removal from admin IdP group removes `SYSTEM_ADMIN` on next sign-in).
- Admin group membership does **not** bypass disabled signup for new users.

### Sessions and secrets

- IdP changes apply on **next authentication**. Session cookies carry **sessionVersion**; password, unlink, and role changes invalidate outstanding cookies.
- Use finite **`JWT_EXPIRES_IN`** on OIDC-heavy hosts.
- Store `OIDC_CLIENT_SECRET`, `JWT_SECRET`, and `AUTH_SECRETS_KEY` in `.env` / Compose `env_file` — never in committed compose files or Admin UI.

---

## Admin setup (Admin-managed mode)

When `OIDC_ENABLED` is unset:

1. Open **Admin → Identity Providers**  
2. **Add OIDC provider** — template or generic OIDC  
3. Set **issuer URL**, **client ID**, **client secret**  
4. Copy **redirect URI** into your IdP  
5. Enable the provider  

Optional **groups claim** and **group → role mappings** (authoritative for `SYSTEM_ADMIN` when admin groups are mapped).

---

## Provider setup guides

Use **`OIDC_ISSUER_URL`** only (discovery). Register the Esiana redirect URI from Admin or from env-managed setup.

### Authentik

1. Create an OAuth2/OIDC provider and application in Authentik.  
2. Set **Redirect URI** to Esiana’s callback URL.  
3. Copy the **Issuer** URL (application slug path, trailing slash as Authentik shows).  
4. Set `OIDC_ISSUER_URL` to that issuer, plus client id/secret.  
5. Optional: map Authentik groups; set `OIDC_USER_GROUP` / `OIDC_ADMIN_GROUP` or Admin group mappings with claim `groups`.

### Pocket ID

1. Create an OIDC client in Pocket ID.  
2. Set redirect URI to Esiana’s callback URL.  
3. Use Pocket ID’s issuer URL as `OIDC_ISSUER_URL`.  
4. Set client id and secret.  
5. Configure group claims if using `OIDC_USER_GROUP` / `OIDC_ADMIN_GROUP`.

### Authelia

1. Configure an OIDC client in Authelia (`identity_providers.oidc`).  
2. Set redirect URI to Esiana’s callback URL.  
3. Set `OIDC_ISSUER_URL` to Authelia’s issuer (e.g. `https://auth.example.com`).  
4. Set client id and secret.  

Proxy **trusted header** authentication (login without OIDC redirect) is not supported in core — use OIDC client mode.

---

## Migration notes

- Esiana previously documented IdP credentials **only** in Admin UI; that remains the default when `OIDC_ENABLED` is unset.  
- There were **no** shipped `OIDC_*` compose variables before this contract.  
- `OIDC_DEFAULT_GROUP` was never released; the canonical name is **`OIDC_USER_GROUP`**.  
- Compose examples now pass through `OIDC_*` and `LOCAL_LOGIN_ENABLED` when you set them in `.env`; they are not injected as `false` by default.

---

## Related docs

- [Environment variables](environment-variables.md) — origins, `AUTH_SECRETS_KEY`, compose operator vars  
- [Self-hosting: installation](../self-hosting/installation.md)  
- [User account settings](user-account-settings.md)  
- [API: authentication](../api/authentication.md)
