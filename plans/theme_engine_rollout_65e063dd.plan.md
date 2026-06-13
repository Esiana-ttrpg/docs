---
name: Theme Engine Rollout
overview: Implement a global and campaign-level theming system with CSS variable tokens, a frontend ThemeRegistry/plugin pattern, campaign preset selection persisted in DB, and runtime auto theme resolution via prefers-color-scheme.
todos:
  - id: theme-css-foundation
    content: Add root CSS variables and preset classes in frontend global stylesheet
    status: pending
  - id: theme-registry-utils
    content: Create ThemePresets/ThemeRegistry utilities and global apply helper with auto resolver
    status: pending
  - id: campaign-layout-theme-wrap
    content: Apply selected campaign theme class in CampaignLayout wrapper
    status: pending
  - id: campaign-settings-dropdown
    content: Add Theme Preset dropdown to CampaignSettingsPage Theme tab and save flow
    status: pending
  - id: api-db-theme-preset
    content: Add themePreset field across frontend types, backend API/controller, and Prisma schema migration
    status: pending
  - id: verify-theme-behavior
    content: Validate preset application, auto behavior, persistence round-trip, and lint/tests
    status: pending
isProject: false
---

# Global + Campaign Theming Engine Plan

## Scope
Implement a token-based theming foundation that supports:
- Global variable application via `applyGlobalTheme(themeConfig)` at `:root`
- Campaign-level preset class application in the campaign wrapper
- A `ThemeRegistry` plugin model (`{ name, variables, pluginId }`) for extensibility
- Campaign setting persistence for `themePreset` in DB/API

## Architecture Flow
```mermaid
flowchart LR
  adminGlobal[AdminGlobalThemeConfig] --> rootApply[applyGlobalTheme(themeConfig)]
  rootApply --> rootVars[RootCssVariables]
  campaignRecord[CampaignThemePreset] --> campaignLayout[CampaignLayoutWrapperClass]
  campaignLayout --> scopedVars[ScopedCssVariableOverrides]
  systemPref[PrefersColorScheme] --> autoResolver[AutoPresetResolver]
  autoResolver --> campaignLayout
  registry[ThemeRegistry] --> presetSelect[ThemePresetDropdown]
  registry --> rootApply
```

## Implementation Steps
- Add theme token definitions and preset classes in [c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/frontend/src/index.css](c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/frontend/src/index.css):
  - Define base `:root` variables (e.g. `--color-primary`, `--color-bg`, `--color-text`, etc.)
  - Add campaign theme classes for `light`, `dark`, `fantasy`, `cyberpunk`
  - Add an `auto` helper class strategy that is resolved in JS (not static CSS only)
- Add a theme utility module in frontend (new file under `frontend/src/lib/`):
  - `ThemePresets` constant with `light | dark | auto | fantasy | cyberpunk`
  - `ThemeRegistry` map/array with plugin contract `{ name, variables, pluginId }`
  - `applyGlobalTheme(themeConfig)` using `document.documentElement.style.setProperty(...)`
  - `resolveThemePreset(...)` that maps `auto` to `light/dark` using `window.matchMedia('(prefers-color-scheme: dark)')`
- Integrate campaign theme wrapping in [c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/frontend/src/layouts/CampaignLayout.tsx](c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/frontend/src/layouts/CampaignLayout.tsx):
  - Fetch/read campaign `themePreset` from existing campaign context/data source
  - Compute `selectedThemeClass`
  - Wrap rendered campaign content in a container `div` with `className={selectedThemeClass}`
- Implement Theme Preset selector UI in [c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/frontend/src/pages/CampaignSettingsPage.tsx](c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/frontend/src/pages/CampaignSettingsPage.tsx):
  - Replace placeholder `ThemeTab` content with a select dropdown sourced from `ThemeRegistry`
  - Hydrate current preset from campaign fetch response
  - Save selected preset through existing `PATCH /api/campaigns/:campaignSlug` flow
- Extend frontend campaign types and API payloads:
  - Add `themePreset` to [c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/frontend/src/types/campaign.ts](c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/frontend/src/types/campaign.ts)
  - Include `themePreset` in request/response handling in [c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/frontend/src/lib/campaigns.ts](c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/frontend/src/lib/campaigns.ts) if needed by current helper signatures
- Extend backend API and persistence:
  - Add `themePreset` to update payload type in [c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/backend/src/types/api.ts](c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/backend/src/types/api.ts)
  - Update `campaignSelect()` and `updateCampaign` mapping/validation in [c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/backend/src/controllers/campaignsController.ts](c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/backend/src/controllers/campaignsController.ts)
  - Add `themePreset` column to `Campaign` model in [c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/backend/prisma/schema.prisma](c:/Users/allison/Documents/GIT/Esiana-ttrpg/esiana-core/backend/prisma/schema.prisma)
  - Create and apply Prisma migration

## Extensibility Design (Plugin-Ready)
- Keep `ThemeRegistry` as the single source of truth in frontend with `pluginId` namespaced IDs (e.g. `core.light`, `core.cyberpunk`)
- Normalize registry access through helper functions (`listThemes()`, `getThemeByName()`, `registerTheme()`)
- Structure module so future DB-fed plugins can be merged into registry at app bootstrap without changing component usage

## Validation Plan
- Frontend:
  - Verify selecting each preset updates campaign wrapper class and resulting CSS variables
  - Verify `auto` responds to system dark/light preference
  - Verify settings save and reload round-trip for `themePreset`
- Backend:
  - Verify PATCH accepts/rejects valid/invalid preset values
  - Verify campaign fetch includes persisted `themePreset`
- Regression:
  - Run existing frontend/backend test and lint commands relevant to touched files
  - Confirm no breakage in current campaign settings tabs and routing