---
name: Recruitment lobby UX (deferred)
overview: Product guardrails and deferred recruitment lobby enhancements. Esiana optimizes for understanding a table—not evaluating a GM. No competitive metrics, marketplace gamification, or engagement-optimization framing.
todos: []
isProject: false
---

# Recruitment lobby UX — deferred backlog and product guardrails

> **Status:** Documentation / backlog only — features below are **not implemented** unless marked shipped.  
> **Tracking:** [esiana-core/docs/deferred-backlog.md](../../esiana-core/docs/deferred-backlog.md) (Recruitment & hub UX)  
> **User-facing feature doc:** [Recruitment & LFG](../features/recruitment-lfg.md)

## Product identity

**One line:** Help players **understand this table**, not **evaluate this GM**.

Recruitment is a human onboarding flow—not a GM scorecard.

---

## Platform philosophy

### Esiana optimizes for

- Informed self-selection
- Social compatibility and table clarity
- Trust and continuity (descriptive signals)
- Collaborative culture and healthy tables

### Esiana refuses to become

- Popularity / performance marketplaces
- Prestige chasing and engagement competition
- Quantified reputation (ratings, rankings, match scores)
- “Which campaigns perform best?” optimization logic

### Descriptive vs evaluative

| Descriptive (inform) | Evaluative (rank) |
|----------------------|-------------------|
| “Ongoing since May 2026” | “High retention” |
| “Session 38” | “Reliable DM” |
| “Weekly ongoing campaign” | “95% attendance” |
| “2 spots open” | “12 players applied” |

Public copy should **inform**, not **rank**. Evaluative framing shapes marketplace culture even when the underlying data is similar.

### Private organizer tooling vs public evaluation

| OK (private / DM-only) | Not OK (public lobby) |
|------------------------|------------------------|
| Schedule overlap on join review (`Strong` / `Partial` for logistics) | Same labels on listings |
| Applicant timezone + intro for review | Applicant “quality” scores |
| Seat counts; optional “Applications open” / “Currently reviewing” | Application counts as social proof |

**DM-only schedule overlap is intentional today** (`shared/recruitmentContinuity.ts`, `backend/src/lib/scheduleOverlap.ts`, join request review UI).

---

## Recruitment information stack

| Layer | Purpose | Status |
|-------|---------|--------|
| **Tags** | Fast scan (vibe, genre, format) | Shipped — `tableStyleTags`, meta chips |
| **Premise** | Campaign fantasy | Shipped — `recruitmentTagline`, `recruitmentPremise` |
| **Rules / Safety** | Operational and comfort clarity | Shipped — wiki docs + `include*` toggles |
| **Table Expectations** | Social contract (“how we play weekly”) | **Shipped (P0)** |
| **Before-apply note** | Vibe disclosure — tone, pacing, energy, seriousness | **Shipped (P1)** |
| **Apply** | Commitment (join request) | Shipped |

**Before-apply note (P1):** DMs often overload premise, rules, and tags for emotional/social expectations. A short honest field is the **vibe disclosure layer** without bloating formal docs.

---

## User-facing guardrails (`won't-do`)

Documented to prevent future feature creep (growth, discoverability pressure, engagement metrics, moderation).

| Never build | Why |
|-------------|-----|
| Top-DM / host leaderboards | Competitive status |
| Match scores, star ratings, % fit | Optimization / judgment culture |
| Public application counts | FOMO and prestige chasing |
| Attendance %, retention badges, streaks | Hidden rankings |
| MMO role optimization (“healer needed”, power meta) | Recruitment meta-game |
| Public evaluative overlap labels | Feels like scoring |

**Keep:** seat availability, non-competitive application state copy, descriptive cadence.

### Internal language guardrails

Avoid marketplace-optimization framing in team docs and issues:

- conversion, recruitment efficiency, applicant quality scoring
- listing performance, campaign success ranking
- “which campaigns perform best?”

**Prefer:** sustainability, compatibility, clarity, healthy tables.

---

## Philosophical future (not backlog)

### Healthy departure normalization

Not scheduled. Aligns with social-contract direction: respectful leaving, campaign pauses, expectation resets, graceful exits. Revisit when product explicitly scopes lifecycle tooling.

---

## Deferred features (priority)

### P0 — Table Expectations (shipped)

**Highest leverage.** Reduces mismatched assumptions and social friction without ratings or public metrics.

- Distinct from **Rules** (mechanics) and **Safety** (boundaries); complements `tableStyleTags`.
- **Tone:** “Table expectations”, “How we play” — not “conduct”, “requirements”, or extra “rules.”
- **Template topics (guidance):** attendance culture, voice/video, tone, PvP/social conflict, character expectations, new-player friendliness.

**Implementation:**

| Piece | Detail |
|-------|--------|
| Schema | `includeTableExpectations Boolean @default(false)` on `Campaign` |
| Aliases | `table expectations`, `how we play`, `table culture`, `social contract` in `RECRUITMENT_DOC_ALIASES` |
| Settings | Toggle in Recruitment Settings alongside other `include*` flags |
| Lobby | First entry in `RecruitmentBeforeYouApply` `DOC_ORDER` |
| Docs | Row in [recruitment-lfg.md](../features/recruitment-lfg.md); default template in campaign defaults import |

### P1 — Before-apply note (“vibe disclosure”) (shipped)

| Piece | Detail |
|-------|--------|
| Field | `recruitmentBeforeApplyNote` (max 500 chars, sanitized like tagline) |
| Settings | Plain-text textarea on Recruitment → Listing |
| Lobby | Sidebar above “Request a seat” (desktop); main column copy on smaller viewports |
| Not | Premise (fantasy), Table Expectations wiki (long-form), tags (scan) |

### P2 — Party composition note

DM-authored free text first (`partyCompositionNote`, ~200 chars), e.g. “2 experienced, 1 beginner; light on frontline.”

**Avoid:** role slots, comp requirements, power/meta language; roster-derived scoring.

### P3 — Cadence / longevity copy polish

**Partial today:** `formatRecruitmentContinuityLine` (session #, “Ongoing since …”, duration).

Extend **descriptive** cadence via `campaignFormat` / `estimatedLength` display — not new metrics.

### P4 — Public table fit notes (if ever)

**Do not use “compatibility”** in product or backlog titles — implies scoring and hidden evaluation.

**Preferred names:** table fit notes, helpful context, scheduling context, participation guidance.

- **Good:** “Your timezone aligns with this schedule”, “This table welcomes beginners”
- **Bad:** Public `Strong`/`Partial` overlap labels; “% fit”, “match quality”

Any public assistive copy is **new prose**, not exposed overlap enums.

### P5 — Directory filter by table style tags

`GET /api/recruitment/all` query param (like `genreThemes`) in `recruitmentMarketplaceController.ts`.

---

## Shipped (reference)

| Item | Implementation |
|------|----------------|
| Table Expectations (P0) | `includeTableExpectations`, `shared/recruitmentDocAliases.ts`, lobby + settings + campaign defaults template |
| Continuity / descriptive longevity | `shared/recruitmentContinuity.ts`; hero + sidebar |
| Public recruitment landing | Lobby page, wiki “Before you apply”, meta chips |
| DM-only schedule overlap | `scheduleOverlap.ts`; join request review |
| Seats without application counts | Sidebar seat display only |
| Join-request context + deny reasons | Phase 4 — see [todo.md](../../esiana-core/todo.md) |

---

## Suggested build order

1. Table Expectations (P0)
2. Before-apply vibe note (P1)
3. Party composition note (P2)
4. Directory table-style filter (P5)
5. Public table fit notes (P4) — after copy review

**P0 estimate:** ~1 migration, alias map, lobby doc slot, settings toggle, docs/templates — same shape as `includeSafetyGuidelines`.
