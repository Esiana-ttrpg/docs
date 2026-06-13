# System Admin Settings

Settings managed in **Admin console** and stored in the `SystemSetting` table (`id = GLOBAL_CONFIG`). API: `GET/PATCH /api/admin/settings`.

Serialized in `esiana-core/backend/src/lib/systemSettings.ts`. Operators and system admins configure the instance here.

---

## Registration

| Field | Default | Purpose | Set by |
|-------|---------|---------|--------|
| `allowRegistrations` | `true` | Open vs closed registration | Admin UI |
| `allowedDomains` | (empty) | Comma/space-separated email domains; empty = all allowed | Admin UI |

**Where:** Admin → General Settings → Registration

**In practice:** Set `allowRegistrations` to `false` and use invite-only onboarding when you want a closed table. `allowedDomains` restricts self-registration to corporate or guild email domains without blocking admin-created accounts.

---

## SMTP (email delivery)

| Field | Default | Purpose | Set by |
|-------|---------|---------|--------|
| `host` | (empty) | SMTP server | Admin UI |
| `port` | `587` | SMTP port | Admin UI |
| `user` | (empty) | SMTP username | Admin UI |
| `password` | (empty) | SMTP password | Admin UI |
| `secure` | `false` | TLS / SSL | Admin UI |
| `fromAddress` | (empty) | From header for outbound mail | Admin UI |

When SMTP is configured, users can enable **email** per notification type. Includes **Send test email to me** in Admin. The same SMTP settings power **password reset emails** and **campaign invite-by-email** (Game Master sends from Campaign Settings → Access & Roles).

**Where:** Admin → General Settings → SMTP  
**Related:** [Notifications feature](../features/notifications.md), [`esiana-core/docs/notifications.md`](../esiana-core/docs/notifications.md)

Also set `FRONTEND_ORIGIN` in backend `.env` so email links point to your public URL ([Environment variables](environment-variables.md)).

**In practice:** Without SMTP, in-app notifications still work; email is optional per user preference.

---

## Uploads & cartography

| Field | Default | Purpose | Set by |
|-------|---------|---------|--------|
| `maxUploadSizeMb` | `10` | General upload limit | Admin UI |
| `mapMaxUploadSizeMb` | (falls back to general) | Map upload limit | Admin UI |
| `mapDisplayMaxEdge` | `8192` | Display variant max edge (512–16384) | Admin UI **overrides** env |
| `mapThumbMaxEdge` | `2048` | Thumbnail max edge (128–4096) | Admin UI **overrides** env |
| `mapPreserveFullRes` | `true` | Keep full-res originals | Admin UI **OR** `MAP_PRESERVE_FULL_RES` env |
| `allowedImageTypes` | `png,jpeg,webp` | Comma-separated MIME families allowed on upload | Admin UI |
| `maxImageWidth` | `16384` | Reject or downscale wider images | Admin UI |
| `maxImageHeight` | (schema default) | Reject or downscale taller images | Admin UI |

Runtime resolution: `getMapProcessingSettings()` prefers Admin DB values, then env fallbacks.

**Where:** Admin → Assets & Uploads (upload limits, URL imports) and Admin → General Settings → Relations graph caps

**In practice:** Large battle maps are downscaled to the **display** variant for the Leaflet canvas. When `mapPreserveFullRes` is on, Game Masters can still download originals. Lower `mapDisplayMaxEdge` on small VPS instances to reduce memory during map processing.

---

## URL imports

| Field | Default | Purpose | Set by |
|-------|---------|---------|--------|
| `urlImportsEnabled` | `true` | Allow fetching remote images/assets during import | Admin UI |
| `urlImportAllowHttp` | `false` | Permit non-HTTPS download URLs | Admin UI |
| `urlImportMaxDownloadMb` | `50` | Max bytes per remote fetch | Admin UI |
| `urlImportTimeoutSeconds` | `15` | Network timeout per fetch | Admin UI |

**Where:** Admin → Assets & Uploads → URL imports

**In practice:** When enabled, import and paste workflows can pull remote media into your storage. Keep `urlImportAllowHttp` off in production to reduce SSRF risk on misconfigured networks.

---

## Relations graph

| Field | Default | Purpose | Set by |
|-------|---------|---------|--------|
| `relationsMaxVisibleNodes` | (unset → code fallback) | Cap nodes rendered in wiki relations panel | Admin UI |
| `relationsMaxVisibleEdges` | (unset → code fallback) | Cap edges rendered in relations panel | Admin UI |

Valid range in Admin UI: **20–100** per field.

**Where:** Admin → General Settings → Relations graph

**In practice:** Dense campaigns with hundreds of wikilinks may slow the relations sidebar; lower these caps on constrained hardware. See [Limits & quotas](limits-and-quotas.md).

---

## Status & maintenance

| Field | Default | Purpose | Set by |
|-------|---------|---------|--------|
| `maintenanceMode` | `false` | Block non-admin access | Admin UI |
| `systemBannerText` | (empty) | Instance-wide banner message | Admin UI |
| `systemBannerExpiresAt` | (null) | Banner expiry (ISO timestamp) | Admin UI |

Banner presets in UI: 1 hour, 3 hours, custom duration, or clear.

**Where:** Admin → General Settings → Status

**In practice:** `maintenanceMode` returns a maintenance page to all users except system admins — use during upgrades ([Upgrades](../self-hosting/upgrades.md)).

---

## Plugins & integrations

| Field | Default | Purpose | Set by |
|-------|---------|---------|--------|
| `registryUrl` | community-plugins manifest URL | Official plugin registry JSON | Admin UI |

**Where:** Admin → Plugins & Integrations

Campaigns install plugins from the synced registry via Campaign Settings → Integrations. Custom manifest URLs are not a separate admin toggle — use registry sync or local `PLUGINS_DIR` packages.

See [Plugins overview](../features/plugins-overview.md) and [`esiana-core/plugins/README.md`](../esiana-core/plugins/README.md).

---

## Identity providers

OIDC / SSO is configured in **Admin → Identity Providers** (separate API from `GLOBAL_CONFIG`). See [Federated identity](federated-identity.md).

---

## Branding & appearance

| Field | Default | Purpose | Set by |
|-------|---------|---------|--------|
| `globalTitle` | `Esiana` | Site title | Admin UI |
| `globalLogoUrl` | (null) | Header logo URL | Admin UI |
| `faviconUrl` | (null) | Favicon URL | Admin UI |
| `globalThemePreset` | `dark` | Instance theme preset | Admin UI |
| `globalPalette` | `ocean` | Accent palette | Admin UI |
| `applyBackgroundTint` | `false` | Tint page background from palette | Admin UI |

### Valid theme presets

`light`, `dark`, `auto`, `fantasy`, `cyberpunk`, `parchment`

### Valid global palettes

**Dark foundation:** `ocean`, `midnight`, `forest`, `ember`, `deep_space`  
**Light foundation:** `sunset`, `desert`, `arctic`  
**Holiday / identity:** `trans`, `pride`, `halloween`, `christmas`

**Where:** Admin → Appearance

Users can override with personal appearance profiles unless campaign theme takes precedence — see [User account settings](user-account-settings.md).

---

## Footer

| Field | Default | Purpose | Set by |
|-------|---------|---------|--------|
| `customText` | (empty) | Footer markdown / text | Admin UI |
| `tosUrl` | (empty) | Terms of service link | Admin UI |
| `privacyPolicyUrl` | (empty) | Privacy policy link | Admin UI |
| `discordUrl` | (empty) | Discord link | Admin UI |
| `githubUrl` | (empty) | GitHub link | Admin UI |
| `alignment` | `center` | Footer alignment | Admin UI |

**Where:** Admin → Appearance → Footer

---

## Notifications (admin)

| Field | Default | Purpose | Set by |
|-------|---------|---------|--------|
| `pollIntervalSeconds` | `60` | Bell badge poll interval (30–300 s) | Admin UI |
| `defaultTimezone` | system default | Default IANA timezone for scheduling | Admin UI |

Polling pauses while the browser tab is hidden.

**Where:** Admin → General Settings → Notifications

---

## Other admin sections (no GLOBAL_CONFIG fields)

These use separate APIs but belong in the operator mental model:

| Section | Features |
|---------|----------|
| **Identity Providers** | OIDC CRUD, group→role mapping — [Federated identity](federated-identity.md) |
| **Update Core** | GitHub release version check |
| **System Utilities** | Full DB backup, storage stats, prune unused media, logs |
| **Background Tasks** | Import/export job queue |
| **Campaigns** | List, backup, delete any campaign |
| **Page Templates** | Global default wiki templates |
| **Memberships** | Users, roles, delete accounts |
| **API Usage** | Request analytics by token |

---

## Related docs

- [Environment variables](environment-variables.md) — env fallbacks and overrides
- [Campaign settings](campaign-settings.md) — per-campaign overrides (themes, plugins)
- [Limits & quotas](limits-and-quotas.md)
