# Reverse Proxy & Security

Production Esiana instances should sit behind HTTPS with correct cookie, CORS, and proxy settings. Rate limiting protects auth and public write endpoints.

---

## HTTPS and cookies

| Variable | Dev | Production |
|----------|-----|------------|
| `COOKIE_SECURE` | `false` | **`true`** |
| `COOKIE_SAME_SITE` | `lax` | `lax` (or `strict` if same-site only) |
| `JWT_SECRET` | dev default | **Long random string** |

Without `COOKIE_SECURE=true` on HTTPS sites, browsers may reject session cookies.

---

## CORS

| Variable | Purpose |
|----------|---------|
| `CORS_ORIGIN` | Exact frontend origin allowed for API credentialed requests |

Example:

```env
CORS_ORIGIN=https://esiana.example.com
```

Must match the URL users type in the browser (scheme + host + port).

---

## Trust proxy

When Esiana runs **behind** nginx, Caddy, or a load balancer:

```env
TRUST_PROXY=true
```

Required so Express rate limiters and logs see the real client IP from `X-Forwarded-For` instead of the proxy IP.

---

## Example: Caddy (Docker frontend on port 8080)

```caddy
esiana.example.com {
    encode gzip

    reverse_proxy localhost:8080
}
```

**Backend env:**

```env
NODE_ENV=production
COOKIE_SECURE=true
TRUST_PROXY=true
CORS_ORIGIN=https://esiana.example.com
FRONTEND_ORIGIN=https://esiana.example.com
```

Alternatively, proxy `/api` directly to `backend:3001` and serve static files from the frontend container — see [Deployment & Docker](deployment-and-docker.md).

---

## Example: nginx (manual install)

```nginx
server {
    listen 443 ssl;
    server_name esiana.example.com;

    ssl_certificate     /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    location / {
        root /var/www/esiana/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Set `TRUST_PROXY=true` on the backend.

---

## Rate limits

Configurable via env — see [Environment variables](environment-variables.md) and [Limits & quotas](limits-and-quotas.md).

Protected endpoints include:

- Login, register, password change/reset
- LFG apply (per-campaign and global caps)
- API token minting

Defaults are lenient for small self-hosted instances; tighten for public multi-tenant hosts.

---

## Upload security

Upload routes validate file type, size, and path handling. Enforce limits via [System admin settings](system-admin-settings.md) → Uploads.

---

## Multi-tenant isolation

All campaign-scoped API routes enforce `campaignId` boundaries. See [`esiana-core/docs/security/tenant-isolation-audit.md`](../esiana-core/docs/security/tenant-isolation-audit.md).

---

## Maintenance mode

Admin → General → **Maintenance mode** blocks non-admin access during upgrades. Pair with a reverse-proxy maintenance page if desired.

---

## Related docs

- [Quick install](quick-install.md)
- [Installation](installation.md)
- [Deployment & Docker](deployment-and-docker.md)
- [Environment variables](environment-variables.md)
- [System admin settings](system-admin-settings.md)
