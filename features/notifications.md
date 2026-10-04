# Notifications

Esiana is quiet software in a loud hobby. Sessions get scheduled, applications get decided, exports finish, roles change — and none of it matters if the right person never hears about it. Notifications are the inbox that closes that loop: a bell in the header, a full inbox page, and optional email for everything the table would otherwise lose to chat scroll.

Every account gets its own inbox. Items arrive with deep links to whatever they concern — the session, the application, the finished export — so a notification is the start of the action, not just news of it. An unread badge counts what needs you; the inbox itself is the archive of what already happened.

## How it works

Two channels, one inbox. In-app delivery is always on: the bell badge and the inbox page work with no configuration at all. Email is opt-in per type of event and requires the instance to have mail configured — without it, the email toggles simply do nothing, and everything still arrives in-app. Each person controls their own preferences per event type, plus a global mute-until for vacations and busy months. Polling checks for new items about once a minute and pauses when the tab is hidden, so the bell stays fresh without chatter.

The events that notify cover the campaign lifecycle end to end. Join requests tell the GM someone applied and tell the applicant when they are accepted or declined (with the decline reason, when the GM wrote one). Role changes tell the affected member. Ownership transfer notifies the offer target, the initiator, and the roster at each step. Session scheduling notifies the party on publish, change, and cancellation, with a reminder before the game; RSVP updates digest to the GM rather than pinging per player. Background exports notify the requester when ready or failed. Invite emails and password resets travel the same mail path when the GM or the account flow triggers them.

## Using notifications

For most people, usage is two habits: glance at the bell, and set preferences once. Open User Settings → Notifications early and decide per event type whether you want in-app, email, both, or neither. If your table schedules by chat and plays by calendar, keep session emails on and mute the rest; if you live in Esiana, the inbox alone may suffice. Set a mute-until before holidays rather than letting a hundred items pile up.

Two troubleshooting notes cover most confusion. If email never arrives, the cause is almost always upstream of you: the instance has no mail configured (ask the administrator), or the address on your account is stale. And if session alerts go missing, check the per-type toggles before assuming the GM forgot — a disabled session type silences exactly the mail you are waiting for.

## Administration

Mail is the administrator's piece. In Admin → General Settings → SMTP, the admin configures host, port, credentials, and sender address, with a test button that sends to themselves — the single fastest way to verify the whole path. Email links back into the app need the public base URL configured alongside, or links arrive pointing at localhost. The bell polling interval is also adjustable within a sane range. Password resets and invite-by-email both depend on this configuration; without it, resets cannot send and invites fall back to shareable links.

## Things to know

Notifications inform; they do not permission. Receiving a notification about something never grants access to it — visibility rules still apply when you follow the link. Decline reasons travel only when the GM writes one; a bare decline is a decision without commentary, by the GM's choice. And exports notify only their requester: a finished backup does not announce itself to the table, which is correct, since backups are the GM's business.

## Related features

- Sessions and notes, for the scheduling workflow that generates most notifications
- Recruitment and LFG, for application decisions
- Data backup and export, for background export alerts
