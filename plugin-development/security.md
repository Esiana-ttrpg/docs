# Plugin security

Trust tiers, sandboxing, and API token rules for plugin authors.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

---

## Trust tiers

| Tier | Code | Isolation |
|------|------|-----------|
| 1 | Backend `register()` | Trusted admin-installed; main Node process |
| 2 | Data interceptors | `worker_threads`, timeouts, quarantine |
| 3 | Frontend slots | CSP + error boundaries |

Esiana uses **controlled extensibility for a trusted-admin ecosystem** — not a zero-trust browser extension platform.

---

## Core invariants

1. **No plugin-controlled data reaches persistence without final core validation.**
2. **Declarative extension only** — slots, manifest permissions, `configSchema`.
3. **Events are observational, not transactional.**
4. **Slot-only mount** — no shell or route replacement.
5. **HTTPS exfiltration** is a known trust-boundary limitation for Tier 1 plugins with `connect-src`.

---

## Interceptor quarantine

5 hook failures in 10 minutes → all hooks unregistered; `runtimeStatus: quarantined`.

---

## API tokens (integrators)

New tokens should declare explicit scopes. Legacy empty-scope tokens retain broad access with warnings — tightening at v1.0.

User-facing: [Developer Keys](../options/user-account-settings.md)

---

## Campaign jail

HTTP routes for campaign plugins require `campaignHandle`, set `pluginJailedCampaignId`, and return 404 when the plugin is not enabled for that campaign.

**Endpoint reference:** open `/api/docs` on your running Esiana instance.

Engineering deep dive: [`esiana-core/docs/plugins/security-model.md`](../../esiana-core/docs/plugins/security-model.md) · [`capability-matrix.md`](../../esiana-core/docs/plugins/capability-matrix.md)
