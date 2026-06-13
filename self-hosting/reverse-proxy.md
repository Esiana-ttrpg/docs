# Reverse proxy

HTTPS, CORS, and cookie settings for production deployments.

Compose exposes HTTP on port 8080 by default. Terminate TLS on **Caddy** or **nginx** in front.

---

## Required env (HTTPS)

```env
COOKIE_SECURE=true
TRUST_PROXY=true
PUBLIC_ORIGIN=https://esiana.example.com
CORS_ORIGIN=https://esiana.example.com
FRONTEND_ORIGIN=https://esiana.example.com
```

---

## Proxy paths

| Path | Target |
|------|--------|
| `/` | frontend container :80 |
| `/api` | backend :3001 |
| `/uploads` | backend :3001 |

---

## Full examples

[Options: reverse proxy & security](../options/reverse-proxy-and-security.md)
