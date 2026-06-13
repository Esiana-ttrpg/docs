# Recruitment & LFG

Public looking-for-group listings, rich recruitment pages, and a join-request workflow for finding players.

**Product identity:** Help players **understand this table**, not **evaluate this GM**.

---

## Recruitment information stack

Layers build a human onboarding flow—from fast scan to commitment:

| Layer | Purpose | Status |
|-------|---------|--------|
| **Tags** | Fast scan (vibe, genre, format) | Shipped — `tableStyleTags`, meta chips |
| **Premise** | Campaign fantasy | Shipped — `recruitmentTagline`, `recruitmentPremise` |
| **Rules / Safety** | Operational and comfort clarity | Shipped — wiki docs + `include*` toggles |
| **Table Expectations** | Social contract (“how we play weekly”) | Shipped — wiki doc + `includeTableExpectations` |
| **Before-apply note** | Vibe disclosure (tone, pacing, energy) | Shipped — `recruitmentBeforeApplyNote` near Apply CTA |
| **Apply** | Commitment (join request) | Shipped |

Full guardrails, priorities, and acceptance criteria: [recruitment_lobby_ux_deferred.plan.md](../plans/recruitment_lobby_ux_deferred.plan.md). Backlog status: [deferred-backlog.md](../../esiana-core/docs/deferred-backlog.md) (Recruitment & hub UX).

---

## Product principles

### What we optimize for

- Informed self-selection and social compatibility
- Table clarity, trust, and descriptive continuity signals
- Collaborative culture and healthy tables

### Descriptive, not evaluative

Public copy should **inform**, not **rank**:

| Prefer | Avoid |
|--------|-------|
| “Ongoing since May 2026”, “Session 38” | “High retention”, “Reliable DM” |
| “2 spots open” | “12 players applied” |
| “Weekly ongoing campaign” | “95% attendance”, streaks, badges |

The lobby shows **open seats** and schedule context—not application counts or performance metrics.

### What we intentionally avoid

- Top-DM leaderboards, star ratings, match scores, or % fit
- Public application counts and prestige-style social proof
- Attendance percentages, retention badges, and competitive listing meta
- MMO-style role optimization on listings (“healer needed”, power meta)
- Public evaluative schedule-overlap labels (DM-only overlap on join review is fine for logistics)

### Private vs public

| OK for organizers (DM-only) | Not on public listings |
|-----------------------------|-------------------------|
| Schedule overlap hint when reviewing applications | Same labels as applicant-facing scores |
| Applicant timezone and intro | Applicant “quality” scoring |

---

## What it does

- **LFG directory** — hub listings for campaigns seeking players
- **Public recruitment landing** — tagline, premise, table style, onboarding docs, safety glossary, and schedule sidebar
- **Join requests** — players apply with a conversational intro; DMs review applicant context and may decline with a reason
- **Recruitment settings** — max players/seats, genre themes, external tools, content warnings, optional public resource toggles (table expectations, FAQ, rules and expectations, session zero, homebrew content, safety guidelines, character creation guide)

---

## Who can use it

| Role | Capabilities |
|------|--------------|
| **DM / Co-DM** | Enable LFG, edit recruitment page, manage applications |
| **Registered user** | Apply to listings |
| **Guest** | Browse public LFG pages |

---

## Where to find it

| Area | Route / nav |
|------|-------------|
| Recruitment directory | `/recruitment` |
| Campaign LFG page | `/recruitment/:campaignSlug` |
| Platform guides (Esiana-wide, not campaign wiki) | `/guides/getting-started`, `/guides/table-guide`, `/guides/joining-process`, `/guides/safety-and-comfort` |
| Recruitment settings | Campaign Settings → Recruitment |
| Join requests | Campaign Settings → Recruitment → Applications |

Platform guide copy ships as bundled markdown in `esiana-core/frontend/src/content/guides/*.md`. The Recruitment Directory links to Table Guide, Safety & Comfort, and Joining Process in its header; Getting Started is available from guide cross-links.

---

## Key options

| Field | Where |
|-------|-------|
| `isLookingForGroup` | Campaign Settings → Recruitment |
| `maxPlayers`, `maxSeats` | Recruitment settings |
| `scheduleFrequency`, `scheduleDay`, `scheduleTime` | Recruitment + dashboard schedule |
| `recruitmentTagline`, `recruitmentPremise` | Listing pitch on public page |
| `recruitmentBeforeApplyNote` | Plain-text vibe disclosure near Apply CTA (max 500 chars) |
| `tableStyleTags` | Campaign-level play-feel chips (shared catalog with GM style tags) |
| `campaignFormat`, `experienceRequired`, `ageRestriction`, `levelRange`, `scheduleTimezone` | Table prefs + schedule |
| `genreThemes`, `externalTools`, `safetyTools`, `contentWarnings` | Recruitment settings |
| `includeTableExpectations`, `includeRules`, `includeFAQ`, `includeSessionZero`, `includeHomebrew`, `includeSafetyGuidelines`, `includeCharacterCreation` | Public recruitment resource toggles |
| Genre theme catalog | [Campaign genre themes](../campaign-themes.md) |
| Apply rate limits | [Limits & quotas](../options/limits-and-quotas.md) |

## Recruitment settings workflow

Recruitment is organized into focused subtabs so DMs can configure one workflow at a time:

- **Listing** — tagline, premise, before-apply note, table style tags, campaign format, genre themes, and exposed recruitment resources
- **Schedule** — frequency, day, time, IANA timezone, session duration, campaign length, and current session number
- **Table Preferences** — experience level, age restriction, recruitment language, and seat limits
- **Safety & Tools** — safety tools, content warnings, and external tools/VTT stack
- **Applications** — pending applicant review and accept/decline actions

The Recruitment panel opens with a compact **Marketplace Listing** status block (LFG toggle, DM profile link, and neutral configured / needs-setup hints for schedule, table preferences, safety & tools, and campaign identity).

### Platform guides vs campaign wiki docs

| | Platform guides (`/guides/*`) | Campaign wiki (lobby **Before you apply**) |
|---|-------------------------------|---------------------------------------------|
| Scope | How Esiana recruitment works for any visitor | How *this* table runs |
| Edited by | Developers in repo markdown | DM in campaign wiki |
| Examples | Table Guide, Joining Process, Safety & Comfort | Table Expectations, Rules, Safety Guidelines |

### Public recruitment resources and accepted page names

When a matching wiki page exists, Recruitment Settings can expose it to applicants on the public lobby page.

| Display name | Canonical page title | Accepted aliases |
|---|---|---|
| Table Expectations | `Table Expectations` | `table expectations`, `how we play`, `table culture`, `social contract`, `table-expectations` |
| FAQ | `FAQ` | `faq`, `questions` |
| Rules & Expectations | `Rules` | `rules`, `expectations`, `houserules`, `house-rules`, `table-rules`, `tablerules` |
| Session Zero | `Session Zero` | `session zero`, `sessionzero`, `session0`, `session-0` |
| Homebrew Content | `Homebrew` | `homebrew`, `hb` |
| Safety Guidelines | `Safety Guidelines` | `safety guidelines`, `safety`, `content safety` |
| Character Creation Guide | `Character Creation Guide` | `character creation guide`, `character creation`, `chargen`, `character-creation`, `playerguide`, `player-guide` |

Prefer canonical page titles for predictability across imports and theme packs.

On the public lobby, enabled docs appear under **Before you apply** (expandable list, not a card grid). Safety tool names link to in-app glossary help text.

### Declining applications

When declining, DMs can pick a canned reason (schedule mismatch, table full, playstyle fit, etc.) and optionally add a short message. Applicants receive that context in the decline notification when provided.

---

## Notifications

Join flow triggers in-app (and optional email) notifications:

- `JOIN_REQUEST_RECEIVED` → DM / Co-DM
- `JOIN_REQUEST_ACCEPTED` / `DENIED` → applicant

See [Notifications](notifications.md).

---

## Related docs

- [Recruitment lobby UX — deferred plan](../plans/recruitment_lobby_ux_deferred.plan.md) — product guardrails and P0–P5 backlog
- [Deferred backlog (Recruitment & hub UX)](../../esiana-core/docs/deferred-backlog.md)
- [Campaign hub](campaign-hub.md)
- [Campaign genre themes](../campaign-themes.md)
- [Notifications](notifications.md)
- [Campaign settings](../options/campaign-settings.md)
- [User account settings](../options/user-account-settings.md) — default recruitment pitch
