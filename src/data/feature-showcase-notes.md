# Showcase asset notes

`feature-images.json` inventories all 33 supplied screenshots, including original
filenames, dimensions, feature mapping, maturity, prominence, visual descriptions,
review notes, and optimized image paths and sizes. `feature-showcase.ts` defines
the public editorial sequence and links to existing guides.

Originals remain untouched in the supplied Esiana Photos folder. Recreate the
committed WebP assets with Python and Pillow:

```sh
python scripts/prepare-showcase-images.py /path/to/Esiana\ Photos
```

Four responsive widths are produced where possible: 480, 960, 1440, and native
width, with duplicates removed. No image is enlarged, cropped, or recolored.
Small previews use responsive sources; enlargement loads native-width WebP on
demand. Screenshot links work without JavaScript; with JavaScript they open a
native modal with Escape, a Close button, and focus restored to the trigger.

Primary views favor populated content. The alternate global home, recruitment
lobby theme, empty session overview, account preferences, and development settings
are recorded rather than repeated throughout the page. Two alternate campaign
views are available in a collapsed, native details element.

Expanded campaign permissions are in development and excluded from the showcase.
Plugins, Webhooks, and World Development carry Beta labels. Ongoing polish for
character pages, quests, and timelines is internal context, not a public status.
The World Development image shows suggestions disabled; its caption and copy
acknowledge that state. No completed development suggestions are depicted.

The supplied branding screenshot is instance-wide; it is not presented as a
per-campaign branding editor. Custom fields show an external application's
system-specific example; the copy describes customization, not a rules engine.

Validation completed with the Astro production build and repository link checker
(84 documentation pages, static assets, anchors, edit links, and search output).
Headless Edge checks at 1440, 768, and 390 pixels in both themes found no horizontal
overflow, broken visible images, console errors, or automated WCAG A/AA violations
using axe. Keyboard enlargement, Escape, focus restoration, and the no-JavaScript
image link and details fallback passed. Desktop and mobile screenshots were also
visually reviewed. Existing Mermaid bundle-size and empty-i18n warnings remain.
