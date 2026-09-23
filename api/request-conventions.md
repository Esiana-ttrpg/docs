# API request and response conventions

Use `/api/docs` on the running instance for exact parameters, media types, schemas, and status codes. The following conventions apply across the core API.

## Request formats

- Most request and response bodies use `application/json`.
- File and image uploads use `multipart/form-data`; field names and size limits are operation-specific.
- Download operations may stream content directly or return a `302` redirect to a storage-provider URL.
- Query parameters are operation-specific. Unknown fields and parameters are not guaranteed to be retained or ignored in future releases.

## Campaign identifiers

Most narrative and campaign-scoped paths use `{campaignHandle}`, the URL handle resolved by campaign-scope middleware. Several campaign container, plugin, pin, and administration operations use a database campaign `{id}` or `{campaignId}` instead.

One current compatibility route for campaign applications is mounted with both `:id` and `:campaignId`; the OpenAPI contract represents the equivalent URL shape once. Follow the parameter documented for the operation rather than substituting an ID for a handle or vice versa.

## Responses

Successful JSON responses commonly return a resource, a named collection, or `{ "ok": true }`. Creation may return `201`; queued background work may return `202`. Downloads use the media type documented by the operation.

Errors normally use:

```json
{
  "error": "Human-readable explanation"
}
```

Common statuses are:

| Status | Meaning |
|--------|---------|
| `400` | Invalid parameters, body, upload, or state transition |
| `401` | Authentication required or invalid |
| `403` | Authenticated but not authorized |
| `404` | Missing resource, or protected resource intentionally concealed |
| `409` | Conflict with existing state |
| `410` | Resource, such as a temporary asset, has expired |
| `429` | Rate limit exceeded; inspect `Retry-After` |
| `500` | Unexpected server error |

Clients should branch on HTTP status and treat `error` as explanatory text, not a stable machine-readable code unless an operation explicitly documents a `code` field.
