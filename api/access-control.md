# API access control

<!-- cspell:words GAMEMASTER -->

Authentication and authorization are separate in Esiana. A valid session or bearer token establishes identity; each operation still enforces its own access boundary.

## Campaign membership

Routes mounted under `/api/campaigns/{campaignHandle}/...` authenticate the request, resolve the campaign by handle, and require membership before invoking the endpoint handler. An API token acts as its owning user and cannot bypass this check.

Campaign discoverability can make selected public and recruitment information visible through explicitly public routes. It does not turn the campaign-scoped API into an anonymous API.

## Campaign roles and capabilities

Campaign membership roles are `GAMEMASTER`, `WRITER`, `PARTICIPANT`, and `OBSERVER`. Route-specific middleware may additionally require a campaign capability such as page creation, page editing, map editing, chronology management, asset upload, discovery reveal, or journal planning.

Capabilities can be configured per campaign. Do not infer permission from a role label alone; handle `403` responses and consult the operation's authorization description in `/api/docs`.

Campaign ownership and campaign Game Master privileges apply only inside that campaign. They do not grant application/system administration authority.

## System administration

System-administration routes under `/api/admin/...` require a session-authenticated application user with the `SYSTEM_ADMIN` application role. Campaign ownership or a privileged campaign role is not sufficient. These routes do not accept bearer API tokens.

## Content visibility

Membership does not imply access to every resource in a campaign. Controllers and services enforce resource-specific rules after the membership check, including:

- wiki visibility and discovery state;
- map visibility and permitted image variants;
- asset type, campaign access, and elevated-role requirements;
- journal publication and planning permissions;
- page ownership or edit capabilities;
- protected lore, entity, interpretation, and knowledge projections.

Some protected resources deliberately return `404` instead of `403` to avoid revealing that hidden content exists. Clients must treat both as access failures unless the operation documents another meaning.

For endpoint-level requirements, use the running instance's `/api/docs` reference.
