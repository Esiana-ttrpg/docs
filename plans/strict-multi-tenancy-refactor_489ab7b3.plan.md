---
name: strict-multi-tenancy-refactor
overview: Refactor the Esiana backend to enforce strict, campaign-scoped multi-tenancy with clear API hierarchy, Prisma schema guarantees, tenant-aware query wrappers, and isolated asset storage/access paths.
todos:
  - id: phase1-middleware-routing
    content: Implement `campaignContextMiddleware` and rewire campaign-scoped routes behind it, with public read-only support and HTTP method enforcement.
    status: pending
  - id: phase2-prisma-schema
    content: "Align Prisma schema with explicit `campaignId` fields, `visibility` semantics, and `onDelete: Cascade` for campaign-scoped models."
    status: pending
  - id: phase3-prisma-wrapper
    content: Create `getCampaignPrisma(campaignId)` client extension and refactor controllers to use it for campaign-scoped models.
    status: pending
  - id: phase4-asset-isolation
    content: Isolate asset storage and access by campaign, updating upload utilities and asset resolver routes.
    status: pending
  - id: phase5-tests-docs
    content: Add tests and documentation covering multi-tenancy rules, query wrapper usage, and asset isolation guarantees.
    status: pending
isProject: false
---

### Phase 1: API route & middleware hierarchy

- **1.1 Introduce `campaignContextMiddleware`**
  - Add a new middleware in `backend/src/middleware/campaignContext.ts` that generalizes and supersedes parts of `campaignScope.ts`.
  - Responsibilities:
    - Parse the campaign key from either slug or id on routes mounted at `/api/c/:slug/*` and `/api/campaigns/:campaignId/*`.
    - Look up the `Campaign` via `prisma.campaign.findUnique` by slug first, then id, selecting `id`, `slug`, and `visibility` (after we introduce it in Phase 2) plus legacy flags for backward compatibility.
    - Resolve the authenticated user via `authenticateApiOrSession` (for member-aware scopes) or `optionalAuth` (for asset/public routes), then determine membership and role from `CampaignMember`.
    - Derive an access level enum (e.g. `READ_WRITE` / `READ_ONLY` / `DENY`) based on:
      - **Member** (any valid `CampaignMemberRole`): `READ_WRITE` for all HTTP methods (with existing DM/Co-DM checks left to downstream middlewares).
      - **Non-member / unauthenticated** and `visibility === 'PUBLIC'`: `READ_ONLY`.
      - **Non-member** and `visibility === 'PRIVATE'`: `DENY` (return 403 or 404 based on a config flag, defaulting to 404 to hide existence).
    - Enforce HTTP method constraints: for `READ_ONLY`, immediately reject `POST`, `PUT`, `PATCH`, and `DELETE` with 403.
    - Attach a normalized campaign context to the request, e.g. `req.currentCampaign = { id, slug, visibility, access: 'READ_ONLY' | 'READ_WRITE', role, isMember }`.

- **1.2 Wire middleware into route hierarchy**
  - Update `createApp` in `backend/src/app.ts` to mount campaign-scoped routes using the new middleware:
    - For `/api/c/:campaignSlug` and `/api/campaign/:campaignId` (note: adjust to `/api/campaigns/:campaignId` for consistency if needed), wrap `campaignScopedRouter` with `campaignContextMiddleware` rather than using `campaignScopeMiddleware` directly.
  - In `backend/src/routes/campaignScoped.ts`, remove the top-level `campaignScopedRouter.use(campaignScopeMiddleware);` / `requireCampaignMembership` and instead assume `req.currentCampaign` is already set, using a thin adapter middleware that maps `req.currentCampaign` into the existing `CampaignScopedRequest.campaign` shape.
  - Introduce helper middlewares for downstream routes:
    - `requireCampaignReadWrite` that asserts `req.currentCampaign.access === 'READ_WRITE'` (used for mutating routes where role-based checks are not already present).
    - Keep and reuse `requireOperationalManager`, `requireCampaignDm`, etc., but update them to read from `req.currentCampaign` instead of duplicating membership logic.

- **1.3 Refactor flat entity routes under campaign hierarchy**
  - Inventory any remaining flat entity routes that operate on campaign-scoped data (e.g. characters, wiki, sessions) that are not already under `campaignScopedRouter`.
    - Use a quick grep over `backend/src/routes` and `backend/src/controllers` for routes like `/api/wiki`, `/api/characters`, or others directly applying `campaignId`.
  - For each such router:
    - Move the route definitions into the campaign-scoped router (e.g. `/api/c/:campaignSlug/wiki/...`) or create dedicated routers mounted under `/api/c/:campaignSlug` that already receive `campaignContextMiddleware`.
    - Update controller functions to accept `req.currentCampaign.id` as the authoritative `campaignId` rather than pulling it from arbitrary body or query parameters.
  - Ensure that public read-only access is enabled for **GET** routes across these campaign-scoped resources, while non-GET routes either:
    - Use `requireCampaignReadWrite` + role-based middlewares, or
    - Rely on existing stricter middlewares (e.g. `requireOperationalManager`) that implicitly assume `READ_WRITE` access.

- **1.4 Public vs member-only surface definition**
  - For route design under `/api/c/:campaignSlug/*`, follow your preference for a **broad public-read model**:
    - Allow anonymous access to most **GET** endpoints when `visibility === 'PUBLIC'`, provided that per-entity visibility (e.g. wiki page visibility field) is enforced inside controllers.
    - Keep sensitive or clearly member-only endpoints (e.g. join-request management, session notes with DM content, internal dashboards) guarded with `requireCampaignMembership`, `requireOperationalManager`, or `requireCampaignDm` regardless of campaign visibility.
  - Document this rule at the top of `campaignContextMiddleware` and in a short `SECURITY.md` section (or a comment block in `campaignScoped.ts`) to guide future contributors and prevent accidental exposure.

### Phase 2: Prisma schema integrity

- **2.1 Introduce `visibility` on `Campaign` and standardize model fields**
  - In `backend/prisma/schema.prisma`, update the `Campaign` model to include a new field:
    - `visibility String @default("PRIVATE")` or, if acceptable within current constraints, a small string-backed enum (e.g. `CampaignVisibility` with values `PUBLIC` / `PRIVATE`) while preserving DB-agnostic behavior.
  - Keep `isPublicViewable` and `isPublic` temporarily for backward compatibility, but plan to derive them from `visibility` in code (e.g. `visibility === 'PUBLIC'` implies public viewable).
  - Update `canAccessCampaign` call sites and newly introduced `campaignContextMiddleware` to use `visibility` as the source of truth while still accepting legacy flags where necessary.

- **2.2 Audit all domain models for `campaignId` and proper relations**
  - Review `schema.prisma` for all domain models: `WikiPage`, `NoteBookArc`, `CampaignSessionTimeline`, `Asset`, `MapPin`, `PageShortcut`, `PlayerSandboxNote`, `DashboardWidget`, `Tag`, `TagAssignment`, `CampaignActivity`, `CampaignPluginSetting`, `CampaignTemplate`, and any other wiki/session/lfg objects.
  - Ensure each campaign-scoped model has an explicit `campaignId String` field, except where the model is deliberately global:
    - Confirm that `Notification`, `SystemSetting`, `SystemPlugin`, `InstalledPlugin`, `UserToken`, etc. stay global as appropriate.
  - For models referencing `Campaign` indirectly via other relations (e.g. `MapPin` → `Asset` → `Campaign`), verify that either:
    - They also carry their own `campaignId` for fast scoping, or
    - They are guaranteed to only be reachable via a campaign-scoped parent that already enforces `campaignId`.

- **2.3 Enforce `onDelete: Cascade` where appropriate**
  - For each model that relates directly to `Campaign`, verify and, where missing, set `onDelete: Cascade` on its `Campaign` relation:
    - Example (already in some models):
      - `campaign Campaign @relation(fields: [campaignId], references: [id], onDelete: Cascade)`.
  - Check existing definitions in `schema.prisma` and align any outliers (e.g. optional `campaignId` fields on templates) with this pattern, using `SetNull` only where intentional.

- **2.4 Remove or scope floating global models**
  - Identify any models that appear to be campaign-specific but lack `campaignId` or any campaign relation.
  - Either:
    - Add `campaignId` and a `Campaign` relation with cascading deletes, or
    - Explicitly mark them as platform-global (e.g. via a comment) and ensure they are not exposed via campaign-scoped routes.

### Phase 3: Tenant-aware query wrapper (row-level safety)

- **3.1 Implement `getCampaignPrisma(campaignId)`**
  - Create a new module `backend/src/lib/campaignPrisma.ts` that exports `getCampaignPrisma(campaignId: string)`.
  - Use Prisma Client extensions to wrap `prisma` and enforce per-campaign scoping:
    - For each relevant model (all campaign-scoped models identified in Phase 2), configure extensions so that calls to:
      - `.findMany`, `.findFirst`, `.findUnique` (where a unique includes `campaignId`), `.update`, `.delete`, and `.upsert` automatically inject `campaignId` into the `where` clause when not explicitly provided.
    - Implement defensive behavior:
      - If a call includes a conflicting `campaignId` in `where` (different from the wrapper’s `campaignId`), throw an error to catch leaks early.
      - For queries where `campaignId` is not part of the model, either:
        - Leave them untouched (for global models), or
        - Optionally run a runtime assertion that this model is known to be global.
  - Expose a typed interface, e.g. `type CampaignPrismaClient = PrismaClient` (or a narrowed subset) to keep downstream usage ergonomic.

- **3.2 Integrate wrapper into controller logic**
  - Identify all controllers under `backend/src/controllers` that operate on campaign-scoped data (wiki, calendar, dashboard, uploads, recruitment, campaign settings, etc.).
  - For each controller, refactor as follows:
    - Accept a `CampaignScopedRequest` (or adapt to the new `campaignContextMiddleware` type) that includes `req.currentCampaign.id`.
    - Instantiate a campaign-scoped client via `const campaignPrisma = getCampaignPrisma(req.currentCampaign.id);`.
    - Replace direct `prisma` usages on campaign-scoped models with `campaignPrisma` so that:
      - The `where` clause no longer needs to manually specify `campaignId` (but may still do so for composite keys, validated by the wrapper).
      - Updates and deletes are automatically limited to rows belonging to the current campaign.
  - Keep direct global `prisma` usage only for:
    - Authentication (`User`, `UserToken`),
    - System-wide configuration (`SystemSetting`, `SystemPlugin`, `InstalledPlugin`), and
    - Cross-campaign analytics or logs that are explicitly not tenant-scoped.

- **3.3 Guard against ID-guessing (IDOR) patterns**
  - While refactoring, search for any query patterns that accept raw ids (e.g. wiki page ids, asset ids) from URL params or bodies and query via `prisma.<model>.findUnique({ where: { id: paramId } })` without a `campaignId` filter.
  - For each such pattern:
    - Ensure the controller uses `campaignPrisma` so that even if an attacker guesses an id belonging to another campaign, the wrapper’s `campaignId` filter prevents the row from being found.
    - Where cross-campaign lookups are genuinely required (e.g. admin tools), ensure they are only reachable under strongly authenticated, admin-only routes, and that responses never leak unrelated campaign identifiers.

### Phase 4: Asset isolation

- **4.1 Update upload storage layout**
  - Review `backend/src/lib/multer.ts` and any other upload utilities to understand how files are currently stored under `env.uploadsDir`.
  - Change the disk storage destination so that uploaded files are stored under a per-campaign directory, e.g. `${env.uploadsDir}/campaigns/${campaignId}/...` using `req.currentCampaign.id` as the key.
  - Adjust the `Asset.url` or related fields so that they record a campaign-aware path (e.g. `/uploads/campaigns/<campaignId>/<filename>` or a similar scheme), while also ensuring the URL is safe to expose without leaking guessable structure beyond campaign ids.

- **4.2 Enforce campaign isolation in asset retrieval**
  - Refactor `getAssetById` in `backend/src/controllers/assetsController.ts` to:
    - Use the new `getCampaignPrisma` wrapper with the campaign id implied by the request context when the resolution path is campaign-scoped.
    - When accessed via the global `/api/assets/:assetId` route, first resolve the `Asset` row and its `campaignId`, then run a membership/visibility check that mirrors `campaignContextMiddleware` logic, using `visibility` on the related `Campaign`.
    - Build the on-disk path using both `campaignId` and the stored filename, e.g. `${env.uploadsDir}/campaigns/${campaignId}/${filename}`.
  - Ensure that even if an attacker guesses an `assetId` from another campaign, they cannot:
    - Retrieve the database row without passing the visibility/membership check, nor
    - Derive the underlying filesystem path without going through this controlled resolver.

- **4.3 Route integration with campaign context**
  - Consider adding a campaign-scoped asset route under `/api/c/:campaignSlug/assets/:assetId` that is explicitly behind `campaignContextMiddleware`:
    - This path can serve as the canonical way to reference assets from within campaigns (e.g. wiki images), inheriting all campaign access rules automatically.
    - For backwards compatibility, keep `/api/assets/:assetId` but have it internally delegate to the same controller logic while applying the same access checks.

- **4.4 Document and test asset isolation**
  - Add comments in `assetsController.ts` explaining the security model: assets are logically and physically scoped by `campaignId`, and access checks must always be performed through the resolver.
  - Add tests (or at least manual test cases) verifying:
    - Public campaigns allow anonymous image fetch for assets that belong to them.
    - Private campaigns reject asset fetch attempts by non-members, even if `assetId` is guessed.
    - Cross-campaign id guessing does not bypass row-level restrictions enforced by `getCampaignPrisma`.

### Cross-cutting: Testing & documentation

- **5.1 Add basic integration tests**
  - Where feasible, add or extend tests around:
    - `campaignContextMiddleware` behaviors for PUBLIC vs PRIVATE campaigns, member vs non-member, and HTTP method enforcement.
    - `getCampaignPrisma` scoping logic (ensuring `campaignId` is always injected and conflicting ids are rejected).
    - Representative controllers (wiki, calendar, uploads) to confirm they do not leak data across campaigns.

- **5.2 Developer documentation**
  - Update `README.md` or create a short `docs/multi-tenancy.md` describing:
    - The required pattern for new campaign-scoped routes (mount under `/api/c/:slug/*` or `/api/campaigns/:id/*`, always use `campaignContextMiddleware`).
    - The rule to **never** accept a `campaignId` from the body/query when a campaign context is available on the request.
    - How to use `getCampaignPrisma(campaignId)` and when it is appropriate to reach for the global `prisma` client instead.

- **5.3 Migration considerations**
  - If introducing a `visibility` field or changing asset paths requires data migration, outline a simple migration strategy:
    - Backfill `visibility = 'PUBLIC'` where `isPublicViewable = true`, otherwise `'PRIVATE'`.
    - Optionally write a script or Prisma migration notes to move existing asset files into per-campaign directories, updating `Asset.url` values accordingly.

This plan keeps all campaign-scoped operations behind a consistent middleware, enforces row-level safety via a campaign-aware Prisma wrapper, and isolates file storage per campaign. It is designed to minimize ID-guessing risks by ensuring that every path from HTTP route to DB query is constrained by `campaignId`.