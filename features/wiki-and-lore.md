# Wiki & Lore

Every campaign needs a place where the world lives between sessions: the people, places, factions, history, and house rules that everyone at the table shares. In Esiana that place is the wiki. If you take one thing away from this page, let it be this: the wiki is not a side notebook. It is the campaign's memory, and nearly everything else — maps, timelines, rumors, downtime, journals — reads from it.

A wiki page can be anything from a three-sentence tavern description to a full character sheet with portrait, stats, relationships, and secret GM notes. Pages nest inside folders, link to each other with `[[double brackets]]`, and each carry their own answer to "who is allowed to read this?"

## How it works

Think of the wiki as a tree. At the top sit broad folders — Characters, Locations, Factions, Quests, Session Notes — and inside them sit pages, which can themselves contain sub-pages. A city page might hold district pages; a faction page might hold its prominent NPCs. Breadcrumbs keep you oriented when the tree grows deep, which it will.

Pages hold rich text: prose, headings, images, quote blocks, and structured infoboxes for things like stat blocks. Character pages go further, with dedicated sheet-style tabs that keep description, abilities, and GM-only notes in one place instead of scattered across five documents.

Three ideas govern how pages behave, and they are worth learning early because the rest of Esiana builds on them.

First, pages link to each other. Writing `[[Winterfort]]` anywhere creates a real link to the Winterfort page, and Winterfort automatically lists every page that mentions it. This two-way web is what lets you start at a quest, follow a link to the NPC who offered it, follow another to their faction, and understand the political situation without anyone maintaining an index by hand. If you link a name that has no page yet, Esiana remembers it as an unresolved link — a quiet to-do list of lore you mentioned but never wrote. Renaming a page updates the links pointing at it, so the web does not rot when your villain gets a better name.

Second, every page has a visibility: Public, Party, or GM-only. Visibility answers "who may read this once they know it exists." A monster stat block might be GM-only; the party's ship is Party; your public campaign primer is Public. Visibility is enforced for every reader, including through search results and previews.

Third, visibility is separate from discovery. A page can be Party-visible in principle but still hidden from the party's browsing, search results, and link lists until the GM reveals it. That separation is how you prepare a faction three sessions early without players stumbling over it in the sidebar. Discovery and revelation have their own guide; the short version is that visibility is about permission, discovery is about knowledge.

Pages also carry a narrative status — a GM-authored label like active, rumored, missing, or secret that says where this thing stands in the story right now. Status is different from both visibility and discovery: it is editorial commentary ("the king is rumored dead") rather than access control.

## Using the wiki

Most of your time as GM goes like this. You create a page where it belongs — a new NPC under Characters, a new ruin under Locations — give it a title, write what the party could know, and set visibility to match. Sensitive material (the NPC's secret allegiance, the ruin's trap layout) either goes on the same page in a GM-only section or on a separate GM-only page, depending on how you like to organize. When the party learns something new, you reveal the relevant pages rather than re-explaining the world from scratch.

Concretely, the day-to-day moves are:

1. Open the wiki from your campaign's sidebar and navigate — or search — to where the page should live.
2. Create the page with a clear title. Titles are how wikilinks find pages, so prefer the name everyone at the table actually uses.
3. Write the content, link freely to related pages with `[[brackets]]`, and file images or handouts inline.
4. Set visibility before you finish. The default keeps new pages Party-visible; drop truly secret lore to GM-only.
5. Reorganize by dragging pages between folders as the campaign grows. Links survive the move.

Deleting a page asks you to choose what happens to its children: they can be kept and re-filed under a new parent, or deleted along with it. Deleting a whole subtree requires typing the page's title as confirmation, which is Esiana's way of making sure campaign-ending clicks are deliberate. Before deleting anything load-bearing, glance at the page's backlinks and linked map objects — the page tells you what points at it.

A few workflows deserve special mention. Session notes are wiki pages too, filed under session timelines and notebook arcs; the full flow lives in the sessions guide. Tags group pages across folders ("cursed", "faction: Iron Gauntlet"), and the tags hub browses them with the same visibility rules as everything else. Pinning a page bookmarks it to your personal quick list. Aliases let a page answer to more than one name, and the history of past names is kept, which matters when the players only ever knew the villain as "the Gray Man."

Character sheets deserve a paragraph of their own. A character page combines freeform writing with structured fields — things like ancestry, occupation, or status — and tabbed sheets that separate the public portrait from mechanics from GM secrets. Players linked to a character see the parts they are allowed to see; the GM sees all of it. The structure also feeds other features: relationships inform the entity web, and life-status feeds narrative displays.

If you are migrating an existing campaign, do not hand-copy a hundred notes. Export your vault from Obsidian or Kanka and import it during campaign creation; the import guide explains folder mapping and what carries over.

## Campaign configuration

GMs configure the wiki at Campaign Settings. The settings that matter most in practice are the sidebar layout (which folders appear, in what order, under what headings), the dashboard and theme choices that frame the wiki, and template options — whether the page-creation menu offers the built-in templates for characters, locations, and the rest, or only your custom ones. Upload size limits for images and attachments may be capped by the instance administrator, in which case the campaign cannot raise them.

Player editing is governed by the campaign's collaboration permissions rather than a wiki-specific switch: depending on configuration, players may edit party-visible pages, only their own notes, or nothing at all. If a player reports they cannot edit something they should be able to, check their role and the collaboration settings before assuming it is a bug.

## Administration

Instance administrators manage global default page templates (Admin → Page Templates) that appear for every campaign unless that campaign hides them, and set the upload and image-size ceilings that bound every campaign's media. Neither affects existing page content — hiding a default template only removes it from the new-page menu.

## Players

As a player, the wiki is your campaign bible with the boring parts removed. You see Public and Party pages, minus anything the GM has not revealed yet; GM-only pages simply do not appear for you, in lists, search, or link suggestions. You can edit pages where your campaign allows it — commonly your own session notes and character page — and your edits are attributed to you. If a page you expect is missing, it is almost certainly unrevealed or GM-only rather than deleted; ask your GM.

## Things to know

Renaming is safe but not silent: links update, but titles other players memorized do not, so rename major entities sparingly mid-arc. Visibility is checked at read time, which means lowering a page from Party to GM-only hides it from players immediately — useful when plans change, but startling if done by accident. Discovery hiding is stronger than it looks: hidden pages vanish from search, indexes, and link suggestions for players, so a page you "can't find" as a GM previewing the player view is usually hidden, not gone. And the wiki is the source other features read from — deleting a location page orphans its map pins and quest references, so check backlinks first.

## Related features

- Discovery and revelation, for the hidden-until-revealed layer on top of visibility
- Sessions and notes, for session timelines, notebooks, and compiling recaps
- Maps and cartography, for pinning locations to illustrated maps
- Import formats, for migrating vaults from Obsidian or Kanka
