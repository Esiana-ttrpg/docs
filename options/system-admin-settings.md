# System Admin Settings

The admin console governs the instance every campaign runs on: who may register, how mail flows, how large uploads may be, what the site looks like, which plugins exist, and who else administrates. If campaign settings are the wiring of one house, these are the utilities for the street. This page is for system administrators; campaign GMs will find their controls under Campaign Settings instead.

## Registration: open or closed doors

Two controls decide who can walk in. Open registration allows anyone to create an account; closing it makes the instance invite-only in practice. Restricting email domains narrows self-registration to chosen organizations without blocking accounts the admin creates directly. The first account ever registered becomes system admin automatically and initializes system settings — on a fresh instance, register first and configure second. On a closed table's private server, close registration and admit by invite link; on a community server, domain restriction keeps the audience coherent without manual approvals.

## Email delivery

Outbound mail — notification emails users opt into, password resets, emailed campaign invitations — flows through the SMTP settings here: server, port, credentials, sender address, and a test button that mails the admin to verify the whole path. Email links back into the app also need the instance's public base URL configured, or links arrive pointing somewhere useless. Without mail, nothing breaks: in-app notifications carry on, password resets cannot send, and invitations fall back to shareable links. When users report missing email, check this panel before anything else — the cause is configuration far more often than code.

## Uploads, images, and remote media

Upload ceilings protect the server from the friendliest threat, the 200-megabyte battle map. A general upload limit covers files broadly, with a separate map limit that falls back to the general one when unset. Image handling then shapes what arrives: maximum display and thumbnail dimensions bound the derived variants viewers actually load, a preserve-originals switch keeps full-resolution files for GM download, and allowed image types gate formats. Lower the display bound on small servers to spare memory during processing; raise limits deliberately, watching disk.

Remote fetching is its own surface. URL imports let import and paste flows pull remote media into instance storage, bounded by per-fetch size and timeout, with plain-HTTP fetches off by default. Keep them off in production unless the table needs them — fetching arbitrary remote URLs is the kind of surface that deserves intention.

Relation-graph caps bound how many nodes and edges the wiki relations panel renders, within a fixed range. Dense campaigns with heavy wikilink webs can slow that sidebar; lowering the caps trades completeness for responsiveness on constrained hardware.

## Status, branding, and footer

Maintenance mode blocks everyone but administrators behind a maintenance page — the correct posture during upgrades. A site-wide banner with optional expiry announces windows, downtime, or table news without editing any campaign. Branding sets the instance title, logo, favicon, theme preset, and accent palette, plus footer text and links (terms, privacy, community profiles). Campaigns may still assert their own themes over the instance look, and users over that only where permitted — instance branding frames, it does not dictate.

## Notifications, identity, and plugins

The bell polling interval and default timezone for scheduling live here; identity providers live under their own admin section for external sign-in, documented separately. The plugin registry URL decides where installable plugins come from, defaulting to the community catalog — campaigns then install from the synced registry or local packages, never from arbitrary URLs of their own choosing.

## The rest of the console

Several admin areas run outside the global settings store but belong in the same mental model: identity providers for external sign-in; release version checks against upstream; system utilities for full backups, storage statistics, media pruning, and logs; the background task queue where imports and exports run; the campaign list with per-campaign backup and deletion; global default page templates offered to every campaign; user and role management; and API usage analytics by token. Deleting a user or a campaign here is immediate and administrative — it does not ask the campaign's permission, because instance authority outranks campaign authority by design.

## Things to know

Admin settings bind every campaign on the instance: upload ceilings, mail behavior, branding frame, plugin availability. Campaigns cannot exceed them, only operate within them. Environment variables provide fallbacks and overrides beneath several of these settings — where both exist, the admin console value generally wins at runtime, which surprises operators who set an environment variable and see no change. And destructive admin actions (user deletion, campaign deletion, media pruning) are immediate; the console assumes the administrator means it.

## Related features

- Campaign settings, for the per-campaign counterpart
- Notifications, for the mail-dependent user experience
- Plugins overview, for the registry these settings feed
- Data backup and export, for the instance-side backup duties
