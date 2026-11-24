---
title: OPDS campaign reading
description: Connect external readers to campaign descriptions and lore.
---

Esiana serves campaign descriptions and lore through **OPDS 2.0**. Catalogs are
generated dynamically from canonical wiki pages and existing audience projections.
There are no separate publishing roles or workflows. OPDS is disabled by default.

## Enable and connect

1. Apply the normal database migrations during upgrade.
2. In **Global Administration → General Settings → OPDS Catalog**, enable OPDS and
   **Personal catalogs**, then save. Public exposure can remain off.
3. In your account's **Developer Keys → OPDS Catalog**, create a named reader
   credential, such as “Tablet Reader”. Copy its secret, which is shown once.
4. Add `https://YOUR-INSTANCE/opds/me` as an OPDS catalog in your reader.
5. Use any username (for example `reader`) and the secret as the HTTP Basic password.
   Clients with custom headers can use `Authorization: Bearer READER-SECRET` instead.
6. Browse a campaign, select a workspace, and acquire a page to read its full lore.

Use HTTPS outside local development. Do not put secrets in URLs or use your account
password. Reader credentials expire after one year. Use a separate credential for
each device so it can be revoked independently. They cannot authenticate general
API routes or modify campaign content.

## Routes and publication format

| Route | Purpose |
| --- | --- |
| `/opds` | Public root navigation |
| `/opds/recruiting` | Public recruitment listings |
| `/opds/recruiting/:id` | Recruitment tagline and premise as HTML |
| `/opds/recruiting/:id/manifest.json` | Recruitment reading manifest |
| `/opds/campaigns` | Public campaign discovery |
| `/opds/campaigns/:id` | Campaign workspace navigation |
| `/opds/campaigns/:id/:module` | Public page publications |
| `/opds/campaigns/:id/pages/:pageId` | Public HTML lore |
| `/opds/me` | Current reader's campaigns |
| `/opds/me/:id` | Authorized workspace navigation |
| `/opds/me/:id/:module` | Authorized page publications |
| `/opds/me/:id/pages/:pageId` | Authorized HTML lore |

Both page-reading branches also serve `…/pages/:pageId/manifest.json`. Reading
resources stay inside their original public or personal branch. IDs are stable
campaign/page IDs; module keys use the existing workspace values. Lists paginate
with `?page=1` and `next` links, 30 items per page.

Catalogs use `application/opds+json`. Acquisition links use a small Readium Web
Publication manifest (`application/webpub+json`) pointing to one HTML reading-order
resource. This avoids relying on bare-HTML acquisition and requires no EPUB/PDF
generation. Full lore is loaded only when a reading resource is requested.

## Administration and permissions

| Setting | Routes restricted |
| --- | --- |
| Enable OPDS | Every `/opds` route |
| Public catalog | Root, recruiting and public campaign branches |
| Public recruitment | `/opds/recruiting` and descendants |
| Public campaigns | `/opds/campaigns` and descendants |
| Personal catalogs | `/opds/me` and descendants; new credential issuance |

All controls default to off. Disabled routes return 404, including direct HTML and
manifest URLs. Public and personal access are independent. Public reading also
requires the existing instance login gate to permit anonymous access. Public
campaigns use Esiana's existing Observer-eligible projection, which can include
Party-visible pages. Party visibility alone never opens a private campaign.
Recruitment exposes only public, looking-for-group campaign recruitment text.

Personal requests use current campaign membership and permissions. Ordinary Party
readers cannot see GM-only or unrevealed pages, blocks or references. Direct URLs
enforce the same restrictions, including campaign boundaries. Disabling OPDS retains
credentials; re-enabling restores non-expired, non-revoked credentials.

**User Management → Reader credentials** displays names, read scopes, creation,
expiry and last-used dates. Administrators can revoke one credential or all reader
credentials for a user. Secrets and stored digests are never displayed. Global
administration lists active credential/user counts and all controlled routes.
Instance-wide revocation requires confirmation and writes an audit record in the
same transaction. Revocation blocks future requests; it cannot recall downloads.

Account deletion invalidates credentials in the deletion transaction, backed by a
cascading foreign key. OPDS digests use a keyed, domain-separated HMAC that general
API authentication cannot validate. Rotating the instance JWT secret also
invalidates reader credentials.

### Management APIs

Management operations require a session cookie; administrative operations also
require system administrator privileges.

- `GET /api/user/opds/credentials` lists your reader credential metadata.
- `POST /api/user/opds/credentials` with `{"name":"Tablet Reader"}` returns a secret once.
- `DELETE /api/user/opds/credentials/:credentialId` revokes one; omit the ID to revoke all your reader credentials.
- `GET /api/admin/users/:userId/opds/credentials` lists a user's reader metadata.
- `DELETE /api/admin/users/:userId/opds/credentials/:credentialId` revokes one; omit the ID to revoke all of that user's reader credentials.
- `GET /api/admin/opds/credentials` returns active credential and user counts.
- `DELETE /api/admin/opds/credentials` requires `{"confirmation":"REVOKE ALL OPDS CREDENTIALS"}`.
- `PATCH /api/admin/settings` accepts an `opds` object with boolean `enabled`, `publicEnabled`, `personalEnabled`, `recruitingEnabled`, and `campaignsEnabled` fields.

## Reader compatibility and manual acceptance

**Thorium Desktop is the initial reference client; first-hand verification of this
integration remains a maintainer acceptance check.** Thorium documents OPDS and
[Readium Web Publication support](https://www.thoriumreader.com/en/legals/desktop/technical-spec/).
No additional desktop application is installed by Esiana.

Using an already-installed Thorium Desktop or suitable OPDS 2.0 reader:

1. Enable personal OPDS on a test instance. Create Party and GM reader credentials.
2. Add `/opds/me`, authenticate with the Party secret, and browse a campaign and
   workspace. Check a description, acquire a page, and confirm full lore opens with
   headings, emphasis, lists and tables intact.
3. Confirm authentication is sent on both the acquisition manifest and the HTML
   reading-order request. If the client cannot propagate credentials, record its
   name/version as incompatible; do not put secrets in URLs as a workaround.
4. Confirm GM-only and unrevealed titles, descriptions and prose are absent. Repeat
   with the GM secret and confirm elevated content is available.
5. Revoke the credential and retry a fresh catalog/lore request: expect 401.
   Disable personal OPDS and retry a direct resource: expect 404.
6. Optionally enable public OPDS and anonymous instance access. Browse `/opds`,
   recruiting and public campaigns without credentials. Private campaigns and
   GM-only lore must remain inaccessible.

Run `pnpm --filter @esiana/backend test:opds` for automated HTTP authorization and
credential lifecycle tests against a temporary SQLite database. First-hand reader
acceptance is separate from those automated checks.

## Content and limitations

Every page-backed workspace uses the same prose adapter. It reads biography and
lore blocks and shared description metadata where available. Standard static
formatting includes headings, emphasis, lists, tables, code and links. Scripts,
interactive widgets, editor controls and specialized module fields are omitted.
Images are currently omitted to avoid exposing protected asset URLs.

There is no OPDS 1.x support, calendar integration, character sheet serialization,
interactive map/relationship graph, offline synchronization or write-back. Existing
API and iCalendar credentials keep their existing authentication mechanisms.
