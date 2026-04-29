---
title: 'Frontmatter reference: every field this theme understands'
description: 'A complete reference for the post and page frontmatter schema — required and optional fields, defaults, validation rules, and what each one actually does.'
pubDate: 2026-04-29
tags: [authoring, frontmatter, schema, reference]
categories: [Reference]
translationKey: frontmatter-reference
toc: true
---

This theme uses **Astro Content Collections** with a strict
[Zod](https://zod.dev) schema. Every post and page is type-checked at
build time, so a missing required field or a typo in `pubDate` fails
loudly instead of silently breaking the site.

The full schema lives in [src/content.config.ts](src/content.config.ts).
Here is what each field does, when you need it, and what it defaults to.

## Required fields

| Field         | Type   | Notes                                                |
| ------------- | ------ | ---------------------------------------------------- |
| `title`       | string | 1–140 characters. Used as `<title>`, OG title, H1.   |
| `description` | string | 1–280 characters. Used as meta description, OG, RSS. |
| `pubDate`     | date   | Coerced from any ISO-parseable string.               |

For pages (`src/content/pages/**`), `pubDate` is **optional** — pages
are not paginated or archived.

## Optional fields, in plain English

### `updatedDate`

```yaml
updatedDate: 2026-05-12
```

Set this whenever you make a meaningful edit. It controls the "Updated"
line in the post header, the RSS `<updated>` tag, the OG
`article:modified_time` meta and the sitemap entry.

### `tags` and `categories`

```yaml
tags: [typescript, astro, accessibility]
categories: [Tutorials]
```

Both default to `[]`. Tags drive the `/tags/...` index. Categories drive
`/categories/...`. Both appear on the **right-hand panel** when ranked
high enough in the "Trending tags" widget. There is no enforced
case-style — pick a convention and stick to it.

### `draft`

```yaml
draft: true
```

Default `false`. When `true`, the post is included in dev mode (so you
can see it while writing) but **excluded** from production builds, the
sitemap and the RSS feed.

### `heroImage` and `heroImageAlt`

```yaml
heroImage: /images/coastline.jpg
heroImageAlt: 'A long exposure of waves crashing on a rocky coastline'
```

Either a public path (anything under `public/` is served at root) or an
absolute URL (CDN, Unsplash, etc.). The image is used both as the card
thumbnail on listings and as the hero on the post page. The
`heroImageAlt` becomes the `alt` attribute — please always set it.

The companion post [Featured images & media](/posts/featured-images-and-media)
goes deeper into image authoring.

### `showFeaturedImage`

```yaml
showFeaturedImage: false
```

A per-post override of `SITE.showFeaturedImages` from
[src/config.ts](src/config.ts). Set `false` to suppress the hero on a
single post even though the site default is "show".

### `canonicalURL`

```yaml
canonicalURL: https://example.com/canonical/path/
```

Optional override for the `<link rel="canonical">` tag. Useful when
republishing a post that already lives elsewhere.

### `comments`

```yaml
comments: false
```

Per-post toggle for Giscus. If omitted, comments follow the site-wide
`GISCUS.enabled` setting. Set explicitly to `false` to silence comments
on a single post (e.g. on this very reference page).

### `toc`

```yaml
toc: false
```

Defaults to `true`. The right-hand sticky table of contents is built
from your H2–H4 headings with scroll-spy. Some posts (a photo essay,
a short announcement) read better without one — set `toc: false`.

### `pinned`

```yaml
pinned: true
```

Pinned posts always sort to the top of listings and the home page,
above newer posts. Use sparingly.

### `math`

```yaml
math: true
```

Opt the post into KaTeX rendering. The stylesheet (`katex.min.css`,
~29 kB) is **only** loaded on pages that set this flag. See the
[LaTeX math post](/posts/latex-math-with-katex) for full syntax.

### `lang`

```yaml
lang: en
```

Locale override. The theme normally **infers** locale from the file
path (`posts/en/...` → `en`, `posts/fr/...` → `fr`), so you should
rarely need this.

### `translationKey`

```yaml
translationKey: welcome
```

The bridge between EN and FR variants of the same article. Two posts
that share a `translationKey` are considered translations of each
other; the language switcher uses this to land you on the equivalent
article instead of bouncing to the locale home page. If omitted, the
theme falls back to the file slug. The
[i18n post](/posts/i18n-bilingual-content) shows the full picture.

## Pages-only field: `showInNav`

Pages (`src/content/pages/**`) accept everything posts do (with
`pubDate` made optional) plus:

```yaml
showInNav: true
```

This is reserved for future use; navigation is currently driven by the
`NAV` array in [src/config.ts](src/config.ts).

## A complete example

```yaml title="src/content/posts/en/example.md" frame="code"
---
title: A complete example
description: Demonstrates every field in one place.
pubDate: 2026-05-01
updatedDate: 2026-05-03
tags: [example, reference]
categories: [Reference]
draft: false
heroImage: /images/coastline.jpg
heroImageAlt: A long exposure of a rocky coastline
showFeaturedImage: true
canonicalURL: https://example.com/example/
comments: true
toc: true
pinned: false
math: false
translationKey: example
---
```

## Validation errors you might hit

| Error                             | What it means                                                               |
| --------------------------------- | --------------------------------------------------------------------------- |
| `pubDate: Required`               | You forgot `pubDate` (or misspelled it).                                    |
| `description: Too long (max 280)` | Your description exceeds 280 characters.                                    |
| `heroImage: Invalid URL`          | (Only fires for external URLs that fail Zod's URL parse.)                   |
| `Cannot find module '...'`        | An MDX import path is wrong — check the relative path to `src/components/`. |

Comments are intentionally turned **off** for this post via
`comments: false` — it is a reference, not a discussion.
