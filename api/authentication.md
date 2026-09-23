# API authentication

Esiana supports application sessions and user-owned API tokens. Both identify a user; neither bypasses authorization checks.

## Session cookie

Browser clients use the `esiana_token` HTTP-only cookie after email/password or OIDC login. Session-only routes, including user-account and system-administration operations, declare only `cookieAuth` in `/api/docs`.

OIDC is a core capability. Operators configure providers in Admin > Identity Providers; see [Federated identity](../options/federated-identity.md). Provider discovery uses `GET /api/auth/providers`, and the login flow uses the start and callback routes documented in `/api/docs`.

- Set `credentials: 'include'` on cross-origin `fetch` calls.
- `CORS_ORIGIN` must match the browser origin.
- `COOKIE_SECURE=true` requires HTTPS.

## API tokens

Create tokens in Account Settings > Developer Keys. Tokens belong to the user who created them and expire after 30, 90, or 365 days. The cleartext secret is returned only when the token is created.

```http
Authorization: Bearer <token>
```

Bearer authentication is supported only where the OpenAPI operation lists `bearerAuth`. A bearer token authenticates as its owning user; it does not become a system administrator and does not bypass campaign membership, roles, capabilities, ownership, or content visibility.

## Token scopes

New tokens should declare the smallest applicable set of implemented scopes:

| Scope | Purpose |
|-------|---------|
| `campaign:read` | Declared campaign-read scope; core campaign routers do not currently apply it as a general route gate |
| `campaign:write` | Declared campaign-write scope; also used by core's internal ephemeral seed token |
| `campaign:seed` | Declared seeding scope; used by core's internal ephemeral seed token |
| `plugins:read` | Read global plugin catalog and runtime descriptors |
| `plugins:manage` | Synchronize, enable, configure, or uninstall global plugins |

Scopes are an additional bearer-token restriction, not an authorization grant. The current static core routes explicitly enforce scopes on the global plugin API; campaign scope values also participate in specialized temporal/seed authority but are not a blanket read/write gate on every campaign route. The operation-level requirements in `/api/docs` are authoritative.

Existing empty-scope tokens are treated by the backend as legacy full-scope tokens. That compatibility behavior affects scope checks only; all other authorization boundaries still apply. Replace legacy tokens with explicitly scoped tokens.

## Authentication failures

- `401` means credentials are missing, invalid, expired, or not accepted by that route.
- `403` means the identity is known but lacks a required scope or authorization grant.

See [Access control](access-control.md) for campaign and content authorization.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
