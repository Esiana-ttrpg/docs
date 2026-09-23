# Assets API

Asset APIs upload and serve campaign maps, images, and attachments.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

## Storage and mutation

The default provider stores files under `UPLOADS_DIR`. Installations can use an S3-compatible storage plugin.

Upload and deletion routes are campaign-scoped. They require membership plus the route's asset capability; a bearer token does not bypass either check.

## Reading assets

Core asset reads use `/api/assets/{assetId}`. The legacy `/uploads/{filename}` surface remains available and applies the same database-backed access evaluation; it is not an unrestricted static-files directory.

Both routes accept an anonymous request, a session cookie, or a bearer API token. A bearer token authenticates as its owning user and does not bypass campaign membership or asset visibility. No asset-specific token scope is currently required. Anonymous access succeeds only when the asset and campaign rules permit it:

- Non-map assets require campaign membership.
- Map access composes campaign access with map visibility. Hidden maps may return `404`.
- Import-staging assets require an elevated campaign role.
- Expired temporary assets return `410`.
- `?variant=full`, `display`, or `thumb` selects an available image variant. A non-elevated map viewer requesting `full` is downgraded to `display`.

The storage provider can stream the response or issue a `302` redirect. Clients should follow redirects and use the returned `Content-Type`; do not assume every successful asset response is JSON.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
