---
title: "Dashboards & Integrations"
---

Add Esiana to your favorite self-hosted dashboard. Whether you want a quick shortcut to your campaigns, a count of your worlds, or a reminder of your next session, the examples below will help you get started.

Replace `https://esiana.example.com` with your Esiana instance URL. The examples use the instance's existing `/favicon.svg`; use a local copy if your dashboard cannot fetch it.

The configurations below are **illustrative**: their syntax follows the linked dashboard documentation and their Esiana routes and response fields were checked against core, but they have not been tested against every dashboard release or deployment. Merge snippets into your existing configuration; do not replace an entire configuration file with a fragment.

## Before you begin

Basic shortcuts and status widgets don't require an API key. Widgets displaying campaign information or upcoming sessions require a key with the `campaign:read` scope.

See [API authentication](../api/authentication.md) for help creating a key. Keep your API keys and calendar subscription links private, and remember that anyone with access to your dashboard can see the information displayed on it.

## Homepage

Add this shortcut to `services.yaml`. It uses the online status in Homepage's [Custom API service widget](https://gethomepage.dev/widgets/services/customapi/).

```yaml
- Campaigns:
    - Esiana:
        href: https://esiana.example.com/
        icon: https://esiana.example.com/favicon.svg
        description: Campaign & Worldbuilding Manager
        widget:
          type: customapi
          url: https://esiana.example.com/api/health
          mappings:
            - field: status
              label: API
              format: text
```

For a separate campaign count, add this service to `services.yaml` instead of, or alongside, the status example. Homepage's `size` format counts the returned `campaigns` array. The count includes campaigns the key owner belongs to and public campaigns they have not joined; it is not an instance-wide total. Keep the key private.

```yaml
- Campaigns:
    - Esiana campaigns:
        href: https://esiana.example.com/
        icon: https://esiana.example.com/favicon.svg
        widget:
          type: customapi
          url: https://esiana.example.com/api/campaigns
          headers:
            Authorization: "Bearer REPLACE_WITH_API_KEY"
          mappings:
            - field: campaigns
              label: Campaigns
              format: size
```

For Docker discovery, this alternative adds a shortcut and the same status widget as labels on the Esiana service in Compose. Configure Homepage's Docker access and discovery first; see [Homepage Docker configuration](https://gethomepage.dev/configs/docker/).

```yaml
services:
  esiana:
    labels:
      - homepage.group=Campaigns
      - homepage.name=Esiana
      - homepage.href=https://esiana.example.com/
      - homepage.icon=https://esiana.example.com/favicon.svg
      - homepage.widget.type=customapi
      - homepage.widget.url=https://esiana.example.com/api/health
      - homepage.widget.mappings[0].field=status
      - homepage.widget.mappings[0].label=API
      - homepage.widget.mappings[0].format=text
```

## Glance

Add any fragment to a column's `widgets` list in `glance.yml`. See [Glance custom API widgets](https://github.com/glanceapp/glance/blob/main/docs/custom-api.md).

This counts campaigns returned to the token owner, including public campaigns they have not joined. It is not a count of memberships or all campaigns on the instance.

```yaml
- type: custom-api
  title: Campaigns
  url: https://esiana.example.com/api/campaigns
  headers:
    Authorization: "Bearer REPLACE_WITH_API_KEY"
  template: |
    <p>{{ len (.JSON.Array "campaigns") }} campaigns</p>
```

This shows scheduled sessions over the next 30 days, in chronological order. It shows confirmed sessions only: published sessions, excluding projected occurrences and skipped sessions. Times are returned in UTC; an empty list means no matching published sessions in this window, not necessarily that no future session exists. The schedule endpoint requires `from` and `to` and limits the range to 62 days. The request below builds a rolling window.

```yaml
- type: custom-api
  title: Upcoming sessions
  template: |
    {{ $schedule := newRequest "https://esiana.example.com/api/user/schedule"
      | withParameter "from" (now | formatTime "RFC3339")
      | withParameter "to" (offsetNow "720h" | formatTime "RFC3339")
      | withHeader "Authorization" "Bearer REPLACE_WITH_API_KEY"
      | getResponse }}
    {{ if eq $schedule.Response.StatusCode 200 }}
      <ul>
      {{ range $schedule.JSON.Array "entries" }}
        {{ if and (eq (.String "kind") "MATERIALIZED") (eq (.String "status") "PUBLISHED") ((parseTime "RFC3339" (.String "plannedStartAt")).After (now)) ((parseTime "RFC3339" (.String "plannedStartAt")).Before (offsetNow "720h")) }}
          <li>{{ .String "campaignName" }}: {{ .String "sessionTitle" }} - {{ .String "plannedStartAt" }}</li>
        {{ end }}
      {{ end }}
      </ul>
    {{ else }}
      <p>Schedule unavailable ({{ $schedule.Response.Status }}).</p>
    {{ end }}
```

For a compact alternative, this shows the first confirmed session in the same rolling 30-day window. It shows a message when none is found.

```yaml
- type: custom-api
  title: Next session
  template: |
    {{ $schedule := newRequest "https://esiana.example.com/api/user/schedule"
      | withParameter "from" (now | formatTime "RFC3339")
      | withParameter "to" (offsetNow "720h" | formatTime "RFC3339")
      | withHeader "Authorization" "Bearer REPLACE_WITH_API_KEY"
      | getResponse }}
    {{ if eq $schedule.Response.StatusCode 200 }}
      {{ $found := false }}
      {{ range $schedule.JSON.Array "entries" }}
        {{ if and (not $found) (eq (.String "kind") "MATERIALIZED") (eq (.String "status") "PUBLISHED") ((parseTime "RFC3339" (.String "plannedStartAt")).After (now)) ((parseTime "RFC3339" (.String "plannedStartAt")).Before (offsetNow "720h")) }}
          <p>{{ .String "campaignName" }}: {{ .String "sessionTitle" }}<br>{{ .String "plannedStartAt" }}</p>
          {{ $found = true }}
        {{ end }}
      {{ end }}
      {{ if not $found }}<p>No confirmed sessions in the next 30 days.</p>{{ end }}
    {{ else }}
      <p>Schedule unavailable ({{ $schedule.Response.Status }}).</p>
    {{ end }}
```

Store the key using Glance's supported secret or environment configuration where possible. Avoid sharing the rendered dashboard with people who should not see the schedule.

## Homarr

In **Management > Apps**, create an app with these values, then add it to a board using an App tile or Bookmarks widget. The optional Ping URL checks the API separately from the link destination. See [Homarr apps](https://homarr.dev/docs/management/apps/).

| Field | Example |
|-------|---------|
| Name | `Esiana` |
| URL | `https://esiana.example.com/` |
| Icon URL | `https://esiana.example.com/favicon.svg` |
| Ping URL | `https://esiana.example.com/api/health` |

To show the API status in Homarr's Custom API widget, use a version with Custom Widgets v2:

1. Open **Management > Custom Widgets** and create a widget. Configure its `default` HTTP source with base URL `https://esiana.example.com` and authentication `none`.
2. Add a load query named `health` with path `/api/health`. In the JSX template editor, enter:

   ```jsx
   <div>Esiana API: {data.health?.status ?? "Loading or unavailable"}</div>
   ```

3. Run **Test and preview**, check that the response includes `status: "ok"`, and save the definition.
4. Edit your board, choose **Add board content > Custom API**, select the saved definition, and choose a refresh interval.

See [Homarr's authoring guide](https://homarr.dev/docs/management/custom-widgets/authoring/) and [Custom API widget guide](https://homarr.dev/docs/widgets/custom-api/). The source must be reachable from Homarr; this public status example needs no credential. No Esiana-specific native integration is required.

## Dashy

Add this to `conf.yml`. The status indicator checks the public API endpoint while the tile opens Esiana. See [Dashy status indicators](https://dashy.to/docs/status-indicators/) and [configuration](https://dashy.to/docs/configuring/).

```yaml
sections:
  - name: Campaigns
    items:
      - title: Esiana
        url: https://esiana.example.com/
        icon: https://esiana.example.com/favicon.svg
        statusCheck: true
        statusCheckUrl: https://esiana.example.com/api/health
```

The status indicator depends on Dashy's network access and status-check configuration. Alternatively, add this [API Response widget](https://dashy.to/docs/widgets/#api-response) to a section's `widgets` list:

```yaml
- type: customapi
  useProxy: true
  options:
    url: https://esiana.example.com/api/health
    refreshInterval: 60000
    mappings:
      - field: status
        label: Esiana API
        format: text
```

This generic widget requires a Dashy version that includes API Response. No Esiana-specific widget is needed.

## Homer

Add a service to `assets/config.yml` using [Homer's service configuration](https://github.com/bastienwirtz/homer/blob/main/docs/configuration.md):

```yaml
services:
  - name: Campaigns
    items:
      - name: Esiana
        subtitle: Campaign & Worldbuilding Manager
        logo: https://esiana.example.com/favicon.svg
        url: https://esiana.example.com/
```

## Heimdall

Add a regular application link in the Heimdall interface: name it `Esiana`, set its URL to `https://esiana.example.com/`, and use the instance favicon or upload a copy as its icon. This is a basic shortcut; see [Heimdall](https://github.com/linuxserver/Heimdall) for application setup.

## More ways to connect Esiana

- **Calendar:** Esiana's Schedule includes calendar subscription and `.ics` download controls. Open Schedule in Esiana to create or manage a subscription. Add that iCal URL to a calendar widget or calendar service that supports iCal subscriptions. A subscription link grants access to its feed; treat it as a password.
- **Discord:** See [Discord destinations](../api/campaigns.md#discord-destinations) for campaign webhook configuration.
- **OPDS:** The running instance exposes its catalog and reader credential operations in its [OpenAPI reference](../api/overview.md).
- **Authentication:** [API authentication](../api/authentication.md) covers keys, scopes, sessions, and expiry.
- **Health and uptime:** The [API overview](../api/overview.md) describes the public health endpoint; an HTTP uptime monitor can check it independently of a dashboard.
