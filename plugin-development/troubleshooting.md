# Plugin troubleshooting

Common failures when developing or installing plugins.

---

## Discovery & loading

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Plugin not in Admin discovery | Not in `registry.json` or sync not run | Add registry entry; Admin → Sync Registry |
| Plugin not loaded locally | Missing symlink in `plugins/` | `npm run plugins:link -- ../community-plugins/my-plugin` from `esiana-core` |
| Changes ignored after edit | Backend caches manifests | Restart backend after `manifest.json` changes |
| Install fails on SHA | Placeholder or short SHA in registry | Run `node scripts/pin-registry-shas.mjs` in `community-plugins` |

---

## Runtime

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Hook never fires | Wrong event name or missing capability | Match [Events](events.md); grant capability in Campaign Settings |
| 403 on campaign API | Token scope or plugin not enabled | Enable plugin for campaign; check API token scopes |
| 404 on `/api/plugin-runtime/...` | Plugin disabled or wrong `id` | Confirm manifest `id` matches URL segment |
| Interceptor quarantined | Repeated hook failures | Check backend logs; fix hook; restart backend |
| Frontend slot blank | `frontendEntry` missing or JS error | Browser console; verify manifest and bundle path |

---

## Manifest validation

| Symptom | Fix |
|---------|-----|
| Install rejected | Validate JSON; required fields: `id`, `name`, `version`, `scope` |
| Global vs campaign mismatch | `scope: global` plugins install at system level; campaign plugins enable per campaign |
| Config form empty | Add `configTemplate` or `configSchema` to manifest |

---

## Docker / self-hosted

- Plugin packages live in the **`plugins` volume** (`/app/plugins` in the esiana container)
- After install from Admin, restart is usually not required — if routes fail, `docker compose restart esiana`
- Registry URL is stored in system settings — custom URLs are preserved on upgrade

---

## Still stuck?

- [Hello world](hello-world.md) — repeat verify steps
- [`example-plugin` README](../../community-plugins/example-plugin/README.md)
- `/api/docs` on your instance — plugin runtime routes
- Engineering detail: [`esiana-core/docs/plugins/security-model.md`](../../esiana-core/docs/plugins/security-model.md)
