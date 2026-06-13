# Federated Identity (OIDC)

Configure upstream OpenID Connect identity providers so users sign in with Authentik, Keycloak, Pocket ID, Microsoft Entra ID, or any OIDC-compliant issuer.

In practice, Esiana consumes normalized OIDC assertions (`sub`, `email`, optional group claims) — not provider-specific APIs. One standard flow covers all supported IdPs.

---

## Admin setup

1. Open **Admin → Identity Providers**
2. **Add OIDC provider** — choose a quick-setup template or generic OIDC
3. Paste **issuer URL** (discovery root), **client ID**, and **client secret**
4. Copy the shown **redirect URI** into your IdP application settings
5. Enable the provider for sign-in

### Optional mappings

| Setting | Purpose |
|---------|---------|
| **Groups claim** | e.g. `groups` — Esiana snapshots groups at each login |
| **Group → role mappings** | JSON such as `{"esiana-admins":"SYSTEM_ADMIN"}` — **promote-only**; never demotes on login |

---

## Environment (production)

| Variable | Purpose |
|----------|---------|
| `AUTH_SECRETS_KEY` | 32-byte base64 AES key for encrypting IdP client secrets (**required in production**) |
| `BACKEND_PUBLIC_ORIGIN` | Public URL of the API (redirect URI host), e.g. `https://esiana.example.com` |
| `FRONTEND_ORIGIN` | Where OIDC callbacks redirect users after login |

Generate key: `openssl rand -base64 32`

Also set `JWT_SECRET`, `CORS_ORIGIN`, and `COOKIE_SECURE` per [Reverse proxy & security](reverse-proxy-and-security.md).

**In practice:** Without `AUTH_SECRETS_KEY` in production, the server refuses to store encrypted client secrets — local dev may store plaintext when the key is unset.

---

## User flows

| Flow | Where |
|------|-------|
| Sign in | Auth modal lists enabled providers as “Continue with {displayName}” |
| Link provider | User Settings → Account & Security (emails must match) |
| Unlink provider | Same section when another sign-in method remains |
| Password hybrid | OIDC-only users may add a local password; hybrid users may remove password if another method remains |

Local email/password registration remains available when [Registration](system-admin-settings.md) allows it.

---

## Deferred (not in core v1.0)

SCIM provisioning, scheduled group reconciliation, nested groups, proxy `trustedHeadersAuth` (Caddy/Authelia), and admin duplicate-account merge.

---

## Related docs

- [Environment variables](environment-variables.md)
- [Self-hosting: installation](../self-hosting/installation.md)
- [User account settings](user-account-settings.md)
- [API: authentication](../api/authentication.md)
