# Plugin development

Build campaign-scoped extensions against a local Esiana instance.

**Prerequisite:** [Campaign model](../architecture/campaign-model.md)

| Guide | Topic |
|-------|-------|
| [Getting started](getting-started.md) | 30-minute hello-world |
| [Hello world](hello-world.md) | Step-by-step walkthrough |
| [Manifests](manifests.md) | `manifest.json` reference |
| [Capabilities](capabilities.md) | Permissions and extension points |
| [Events](events.md) | Domain event bus |
| [Storage](storage.md) | Plugin data and secrets |
| [UI extensions](ui-extensions.md) | Frontend slots |
| [Security](security.md) | Trust tiers and sandboxing |
| [Publishing to registry](publishing-to-registry.md) | Catalog install via Admin |
| [Troubleshooting](troubleshooting.md) | Common failures |

REST reference: `/api/docs` on your running backend. Example plugin: [`community-plugins/example-plugin`](../../community-plugins/example-plugin/README.md).

Engineering appendices (in `esiana-core`): [capability matrix](../../esiana-core/docs/plugins/capability-matrix.md) · [security model](../../esiana-core/docs/plugins/security-model.md)
