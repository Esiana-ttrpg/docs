# Campaign Home & Sidebar

Customize each campaign’s **Campaign Home** overview and navigation sidebar for your table’s workflow. The codex (wiki) is the default campaign entry; Campaign Home is a secondary continuity overview.

---

## What it does

### Campaign Home

Draggable grid widgets on the campaign home page (`/c/:campaignSlug/dashboard`):

| Widget ID | Label | Purpose |
|-----------|-------|---------|
| `sessionSchedule` | Session Schedule | OOC schedule, RSVP, next session |
| `worldChronometer` | World Chronometer | In-world date summary |
| `campaignBulletin` | Campaign Bulletin | Pinned house rules and notices |
| `questLedger` | Quest Ledger | Active quest wiki pages |
| `recentLore` | Recent Lore | Recent wiki changes |
| `fantasyCalendar` | Fantasy Calendar | Calendar snapshot |

**Default:** up to six widgets enabled. **Maximum:** ten active widgets.

**Hero section:** optional cover image and summary text (`dashboardConfig.hero`).

### Custom sidebar

Reorder **World Lore** and **Game Management** nav sections. Custom section headers via `sidebarConfig`.

### Recent changes

Dedicated activity feed at `/c/:campaignSlug/recent-changes`.

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **Game Master / Writer** | Edit Campaign Home layout and sidebar order |
| **All members** | View Campaign Home; interact with Session Schedule RSVP |

---

## Routes

| Surface | Path |
|---------|------|
| Default campaign entry (codex) | `/c/:campaignSlug/wiki` |
| Campaign Home | `/c/:campaignSlug/dashboard` |
| Layout customize | Campaign Home → customize (Game Master) |
| Recent changes | `/c/:campaignSlug/recent-changes` |

---

## Configuration

| Setting | Where |
|---------|-------|
| `dashboardConfig` JSON | Stored on campaign; edited in Campaign Home UI |
| `sidebarConfig` JSON | Campaign Settings → Sidebar |
| Theme on Campaign Home | [Campaign settings](../options/campaign-settings.md) → Themes |

See also: [Campaign settings](../options/campaign-settings.md).
