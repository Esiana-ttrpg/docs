# Capacity and sizing

Guidance for self-hosting operators: how large campaigns can grow, what hardware to plan for, and when to upgrade.

Esiana classifies campaigns by **entity counts** (pages, characters, locations, organizations, sessions, maps). Media volume (`assetCount`, `assetStorageBytes`) is tracked but not yet used for tier classification — a campaign with modest page counts but gigabytes of map images may need more storage and RAM than this table suggests.

---

## Campaign size tiers

| Tier | Typical profile | Pages | Characters | Locations | Orgs | Sessions | Maps |
|------|-----------------|------:|-----------:|----------:|-----:|---------:|-----:|
| **Small** | Starter campaign | 100 | 50 | 25 | 10 | 25 | 2 |
| **Medium** | 1–2 year active campaign | 1,000 | 300 | 150 | 50 | 100 | 10 |
| **Large** | Multi-year archive | 5,000 | 1,000 | 500 | 200 | 500 | 50 |

**Extreme Archive** (10,000+ pages) is an internal regression target for Esiana development — not a hosting recommendation.

---

## Recommended deployment

| Tier | CPU | RAM | Database | Storage notes |
|------|-----|-----|----------|---------------|
| Small | 2 CPU | 2 GB | SQLite or PostgreSQL | Local filesystem uploads |
| Medium | 2–4 CPU | 4 GB | PostgreSQL recommended | Watch export duration as lore grows |
| Large | 4 CPU | 8 GB | PostgreSQL | Object storage recommended for media-heavy archives |

These are starting points for a single Esiana instance hosting one primary campaign (or a few Small-tier worlds). Multiple Medium campaigns on one VPS multiply database and export load.

---

## Upgrade signals

Consider upgrading when you observe:

- **Campaign Settings → Estimated size** shows *approaching* or *exceeds* tier headroom
- Full campaign **export** or **restore** routinely exceeds comfortable wait times (see baselines below)
- **Asset storage** grows quickly (map tiles, portraits, audio) even if page count stays flat
- SQLite write contention with multiple concurrent editors — move to **PostgreSQL**
- Disk pressure on the uploads volume — enable **object storage** (S3-compatible)

---

## Generate benchmark worlds (developers)

Enable developer fixtures:

```env
ENABLE_SAMPLE_DATA=true
```

From the repo root:

```bash
ENABLE_SAMPLE_DATA=true npm run seed-campaign -- --plan-only --profile benchmark-small
ENABLE_SAMPLE_DATA=true npm run seed-campaign -- --token "$TOKEN" --slug my-bench --profile benchmark-medium
```

Profiles:

| Profile ID | Use |
|------------|-----|
| `benchmark-small` | Smoke tests, local profiling |
| `benchmark-medium` | Integration and capacity baselines |
| `benchmark-large` | Long-running seed / query tuning |
| `benchmark-extreme` | CLI/Admin only — internal regression |

Legacy aliases (`tiny-campaign`, `standard-campaign`, etc.) map to the benchmark profiles for one release.

Admin UI: **Admin → Sample Data** (when enabled). New Campaign wizard shows Small/Medium/Large only.

---

## Run capacity profiling

Measure operator-relevant scenarios with average and max latency (percentiles deferred):

```bash
ENABLE_SAMPLE_DATA=true npm run profile-capacity -- \
  --token "$TOKEN" \
  --slug my-bench \
  --iterations 3 \
  --output reports/benchmark-medium.json
```

Scenarios (v1):

| ID | Exercises |
|----|-----------|
| `import` | Campaign restore from ZIP (requires `--backup-zip path`) |
| `export` | Full campaign backup download |
| `campaign-load` | Campaign Home dashboard bundle |
| `character-search` | Wiki tree load (character navigation proxy) |
| `timeline-projection` | Chronology timeline bundle |
| `map-load` | Map scene or visual atlas |

Omit `import` unless you pass `--backup-zip` with a disposable restore target.

Reference baselines captured on a Compose stack live in the Esiana core repo under `docs/capacity/baselines/`. Reports record tier entity counts in `campaignSnapshot` (pages, characters, locations, organizations, sessions, maps) and omit machine-specific fields such as `baseUrl` and `hostname`.

---

## Related docs

- [Installation](installation.md) — minimum RAM prerequisites
- [PostgreSQL](postgres.md) — when to leave SQLite
- [Backups](backups.md) — export and restore
- [Limits and quotas](../options/limits-and-quotas.md) — feature caps (upload size, compile limits)

Internal generator design: [sample-data-generator.md](https://github.com/Esiana-ttrpg/esiana-core/blob/main/docs/architecture-internal/sample-data-generator.md) in esiana-core.
