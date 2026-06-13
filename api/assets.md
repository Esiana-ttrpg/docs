# Assets API

Upload and serve campaign media — maps, images, attachments.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Storage

Default provider: filesystem under `UPLOADS_DIR`. Optional S3-compatible storage via `@esiana/storage-s3` infrastructure package.

Upload routes are campaign-scoped and require appropriate membership or token scope.

---

## Operator guide

[Object storage (internal)](../../esiana-core/docs/deployment/object-storage.md)

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
