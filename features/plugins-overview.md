# Plugins Overview

Esiana does new tricks through plugins: packaged extensions that add storage backends, content feeds, integrations, and campaign logic without changing the core application. If core Esiana is the table, plugins are the third-party accessories — some essential to your setup, most ignorable, all removable.

Two scopes matter, and confusing them causes most plugin trouble. Instance plugins are installed by the system administrator for the whole server: storage drivers, registries, global integrations. Campaign plugins are enabled per campaign by its GM from among what the instance offers: content packs, feeds, table tools. A GM can enable anything installed, but cannot install anything new — installation is always the administrator's job. Campaign authority never reaches the instance, and instance authority never edits campaign content directly.

## How it works

The administrator syncs a registry — by default the community catalog — browses what it offers, installs packages, and configures them: settings fields the plugin declares (text, URLs, secrets, checkboxes), connection credentials where the plugin talks to outside services (an API key, or an OAuth sign-in flow), and enablement. Installing does not activate anything by itself; the runtime picks up installed plugins without redeploying core, and a reload control exists for when it needs a nudge.

The GM's side is smaller. In Campaign Settings → Integrations, the campaign sees the installed plugins available to it, enables the ones the table wants, and fills in campaign-level configuration. Enabling is per campaign: the same plugin can serve three campaigns with three different setups, or sit unused in a fourth. Disabling removes it from the campaign without disturbing anyone else's.

A few special cases deserve mention. Sign-in with external accounts (Google, Discord, and the like) is built into core and configured under Identity Providers — it is not a plugin and never needs installing. File storage can be swapped from local disk to S3-compatible object storage by a storage plugin, which changes where bytes live and nothing else; campaigns notice no difference. And anything a plugin does inside a campaign remains subject to that campaign's permission boundaries — a plugin cannot show a player what the player may not see.

## Using plugins

As administrator, the flow is: sync the registry, install what the instance needs, configure instance-level settings and connections, and tell your GMs what is available. Prefer the official registry over stray manifest links, keep credentials in the connection store rather than pasted into config text, and reload the runtime after changes that should take effect immediately.

As GM, the flow is shorter: open Integrations, read what each available plugin actually does (its own documentation, not its name), enable it, configure it for your table, and verify it behaves — a feed shows entries, a content pack's pages appear, an integration connects. Disable anything the table stopped using; a campaign accrues cruft fastest through forgotten integrations.

Developers automating plugin work use API tokens with plugin scopes, and plugin authors have their own documentation track. Neither is needed to *use* plugins.

## Campaign configuration

Campaign plugin management lives in Campaign Settings → Integrations: which installed plugins are enabled for this campaign and how each is configured. There is nothing else to set — registries, runtimes, and storage drivers are instance concerns. If a plugin you want is missing from Integrations, it is not installed; ask your administrator rather than hunting for an install button you will not find.

## Administration

The administrator's surface is Admin → Plugins & Integrations: registry sync and URL, installation, instance-level configuration, connections including OAuth clients, runtime reload, and removal. Storage backend selection and upload ceilings sit nearby and bound what media-heavy plugins can do. Identity providers live separately under their own admin section. As with all admin powers, these affect every campaign on the instance: installing a storage plugin migrates bytes for everyone, and removing a plugin removes it from every campaign that enabled it — warn your GMs first.

## Things to know

Removing an instance plugin disables it in every campaign that used it, immediately; campaign data the plugin stored through Esiana's own mechanisms is preserved in exports, but anything the plugin kept in its own external store leaves with the plugin. Check a plugin's own documentation for its storage model before uninstalling or migrating hosts. OAuth connections belong to the app level or the campaign depending on the plugin — reconnect where the plugin asks, not everywhere at once. And anything promising to bypass campaign permissions is either misunderstood or malicious: the permission boundaries hold regardless of which plugin asks.

## Related features

## Deep dives

| Topic | Document |
|-------|----------|
| Catalog & authoring | [`community-plugins/README.md`](../../community-plugins/README.md) |
| Runtime directory | [`esiana-core/plugins/README.md`](../esiana-core/plugins/README.md) |
| Plugin ecosystem architecture | [`esiana-core/docs/plugins/phase-10-ecosystem.md`](../esiana-core/docs/plugins/phase-10-ecosystem.md) |
| OPDS wiki feed study | [`esiana-core/docs/plugins/opds-wiki-feed-study.md`](../esiana-core/docs/plugins/opds-wiki-feed-study.md) |

---

## Related docs

- [System admin settings](../options/system-admin-settings.md)
- [Campaign settings](../options/campaign-settings.md) → Integrations tab
- [Environment variables](../options/environment-variables.md)
- [Self-hosting with Docker](../self-hosting/docker.md) — mount `PLUGINS_DIR` volume
