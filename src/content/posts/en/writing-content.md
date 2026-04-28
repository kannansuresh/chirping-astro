---
title: Writing content
description: Frontmatter fields, organising posts in per-locale folders, and authoring tips for Markdown and MDX.
pubDate: 2026-03-30
tags: [writing, markdown, mdx]
categories: [Guides]
translationKey: writing-content
toc: true
comments: false
---

This post is intentionally short. Its purpose is to demonstrate that the
**`comments: false`** frontmatter flag disables Giscus on a per-post basis.

## Folder convention

Posts live under `src/content/posts/<locale>/`:

```
src/content/posts/
├── en/
│   ├── welcome.md
│   ├── astro-mdx-demo.mdx
│   └── writing-content.md
└── fr/
    ├── welcome.md
    ├── astro-mdx-demo.mdx
    └── writing-content.md
```

Two posts that share a `translationKey` are considered translations of
each other and the language switcher will move between them.

## Required frontmatter

| Field           | Type            | Notes                            |
| --------------- | --------------- | -------------------------------- |
| `title`         | string          | Article title                    |
| `description`   | string          | Used by SEO + cards              |
| `pubDate`       | date            | Required                         |
| `tags`          | string[]        | Optional, default `[]`           |
| `categories`    | string[]        | Optional                         |
| `translationKey`| string          | Pairs translations               |
| `comments`      | boolean         | Override Giscus on/off           |
| `toc`           | boolean         | Hide TOC for narrative posts     |

That's it — the rest is up to you.
