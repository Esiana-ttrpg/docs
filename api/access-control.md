# API access control

<!-- cspell:words GAMEMASTER -->

Authentication and authorization are separate in Esiana. A valid session or
bearer token establishes identity; each operation still enforces its own access
boundary.

## Layered model

| Layer | Meaning |
|-------|---------|
| Application authentication | Identifies the session user or API-token owner |
| Campaign membership | Grants access to the addressed campaign, subject to later checks |
| Campaign role | `GAMEMASTER`, `WRITER`, `PARTICIPANT`, `OBSERVER` (observer is read-only) |
| Campaign capability | Fine-grained permission such as page creation, map editing, or downtime management |
| Content visibility | Filters individual pages, maps, assets, journals, and knowledge projections |
| System administration | Separate application-wide `SYSTEM_ADMIN` authority |

## Campaign membership

Routes mounted under `/api/campaigns/{campaignHandle}/...` authenticate the
request, resolve the campaign by handle, and require membership before invoking
the operation. An unauthenticated caller gets `401`; a non-member gets
`403`. An API token acts as its owning user and cannot bypass this check.

Campaign discoverability can make selected public and recruitment information
visible through explicitly public routes. It does not turn the campaign-scoped
API into an anonymous API.

## Campaign roles and capabilities

Campaign membership roles are `GAMEMASTER`, `WRITER`, `PARTICIPANT`, and
`OBSERVER`. Observers may read but not mutate campaign content. Routes may
additionally require a campaign capability. Capabilities that
appear as route gates in this API include:

| Capability | Typical gate |
|------------|--------------|
| `page.create` | Creating wiki pages and journal publications |
| `page.edit_any` / `page.edit_owned` / `page.edit_party` | Editing pages, layouts, transforms, aliases, lore data |
| `page.visibility.edit` | Changing page visibility |
| `quest.edit` / `thread.edit` | Quest time-pressure, lifecycle, branches, quest publishing |
| `maps.edit` | Map patching, layers, groups, objects, pins, presets, page↔map links |
| `assets.upload` / `assets.delete_any` / `assets.delete_owned` | Uploading / deleting assets |
| `downtime.manage` | Haven, project, ledger-settings, and scheduled-effect mutations |
| `chronology.edit` (chronology-manager rule) | Calendars, events, consequences, time advance, world-state apply |
| `discovery.reveal` | Presence reveal, map reveal, circulation history |
| `rumor.moderate` | Rumor spread and retraction |
| `notes.moderate` | Session scheduling, attendance roster |
| `journal_planner.access` | Journal planner, release rules, evaluation, release |
| `adventure.storyboard.edit` | Adventure storyboard editing |
| `campaign.manage_roles` | Member role changes, removals, capability overrides (owner-level) |

Capabilities can be configured per campaign via
`GET` / `PUT /api/campaigns/{campaignHandle}/capability-overrides`
(campaign-owner only). Five capabilities are never overridable:
`campaign.delete`, `campaign.transfer_ownership`, `campaign.manage_roles`,
`campaign.visibility.edit`, and `billing.manage`. Saving overrides revokes live
event streams so connected clients re-authorize.

Beyond the route-level capability, operations apply resource-specific checks
the OpenAPI `x-esiana-authorization` extension only summarizes as
"resource-level checks":
page ownership for edits, DM/Co-DM notebook authority, self-or-manager rules
for identity assignment, recipient-only transfer acceptance, and owner-only
force deletion. Do not infer permission from a role label alone; handle `403`
responses and consult the operation's authorization description in `/api/docs`.

Campaign ownership and campaign Game Master privileges apply only inside that
campaign. They do not grant application/system administration authority.

## Chronology management

Chronology mutations use a dedicated rule rather than a single capability:
`GAMEMASTER` and `WRITER` always qualify; `PARTICIPANT` qualifies only when the
campaign allows player chronology management (plus contributor/owner paths).
Failures return `403 Forbidden: chronology management not permitted`. Reads
(calendars, timeline, overlay, time tracking) are member-level with
visibility filtering.

## System administration

System-administration routes under `/api/admin/...` require a
session-authenticated application user with the `SYSTEM_ADMIN` application
role. Campaign ownership or a privileged campaign role is not sufficient.
These routes do not accept bearer API tokens (`401` without a session, `403`
for non-admins).

## Content visibility

Membership does not imply access to every resource in a campaign. Operations
enforce resource-specific rules after the membership check,
including:

- wiki visibility (`Public` / `Party` / `DM_Only`) and discovery state;
- map visibility and permitted image variants (non-elevated `full` requests are
  downgraded to `display`);
- asset type, campaign access, and elevated-role requirements;
- journal publication and planning permissions (scheduled bodies are stripped
  for callers without planner access);
- page ownership or edit capabilities;
- protected lore, entity, interpretation, and knowledge projections
  (`SECRET` content is masked from party views; locked lifecycle subjects are
  masked to null).

Some protected resources deliberately return `404` instead of `403` to avoid
revealing that hidden content exists (unknown/invisible maps, assets, pages).
Clients must treat both as access failures unless the operation documents
another meaning.

For endpoint-level requirements, use the running instance's `/api/docs`
reference.
