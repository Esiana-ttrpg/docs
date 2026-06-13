---
name: Homepage Recruitment Consolidation
overview: Deprecate the standalone Recruitment Lobby panel on the homepage and consolidate its metadata/CTA behavior into the existing Featured Recruitment experience, including robust empty states and stronger visual prominence.
todos:
  - id: remove-standalone-lobby
    content: Delete standalone Recruitment Lobby block and related dead state/render paths from GlobalHubPage.
    status: completed
  - id: enhance-featured-cards
    content: Add system badge, seat tracker, schedule line, and Enter Lobby Landing Page CTA to featured recruitment cards.
    status: completed
  - id: empty-state-prominence
    content: Implement clean no-campaign fallback and tune layout spacing for a more prominent featured section.
    status: completed
  - id: type-consistency-check
    content: Confirm seat/full-state logic aligns with existing recruitment types and endpoint fields.
    status: completed
isProject: false
---

# Homepage Recruitment Consolidation Plan

## Goal
Remove the redundant homepage Recruitment Lobby section and make the existing Featured Recruitment area the single entry point for recruitment discovery on `/`.

## Scope Decisions
- Interactive world map is deferred for now.
- Implement consolidation using the current Featured Recruitment surface (cards/grid) with richer metadata and stronger layout prominence.
- Keep routing unchanged (`/recruitment` and `/recruitment/:campaignSlug`).

## Phase 1 — Remove Redundant Homepage Lobby Block
- Delete the standalone "Recruitment Lobby" render section in [C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\pages\GlobalHubPage.tsx](C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\pages\GlobalHubPage.tsx) including:
  - heading/count/refresh controls
  - separate loading/empty/card-grid block using `CampaignLFGCard`
- Remove now-unused state/load paths tied only to that block (e.g., duplicate `directory` list render paths) while preserving any data needed by Featured Recruitment.

## Phase 2 — Enrich Featured Recruitment Metadata Surface
- Upgrade the existing Featured Recruitment cards in [C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\pages\GlobalHubPage.tsx](C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\pages\GlobalHubPage.tsx) to include former lobby-critical details:
  - **Game System badge** (`campaign.gameSystem` fallback)
  - **Seat tracker** based on `filledSeats` + `maxPlayers` (or fallback to `maxSeats` if needed)
  - **Schedule string** composed from `scheduleFrequency`, `scheduleDay`, `scheduleTime`
  - **Direct CTA** labeled exactly `Enter Lobby Landing Page →` linking to `/recruitment/:slug`
- Keep `View All` CTA to `/recruitment` as secondary action.

## Phase 3 — Empty-State and Visual Prominence
- Ensure Featured Recruitment has a clean no-data state when no active LFG campaigns are returned:
  - subtle thematic container
  - concise nudge for DMs to enable LFG in campaign settings
- Increase section prominence via spacing/layout adjustments in [C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\pages\GlobalHubPage.tsx](C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\pages\GlobalHubPage.tsx):
  - larger section footprint
  - tighter surrounding padding where needed to foreground recruitment discovery

## Phase 4 — Type and Data Consistency Hardening
- Normalize seat/full-state display logic across homepage surfaces using existing recruitment types in [C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\types\recruitment.ts](C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\types\recruitment.ts).
- Reuse featured endpoint client in [C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\lib\campaigns.ts](C:\Users\allison\Documents\GIT\Esiana-ttrpg\esiana-core\frontend\src\lib\campaigns.ts); avoid reintroducing split homepage recruitment sources.

## Validation
- Verify homepage shows only one recruitment discovery section.
- Verify each featured campaign shows: system badge, seats, schedule, and `Enter Lobby Landing Page →`.
- Verify empty-state copy appears when no featured campaigns are active.
- Run frontend lint/type diagnostics for touched files.