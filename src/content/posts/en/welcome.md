---
title: Welcome to Chirping Astro
description: A friendly walk-through of this Astro v6 + Tailwind v4 + daisyUI theme — i18n, MDX, Pagefind and Giscus, all batteries included.
pubDate: 2026-04-12
updatedDate: 2026-04-22
tags: [astro, tailwind, daisyui, theme]
categories: [Announcements]
translationKey: welcome
heroImage: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80&auto=format&fit=crop
heroImageAlt: A clean MacBook keyboard photographed close-up
pinned: true
toc: true
---

Hello! This is your first post in **Chirping Astro**, a single-template
distributable theme inspired by [Chirpy](https://chirpy.cotes.page/) and
written from scratch in idiomatic [Astro](https://astro.build).

## What's inside

The theme ships with the features you would expect from a modern technical blog:

- A familiar Chirpy-style three-column editorial layout.
- Built-in **EN + FR** internationalization with EN at the URL root.
- Tag, category and yearly archive pages.
- Reading time and per-post **Table of Contents** with scroll-spy.
- **Pagefind**-powered search bundled at build time.
- **Giscus** comments synced with the site's theme and locale.

## A code sample

Authoring code is a first-class concern. Every fenced block is rendered with
[Expressive Code](https://expressive-code.com), which gives us syntax
highlighting, frame titles, copy buttons and line markers out of the box.

```ts title="src/content.config.ts"
import { defineCollection, z } from 'astro:content';

export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      tags: z.array(z.string()).default([]),
    }),
  }),
};
```

## Callouts

You can add reusable callouts in MDX with the `<Callout>` component. In
plain Markdown, simply wrap a paragraph in a `div.callout`:

<div class="callout callout-info">
  <strong>Tip:</strong> Set <code>toc: false</code> in frontmatter to hide
  the table of contents on a per-post basis.
</div>

## What about images?

Images can be referenced with either a public path or imported via Astro's
asset pipeline (recommended for posts authored in MDX).

## Where to next?

Hop into the [Astro & MDX showcase](/posts/astro-mdx-demo) to see MDX-only
features such as JSX components inline, or follow the [language switcher](#)
to read this same post in French.
