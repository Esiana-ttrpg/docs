# Campaign Genre Themes

Genre themes describe the **narrative tone and setting** of your campaign. They are metadata tags used in recruitment listings, the global hub, and LFG discovery — not visual UI themes (those live under **Campaign Settings → Themes**).

---

## How to set themes

| Surface | Path |
|---------|------|
| **New campaign wizard** | Core Identity step → Genre themes |
| **Recruitment settings** | Campaign Settings → Recruitment → Genre themes |

Pick from the catalog below, or add **custom themes** (3–60 characters) when your tone is not listed. You can select multiple themes (up to 20).

Catalog selections are stored as stable **slugs** (for example, `high-fantasy-heroic`). Custom entries are stored as plain text.

---

## Catalog reference

### Fantasy & Myth

| Label | Slug |
|-------|------|
| High Fantasy / Heroic | `high-fantasy-heroic` |
| Dark Fantasy / Grimdark | `dark-fantasy-grimdark` |
| Sword & Sorcery | `sword-and-sorcery` |
| Mythic Antiquity | `mythic-antiquity` |
| Arthurian Romance | `arthurian-romance` |
| Feywild / Enchanted Forest | `feywild-enchanted-forest` |
| Eastern Fantasy / Wuxia | `eastern-fantasy-wuxia` |

### Sci-Fi & Future

| Label | Slug |
|-------|------|
| Space Opera | `space-opera` |
| Hard Sci-Fi | `hard-sci-fi` |
| Cyberpunk | `cyberpunk` |
| Biopunk / Gene-Splicing | `biopunk-gene-splicing` |
| Mecha / Tactical Armor | `mecha-tactical-armor` |
| Retro-Futurism / Atompunk | `retro-futurism-atompunk` |
| Post-Apocalyptic Wasteland | `post-apocalyptic-wasteland` |
| Steampunk | `steampunk` |
| Dieselpunk | `dieselpunk` |
| Gaslamp Fantasy | `gaslamp-fantasy` |

### Historical & Alt-History

| Label | Slug |
|-------|------|
| Pirates & High Seas | `pirates-high-seas` |
| Wild West / Weird West | `wild-west-weird-west` |
| Samurai Cinema / Feudal | `samurai-cinema-feudal` |
| Alternate History | `alternate-history` |

### Horror & Thriller

| Label | Slug |
|-------|------|
| Cosmic Horror | `cosmic-horror` |
| Gothic Horror | `gothic-horror` |
| Survival Horror | `survival-horror` |
| Noir Detective | `noir-detective` |
| Psychological Thriller | `psychological-thriller` |
| Folk Horror | `folk-horror` |
| Slasher / Grindhouse | `slasher-grindhouse` |

### Urban & Modern

| Label | Slug |
|-------|------|
| Urban Fantasy | `urban-fantasy` |
| Magical Girls / Dual Identity | `magical-girls-dual-identity` |
| Superheroes / Vigilantes | `superheroes-vigilantes` |
| Spies & Espionage | `spies-espionage` |
| Meiji / Taisho Industrial | `meiji-taisho-industrial` |
| Pop-Postmodern / Retro 80s | `pop-postmodern-retro-80s` |
| Cozy / Solarpunk | `cozy-solarpunk` |

### Campaign Structure

| Label | Slug |
|-------|------|
| Heist / Criminal Underworld | `heist-criminal-underworld` |
| Political Intrigue / Noble Houses | `political-intrigue-noble-houses` |
| Military / War Campaign | `military-war-campaign` |
| Survival / Hexcrawl | `survival-hexcrawl` |
| Dungeon Crawler | `dungeon-crawler` |
| Planar Travel / Multiverse | `planar-travel-multiverse` |
| Time Travel / Chrono-Trigger | `time-travel-chrono-trigger` |
| Isekai / Portal Fantasy | `isekai-portal-fantasy` |

---

## API

`GET /api/campaign-themes` returns the full catalog for pickers and integrations.

Recruitment directory filtering accepts `genreThemes` as a comma-separated slug list on `GET /api/recruitment/all` (for example, `?genreThemes=cyberpunk,space-opera`). Campaigns match when they include **any** selected theme.

---

## Related docs

- [Recruitment & LFG](features/recruitment-lfg.md)
- [Campaign settings](options/campaign-settings.md)
