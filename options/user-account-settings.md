# User Account Settings

User Settings is the one place that is entirely yours: your identity, your appearance, your reusable GM preferences, your notifications, your API keys, and your sign-in security. Campaign memberships live separately, on the campaigns page — settings here follow you across every table you join.

## Profile and identity

Your profile is how the platform sees you: display name, avatar, pronouns, bio, social links, timezone. The public profile shows a subset to the world; the rest stays in-app. Two overrides matter. First, a campaign can bind you to a character identity page, in which case sessions and rosters show the character, not your profile name — your profile does not change, it is simply not what that table displays. Second, your timezone drives how scheduled times render for you, so set it honestly if your table spans continents.

## Campaign defaults: your reusable GM kit

Anyone who runs games accumulates a kit: the safety tools they always use, the table style they run, the genre themes they prefer, the documents they hand every new group, the pitch they send with applications. Campaign Defaults stores that kit so each new campaign starts from your standards instead of a blank form. Style tags appear on your public profile; table and safety defaults, genre themes, document templates, and the default recruitment pitch flow into the creation wizard and new listings. Set this up once, preferably before you need it — the wizard can only import what already exists.

## Appearance

Your personal theme — foundation, genre overlay, palette, background tint — follows you everywhere, with one caveat: campaigns and the instance can assert their own look over yours. A campaign theme set by its GM wins on that campaign's pages; the instance default frames everything else. If the app looks different inside one campaign than everywhere else, that is the campaign's theme doing its job, and there is a personal option governing whether you allow such overrides.

## Notifications

Per event type, choose in-app, email, both, or neither, plus a global mute-until for time away. Email needs two things outside your control: the instance must have mail configured, and your account needs a current address. Without the first, email toggles wait quietly; everything still arrives in the inbox. Notification emails deep-link back into settings, so a stray "manage preferences" click lands where it should. The full event catalog and the administrator's side are covered in the notifications guide.

## Developer keys

Developer Keys mints personal API tokens for automation and integrations: name the token, pick a duration of 30, 90, or 365 days, and grant the narrowest scopes that work. The secret is shown exactly once at creation — lose it and you mint again rather than recover it. Tokens act as you and expire on schedule; revoking kills one immediately. Minting is rate-limited against abuse. Your daily API usage for the account is visible on the same screen, aggregated across every campaign your tokens touch. The authentication guide explains scopes and bearer use for integrators; most humans never need this tab, and that is fine.

## Account and security

Email, password, linked external sign-ins, and account deletion live under Account & Security, deliberately apart from the public profile. Passwords need eight characters minimum; changing yours signs older sessions out. External providers can be linked when emails match and unlinked while another sign-in method remains — the page refuses to strand you with no way in, including refusing to remove your last method or delete around an active lock. Forgot-password sends a one-hour reset link when the instance has mail; it always reports success whether or not the address exists, so no one can probe for accounts. Deleting the account itself removes the avatar, the record, and the session — campaigns you ran need new owners first, since ownership cannot evaporate.

## Things to know

Your settings are yours, but their effects are contextual: name, theme, and notification choices bend wherever a campaign or instance asserts its own. Campaign Defaults only help future campaigns — nothing here retrofits tables you already run. And the security posture is conservative on purpose: single-use secrets, expiring resets, no account enumeration, no last-method removal. When the page refuses something, it is protecting the account, not malfunctioning.

## Related features

- Campaign settings, for the per-table counterpart to everything here
- Notifications, for the event catalog behind the toggles
- Recruitment and LFG, for the pitch your defaults pre-fill
