# Account, notifications & discovery API

Account routes manage the caller's own identity, tokens, and attention;
notification routes manage delivery of campaign events; public profiles,
recruitment, and catalog routes publish discoverable information. Unless noted,
account routes are session-only (no bearer tokens); public routes need no
authentication at all.

## User account

All `/api/user/...` routes require the session cookie (`401` without one).

### Profile and identity

- `GET /api/user/profile` — the caller's profile.

#### `PUT /api/user/profile`

Replaces profile fields (at least one known field required): display name,
avatar URL (absolute URL or `/uploads/*` path), pronouns, bio, pitch, blurb,
social links, appearance profile, IANA timezone, and BCP47 locale. Email
changes check uniqueness, invalidate older session cookies, and re-issue the
cookie.

- `POST /api/user/profile/avatar` — uploads an avatar (multipart `avatar`,
  image-validated; deletes the previous upload).
- `GET /api/user/creator-attribution` — attribution records for the caller.
- `GET /api/user/activity` — the caller's activity statistics.
- `DELETE /api/user/account` — deletes the account (removes the avatar file,
  deletes the user record, clears the cookie).

### Passwords and linked accounts

- `POST /api/user/change-password` — `{ currentPassword, newPassword }`
  (minimum 8, must differ; `401` on wrong current password; invalidates older
  session cookies).
- `POST /api/user/password` — sets a password on a passwordless account
  (`{ password, confirmPassword }`).
- `DELETE /api/user/password` — removes password auth (guarded so accounts
  keep at least one sign-in method).
- `GET /api/user/linked-accounts` — linked OIDC identities.
- `DELETE /api/user/linked-accounts/{providerId}` — unlinks a provider
  (blocked when it is the last sign-in method; invalidates older session
  cookies).

### API tokens

- `GET /api/user/tokens` — the caller's tokens (metadata only, never
  secrets).

#### `POST /api/user/tokens`

Mints a token (`name` up to 80 characters required; `durationDays` in
30/90/365; `scopes` restricted to known values, omitted scopes meaning legacy
full access). Rate limited. Returns `{ token, secret }` with the cleartext
secret shown exactly once.

- `DELETE /api/user/tokens/{tokenId}` — revokes a token (`404` for foreign
  IDs).

See [Authentication](authentication.md) for how tokens authenticate and how
scopes restrict bearer calls.

### Campaign defaults, pins, and templates

- `GET /api/user/campaign-defaults` / `PATCH /api/user/campaign-defaults` —
  reads and updates the defaults applied at campaign creation.
- `PUT /api/user/campaigns/{campaignId}/pin` /
  `DELETE /api/user/campaigns/{campaignId}/pin` — pins and unpins a campaign
  for quick access.
- `PATCH /api/user/campaign-pins/reorder` — reorders pinned campaigns.
- `GET /api/user/template-resources/{kind}` /
  `PUT /api/user/template-resources/{kind}` — per-kind template resources.

### Hub and attention

- `GET /api/user/hub` — the caller's cross-campaign hub.
- `POST /api/user/hub/attention/dismiss` — dismisses attention items.
- `DELETE /api/user/hub/attention/dismiss/{dismissKey}` — clears one
  dismissal.

### Developer quota

- `GET /api/user/developer/quota` — token/usage quota for the caller.

## Notifications

- `GET /api/user/notifications?unreadOnly&campaignId&cursor&limit=` —
  notifications newest-first excluding expired rows (`{ notifications,
  nextCursor }`; `limit` 1–50, default 20).
- `GET /api/user/notifications/unread-count` — unread total.
- `PATCH /api/user/notifications/{id}/read` — marks one read.
- `POST /api/user/notifications/read-all` — marks all read.
- `DELETE /api/user/notifications/{id}` — deletes one.
- `GET /api/user/notification-preferences` /
  `PATCH /api/user/notification-preferences` — reads and updates delivery
  preferences (`channels.{ inApp, email }`, `mutedUntil`).
- `GET /api/user/notification-capabilities` — client polling guidance (poll
  interval 30–300 seconds, default 60), email availability, and timezones.

Campaign events that produce notifications include join requests, role
changes, departures, ownership transfers, session scheduling and RSVP
digests, backup completion, and world-development proposals — see
[Campaigns](campaigns.md), [Import & export](import-export.md), and
[World state](world-state.md).

## Public profiles

- `GET /api/users/{id}/public-profile` — public profile. No authentication
  required.
- `GET /api/users/{id}/avatar` — public avatar. No authentication required.
- `GET /api/users/{id}/creator-attribution` — attribution; personalizes when
  called with a session.
- `GET /api/users/{id}/activity` — activity summary; personalizes when called
  with a session.

## Recruitment and public directory

- `GET /api/recruitment/featured` — featured recruiting campaigns (public,
  looking-for-group, not full; newest first, shuffled 3–5 from up to 50
  scanned). No authentication required.

#### `GET /api/recruitment/all?page=&limit=&gameSystem=&externalTool=&genreThemes=`

Paginated recruiting list (`page` 1–1000 default 1, `limit` up to 48 default
12; unknown game-system slugs return `400`). Full campaigns are filtered from
the results, so pages may contain fewer items when filters apply. No
authentication required.
- `GET /api/recruitment/lobby/{handle}` — one campaign's public lobby card.
- `GET /api/public-directory` — the public campaign directory.

Joining flows (`POST /api/campaigns/{campaignId}/apply`, join requests) live
in [Campaigns](campaigns.md).

## System and content catalogs

- `GET /api/health` — `{ status: "ok", service: "esiana-api" }`. Public.
- `GET /api/public/system/status` — public system status.
- `GET /api/game-systems` — game systems. Fully public.
- `GET /api/campaign-themes` — campaign themes. Fully public.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
