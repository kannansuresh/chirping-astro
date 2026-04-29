---
title: 'Comments with Giscus, theme- and locale-synced'
description: 'Wire up Giscus end-to-end — install the GitHub App, generate the IDs, set the env vars, sync theme + locale, and toggle comments per post.'
pubDate: 2026-04-22
tags: [giscus, comments, github, discussions]
categories: [Tutorials]
translationKey: comments-with-giscus
heroImage: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80&auto=format&fit=crop'
heroImageAlt: 'Speech bubbles drawn on a chalkboard'
toc: true
---

Comments on this theme are powered by [Giscus](https://giscus.app),
which uses **GitHub Discussions** as the backend. No database, no
moderation panel to log into — every comment is a discussion you can
manage from the GitHub UI you already use.

If you scroll to the bottom of this post (and Giscus is configured),
you will see the embed live. If it isn't yet, you'll see a friendly
**setup guide** instead — the theme detects placeholder values and
nudges you to fill them in.

## Setup, end-to-end

### 1. Install the Giscus GitHub App

Visit <https://github.com/apps/giscus> and grant the app access to the
repository that will host your discussions. This is **the** repository
where every comment will live as a Discussion.

> **Heads up:** the repo must be **public**, and Discussions must be
> enabled in _Settings → General → Features_.

### 2. Generate the IDs

Open <https://giscus.app> and answer the prompts:

- **Repository** — the one you installed the app on.
- **Page → Discussions Mapping** — choose **`pathname`**. This makes
  EN and FR translations of the same article get **separate** threads,
  which is what you want.
- **Discussion Category** — pick or create one (e.g. `Announcements`,
  `Comments`). Make sure it's an **announcement-style** category so
  readers can't open new top-level discussions on you.
- The page generates four values: `repo`, `repoId`, `category`,
  `categoryId`. Copy them.

### 3. Set the environment variables

Copy `.env.example` to `.env` and fill in the values:

```env title=".env"
PUBLIC_GISCUS_ENABLED=true
PUBLIC_GISCUS_REPO=your-handle/your-repo
PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxxx
PUBLIC_GISCUS_CATEGORY=Announcements
PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxxx
```

Restart `bun run dev`. The setup notice should disappear and a real
embed should mount in its place.

You can also bypass `.env` entirely and edit
[`src/config.ts`](src/config.ts) directly — `GISCUS` is a typed
object with all the same fields.

## Behaviour

- Giscus is rendered **only on post pages** (not on listings, the
  home page, the about page, or 404).
- It is rendered **only when** `GISCUS.enabled` is `true` **and** the
  post does not opt out.
- The iframe `data-lang` attribute is set from the current page's
  locale — French posts get the French Giscus UI, English posts get
  the English UI.
- The iframe theme follows the active daisyUI theme. When the
  [`ThemeToggle`](src/components/islands/ThemeToggle.astro) flips, the
  Giscus island posts a `setConfig` message to the iframe so the
  comments instantly switch theme too.

## Per-post overrides

Set `comments: false` in any post's frontmatter to silence Giscus on
that single post:

```yaml
---
title: My quiet post
comments: false
---
```

This is useful for reference pages (like the
[frontmatter reference](/posts/frontmatter-reference)) where comments
would only attract noise.

To **explicitly enable** comments on a post — in case you've toggled
them off elsewhere — set `comments: true`. If the field is omitted
entirely, the post inherits the site-wide setting.

## Disabling comments globally

Set `PUBLIC_GISCUS_ENABLED=false` (or remove it). Every post will then
show the simple "comments are disabled" line instead of the embed.

## How the lazy mount works

The Giscus client script is **not loaded** until the comments section
mounts. The relevant island is
[`src/components/islands/Giscus.astro`](src/components/islands/Giscus.astro).
It uses three states:

- **`live`** → comments are enabled, configured, and the iframe mounts.
- **`setup`** → enabled but unconfigured (placeholder repo/IDs detected).
  Renders a friendly setup card instead of silence.
- **`disabled`** → globally disabled or per-post opt-out. Renders a
  single italic line.

The placeholder detection looks for tell-tale strings like `xxx` or
`your-handle/your-repo`, so even forgetting to swap a value in `.env`
won't lock readers out — they'll see a friendly notice.

## Customisation

The full Giscus config is exposed in
[`src/config.ts`](src/config.ts):

```ts title="src/config.ts"
export const GISCUS: GiscusConfig = {
  enabled: import.meta.env.PUBLIC_GISCUS_ENABLED === 'true',
  repo: import.meta.env.PUBLIC_GISCUS_REPO ?? 'your-handle/your-repo',
  // ...
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  loading: 'lazy',
};
```

Tweak any of those fields freely — they map 1-to-1 to Giscus's
[advanced usage options](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md).
