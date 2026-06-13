# Limits & Quotas

Consolidated reference for upload caps, map processing, compile limits, notification polling, and rate limits.

---

## Uploads

| Limit | Default | Where set |
|-------|---------|-----------|
| General upload max | **10 MB** | Admin → Uploads → `maxUploadSizeMb` |
| Map upload max | Falls back to general | Admin → `mapMaxUploadSizeMb` |

Enforced server-side on upload routes. See [System admin settings](system-admin-settings.md).

---

## Map processing

| Limit | Default | Range / notes | Where set |
|-------|---------|---------------|-----------|
| Display max edge | **8192** px | 512–16384 | Admin or `MAP_DISPLAY_MAX_EDGE` |
| Thumbnail max edge | **2048** px | 128–4096 | Admin or `MAP_THUMB_MAX_EDGE` |
| Preserve full res | **true** (Admin DB) | Env `MAP_PRESERVE_FULL_RES` defaults `false` | Admin or `MAP_PRESERVE_FULL_RES` |

Admin DB values override env when set ([System admin settings](system-admin-settings.md)).

---

## Session compile

| Limit | Default | Env var |
|-------|---------|---------|
| Max pages per compile | **500** | `COMPILE_MAX_PAGES` |
| Max output bytes | **2,000,000** (~2 MB) | `COMPILE_MAX_BYTES` |
| Max chars per block | **524,288** | (code constant, not env) |

Output truncation adds a warning in compile results. See [Sessions & notes](../features/sessions-and-notes.md).

---

## Notifications

| Limit | Default | Range | Where set |
|-------|---------|-------|-----------|
| Bell poll interval | **60 s** | 30–300 s | Admin → Notifications |

Polling pauses when browser tab is hidden.

---

## Rate limits (auth & public writes)

All windows and max counts configurable — defaults below.

| Endpoint group | Max | Window | Env prefix |
|----------------|-----|--------|------------|
| Login | 20 | 15 min | `RATE_LIMIT_LOGIN_*` |
| Login per email | 30 | 1 h | `RATE_LIMIT_LOGIN_EMAIL_*` |
| Register | 10 | 1 h | `RATE_LIMIT_REGISTER_*` |
| Password change | 20 | 1 h | `RATE_LIMIT_PASSWORD_CHANGE_*` |
| Password reset | 5 | 1 h | `RATE_LIMIT_PASSWORD_RESET_*` |
| LFG apply (per campaign) | 10 | 1 h | `RATE_LIMIT_APPLY_CAMPAIGN_*` |
| LFG apply (global) | 20 | 1 h | `RATE_LIMIT_APPLY_GLOBAL_*` |
| API token mint | 10 | 24 h | `RATE_LIMIT_TOKEN_MINT_*` |

Full variable names: [Environment variables](environment-variables.md).

---

## Relations graph (wiki sidebar)

| Limit | Default | Range | Where set |
|-------|---------|-------|-----------|
| Max visible nodes | Code fallback when unset | 20–100 | Admin → General → Relations graph |
| Max visible edges | Code fallback when unset | 20–100 | Admin → General → Relations graph |

Caps rendering in the wiki entity relations panel on large campaigns.

---

## URL imports

| Limit | Default | Where set |
|-------|---------|-----------|
| Remote fetch enabled | **true** | Admin → Assets & Uploads |
| Allow HTTP URLs | **false** | Admin → Assets & Uploads |
| Max download size | **50 MB** | Admin → Assets & Uploads |
| Fetch timeout | **15 s** | Admin → Assets & Uploads |

See [System admin settings](system-admin-settings.md).

---

## Image upload constraints

| Limit | Default | Where set |
|-------|---------|-----------|
| Allowed types | `png,jpeg,webp` | Admin → Assets & Uploads |
| Max width | **16384** px | Admin → Assets & Uploads |
| Max height | (schema default) | Admin → Assets & Uploads |

---

## Plugin worker memory

| Limit | Default | Env var |
|-------|---------|---------|
| Worker heap cap | **32 MB** | `PLUGIN_WORKER_MAX_OLD_GENERATION_MB` |

---

## Plugin interceptors

| Limit | Default | Env var |
|-------|---------|---------|
| Hook timeout | **200 ms** | `PLUGIN_INTERCEPTOR_TIMEOUT_MS` |
| Max hooks per plugin | **10** | `PLUGIN_MAX_HOOKS_PER_PLUGIN` |
| Max concurrent workers | **4** | `PLUGIN_MAX_CONCURRENT_INTERCEPTORS` |

---

## Storage redirect threshold

| Limit | Default | Env var |
|-------|---------|---------|
| Redirect delivery threshold | **5 MB** | `STORAGE_REDIRECT_THRESHOLD_BYTES` |

Files above this size may use redirect URLs when the storage driver supports it.

---

## Async export staging

Background campaign ZIP exports generate a staging asset with **3-day TTL**. See [Data backup & export](../features/data-backup-and-export.md).

---

## Related docs

- [Environment variables](environment-variables.md)
- [System admin settings](system-admin-settings.md)
- [Reverse proxy & security](reverse-proxy-and-security.md)
- [User account settings](user-account-settings.md) — API token mint limits
