export type Feature = {
  id: string;
  title: string;
  description: string;
  category: string;
  layout: 'wide' | 'split' | 'grid' | 'asymmetric';
  emphasis: 'featured' | 'standard' | 'secondary';
  maturity: 'stable' | 'beta' | 'in-development';
  images: string[];
  documentationUrl: string;
  invitation?: { text: string; label: string; url: string };
  companions?: { title: string; description: string; image: string; documentationUrl: string; maturity?: 'beta' }[];
};

export const features: Feature[] = [
  {
    id: 'campaign-home', category: 'Make yourself at home', layout: 'split', emphasis: 'featured', maturity: 'stable',
    title: 'A home that feels like your campaign.',
    description: 'Put the next session, the latest notes, and the threads everyone is following in one welcoming place. Arrange your campaign dashboard around your table, and give your instance its own look and identity.',
    images: ['campaign-home', 'branding'], documentationUrl: 'features/campaign-home-and-sidebar/',
  },
  {
    id: 'maps', category: 'A world to discover', layout: 'wide', emphasis: 'featured', maturity: 'stable',
    title: 'Every place has a story. Follow it.',
    description: 'Give your world a geography your players can explore. Connect places on the map to their lore, build up layers of routes and regions, and reveal locations as the party discovers them. Return to a different date to see how the world has changed.',
    images: ['map-layers', 'maps-overview'], documentationUrl: 'features/maps-and-cartography/',
  },
  {
    id: 'lore', category: 'Give the world depth', layout: 'grid', emphasis: 'standard', maturity: 'stable',
    title: 'History, inhabitants, and everything between.',
    description: 'Build a connected campaign wiki that grows with every new idea and every discovery at the table.',
    images: ['timelines'], documentationUrl: 'features/wiki-and-lore/',
    companions: [
      { title: 'History on your own calendar', description: 'Keep multiple timelines and bring in a fantasy calendar that follows the rhythms of your world.', image: 'timelines', documentationUrl: 'features/chronology-and-calendars/' },
      { title: 'Peoples with a past', description: 'Give ancestries a place in your world, with the traditions and details that make them your own.', image: 'ancestries', documentationUrl: 'features/wiki-and-lore/' },
      { title: 'Creatures worth remembering', description: 'Collect the beings that inhabit your setting, from familiar wildlife to the creature behind the local legend.', image: 'bestiary', documentationUrl: 'features/wiki-and-lore/' },
    ],
  },
  {
    id: 'publishing', category: 'Let the story reach your players', layout: 'wide', emphasis: 'featured', maturity: 'stable',
    title: 'The next dispatch, at just the right moment.',
    description: 'Write the town broadsheet, an expedition journal, or a letter that changes everything. Organize recurring publications into series, then hold each release until the right date, session, or story condition. Your players get the news when the fiction is ready for it.',
    images: ['journal'], documentationUrl: 'features/journal-and-publishing/',
  },
  {
    id: 'sessions', category: 'Keep the thread from week to week', layout: 'split', emphasis: 'featured', maturity: 'stable',
    title: 'Make the next session easy to return to.',
    description: 'Find a place on the calendar, see who can make it, and keep the notes that carry the story forward. Give each session a lasting place in the campaign, so a long break does not have to mean a lost thread.',
    images: ['session-calendar', 'session-notes'], documentationUrl: 'features/sessions-and-notes/',
  },
  {
    id: 'recruitment', category: 'Find your people', layout: 'asymmetric', emphasis: 'featured', maturity: 'stable',
    title: 'A good table starts before the first session.',
    description: 'Let players discover campaigns that speak to them. A recruitment lobby gives your game room to introduce its setting, its GM, its expectations, and its approach to safety before anyone asks to join.',
    images: ['recruitment-lobby', 'recruitment-directory'], documentationUrl: 'features/recruitment-lfg/',
  },
  {
    id: 'between-sessions', category: 'Life beyond the adventure', layout: 'split', emphasis: 'featured', maturity: 'stable',
    title: 'Build something to come back to.',
    description: 'Restore a haven, take on a long project, and keep track of the people and property the party cares about. Shared ledgers bring funds and obligations into the same continuing story.',
    images: ['downtime', 'ledger'], documentationUrl: 'features/downtime-and-projects/',
  },
  {
    id: 'portability', category: 'Your world stays yours', layout: 'wide', emphasis: 'featured', maturity: 'stable',
    title: 'Bring your worlds with you.',
    description: 'Import existing material, export your campaigns, and duplicate worlds for new adventures. Build on the stories you have already written, and keep your worldbuilding portable as your plans change.',
    images: ['imports', 'export'], documentationUrl: 'features/data-backup-and-export/',
    invitation: {
      text: 'Missing an import or export format?',
      label: 'Request a feature on GitHub',
      url: 'https://github.com/Esiana-ttrpg/esiana-core/issues/new/choose?utm_source=chatgpt.com',
    },
  },
  {
    id: 'everyday', category: 'Details that keep you moving', layout: 'grid', emphasis: 'standard', maturity: 'stable',
    title: 'Less searching. More storytelling.',
    description: 'Keep the cast, the open questions, and the next lead close at hand.',
    images: ['characters'], documentationUrl: 'features/wiki-and-lore/',
    companions: [
      { title: 'A place for every character', description: 'Bring portraits, descriptions, relationships, and structured details together on character pages.', image: 'characters', documentationUrl: 'features/wiki-and-lore/' },
      { title: 'Follow the unfinished stories', description: 'Keep quests and leads in view, ready for the moment your players decide to follow them.', image: 'quests', documentationUrl: 'features/narrative-threads/' },
      { title: 'Find the thought you need', description: 'Jump to a person, place, or page through the command palette, without losing your train of thought.', image: 'search', documentationUrl: 'features/wiki-and-lore/' },
    ],
  },
  {
    id: 'extensibility', category: 'Room for your way of playing', layout: 'wide', emphasis: 'featured', maturity: 'stable',
    title: 'A world should have room to grow.',
    description: 'Add custom fields for the details your setting needs. Register applications and connect your own tools through Esiana’s API, so your campaign can grow beyond the shape it started in.',
    images: ['custom-fields'], documentationUrl: 'api/overview/',
  },
  {
    id: 'extensions', category: 'Explore what comes next', layout: 'grid', emphasis: 'standard', maturity: 'beta',
    title: 'New possibilities for a living world.',
    description: 'These Beta features are still evolving. Explore them at your table and help shape what they become.',
    images: ['plugins'], documentationUrl: 'features/plugins-overview/',
    companions: [
      { title: 'Choose your extensions', description: 'Add plugins and content packs to support the way your campaign works.', image: 'plugins', documentationUrl: 'features/plugins-overview/', maturity: 'beta' },
      { title: 'Let the world move forward', description: 'Explore tools for reviewing world developments as campaign time advances. Suggestions are optional and must be enabled.', image: 'world-development', documentationUrl: 'features/world-advance/', maturity: 'beta' },
    ],
  },
  {
    id: 'connections', category: 'Make it yours. Keep it connected.', layout: 'grid', emphasis: 'standard', maturity: 'stable',
    title: 'Your place at the table, and beyond.',
    description: 'Personalize how you take part and connect the tools you already use.',
    images: ['profiles'], documentationUrl: 'options/user-account-settings/',
    companions: [
      { title: 'Show up as yourself', description: 'Introduce yourself through your profile and choose the account preferences that suit you.', image: 'profiles', documentationUrl: 'options/user-account-settings/' },
      { title: 'Bring your own tools', description: 'Create personal API keys to connect applications with the campaigns you can access.', image: 'api-keys', documentationUrl: 'api/authentication/' },
      { title: 'Let the news travel', description: 'Connect campaign announcements to Discord and other tools with outgoing webhooks.', image: 'webhooks', documentationUrl: 'options/campaign-settings/', maturity: 'beta' },
    ],
  },
];
