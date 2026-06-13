# API authentication

How to authenticate REST requests to Esiana.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Session cookie

Browser clients use the `esiana_token` HTTP-only cookie after email/password or OIDC login.

OIDC is **core** (not a community plugin). Operators configure providers in Admin → Identity Providers — see [Federated identity](../options/federated-identity.md). Auth discovery: `GET /api/auth/providers`; flow uses PKCE start/callback routes documented in `/api/docs`.

- Set `credentials: 'include'` on `fetch` calls
- `CORS_ORIGIN` must match the browser origin
- `COOKIE_SECURE=true` requires HTTPS

---

## API tokens

Create tokens in **Account Settings → Developer Keys**. Pass as:

```http
Authorization: Bearer <token>
```

Declare explicit **scopes** on new tokens. Legacy empty-scope tokens retain broad access with deprecation warnings.

User guide: [User account settings](../options/user-account-settings.md)

---

## Campaign context

Campaign-scoped routes require membership (session) or a token with appropriate scopes. Plugin runtime routes also require `campaignHandle` query or `X-Campaign-Handle` header.

---

## Health check

```http
GET /api/health
```

No authentication required.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
