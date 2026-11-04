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
  documentationLabel: string;
  invitation?: { text: string; label: string; url: string };
  companions?: { title: string; description: string; image: string; documentationUrl: string; documentationLabel: string; maturity?: 'beta' }[];
};

export const features: Feature[] = [
  {
    id: 'campaign-home', category: 'Make yourself at home', layout: 'split', emphasis: 'featured', maturity: 'stable',
    title: 'Customizable Campaign Home',
    description: 'Put the next session, the latest notes, and the threads everyone is following in one welcoming place. Arrange your Campaign Home around your table, and give your instance its own look and identity.',
    images: ['campaign-home', 'branding'], documentationUrl: 'features/campaign-home-and-sidebar/', documentationLabel: 'Explore the Campaign Home',
  },
  {
    id: 'maps', category: 'A world to discover', layout: 'wide', emphasis: 'featured', maturity: 'stable',
    title: 'Interactive Maps & Layers',
    description: 'Give your world a geography your players can explore. Connect places on the map to their lore, build up layers of routes and regions, and reveal locations as the party discovers them. Return to a different date to see how the world has changed.',
    images: ['map-layers', 'maps-overview'], documentationUrl: 'features/maps-and-cartography/', documentationLabel: 'Explore Maps',
  },
  {
    id: 'lore', category: 'Give the world depth', layout: 'grid', emphasis: 'standard', maturity: 'stable',
    title: 'Worldbuilding & Lore',
    description: 'Build a connected campaign wiki that grows with every new idea and every discovery at the table.',
    images: ['timelines'], documentationUrl: 'features/wiki-and-lore/', documentationLabel: 'Explore Worldbuilding & Lore',
    companions: [
      { title: 'Multiple Timelines & Fantasy Calendars', description: 'Create and manage multiple timelines, organize events into eras, and import fantasy calendars. Track the history of your world across different periods and systems.', image: 'timelines', documentationUrl: 'features/chronology-and-calendars/', documentationLabel: 'Explore Timelines & Calendars' },
      { title: 'Ancestries & Cultures', description: 'Give ancestries a place in your world, with the traditions and details that make them your own.', image: 'ancestries', documentationUrl: 'features/wiki-and-lore/', documentationLabel: 'Explore Ancestries & Cultures' },
      { title: 'Bestiary & Creatures', description: 'Collect the beings that inhabit your setting, from familiar wildlife to the creature behind the local legend.', image: 'bestiary', documentationUrl: 'features/wiki-and-lore/', documentationLabel: 'Explore the Bestiary' },
    ],
  },
  {
    id: 'publishing', category: 'Let the story reach your players', layout: 'wide', emphasis: 'featured', maturity: 'stable',
    title: 'Journal Planner & Conditional Publishing',
    description: 'Plan in-world newspapers, journals, and recurring publication series. Schedule releases by date, session, or story conditions, so players receive new information when the campaign is ready.',
    images: ['journal'], documentationUrl: 'features/journal-and-publishing/', documentationLabel: 'Explore the Journal Planner',
  },
  {
    id: 'sessions', category: 'Keep the thread from week to week', layout: 'split', emphasis: 'featured', maturity: 'stable',
    title: 'Session Scheduling & Notes',
    description: 'Find a place on the calendar, see who can make it, and keep the notes that carry the story forward. Give each session a lasting place in the campaign, so a long break does not have to mean a lost thread.',
    images: ['session-calendar', 'session-notes'], documentationUrl: 'features/sessions-and-notes/', documentationLabel: 'Explore Sessions & Notes',
  },
  {
    id: 'recruitment', category: 'Find your people', layout: 'asymmetric', emphasis: 'featured', maturity: 'stable',
    title: 'Recruitment & Looking for Group',
    description: 'Create public campaign listings, introduce your game through a recruitment lobby, explain table expectations, and manage player applications.',
    images: ['recruitment-lobby', 'recruitment-directory'], documentationUrl: 'features/recruitment-lfg/', documentationLabel: 'Learn about Recruitment',
  },
  {
    id: 'between-sessions', category: 'Life beyond the adventure', layout: 'split', emphasis: 'featured', maturity: 'stable',
    title: 'Downtime, Holdings & Ledgers',
    description: 'Manage party properties, havens, upgrades, projects, hirelings, and shared finances. Track what your party builds, spends, and accomplishes between adventures.',
    images: ['downtime', 'ledger'], documentationUrl: 'features/downtime-and-projects/', documentationLabel: 'Explore Downtime & Projects',
  },
  {
    id: 'portability', category: 'Data portability', layout: 'wide', emphasis: 'featured', maturity: 'stable',
    title: 'Import, Export & Campaign Duplication',
    description: 'Bring existing worlds into Esiana, back up your campaigns, or duplicate a campaign to start something new. Import tools support Obsidian and Kanka, alongside Esiana backups.',
    images: ['imports', 'export'], documentationUrl: 'features/data-backup-and-export/', documentationLabel: 'View Import & Export Options',
    invitation: {
      text: 'Missing an import or export format?',
      label: 'Request it on GitHub',
      url: 'https://github.com/Esiana-ttrpg/esiana-core/issues/new/choose?utm_source=chatgpt.com',
    },
  },
  {
    id: 'everyday', category: 'Details that keep you moving', layout: 'grid', emphasis: 'standard', maturity: 'stable',
    title: 'Characters, Quests & Search',
    description: 'Keep the cast, the open questions, and the next lead close at hand.',
    images: ['characters'], documentationUrl: 'features/wiki-and-lore/', documentationLabel: 'Explore Characters, Quests & Search',
    companions: [
      { title: 'Characters & Custom Sheets', description: 'Bring portraits, descriptions, relationships, and structured details together on character pages.', image: 'characters', documentationUrl: 'features/wiki-and-lore/', documentationLabel: 'Explore Characters' },
      { title: 'Quests & Adventure Tracking', description: 'Keep quests and leads in view, ready for the moment your players decide to follow them.', image: 'quests', documentationUrl: 'features/narrative-threads/', documentationLabel: 'Explore Quests & Threads' },
      { title: 'Global Search & Command Palette', description: 'Jump to a person, place, or page through the command palette, without losing your train of thought.', image: 'search', documentationUrl: 'features/wiki-and-lore/', documentationLabel: 'Explore Search' },
    ],
  },
  {
    id: 'extensibility', category: 'Room for your way of playing', layout: 'wide', emphasis: 'featured', maturity: 'stable',
    title: 'Custom Fields, Plugins & API',
    description: 'Adapt Esiana to different game systems and workflows. Create custom fields, register application-provided data, and build integrations using Esiana’s API. Plugin support is currently in Beta.',
    images: ['custom-fields'], documentationUrl: 'api/overview/', documentationLabel: 'Explore the API',
  },
  {
    id: 'extensions', category: 'Experimental & Beta Features', layout: 'grid', emphasis: 'standard', maturity: 'beta',
    title: 'Plugins & World Development',
    description: 'These Beta features are still evolving. Explore them at your table and help shape what they become.',
    images: ['plugins'], documentationUrl: 'features/plugins-overview/', documentationLabel: 'Explore Beta Features',
    companions: [
      { title: 'Plugins & Content Packs', description: 'Add plugins and content packs to support the way your campaign works.', image: 'plugins', documentationUrl: 'features/plugins-overview/', documentationLabel: 'Explore Plugins & Content Packs', maturity: 'beta' },
      { title: 'World Development', description: 'Explore tools for reviewing world developments as campaign time advances. Suggestions are optional and must be enabled.', image: 'world-development', documentationUrl: 'features/world-advance/', documentationLabel: 'Explore World Development', maturity: 'beta' },
    ],
  },
  {
    id: 'connections', category: 'Make it yours. Keep it connected.', layout: 'grid', emphasis: 'standard', maturity: 'stable',
    title: 'Profiles & Integrations',
    description: 'Personalize how you take part and connect the tools you already use.',
    images: ['profiles'], documentationUrl: 'options/user-account-settings/', documentationLabel: 'Explore Profiles & Integrations',
    companions: [
      { title: 'Profiles & Personalization', description: 'Introduce yourself through your profile and choose the account preferences that suit you.', image: 'profiles', documentationUrl: 'options/user-account-settings/', documentationLabel: 'Explore Profiles & Preferences' },
      { title: 'Personal API Keys', description: 'Create personal API keys to connect applications with the campaigns you can access.', image: 'api-keys', documentationUrl: 'api/authentication/', documentationLabel: 'Learn about API Keys' },
      { title: 'Webhooks & Discord Integrations', description: 'Connect campaign announcements to Discord and other tools with outgoing webhooks.', image: 'webhooks', documentationUrl: 'options/campaign-settings/', documentationLabel: 'Explore Webhooks & Discord', maturity: 'beta' },
    ],
  },
];
