# Campaigns API

Campaigns are Esiana's authorization and data-isolation boundary.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

## Addressing campaigns

Narrative routes are normally addressed by URL handle:

```text
/api/campaigns/{campaignHandle}/...
```

Campaign-scope middleware resolves that handle and requires membership. Some container-management routes instead use the database campaign ID; `/api/docs` distinguishes `{id}` or `{campaignId}` from `{campaignHandle}`.

## Authorization layers

| Layer | Meaning |
|-------|---------|
| Application authentication | Identifies the session user or API-token owner |
| Campaign membership | Grants access to the addressed campaign, subject to later checks |
| Campaign capability | Permits an action such as editing, managing chronology, or uploading assets |
| Content visibility | Filters individual pages, maps, assets, journals, and knowledge projections |
| System administration | Separate application-wide `SYSTEM_ADMIN` authority |

- List and create campaigns at `/api/campaigns`.
- Bearer tokens act as their owning user; token possession does not bypass membership.
- Mutations can require campaign roles or configurable capabilities.
- Reads can apply content-level visibility after membership succeeds.

See [API access control](access-control.md) for the full boundary model.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
