# Campaign Settings

Per-campaign configuration lives on the `Campaign` model and is edited through **Campaign Settings** tabs. URL: `/campaigns/:handle/settings`.

**Access:** Game Masters and Writers only. Players and Observers link their character from **Campaign Home** (not Settings).

---

## Player character identity

| Who | Where |
|-----|--------|
| **Player** (`PARTICIPANT`) | Campaign Home → **Link your character** card (when unmapped) |
| **Game Master / Writer** | Settings → Access & Roles → member roster identity column, or character page **Party character** rail while editing |

Linking sets `CampaignMember.identityPageId` and assigns USER ownership on character wiki pages.

---

## Settings tabs

| Tab | Purpose |
|-----|---------|
| **General** | Name, visibility, description, game system, language |
| **Access & Roles** | Invite link, members, roles, identity pages, ownership transfer |
| **Appearance** | Campaign theme preset and appearance profile, plus sidebar section layout |
| **Recruitment** | Listing, schedule, table preferences, safety/tools, and applications |
| **Integrations** | Campaign plugin management (install, configure, registry) |
| **Advanced** | Views/followers metrics and data backup/restore actions |

---

## General

| Field | Default / notes | Set by |
|-------|-----------------|--------|
| `name` | Campaign title | Campaign UI |
| `slug` | URL segment (`/c/:slug`) | Campaign UI (on create) |
| `description` | Optional blurb | Campaign UI |
| `isPublic` | Listed in hub directory | Campaign UI |
| `isPublicViewable` | Anonymous read of public content | Campaign UI |
| `language` | `English` | Campaign UI |
| `gameSystem` | Stable slug (e.g. `dnd-5e`, `pathfinder-2e`, `other`) | Campaign UI |
| `customGameSystemName` | Custom ruleset label when `gameSystem` is `other` | Campaign UI |

See the [Game Systems Reference](../reference/gamesystems.md) for the full picker catalog and stable slug identifiers.

**In practice:** `isPublic` controls whether the campaign appears in the [Campaign hub](../features/campaign-hub.md) directory. `isPublicViewable` allows anonymous visitors to read pages marked **Public** visibility — distinct from party [discovery](discovery-and-revelation.md), which hides content until revealed.

---

## Access control

| Field | Purpose | Set by |
|-------|---------|--------|
| `inviteToken` | Secret invite link | Campaign UI |
| Member roles | **Game Master**, **Writer**, Player, Observer (`GAMEMASTER`, `WRITER`, …) | Campaign UI |
| `identityPageId` | Wiki page linked for display name in sessions | Campaign Home (players) or Settings → Access roster (staff) |
| Ownership transfer | Two-step Game Master → Writer handshake | Campaign UI + `/transfer-ownership` |
| `allowPlayerChronologyManagement` | `false` | Access & Roles → Collaboration permissions — **Manage chronology events** for Players |

Invite link base URL uses `VITE_APP_BASE_URL` or browser origin ([Environment variables](environment-variables.md)).

### Role capabilities (summary)

| Role | Typical edit scope |
|------|-------------------|
| **Game Master** | Full campaign settings, members, backup, plugins, all narrative tools |
| **Writer** | Wiki, maps, chronology, sessions — no ownership transfer or destructive backup |
| **Player** | Party-visible wiki (policy-dependent), own session notes, character link |
| **Observer** | Read-only within visibility rules |

**In practice:** Page **visibility** (Public / Party / GM only) controls who can read a page once they know it exists. **Discovery** ([Discovery & revelation](../features/discovery-and-revelation.md)) can hide pages from browse, search, and links until the Game Master reveals them — orthogonal to visibility.

When `allowPlayerChronologyManagement` is enabled, players can create and edit **party-visible** chronology events; Game Masters retain DM-only events and calendar structure.

---

## Recruitment

| Field | Purpose |
|-------|---------|
| `isLookingForGroup` | Show in LFG directory |
| `scheduleFrequency`, `scheduleDay`, `scheduleTime` | OOC schedule display |
| `currentSession`, `sessionDuration`, `estimatedLength` | Session metadata |
| `maxSeats`, `maxPlayers` | Player caps |
| `genreThemes`, `externalTools` | JSON arrays — genre themes use the [catalog](../reference/campaign-themes.md) plus optional custom tags |
| `safetyTools`, `contentWarnings`, `equipmentNeeded` | Text fields |
| `includeTableExpectations`, `includeRules`, `includeFAQ`, `includeSessionZero`, `includeHomebrew`, `includeSafetyGuidelines`, `includeCharacterCreation` | Public recruitment resource sections |

See [Recruitment & LFG](../features/recruitment-lfg.md).

Recruitment UI:
- **Marketplace Listing** (top) — LFG toggle, DM profile link, and compact configured / needs-setup status (no percentage meter)
- **Listing** — campaign identity (format + collapsible genre themes) and public recruitment resources
- **Schedule** — includes frequency/day/time and campaign timing metadata
- **Table Preferences** — includes experience level, age/language preferences, and seat limits
- **Safety & Tools** — includes safety tools, content warnings, and external tool stack
- **Applications** — includes incoming applicant moderation workflow

Public recruitment resources can map from common wiki-title aliases:
- `tableExpectations`: `table expectations`, `how we play`, `table culture`, `social contract`, `table-expectations`
- `rules`: `rules`, `expectations`, `houserules`, `house-rules`, `table-rules`, `tablerules`
- `sessionZero`: `session zero`, `sessionzero`, `session0`, `session-0`
- `homebrew`: `homebrew`, `hb`
- `faq`: `faq`, `questions`
- `safetyGuidelines`: `safety guidelines`, `safety`, `content safety`
- `characterCreation`: `character creation guide`, `character creation`, `chargen`, `character-creation`, `playerguide`, `player-guide`

---

## Sidebar (`sidebarConfig` JSON)

Structure:

```json
{
  "headers": { "worldLore": "...", "gameManagement": "..." },
  "worldLoreOrder": ["..."],
  "gameManagementOrder": ["..."]
}
```

Reorder World Lore and Game Management nav items; customize section header labels.

---

## Campaign Home (`dashboardConfig` JSON)

Structure:

```json
{
  "hero": { "coverImageUrl": null, "summary": null },
  "widgets": [
    { "id": "sessionClock", "x": 0, "y": 0, "w": 4, "h": 4, "enabled": true }
  ]
}
```

Widget IDs: `sessionClock`, `worldClock`, `announcements`, `questLedger`, `activityLoop`, `fantasyCalendar`.

Edited via Campaign Home customize mode — see [Campaign Home & sidebar](../features/campaign-home-and-sidebar.md).

---

## Themes

| Field | Purpose |
|-------|---------|
| `themePreset` | `light`, `dark`, `auto`, `fantasy`, `cyberpunk`, `parchment` |
| `appearanceProfile` | JSON — foundation, genre, identity palette, tinting |

Campaign theme can override user/system appearance when configured.

---

## Templates (`templateSettings` JSON)

| Field | Purpose |
|-------|---------|
| `hideSystemDefaultsInStudio` | Hide global templates in Template Studio |
| `excludeSystemDefaultsFromPageCreate` | Skip system defaults in new page picker |

---

## Data & backup

| Action | Notes |
|--------|-------|
| Sync export | Immediate ZIP download |
| Background export | Queues job; notification when ready |
| Restore | Upload prior backup ZIP |

See [Data backup & export](../features/data-backup-and-export.md).

---

## Campaign plugins (Integrations tab)

Install plugins scoped to this campaign via the registry sync flow ([Plugins overview](../features/plugins-overview.md)).

---

## Related docs

- [Discovery & revelation](../features/discovery-and-revelation.md)
- [Features catalog](../features/README.md)
- [User account settings](user-account-settings.md) — identity display in sessions
- [System admin settings](system-admin-settings.md) — instance-wide limits
