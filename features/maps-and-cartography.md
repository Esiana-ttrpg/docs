# Maps & Cartography

A campaign map in Esiana is a shared picture of the world with memory. You upload an illustrated map — a continent, a city, a dungeon level — pin the places that matter to the wiki pages describing them, and the map remembers what the party has discovered and when. Months later, when the players ask "have we been to Elderhelm?", the map can answer.

Maps are deliberately world-history views, not battle grids. There is no fog-of-war painting, no token movement, no combat integration. If you need tactical play, use a virtual tabletop alongside Esiana; use Esiana's maps so everyone remembers the world the tactics happened in.

## How it works

A map starts as an uploaded image. Esiana keeps your original and automatically prepares lighter display and thumbnail versions so the viewer stays fast even with large battle-poster-sized uploads. Every map has a name, a visibility, and optionally a linked wiki page — usually the location the map depicts, so the map and the lore point at each other.

Pins are the heart of the feature. A pin sits at a point on the map and points at something: a wiki page (the city of Elderhelm), another map (the city detail map nested inside the continent), or a brand-new page Esiana creates for you on the spot when you drop a pin and name a place you have not written up yet. Hovering a pin shows a small card summarizing its target, so players can orient themselves without opening six tabs.

Two systems govern what each viewer sees. Visibility works like wiki visibility: Public, Party, or GM-only maps and pins. Discovery works like wiki discovery: pins for places the party has not found are hidden or redacted for players, while the GM sees everything. A GM-only handout map never leaks; a Party map of the region shows only the settlements the party actually knows. GMs can preview exactly the party's view — including a ghost mode that overlays what is hidden — before screen-sharing at the table.

Maps also have a time dimension. Scene objects — regions, labels, routes drawn on the map — can carry date ranges, and presentation presets save favorite views ("the North at the start of Act II"). Scrubbing the campaign date re-renders the map as it was: borders drawn, routes established, places founded or ruined. This is the same campaign clock that drives chronology, so advancing time updates maps, timelines, and gated lore together.

## Using maps

A typical setup flows like this:

1. Upload the map image from the maps area of your campaign. Give it a display name ("The Northern Marches") and set visibility — Party for the shared world map, GM-only for the secret cult network.
2. Link the map to its wiki page if it depicts a known location, so readers of the location find the map and viewers of the map find the lore.
3. Drop pins on the places that matter and point each at its wiki page. If a page does not exist yet, create it from the pin — Esiana files it under the right folder with Party visibility, and you flesh it out later.
4. Hide what the party has not discovered. Pins for unvisited places stay hidden for players until revealed, individually or with a bulk reveal when the party surveys the region.
5. At the table, open the viewer, set the campaign date if the era matters, and share your screen. Hover cards do the exposition for you.

Ongoing care is light. When the party founds an outpost, add a pin. When war redraws a border, confirm the new overlay so the change sticks. Before deleting a wiki page, check its linked map objects — the page tells you what points at it, and deleting the target strands the pin.

## Campaign configuration

Map behavior is mostly per-map rather than campaign-wide: each map carries its own name, visibility, and wiki binding, and each pin its own target and revelation state. GMs with map-editing permission manage all of it from the viewer and its settings panel. Whether a given member *can* edit maps follows their campaign role and collaboration permissions — players in a typical campaign view maps without editing them.

## Administration

Two instance-level concerns touch maps. Upload size limits cap how large a map image can be, and image-processing settings control how aggressively uploads are downscaled and whether full-resolution originals are kept for GM download. Both are set by the instance administrator; a campaign cannot exceed them. Installations with heavy media use can store files in S3-compatible object storage instead of local disk, which is also an administrator decision and invisible to campaigns either way.

## Players

Players experience maps as the party's collective memory of geography. You see the maps you are allowed to see, with the pins your party has discovered, rendered at the current campaign date. Hover any pin for its summary card. You cannot see hidden pins, GM-only maps, or full-resolution originals reserved for the GM — and unlike a VTT, nothing here moves in real time, so treat the map as the world-as-known, not the battlefield.

## Things to know

Upload the highest-quality image you have; Esiana derives the fast versions itself, and downscaling at upload is gentler than a compressed re-upload later. Pin coordinates lock to the stored image dimensions, so replacing a map image with different dimensions can displace pins — prefer editing the existing map over swapping files. Deleting a map asset cleans up its pins and wiki bindings, which is convenient and irreversible, so be certain first. And remember the boundary: Esiana maps answer "what does the world look like and what do we know about it," never "where exactly is each combatant standing."

## Related features

- Discovery and revelation, for the hidden-until-revealed layer pins obey
- Wiki and lore, for the pages pins point at
- Chronology and calendars, for the campaign date maps render against
