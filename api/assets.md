# Assets API

Asset APIs upload and serve campaign maps, images, and attachments.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

## Storage and mutation

The default provider stores files under `UPLOADS_DIR`. Installations can use
an S3-compatible storage plugin. Upload and deletion routes are
campaign-scoped: they require membership plus the route's asset capability,
and a bearer token bypasses neither check.

### `GET /api/campaigns/{campaignHandle}/uploads[?type=]`

Lists campaign assets (optional unvalidated `type` filter). Import-staging
asset types are hidden from callers without campaign-modification authority.
Member-only.

### `POST /api/campaigns/{campaignHandle}/uploads`

Uploads an image (multipart `image`, subject to system upload limits).
`type` defaults to `GENERIC` and must be a known asset type (`400`
otherwise); missing files return `400`. Map uploads build `display` and
`thumb` webp variants. Success returns `201 { asset, referenceUrl }`, where the
reference URL is the canonical `/api/assets/{id}` form. Requires the
asset-upload capability.

### `POST /api/campaigns/{campaignHandle}/assets/import-url`

Imports from a remote URL (`{ url, type }`) under a URL-import limiter, with
the same type validation, variant building, and `201` response as direct
upload. `400` covers validation and fetch failures; unavailable storage maps
to its own status. Requires the asset-upload capability.

### `DELETE /api/campaigns/{campaignHandle}/uploads/{assetId}`

Deletes an asset: cleans up dependent pins, clears wiki `mapAssetId` bindings,
removes stored files, then deletes the record (`{ ok: true }`). `404` for
out-of-campaign IDs. Requires the asset-delete-any capability.

## Reading assets

Core asset reads use `/api/assets/{assetId}`. The legacy `/uploads/{filename}`
surface remains available and applies the same database-backed access
evaluation; it is not an unrestricted static-files directory.

### `GET /api/assets/{assetId}[?variant=]` · `GET /uploads/{filename}[?variant=]`

Both routes accept an anonymous request, a session cookie, or a bearer API
token. A bearer token authenticates as its owning user and does not bypass
campaign membership or asset visibility. No asset-specific token scope is
currently required. Anonymous access succeeds only when the asset and campaign
rules permit it:

- Non-map assets require campaign membership (`403` otherwise).
- Map access composes campaign access with map visibility. Hidden maps return
  `404` (concealment).
- Import-staging assets require an elevated campaign role (`403` otherwise).
- Expired temporary assets return `410`.
- `?variant=full`, `display`, or `thumb` selects an available image variant
  (unknown values default to `display`; assets without variants always serve
  `full`). A non-elevated map viewer requesting `full` is downgraded to
  `display`.

The storage provider can stream the response (with `Content-Type`,
`Cache-Control: private, max-age=86400`, `ETag`, `Content-Length`, and
`304`/`If-None-Match` support) or issue a `302` redirect to a presigned URL.
Clients should follow redirects and use the returned `Content-Type`; do not
assume every successful asset response is JSON. Missing stored files
return `404`.

The legacy filename route strips directory components, rejects `.`/`..`, and
matches assets by URL suffix before applying the identical gate.

### `GET /api/plugin-assets/{pluginId}/{assetPath}[?campaignId=]`

Serves plugin-provided files. Unlike the OpenAPI note suggesting open access,
this route requires session authentication plus a plugin-access check
(`403` on failure; `404` for missing entries), served with short private
caching.

Related: [Maps](maps.md) for map visibility and scenes;
[Import & export](import-export.md) for backup archives.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
