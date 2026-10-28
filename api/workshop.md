# Workshop API

The workshop turns rough drafting into canon pages. Drafts belong to their
author: only the author can read, edit, apply, or formalize them (`404` for
anyone else). Iteration is repeatable; graduation is terminal for that draft.

```text
POST /workshop/drafts (or POST /workshop/drafts/bootstrap per anchor)
    ↓
PATCH iterate → writing-context hints
    ↓
apply (push prose into the anchor, repeatable; draft stays active)
    ↓
formalize (graduate to a canon page; draft becomes formalized)
```

Draft CRUD, bootstrap, writing context, and apply require non-observer
membership (plus rate limiting); formalize requires page-edit-any authority.
All of these additionally require an authenticated user (`401` without one).

Draft statuses are `active|formalized|discarded`; anchor bindings are
`anchored|shadow`. Formalize targets cover characters, organizations,
locations, families, bestiaries, ancestries, objects, quests, threads, scenes,
journals, events, rules resources, and lore notes, each with its own parent
folder, template, and surface.

## Drafts

### `GET /api/campaigns/{campaignHandle}/workshop/drafts`

Lists the caller's drafts: `?status=formalized|discarded` (default `active`),
`?anchor=` filter, `?limit=` (default 50).

### `POST /api/campaigns/{campaignHandle}/workshop/drafts`

Creates a draft. `anchorEntityIds` accepts an array or comma-separated string;
every anchor passes an edit-access check (`403 cannot edit anchor page` on
failure). `title` and `bodyMarkdown` are optional; `sourceKind` and
`intendedTarget` values outside their vocabularies are dropped rather than
rejected. Returns `201` (or `500` on creation failure).

### `POST /api/campaigns/{campaignHandle}/workshop/drafts/bootstrap`

Idempotent per author-plus-anchor creation (`anchorPageId` required, else
`400`, with the same anchor edit check). Use it to guarantee "exactly one
working draft for this page" semantics.

### `GET /api/campaigns/{campaignHandle}/workshop/drafts/{draftId}`

Returns the caller's draft. `404` for other authors' drafts or unknown IDs.

### `PATCH /api/campaigns/{campaignHandle}/workshop/drafts/{draftId}`

Iterates (`title`, `bodyMarkdown`, `fieldShadow` with intended target,
template type, blocks, and metadata; invalid shadows are dropped). `404`
unless owned.

### `GET /api/campaigns/{campaignHandle}/workshop/drafts/{draftId}/writing-context`

Authoring hints: counts `[[wikilinks]]`, then up to 5 hints (linked
references, "continuing from" the anchor, backlink counts). Returns
`{ hints[], linkCount, unresolvedLinkCount, anchorPageId }`. `404` unless
owned.

### `POST /api/campaigns/{campaignHandle}/workshop/drafts/{draftId}/apply`

Merges draft prose into the first anchor's content, updates wikilink
references, and records the apply time. The draft stays `active`, so
apply-iterate-apply loops are expected. Requires a single anchor;
unappliable drafts return `400`.

### `POST /api/campaigns/{campaignHandle}/workshop/drafts/{draftId}/formalize`

Graduates the draft to a canon page: `target` must be a known formalize
target (`400` otherwise), `title` non-blank (`400` otherwise), optional
`summary`, `loreParentId` (lore-note parent), and `linkedQuestPageId` (scene).
Creates the page under the target's parent folder, merging non-prose shadow
blocks plus a prose shell, and marks the draft `formalized` with the new page
ID and timestamp. Returns `{ formalizedPageId, target }`; unformalizable
drafts return `404`, failures `400`.

Related: journal publications accept a `workshopDraftId` source
([Journal](journal.md)); formalize targets land as ordinary wiki pages
([Wiki pages](wiki-pages.md)).

**Endpoint reference:** open `/api/docs` on your running Esiana instance.
