# Campaign Hub

The global hub (`/`) is your **campaign continuity home** — a shelf of worlds for resuming play, not a social discovery feed.

---

## What it does

- **Resume Your Story** — cinematic hero panels for pinned and high-priority campaigns
- **Needs Attention** — actionable items from campaign state (recaps, RSVP, threads, downtime)
- **Your Campaigns** — unified library of every table you belong to (stable sort: pinned, then name)
- **Campaign pinning** — star campaigns to anchor the hearth and filter favorites
- **Explore** — LFG and recruitment live at `/recruitment` (header link), not on the home page
- **Public directory** — browse publicly listed worlds (guests)
- **Create campaign wizard** — multi-step setup: title, metadata, game system, optional import
- **Slug URLs** — share campaigns at `/c/:campaignSlug`
- **Invite links** — join via token without public listing
- **Game system tagging** — D&D, Pathfinder, Daggerheart, Other (metadata only, no rules engine)

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **Any registered user** | Create campaigns, join via invite, apply to LFG listings |
| **Guest** | View public directory and public campaign pages (where enabled) |
| **System admin** | Manage all campaigns from Admin → Campaigns |

---

## Where to find it

| Area | Route |
|------|-------|
| Global hub | `/` or `/hub` |
| Public directory | Hub → Public campaigns |
| Create campaign | Hub → Create campaign |
| Campaign home | `/c/:campaignSlug` |
| Campaign settings | `/c/:campaignSlug/settings` |

---

## Creation wizard

Steps typically include:

1. **Title & slug** — campaign name and URL slug
2. **Metadata** — description, game system, language, visibility
3. **Import (optional)** — Obsidian Markdown ZIP or Esiana backup ZIP

See [Import formats](../data-management/import-formats.md) for folder structure before uploading.

---

## Key options

| Option | Where |
|--------|-------|
| Allow registrations | [System admin settings](../options/system-admin-settings.md) |
| Public vs private campaign | [Campaign settings](../options/campaign-settings.md) → General |
| Invite link | Campaign Settings → Access Control |
| LFG listing | [Recruitment & LFG](recruitment-lfg.md) |

---

## Ambient theming

The hub uses **one dominant accent** for page chrome (not every campaign at once):

1. First **pinned** campaign (pin order)
2. Else first **resume hero** campaign
3. Else **shelf fallback** (warm parchment gold)

Individual campaign cards still use each campaign’s own `appearanceProfile` accent.

### Section tones

| Section | Tone |
|---------|------|
| Resume Your Story | Dominant campaign accent |
| Your Campaigns | Shelf gold |
| Needs Attention | Ember / paper |
| Recently Edited | Muted ash-violet |

### Button tiers

| Tier | Use |
|------|-----|
| **Narrative** | Primary story actions (Enter Campaign, Create Campaign) — luminous gradient + glow |
| **Utility** | Secondary prep actions, chips, filters — muted translucent |
| **World** | Outward discovery links — airy horizon outline |

### Footer

The **Shelf Horizon** epilogue dissolves into the page (gradient divider, no hard border) with **Campaign directory** (`/campaigns`) and **Horizon** (`/recruitment`) clusters. The global admin footer remains below the app shell.

---

## Related docs

- [Recruitment & LFG](recruitment-lfg.md)
- [Data backup & export](data-backup-and-export.md)
- [Import formats](../data-management/import-formats.md)
- [Campaign settings](../options/campaign-settings.md)
