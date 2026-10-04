# Sovereign Export

What can leave Esiana in a portable archive — and what cannot. This page states the guarantee precisely; the operator guide covers the daily practice of backups and restores.

The guarantee is lore sovereignty: everything the table wrote and made leaves as readable Markdown plus structured data, and comes back intact somewhere else. Wiki pages of every kind — characters, locations, organizations, families, objects, lineages, adventures with their quests and scenes, session notes, journals — travel as Markdown with their structure preserved. Lore claims and past names travel alongside. Downtime havens and projects travel too, as do map pins and media, calendar definitions, and plugin content stored through Esiana's own mechanisms. Open the archive in a text editor and it reads as your campaign; restore it and the campaign reassembles — pages, links, relations, lore state, downtime rows — because the archive carries the canon, and everything derived rebuilds from canon on arrival.

The boundary is operational and social state, excluded by design in most cases. Memberships and role grants do not transfer — a restored campaign has no roster until people join it. Session-timeline operations, activity feeds, webhooks and their queues, plugin secret stores, and instance configuration stay behind. Financial and standing trails (ledgers, reputation histories) do not round-trip. Secrets marked GM-only are stripped on export. These exclusions are not gaps in the format; they reflect that a campaign archive carries the *world*, not the table's administration of it.

A few partial areas deserve plain words. Map pins and assets travel; detailed map layer configurations may not fully serialize. Revelation internals rebuild from preserved visibility records, which can take a moment to settle after restore. Plugin content survives exactly when the plugin stored it through Esiana — plugins with their own external stores take their data with them, so check each plugin's own export story before migrating. Very old archives may carry a legacy templates folder that restore now ignores.

The honest summary: sovereignty covers lore and everything built from it, which is the part of a campaign that took the time. The table itself — members, history of play, operational trails — starts fresh, which is the correct shape for a world changing hands or hosts.

Operator practice — taking exports, restoring into fresh or existing campaigns, migrating hosts, verifying round-trips — is documented step by step in the backup and export guide.
