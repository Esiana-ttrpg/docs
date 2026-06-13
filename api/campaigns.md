# Campaigns API

REST operations on campaign containers.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Campaign as tenant

Each campaign is an isolated lore tenant addressed by **handle** (slug). All wiki, session, map, and plugin data is scoped to one campaign.

Authorization layers:

| Layer | Scope |
|-------|-------|
| Application admin | System-wide (`SYSTEM_ADMIN`) |
| Campaign admin | Container ownership, discoverability, membership |
| Narrative authority | GM/writer/player roles and capabilities |

---

## Common patterns

- List and create campaigns at `/api/campaigns`
- Campaign-scoped lore under `/api/campaigns/{campaignHandle}/...`
- Membership and settings routes require appropriate role or token scope

---

## See also

- [Campaign model](../architecture/campaign-model.md)
- Internal: [`campaign-access-model.md`](../../esiana-core/docs/architecture-internal/campaign-access-model.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
