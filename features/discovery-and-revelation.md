# Discovery & Revelation

Sooner or later every GM faces the same problem: the campaign bible contains things the players must not know yet. The villain's identity, the traitor in the party's employ, the true nature of the dungeon — all of it lives in your notes, and your notes live in Esiana. Discovery is Esiana's answer to that problem: a way to keep secrets inside the same wiki the players read every day, and to reveal them with a click when the moment comes.

The core distinction is simple, and everything else follows from it. Visibility asks *who is allowed to read this?* Discovery asks *has the party learned this exists?* A page can be Party-visible — the players would be allowed to read it — while still hidden from their browsing, search results, backlinks, and map lists. The page is permitted but unknown. When the party finally meets the masked stranger and learns his name, you reveal him, and he appears everywhere he should have been all along.

A concrete example helps. Suppose a faction called the Gray Cartel secretly runs the docks. You write the faction page months early, mark it Party-visible but hidden. For the whole arc, your players can search the wiki freely without ever tripping over it. After the session where the rogue tails a smuggler to the warehouse and the truth comes out, you reveal the page. From the players' side, it is as if the page always existed — because from the story's perspective, it did.

## How it works

Every hideable thing in Esiana — wiki pages, map pins, scene objects, lore claims, even old names — carries a presence: roughly, hidden, draft, or revealed. Hidden means the party cannot find it through any browsing surface, though anyone with the direct link and sufficient visibility could still read it. Revealed is the normal state. Draft covers work-in-progress the GM has not finished preparing.

Presence composes with the other axes rather than replacing them. Visibility still decides who may read; presence decides who can discover. A GM-only page is unreadable to players regardless of presence. A hidden Party page is readable in principle but undiscoverable in practice. Time gates add a third dimension: a page can be set to become available only once the campaign date reaches a threshold, so the eclipse-cult chapter literally cannot surface before the eclipse.

Lore claims add beliefs on top of facts. A claim is a checkable statement about the world — "the Gray Cartel controls the docks" — with a confidence and a knowledge state: known, suspected, contested, disproven. Claims let you track what the party *believes*, which is often more interesting than what is true. The party may hold a confident-but-wrong belief for an entire arc, and the wiki can represent that honestly instead of forcing you to either lie in the canon or spoil the twist.

Rumors are how claims travel. Spreading a rumor carries a claim (or a fresh telling of one) into a region or a faction's awareness, where it shows up in regional rumor feeds and faction gossip. Retracting pulls it back, and the full circulation history stays auditable, so you can always answer "who has heard what?" before the players walk into the tavern.

What players experience of all this is deliberately quiet. Unrevealed link targets render as plain text rather than broken links, so a session recap mentioning the hidden faction does not sprout tempting red links. Browse surfaces may show count-only summaries for hidden categories rather than pretending the category is empty. Nothing ever announces "there is a secret here."

## Using discovery and revelation

The normal GM workflow runs in three phases: prepare hidden, reveal on discovery, maintain beliefs.

Prepare by writing sensitive pages early and setting them hidden through the page tools, or by importing with hidden presence as the default. Give hidden pages honest titles — you will be navigating them for months, and the players cannot see them anyway.

Reveal at the table beat where the party learns. Open the page and reveal it; if the thing was a location, its map pins and scene objects reveal alongside the same gesture, and regional rumor feeds pick up whatever the party would now have heard. For a big reveal — the faction unmasked, the city taken — check what else references the page first, since newly visible pages pull their whole neighborhood into the light.

Maintain beliefs through the lore inspector on entity pages: set what the party holds as known, suspected, or contested, and spread rumors when word should travel faster than the party does. When the party acts on a false belief, the claim record is what lets you keep the fiction straight three sessions later.

GMs can sanity-check all of this with player-preview modes on the threads and adventure surfaces, which render the campaign the way a player sees it. If you are ever unsure whether something leaked, preview first.

## Campaign configuration

Discovery itself needs little configuration — presence is per-page, and revelation is a GM action, not a setting. Two things are worth knowing. First, what players may edit is governed by collaboration permissions, which indirectly shapes discovery: players who can edit party pages can also see more of the link graph. Second, time-gated availability follows the campaign clock, so a stalled or far-advanced calendar changes when gated content surfaces. Both live in Campaign Settings.

## Players

For players, discovery is mostly invisible by design. You browse, search, and follow links through exactly the world your characters could know about, plus out-of-character conveniences like session recaps. Things you have not discovered do not appear — not as locked doors, not as teasers, just absent. Your beliefs may differ from canon: a rumor you heard in-game is tracked as your party's knowledge even if the GM knows otherwise, and the recap or gossip surfaces reflect that honestly.

One practical note: if a page you swear existed has vanished, it was probably re-hidden or its visibility lowered after a story development, not deleted. Ask your GM before rewriting it from memory.

## Things to know

Hidden is not the same as GM-only, and confusing the two is the most common mistake. A hidden Party page becomes fully visible the moment you reveal it — including to every player at once. If only some characters learned the secret, splitting the knowledge (a separate GM-only note, or a rumor scoped to part of the party) serves you better than a blanket reveal. Reveals are also broad by default: revealing a faction surfaces its pins, its gossip, and its backlinks together, which is usually what you want for a dramatic unveiling and exactly what you do not want for a subtle clue. For subtle clues, reveal the single page and let the rest follow later.

Time gates deserve caution: content gated to a future campaign date stays hidden no matter how much the party investigates, which can feel like stonewalling if the players do not know time is the lock. Use gates for scheduled world events (festivals, eclipses, invasions), not for mysteries the party could solve early.

## Related features

- Wiki and lore, for visibility, pages, and links — the layer discovery sits on
- Maps and cartography, for pin revelation and previewing the party's map
- Narrative threads, for tracking mysteries payoff-by-payoff alongside revelation
