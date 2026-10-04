# API authentication

Esiana supports application sessions and user-owned API tokens. Both identify a
user; neither bypasses authorization checks.

## Session cookie

Browser clients use the `esiana_token` HTTP-only cookie after email/password or
OIDC login. Session-only routes — including user-account (`/api/user/...`) and
system-administration (`/api/admin/...`) operations — declare only `cookieAuth`
in `/api/docs` and reject bearer tokens. All admin routes additionally require
the `SYSTEM_ADMIN` application role (see [Access control](access-control.md)).

Session cookies are signed tokens with a 7-day `maxAge`. Changing
security-sensitive account state (email, password, removing a linked account)
invalidates previously issued cookies. The `secure` and `sameSite` attributes
follow `COOKIE_SECURE` / cookie configuration.

- Set `credentials: 'include'` on cross-origin `fetch` calls.
- `CORS_ORIGIN` must match the browser origin.
- `COOKIE_SECURE=true` requires HTTPS.

### Email/password flows

#### `POST /api/auth/register`

Creates a user from `{ email, password }` (password minimum 8 characters).
Returns `201 { user }` and sets the session cookie. The first-ever user becomes
`SYSTEM_ADMIN` and bootstraps system settings; later registrations honor the
`allowRegistrations` setting and `allowedDomains` restriction.

**Errors:** `400` validation (bad email, short password); `403` local login
disabled, registrations disabled, or domain-restricted; `409` email already
registered.

#### `POST /api/auth/login`

Validates `{ email, password }`, updates the user's last-login timestamp, sets
the session cookie, and returns `200 { user }`. Wrong credentials return a
generic `401 Invalid credentials` (the response does not reveal whether the
email exists, or whether password auth is enabled for the account).

**Errors:** `400` missing fields; `401` invalid credentials; `403` local login
disabled.

#### `POST /api/auth/logout`

Clears the session cookie. Always succeeds for cookie cleanup purposes.

#### `GET /api/auth/me`

Returns the current session user plus linked identity providers
(`{ user: { ..., linkedProviders } }`). Requires a session; returns `401`
without one.

#### `POST /api/auth/forgot-password` · `POST /api/auth/reset-password`

Password recovery always returns `200 { ok: true }`, even when the email is
unknown, so callers cannot enumerate accounts. A reset email is only sent when
the user exists, has password auth enabled, and SMTP is configured; the reset
link is valid for one hour. Reset consumes a single-use token plus the new
password (minimum 8 characters); invalid or expired tokens return `400`.

### OIDC

OIDC is a core capability. Operators configure providers in Admin > Identity
Providers; see [Federated identity](../options/federated-identity.md).

- `GET /api/auth/providers` — public list of enabled identity providers plus
  public metadata. No authentication required.
- `GET /api/auth/oidc/{providerId}/start` — begins login (`?mode=login`) or
  account linking (`?mode=link`, requires an existing session, else `401`).
  Accepts `?returnTo=`. Failures redirect to the frontend with an `authError`.
- `GET /api/auth/oidc/{providerId}/callback` — completes the provider round
  trip and establishes the session.

## API tokens

Create tokens in Account Settings > Developer Keys (or
`POST /api/user/tokens`, which returns the cleartext secret exactly once).
Tokens belong to the user who created them and expire after 30, 90, or 365
days (`durationDays`). Token names are limited to 80 characters. Last-used
timestamps update on a throttle, so they are approximate.

```http
Authorization: Bearer <token>
```

Bearer authentication is supported only where the OpenAPI operation lists
`bearerAuth`. A bearer token authenticates as its owning user; it does not
become a system administrator and does not bypass campaign membership, roles,
capabilities, ownership, or content visibility. Expired or unknown tokens
return `401 Invalid or expired API token`; an empty bearer value returns `401`.

Token management endpoints (`GET /api/user/tokens`, `POST /api/user/tokens`,
`DELETE /api/user/tokens/{tokenId}`) are session-only. Deleting another user's
token ID returns `404`.

## Token scopes

New tokens should declare the smallest applicable set of implemented scopes:

| Scope | Purpose |
|-------|---------|
| `campaign:read` | Declared campaign-read scope; core campaign routers do not currently apply it as a general route gate |
| `campaign:write` | Declared campaign-write scope; also used by core's internal ephemeral seed token |
| `campaign:seed` | Declared seeding scope; used by core's internal ephemeral seed token |
| `plugins:read` | Read global plugin catalog and runtime descriptors |
| `plugins:manage` | Synchronize, enable, configure, or uninstall global plugins |

Scope enforcement applies to bearer calls only; session callers bypass scope
checks. The current static core routes explicitly enforce scopes on the global
plugin API (`GET /api/plugins*` needs `plugins:read`,
`POST /api/plugins/sync`, install, enable, and delete need `plugins:manage`);
campaign scope values participate in specialized temporal/seed authority but
are not a blanket read/write gate on every campaign route. A bearer token
missing a required scope gets `403 API token missing required scope(s): ...`.
The operation-level requirements in `/api/docs` are authoritative.

Existing empty-scope tokens are treated by the backend as legacy full-scope
tokens. That compatibility behavior affects scope checks only; all other
authorization boundaries still apply. Replace legacy tokens with explicitly
scoped tokens.

## Rate limiting

Authentication-adjacent routes carry limiters: login, registration, password
reset, OIDC start/callback, campaign join (`apply`) and invite sending, token
minting, workshop drafts, and asset URL imports. Exceeding a limiter returns
`429`; exact windows and quotas are operator configuration, not part of the
contract. See [Request conventions](request-conventions.md).

## Authentication failures

- `401` means credentials are missing, invalid, expired, or not accepted by
  that route (including session-only routes called with a bearer token, and
  bearer-only expectations unmet).
- `403` means the identity is known but lacks a required scope or
  authorization grant.

See [Access control](access-control.md) for campaign and content authorization.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
