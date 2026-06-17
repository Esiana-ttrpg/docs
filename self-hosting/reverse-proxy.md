# Reverse proxy

HTTPS and public hostname setup for production deployments.

Compose exposes HTTP on port **8080** by default. Terminate TLS on **Caddy**, **nginx**, or any reverse proxy you already use.

---

## Before you proxy

1. Confirm Esiana works directly: `docker compose up -d` → http://localhost:8080
2. Set **`PUBLIC_ORIGIN`** in `.env` to your public URL (no trailing slash), e.g. `https://esiana.example.com`

`PUBLIC_ORIGIN` is the single source of truth for external URL generation. The container derives all origin-related values internally at startup — you do not need to manually set `CORS_ORIGIN` or `FRONTEND_ORIGIN` unless doing advanced overrides.

3. For HTTPS, also set:

```env
TRUST_PROXY=true
COOKIE_SECURE=true
PUBLIC_ORIGIN=https://esiana.example.com
```

---

## Proxy target

Forward all traffic to the **esiana container on port 80** (or host `COMPOSE_HTTP_PORT`, default 8080).

Internal nginx is the web delivery layer: it serves the SPA and proxies `/api` and `/uploads` to the Node API. External proxies target container port **80**, not Node 3001.

```text
Browser ──HTTPS──► Reverse proxy ──HTTP──► esiana:80
```

---

## Caddy (standalone)

```caddyfile
esiana.example.com {
    reverse_proxy localhost:8080
}
```

With `PUBLIC_ORIGIN=https://esiana.example.com`, `TRUST_PROXY=true`, and `COOKIE_SECURE=true` in `.env`.

---

## Upload body size

The Esiana image's internal nginx allows request bodies up to **64 MB** (campaign wizard can send up to four files, each capped by Admin **max upload size**, default 10 MB).

If you terminate TLS on an external reverse proxy, raise its body limit too — otherwise banner images and Obsidian ZIP imports may fail before reaching Esiana:

**nginx**

```nginx
client_max_body_size 64m;
```

**Caddy** — Caddy has no practical default limit for reverse_proxy; only add `request_body` limits if you configure them explicitly.

---

## Full examples

- [`esiana-core/docs/deployment/Reverse Proxies.md`](../../esiana-core/docs/deployment/Reverse%20Proxies.md) — Caddy Docker Proxy, nginx, Traefik, Cloudflare Tunnel
- [Options: reverse proxy & security](../options/reverse-proxy-and-security.md) — cookies, CORS, trust proxy
