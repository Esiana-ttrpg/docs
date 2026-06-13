---
name: Wiki Header Layout Fix
overview: Refactor the wiki page header into two aligned rows (breadcrumbs + visibility, then title + actions) and show WikiPageSettings as a compact animated slide-under card only when the Wrench (layout-edit) toggle is active.
todos:
  - id: extract-breadcrumbs
    content: Add WikiPageBreadcrumbs.tsx and wire crumbs + campaignSlug props
    status: completed
  - id: refactor-header-rows
    content: Restructure WikiPage.tsx header into metadata row + title/actions row
    status: completed
  - id: animated-settings-panel
    content: Gate WikiPageSettings behind isEditingLayout with slide-under card animation
    status: completed
  - id: slim-wiki-page-settings
    content: Remove outer box/heading from WikiPageSettings; parent owns card chrome
    status: completed
isProject: false
---

# Wiki Header & Page Settings Layout Fix

## Current state

[`WikiPage.tsx`](frontend/src/pages/WikiPage.tsx) packs breadcrumbs, H1, visibility, and action icons into one `flex items-end justify-between` block (lines 314–482). [`WikiPageSettings`](frontend/src/components/wiki/WikiPageSettings.tsx) is always rendered below the header in a full-width `bg-surface/40` box (lines 496–517).

The Wrench already toggles `isEditingLayout` (layout edit + grid/add-widget tools). Per your choice, **the same toggle** will also control visibility of the Page Settings panel.

```mermaid
flowchart TB
  subgraph header [WikiPage header]
    R1[Row1: Breadcrumbs | Visibility]
    R2[Row2: H1 + subtitle | Pin Search Wrench ...]
    Panel[Slide-under Page Settings when isEditingLayout]
  end
  R1 --> R2 --> Panel
  Panel --> Renderer[WikiPageRenderer]
```

---

## 1. Extract breadcrumbs component

Add [`frontend/src/components/wiki/WikiPageBreadcrumbs.tsx`](frontend/src/components/wiki/WikiPageBreadcrumbs.tsx):

- Props: `crumbs: WikiBreadcrumb[]`, `campaignSlug: string`
- Render existing breadcrumb markup (nav + `ChevronRight` + `Link` via `campaignWikiPath`)
- Return `null` when `crumbs.length <= 1` (same rule as today)

Keeps [`WikiPage.tsx`](frontend/src/pages/WikiPage.tsx) readable and matches the requested `<Breadcrumbs />` pattern.

---

## 2. Refactor header into two rows ([`WikiPage.tsx`](frontend/src/pages/WikiPage.tsx))

Replace the single nested flex block with:

**Row 1 — metadata** (`flex items-center justify-between gap-4 mb-3`):

| Left | Right |
|------|--------|
| `<WikiPageBreadcrumbs />` | Page visibility control (DM only): compact label + `Lock` + `<select>` |

**Row 2 — title + actions** (`flex items-baseline justify-between gap-4`):

| Left | Right |
|------|--------|
| `min-w-0`: `<h1>{displayTitle}</h1>` + profession subtitle | `flex items-center gap-2 shrink-0`: Pin, Search, Wrench; when `isEditingLayout`, append template badge, Add widget, LayoutGrid (unchanged behavior) |

- Remove the right-column `flex-col` stack that put visibility above icons.
- Keep the search input as a third optional row below Row 2 when `isSearchOpen` (right-aligned `max-w-sm`), unchanged in behavior.

---

## 3. Conditional slide-under Page Settings

**Move** `WikiPageSettings` rendering from “always below header” to **inside the header section**, directly under Row 2 (and under the search row if open).

Wrap with animated container (pattern already used in [`SessionNotesView.tsx`](frontend/src/pages/SessionNotesView.tsx)):

```tsx
{isDMUser && (
  <div
    className={cn(
      'grid transition-[grid-template-rows] duration-200 ease-out',
      isEditingLayout ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
    )}
  >
    <div className="overflow-hidden">
      {pageData && isEditingLayout && (
        <div className="mt-4 max-w-xl rounded-lg border border-border bg-surface p-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <WikiPageSettings ... />
        </div>
      )}
    </div>
  </div>
)}
```

- Use `bg-surface` (not `bg-background-panel` — token does not exist in this project).
- `max-w-xl` aligns with the user’s compact card intent (slightly wider than current `max-w-sm` picker).

---

## 4. Slim down [`WikiPageSettings.tsx`](frontend/src/components/wiki/WikiPageSettings.tsx)

- Remove the outer `<section className="mb-4 rounded-lg border ... bg-surface/40">` wrapper and the duplicate “Page settings” `<h2>` (parent card supplies the heading).
- Export **content only**: parent picker field + error text.
- Optional props: `showHeading?: boolean` default `false`, or accept `className` — prefer parent-owned chrome only.

Inner structure stays: `max-w-sm` on the “Belongs Within” field group.

---

## 5. Files to change

| File | Change |
|------|--------|
| [`frontend/src/components/wiki/WikiPageBreadcrumbs.tsx`](frontend/src/components/wiki/WikiPageBreadcrumbs.tsx) | New — breadcrumb nav |
| [`frontend/src/pages/WikiPage.tsx`](frontend/src/pages/WikiPage.tsx) | Two-row header, animated settings panel gated by `isEditingLayout` |
| [`frontend/src/components/wiki/WikiPageSettings.tsx`](frontend/src/components/wiki/WikiPageSettings.tsx) | Strip heavy wrapper; content-only |

No backend changes.

---

## 6. Manual verification

- Lore wiki page (DM): Row 1 shows breadcrumbs (when depth > 1) and visibility on one line.
- Row 2: title left, Pin / Search / Wrench right, baseline-aligned.
- Wrench off: no Page Settings card; layout view mode.
- Wrench on: card slides open under header with parent picker; layout tools still appear in header; renderer enters edit mode.
- Non-DM: no visibility row control, no Wrench, no settings panel.
