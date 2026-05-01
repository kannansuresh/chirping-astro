---
title: 'Bilingual content with first-class i18n'
description: 'How English-at-root + French-under-/fr routing works, how to pair translated articles with translationKey, and how to add a third locale from scratch.'
pubDate: 2026-04-24
tags: [i18n, internationalization, locales, french, english]
categories: [Tutorials]
translationKey: i18n-bilingual-content
toc: true
---

This site is bilingual. **English** is served from the URL root, and
**French** lives under `/fr`. The language switcher in the topbar is
context-aware: on a post page, it lands you on the equivalent
translated article; on a listing page, it swaps the locale prefix and
preserves the rest of the path.

You are reading this post in English. Click the language switcher in
the topbar to read it in French — that round-trip works because both
files share the same `translationKey`.

## Turning i18n off

If you only publish in one language, set `multilingual: false` in
[`src/config.ts`](src/config.ts). The language switcher disappears
from the topbar and `<link rel="alternate" hreflang>` tags are no
longer emitted. To strip the other locale's routes from the build
as well, drop its content folders (`src/content/posts/<lang>/`,
`src/content/pages/<lang>/`), its `src/pages/<lang>/` mirror, and
remove it from `SITE.locales`.

## Translating only some posts

You can leave `multilingual: true` and translate **only the posts
you want**. The theme inspects every post page at build time and
figures out which locales actually have a sibling:

- The language switcher only offers locales whose sibling exists.
  If no other locale has a translation of the post you're on, the
  switcher is **hidden entirely** for that page — readers never
  click into a 404.
- `<link rel="alternate" hreflang="...">` (and the matching
  `x-default`) is emitted only for the locales that actually have
  the post, so search engines don't see broken alternates.
- Listings, tag and category pages, archives, search, and the About
  page exist in every configured locale, so the switcher stays
  visible on those routes and just flips the URL prefix.

Pair translated posts by giving them the same `translationKey` in
their frontmatter — see [Pairing translations with `translationKey`](#pairing-translations-with-translationkey)
below.

## Routing rules

| Locale | Root   | Posts              | Tags           |
| ------ | ------ | ------------------ | -------------- |
| `en`   | `/`    | `/posts/<slug>`    | `/tags/...`    |
| `fr`   | `/fr/` | `/fr/posts/<slug>` | `/fr/tags/...` |

The default locale (English) **never has a prefix**. This is enforced
in three places that all agree:

1. [`astro.config.mjs`](astro.config.mjs) →
   `i18n.routing.prefixDefaultLocale: false`
2. [`src/config.ts`](src/config.ts) → `defaultLocale: 'en'`
3. [`src/i18n/utils.ts`](src/i18n/utils.ts) → `localePrefix()` returns
   `''` for the default locale.

## Authoring per-locale posts

Posts live in **per-locale folders**:

```text frame="code"
src/content/posts/
├── en/
│   ├── welcome.md
│   ├── i18n-bilingual-content.md
│   └── ...
└── fr/
    ├── welcome.md
    ├── i18n-bilingual-content.md
    └── ...
```

The `lang` field is **inferred from the file path** — you do not need
to set it in frontmatter. Override it only in unusual cases.

## Pairing translations with `translationKey`

Two posts that share the same `translationKey` are considered
translations of each other. The language switcher uses this to land on
the equivalent article instead of bouncing to the locale's home page.

```yaml title="src/content/posts/en/welcome.md"
translationKey: welcome
```

```yaml title="src/content/posts/fr/welcome.md"
translationKey: welcome
```

If the matching translation does not exist for the active page (you
have an English post but no French version yet), the switcher falls
back to the locale home (`/` or `/fr/`) instead of giving the reader a 404.

The slug fallback also works: if you omit `translationKey`, the theme
uses the file slug. So matching slugs across `en/` and `fr/` are
auto-paired without any extra metadata.

## UI strings

Every UI label — navigation, buttons, error messages, accessibility
labels — lives in [`src/i18n/ui.ts`](src/i18n/ui.ts), keyed by locale.
TypeScript ensures all keys are present in every locale: forget one
and the build fails.

```ts title="src/i18n/utils.ts"
const t = useTranslations('fr');
t('nav.home'); // 'Accueil'
formatDate(d, 'fr'); // '24 avril 2026'
```

The `formatDate` helper uses `Intl.DateTimeFormat` so dates,
numbers, and reading-time strings all render in the active locale.

## RSS, sitemap and SEO

- A **separate RSS feed** is generated per locale: `/rss.xml` (EN) and
  `/fr/rss.xml` (FR). The link is in the sidebar's social row.
- The sitemap (`@astrojs/sitemap` integration) emits **hreflang
  alternates** for every page that has a translation. Search engines
  use this to surface the right language to the right reader.
- `<link rel="alternate" hreflang="...">` tags are also injected into
  the page `<head>` by [`SEO.astro`](src/components/SEO.astro).

## Adding a third locale (e.g. German)

The codebase was designed to make this a five-step task. Adding `de`:

1. **Add `'de'` to `SITE.locales`** in
   [`src/config.ts`](src/config.ts).
2. **Add a `de` block in `src/i18n/ui.ts`** — TypeScript will complain
   until every key is present, which is the point.
3. **Update the locale-aware switches** in
   [`src/i18n/utils.ts`](src/i18n/utils.ts) — `htmlLang`, `localeLabel`,
   `formatDate`. Each of those uses a switch with a fallback, so the
   site keeps building even before you fill them in.
4. **Mirror the route folders** under `src/pages/de/...` (copy from
   `src/pages/fr/...` — every file is essentially `getPosts('de')`).
5. **Add posts** under `src/content/posts/de/...` and pages under
   `src/content/pages/de/...`. Set `translationKey` to pair them with
   their EN/FR siblings.

That's the entire ceremony. The sitemap, RSS, search, sidebar widgets,
and language switcher all pick up the new locale automatically.

## Pagefind across locales

Pagefind respects the `lang` attribute on `<html>`, which the theme
sets per-page from the inferred locale. The header search modal filters
results to the **current locale** so French readers don't accidentally
get English hits.

## Troubleshooting i18n

| Symptom                           | Fix                                                      |
| --------------------------------- | -------------------------------------------------------- |
| Switcher always lands on `/fr/`   | The current page's translation isn't authored yet.       |
| Date format is wrong              | Update the `formatDate` switch in `src/i18n/utils.ts`.   |
| Build complains about missing key | Add the key to **every** locale block in `ui.ts`.        |
| FR post shows English UI          | The path must be `posts/fr/...` (not `posts/fr-FR/...`). |
