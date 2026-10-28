# Chronology & Calendars

Most campaigns eventually need to answer "what day is it, and what happened when?" A published setting has its own calendar; a homebrew world has thirteen months and two moons; either way, the table shares one clock, and the history of the world hangs off it. Chronology is that clock plus the timeline of everything dated against it.

The first thing to understand is that Esiana's fantasy calendars are real calendars, not labels. You define months of real lengths, weekdays, leap days, seasons, and moons with actual cycles — and then every date in the campaign behaves accordingly. The harvest festival that falls on the full moon actually falls on the full moon. If your world has an intercalary festival week outside any month, the calendar knows that too.

## How it works

Each campaign has a current date on its master calendar — the "today" of the world. Everything dated understands itself relative to that now: timeline events sort around it, time-gated lore unlocks against it, maps render the world as of it. Advancing the date — the everyday "a week passes" step — moves that now forward. It changes what day it is, and it updates every projection that depends on the date. It does not by itself simulate what the world *did* with that week; that is world advance, a separate and heavier action described in its own guide.

Calendars come first. The first calendar you create becomes the master clock; most campaigns need exactly one, and there is no reason to add more unless you are tracking parallel timelines (a feywild calendar alongside the material one, say). Calendar definitions can be shaped in the UI or imported from Fantasy-Calendar JSON, including during campaign creation.

Events are what populate the timeline: titled happenings with a date, a duration, a visibility, and optionally a category, a repeat pattern ("every full moon"), or conditions for complex recurrences. Events can carry consequences — world effects attached to the event, such as revealing a quest or shifting a haven's fortunes — which can be previewed before they fire and applied when the moment is right. Categories ("Wars", "Festivals", "Omens") keep the timeline browsable once it holds hundreds of entries.

The chronology views compose all of this. The timeline expands events — including repeats and multi-day durations — into occurrences you can scroll through, with warnings when an unbounded repeat had to be capped for sanity. The overlay converges timelines, sessions, and narrative pressure into one reading surface. Both respect visibility: players see Public and Party events, never GM-only ones.

## Using chronology

Setup happens once per campaign, use happens every session.

To set up: open Chronology, create your calendar (or import its JSON), and confirm it reads as the master clock. Add categories you will actually browse by — a handful of broad ones beats twenty precise ones. Then seed the past: founding of the city, the last war, the king's coronation. These backdated events are what make the timeline feel like history instead of a blank diary.

In play, the rhythm is:

1. When something date-worthy happens — a battle, a treaty, a coronation, a disappearance — add it as an event on the current date, with the visibility it deserves. Secret history is GM-only; public festivals are Public.
2. When time passes in fiction — travel montage, winter season, a three-year skip — advance the campaign date by the elapsed amount. Time-gated content unlocks, quest pressures tick, and scheduled downtime fires.
3. When preparing a session, read the timeline around the current date: what anniversaries fall this week, which repeat events fire, what the party's last visit to this region predates.

Attaching consequences to an event is a separate, deliberate step: write the effect, preview what it would do at the current date, then apply it. Preview-first is the norm — consequences touch quests, locations, and havens, and the preview tells you exactly what would change before anything does.

## Campaign configuration

The one setting most tables should know is player chronology management, in Campaign Settings under access and collaboration. Off by default, it lets players create and edit party-visible events when on. Turn it on for collaborative worldbuilding tables where the chronicler is a player; leave it off when the timeline is the GM's instrument. Either way, players never see GM-only events and never touch calendar structure.

Event visibility itself is per-event, not a setting: Public, Party, or GM-only, chosen when the event is written. Calendar import and export are available to whoever manages chronology, and deleting the master calendar is refused until another calendar is promoted — the clock must always have a master.

## Administration

No instance-wide chronology settings exist beyond what campaigns do themselves. Compile and session-note size caps set by the administrator can bound very large timeline exports, but day-to-day chronology is entirely campaign-scoped.

## Players

Players read the timeline the way characters would remember history: everything Public and Party, nothing GM-only, with repeats and anniversaries expanded for browsing. If your table enables player chronology management, you can also add and edit party-visible events — the chronicler's job, formalized. Your entries are attributed, and the GM can always see and revise them.

## Things to know

Advancing the date and advancing the world are different verbs, and reaching for the wrong one is the classic confusion. Advancing the date moves the clock; advancing the world simulates what factions, economies, and conflicts did with the elapsed time. A travel montage wants the clock. The five quiet years between arcs want both, world advance included. Also note that repeat expansion is capped — an "every day, forever" event renders a bounded window, not infinity — and that deleting a calendar orphans nothing silently: the master calendar cannot be deleted at all.

## Related features

- World advance, for simulating what changed while time passed
- Campaign history and snapshots, for freezing moments to compare later
- Discovery and revelation, for time-gated lore that unlocks by date
- Sessions and notes, for anchoring recaps to the timeline
