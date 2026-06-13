---
name: Recruitment Page Dashboard
overview: Refactor the public recruitment detail page into a rich two-column dashboard with upgraded DM attribution, structured recruitment metadata cards, and a computed upcoming-session sidebar based on recurrence fields.
todos:
  - id: grid-layout-refactor
    content: Refactor RecruitmentLobbyPage into responsive dual-column dashboard layout.
    status: completed
  - id: dm-attribution-header
    content: Replace standalone DM profile section with horizontal avatar + linked name attribution block.
    status: completed
  - id: metadata-panels
    content: Add structured cards for genreThemes, safetyTools, contentWarnings, and externalTools.
    status: completed
  - id: upcoming-schedule-engine
    content: Implement frequency-aware next-3-session date computation and render Upcoming Schedule sidebar.
    status: completed
  - id: ui-polish-and-validate
    content: Apply spacing/contrast polish and run frontend lint/type diagnostics for updated files.
    status: completed
isProject: false
---

# Recruitment Page Layout Overhaul Plan

## Goal
Transform the public recruitment detail page into a fully populated dual-column dashboard that foregrounds DM identity, campaign recruitment metadata, and real upcoming schedule computation.

## Confirmed Decisions
- DM link target: existing public profile route `/users/:id`.
- Upcoming sessions: frequency-aware recurrence parser (Weekly/Biweekly/Monthly heuristics) using parsed `scheduleFrequency`, `scheduleDay`, and `scheduleTime`.
- Schedule rendering must be local-browser-timezone aware and include timezone suffix (for example, `7:00 PM EST`).

## Phase 1 — Restructure Layout to Dual-Column Grid
- Refactor the main page container in [C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\pages\RecruitmentLobbyPage.tsx](C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\pages\RecruitmentLobbyPage.tsx) to a responsive grid:
  - left primary content column (~2/3)
  - right schedule sidebar (~1/3)
- Reserve the top slot of the left column for the campaign description as a rich narrative hero block.
- Remove excess blank vertical whitespace by grouping related cards with consistent spacing (`space-y-*`) and balanced card heights.

## Phase 2 — Replace DM Profile Block with Attribution Header
- Remove the standalone "DM Profile" section text and fallback phrase "No public bio provided." from the page body.
- Place a horizontal attribution badge immediately below the narrative description block:
  - avatar in a styled circular frame (reuse existing avatar URL)
  - DM display label rendered as clickable link to `/users/:id`
- Keep profile bio optional but embedded naturally beneath attribution only when present, without generic empty filler copy.

## Phase 3 — Add Recruitment Metadata Panels
- Under DM attribution, add high-contrast card sections for recruitment metadata:
  - **Genres & Themes** → render `genreThemes` as tag chips
  - **Safety Tools** → labeled text card from `safetyTools`
  - **Content Warnings** → warning-style card with marker iconography/layout treatment
  - **Virtual Tabletop & External Tools** → tag/list rendering from `externalTools`
- Data safety rule: if `genreThemes` or `externalTools` are missing/empty arrays, hide those panels completely.
- For non-array text cards, keep concise empty handling to avoid dead space.

## Phase 4 — Build Upcoming Schedule Sidebar
- Add right column panel titled `Upcoming Schedule`.
- Implement utility logic in [C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\pages\RecruitmentLobbyPage.tsx](C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\pages\RecruitmentLobbyPage.tsx) (or extract to helper file if cleaner) to compute next 3 sessions:
  - parse weekday from `scheduleDay`
  - parse time from `scheduleTime`
  - infer cadence from `scheduleFrequency` (weekly/biweekly/monthly heuristics)
  - generate 3 future Date instances and format as readable strings in the viewer's local timezone
- Append timezone suffix to each rendered session line using local browser timezone formatting (for example, `EST`, `PDT`).
- If parsing is impossible, show concise fallback messaging in-panel while still rendering the card shell.

## Phase 5 — Styling and UX Polish
- Apply consistent card padding, border, and contrast tokens for dark theme cohesion.
- Preserve existing seat-availability/action sidebar functionality and ensure it coexists with schedule panel hierarchy.
- Keep CTA behavior intact for `Request a Seat` vs `Lobby Full` state.

## Validation
- Verify page shows a full two-column dashboard with no empty dead zones.
- Verify the narrative campaign description occupies the top-left primary position.
- Verify DM name links to `/users/:id`.
- Verify `genreThemes` and `externalTools` panels are hidden when arrays are empty/missing.
- Verify remaining metadata cards render correct payload values.
- Verify upcoming schedule produces 3 real future entries for valid recurrence inputs.
- Verify schedule display includes local timezone-aware suffix on each session line.
- Run lint/type diagnostics for touched frontend files.
