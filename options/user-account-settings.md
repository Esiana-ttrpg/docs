# User Account Settings

Each user manages their profile, appearance, notifications, developer API keys, and account credentials from **User Settings** (`/settings`). Campaign memberships are managed separately on **Your Campaigns** (`/campaigns`).

---

## Settings sections

| Section | Route | Purpose |
|---------|-------|---------|
| Profile & Identity | `/settings?tab=profile` | Public identity, avatar, bio, social links, timezone |
| Appearance | `/settings?tab=appearance` | Personal theme profile |
| Campaign Defaults | `/settings?tab=campaignDefaults` | GM style tags, table/safety prefs, doc templates, default pitch |
| Notifications | `/settings?tab=notifications` | In-app and email notification preferences |
| Developer Keys | `/settings?tab=developer` | API tokens and daily quota |
| Account & Security | `/settings?tab=account` | Email, password, delete account |

Deep links use the `tab` query parameter (for example, notification emails link to `/settings?tab=notifications`).

On smaller viewports, settings sections use a responsive navigation pattern: horizontal tabs with scroll on tablet, icon-aware dropdown on mobile.

---

## Profile & Identity

| Field | Purpose | Set by |
|-------|---------|--------|
| `displayName` | Shown name (unless campaign identity page overrides) | User UI |
| `avatarUrl` | Profile image | User UI |
| `pronouns` | Optional pronouns | User UI |
| `publicBio` | Bio on public profile | User UI |
| `statusBlurb` | Short status line | User UI |
| Social links | Bluesky, Discord, GitHub, Reddit, Mastodon, other | User UI |
| Timezone | IANA timezone for scheduling display | User UI |

**Public profile:** `/users/:id`

---

## Your Campaigns

Campaign memberships (DM / player roles, leave table) live at **`/campaigns`**, not in User Settings. Access from the profile dropdown in the header.

---

## Campaign Defaults

User Settings → **Campaign Defaults** (`/settings?tab=campaignDefaults`) stores reusable GM preferences:

| Area | Purpose |
|------|---------|
| GM Style Tags | Public profile chips (also shown on `/users/:id`) |
| Table Defaults | Beginner friendly, rules light/heavy, voice required, etc. |
| Safety Defaults | Session Zero, X-Card, Lines & Veils, and related toggles |
| Default genre themes | Copied when importing recruitment preferences |
| Default recruitment docs | Editable templates at `/settings/campaign-defaults/:slug` |
| Default recruitment pitch | Pre-fills LFG application messages |

**New campaign import:** The campaign wizard can import saved docs and recruitment preferences into a freshly created campaign (wiki pages under Rules/Resources plus recruitment fields).

API: `GET/PATCH /api/user/campaign-defaults`, `GET/PUT /api/user/template-resources/:kind`

---

## Appearance

Personal theme profile independent of campaigns:

- Foundation (light/dark), genre overlay, identity palette, background tint
- Option to **allow campaign or system theme override**

Campaign identity display uses linked wiki page when set by DM ([Campaign settings](campaign-settings.md) → Access).

---

## Notifications

Per notification type:

- **In-app** toggle
- **Email** toggle (requires instance SMTP)

**Global mute-until** — suppress all notifications until a timestamp.

See [Notifications feature](../features/notifications.md) and [`esiana-core/docs/notifications.md`](../esiana-core/docs/notifications.md).

---

## Developer API keys

Create bearer tokens for automation and integrations.

### Token options

| Option | Values |
|--------|--------|
| **Name** | User-defined label |
| **Duration** | 30, 90, or 365 days |
| **Scopes** | See below |

### Scopes

| Scope | Access |
|-------|--------|
| `campaign:read` | Read campaign data |
| `campaign:write` | Mutate campaign data |
| `plugins:read` | Read plugin state |
| `plugins:manage` | Install/configure plugins |

**Empty scopes = legacy full access** (grants all operations). Prefer explicit scopes for new tokens.

### Rate limits

Token creation is rate-limited: default **10 mints per 24 hours** (`RATE_LIMIT_TOKEN_MINT_*`). See [Limits & quotas](limits-and-quotas.md).

### Usage

Send `Authorization: Bearer <token>` on API requests. Tokens support `lastUsedAt` tracking (throttled updates).

### Daily API quota (account)

User Settings → **Developer Keys** shows your personal API usage for the current UTC day (aggregated across all campaigns where your tokens are used). The UI calls `GET /api/user/developer/quota`.

Default limit: **50,000** token-authenticated requests per UTC day per account (enforced for monitoring; see rate-limit docs).

### Instance monitoring (system admins)

Global API health, traffic, and top accounts are in **Admin → API Usage** (`/admin/analytics/usage`), not in campaign settings.

---

## Account & Security

Email, password change, linked identity providers, and account deletion are under **Account & Security** (`/settings?tab=account`), separate from public profile fields.

### Federated sign-in

When the operator configures OIDC ([Federated identity](federated-identity.md)):

- **Link provider** — connect an IdP account when emails match
- **Unlink provider** — remove a linked IdP when another sign-in method remains
- **Password hybrid** — OIDC-only users may add a local password; users with both may remove password if OIDC remains

**Forgot password:** Sign-in modal → **Forgot password?** sends a reset link when SMTP is configured (always returns success to avoid email enumeration). Complete reset at `/reset-password?token=…` (link expires in 1 hour). Federated-only accounts (`passwordAuthEnabled: false`) do not receive reset mail; change-password UI is hidden for those users.

Password change is rate-limited (`RATE_LIMIT_PASSWORD_CHANGE_*`). Forgot/reset uses `RATE_LIMIT_PASSWORD_RESET_*`.

---

## Related docs

- [Environment variables](environment-variables.md) — `FRONTEND_ORIGIN`, rate limits
- [Campaign settings](campaign-settings.md) — identity wiki pages
- [Recruitment & LFG](../features/recruitment-lfg.md) — recruitment settings responsive nav
- [Plugins overview](../features/plugins-overview.md) — plugin API scopes
- [Reverse proxy & security](reverse-proxy-and-security.md)
