# Knowledge model

Deep dive on **Knowledge** — see [Campaign model § Knowledge](campaign-model.md#knowledge).

---

## What knowledge is

Sovereign lore facts attached to entities:

| Construct | Role |
|-----------|------|
| **Lore claims** | Attributed statements with sources |
| **Historical aliases** | Past names for an entity |
| **Citations** | Provenance linking claims to sources |

Knowledge is stored in interpretive overlay tables — not duplicated as unstructured wiki prose alone.

---

## Export and import

Lore claims and historical aliases round-trip in sovereign ZIP as **`sovereign/knowledge.json`**. This is Tier A remediation — GM portable archives must preserve party-facing lore state.

Fog **presence rows** are Tier B: visibility metadata round-trips; projection rows rebuild on restore.

**In practice:** Party-facing belief states (`KNOWN`, `SUSPECTED`, …) on lore claims drive codex badges and Discovery inspector grouping — see [Discovery & revelation](../features/discovery-and-revelation.md).

---

## Extension after schema freeze

Post-1.0 work should extend via:

- UI projections over existing tables
- `ContentPresenceState` with entity types `historical_alias`, `lore_interpretation`, `lore_claim`
- `stableKey` for imports and reveal workflows

Avoid parallel claim/alias systems.

---

## See also

- [Sovereign export](sovereignty.md)
- [Discovery system](discovery-system.md)
