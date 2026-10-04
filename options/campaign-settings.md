# Campaign Settings

Campaign Settings is where the people who run a campaign shape it: who belongs, who can do what, how it looks, what it says to strangers, and where its data lives. If the features are the rooms of the house, settings are the wiring, the locks, and the paint. This page explains every area, who may touch it, and what changing things actually means.

Settings open from inside a campaign, and editing them is a staff privilege — game masters and writers, generally, with the most consequential actions reserved further. Players never see this page; they link their characters from Campaign Home instead.

## General: identity of the campaign

General holds the campaign's public identity: its name, description, game system, and language. The name matters more than it looks — it generates the campaign's address, and renaming later regenerates that address and breaks old links, so choose the permanent name early and treat renames as moves, not edits.

Game system is descriptive, chosen from a picker with an "Other" fallback for unlisted systems and a custom name field. It tells browsers and recruits what you play; it does not change Esiana's behavior. Two visibility-adjacent choices live nearby in spirit: whether the campaign is listed publicly, and whether anonymous visitors may read its Public pages. Listing controls discovery of the campaign itself; anonymous reading controls what outsiders can see without joining. Neither affects members, and neither overrides page-level visibility — an unlisted campaign's Public pages are still Public to anyone with the link.

## Access and roles: who belongs and what they may do

This is the most consequential tab. It holds the invite link (generate it, share it, rotate it when it leaks — old links die on rotation), the member roster with roles, per-member character identity bindings, and ownership transfer.

Roles run game master, writer, player, observer, from most to least power. The practical differences: game masters configure everything including members and data; writers work the content — wiki, maps, chronology, sessions — without ownership transfer or destructive backup powers; players read and contribute within the collaboration permissions; observers read and change nothing. Assigning the owner role is not done here at all — ownership moves only through the transfer handshake, where the current owner initiates, the recipient accepts before expiry, and either side can cancel or decline. The current owner cannot leave or be removed until ownership moves; that refusal is load-bearing, preventing ownerless campaigns.

Character identity binding deserves attention because it affects sessions directly: linking a member to a character page sets whose name speaks in session notes and whose face appears on the roster. Players link themselves from Campaign Home; staff can bind anyone from the roster, provided the page exists in the campaign and is visible to that member's role.

Collaboration permissions tune what non-staff can do, and the one most tables meet is player chronology management — off by default. Enabling it lets players create and edit party-visible timeline events, which suits collaborative tables with a player chronicler and suits nobody else. Page editing more broadly follows role plus these permissions: if a player cannot edit something they should be able to, this tab is the first place to look.

Invite delivery has two forms: the link itself, and emailed invitations the GM sends from here. Email delivery needs the instance to have mail configured; without it, copy the link manually.

## Appearance and sidebar: how the campaign looks and navigates

Appearance sets the campaign's visual identity — a theme preset (light, dark, automatic, or a genre dressing like fantasy, parchment, or cyberpunk) and an appearance profile for finer palette control. A campaign theme can override personal themes when the campaign asserts its look, which is usually what a GM wants for table immersion and occasionally what a player wants to escape.

The sidebar settings shape navigation: which sections appear under world lore and game management, in what order, under what headings. Rename headings to the table's vocabulary, push daily surfaces high, bury what you rarely open. Sidebar order is navigation only — it never changes anyone's permissions. Campaign Home layout (widgets, hero, arrangement) is edited from Campaign Home itself rather than here, but it belongs to the same curation impulse.

## Recruitment: the public face

The Recruitment tab is the campaign's listing office, covered in full in its own guide: looking-for-group toggle, tagline and premise, schedule, table preferences, safety and tools, exposed wiki documents, and the applications queue. The status block at the top reports what is configured and what still needs setup, because half-built listings recruit nobody. Turning the toggle off unlists immediately without disturbing members or pending applications.

## Templates and integrations

Templates control which page templates the new-page menu offers: the built-in set for characters, locations, and the rest, your custom Template Studio creations, or both. Hiding the built-ins declutters creation for established campaigns with their own conventions; it never touches existing pages.

Integrations manages campaign plugins — which installed plugins this campaign uses and how each is configured. Installation itself happens at the instance level; if a plugin is missing here, the administrator has not installed it, and no campaign setting conjures it.

## Data and backup

Data and backup holds the sovereign archive controls: immediate download, background export with notification on completion, and restore from a prior archive, plus per-calendar JSON export. These are destructive-adjacent powers — especially restore, which replaces in place — and live here rather than scattered across features so the blast radius is obvious. The full practice, including what archives do and do not carry, is documented in the backup guide.

Advanced surfaces nearby include views and follower metrics. They inform; they do not govern.

## Things to know

Settings changes apply to the future far more often than to the past: tightening visibility does hide content immediately, but renaming, re-theming, and re-permissioning reshape going forward, not retroactively. Ownership transfer is the only settings flow with an expiry — an unaccepted offer lapses, by design. Invite rotation is the correct response to any leak, and it costs nothing. And when something "should work" for a player but does not, check role, then collaboration permissions, then page visibility, in that order — nine times in ten the answer is in this tab.

## Related features

- Recruitment and LFG, for the listing tab in depth
- Data backup and export, for the archive controls in depth
- Plugins overview, for what Integrations can offer
- Discovery and revelation, for the visibility model access settings build on
