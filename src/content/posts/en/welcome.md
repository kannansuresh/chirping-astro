---
title: 'Welcome to Chirping Astro'
description: 'Start here. A guided tour of every feature this Astro v6 + Tailwind v4 + daisyUI theme ships with — and a map of the dedicated demo posts that show each one in detail.'
pubDate: 2026-04-30
updatedDate: 2026-04-30
tags: [astro, tailwind, daisyui, theme, getting-started]
categories: [Announcements]
translationKey: welcome
heroImage: /images/devices-mockup.png
heroImageAlt: 'Responsive rendering of Chirping Astro theme on multiple devices.'
pinned: true
toc: true
---

Hello, and welcome. **Chirping Astro** is a single-template, multilingual
Astro v6 theme inspired by [Chirpy](https://chirpy.cotes.page/) and rebuilt
from scratch with a strict TypeScript codebase, Tailwind v4, daisyUI v5,
MDX, Pagefind and Giscus.

This post is the front door. Every other post on this site is a focused,
feature-specific tutorial — start with whichever one matches what you want
to learn first.

## What this theme gives you

- **Chirpy-style three-column layout** — sidebar with avatar and nav, a
  reading column, and a right-hand panel with the table of contents on
  posts and "Recently updated / Trending tags" on listings.
- **First-class i18n** — English at the URL root, French under `/fr`,
  with a smart language switcher that lands on the equivalent translated
  article when one exists.
- **Markdown + MDX** with [Expressive Code](https://expressive-code.com)
  for syntax highlighting, copy buttons, frame titles, line markers,
  diffs and collapsible sections.
- **LaTeX math** via KaTeX, pre-rendered at build time with **zero
  client JavaScript** — and the stylesheet only loads on pages that
  opt in.
- **Pagefind search** — a header modal with `/` and `Cmd/Ctrl+K`
  shortcuts, plus a dedicated `/search/` page.
- **Giscus comments** wired to GitHub Discussions, theme- and
  locale-synced, with a per-post override.
- **Two daisyUI themes** (`chirpy-light` / `chirpy-dark`) with an
  animated toggle that uses the View Transitions API where supported.
- **Reading time, sticky TOC with scroll-spy, RSS per locale,
  hreflang sitemap, accessible focus management** — the boring details
  done right.

## Tour the features one post at a time

Each of the posts below is dedicated to a single feature. They double as
demos: where a post talks about math, the post itself sets `math: true`;
where a post talks about featured images, the post itself sports a hero
image; and so on.

| Feature               | Read this post                                                                  |
| --------------------- | ------------------------------------------------------------------------------- |
| Frontmatter & schema  | [Frontmatter reference](/posts/frontmatter-reference)                           |
| Typography & Markdown | [Typography & Markdown](/posts/typography-and-markdown)                         |
| Code blocks           | [Code blocks & syntax highlighting](/posts/code-blocks-and-syntax-highlighting) |
| LaTeX math            | [LaTeX math with KaTeX](/posts/latex-math-with-katex)                           |
| MDX components        | [MDX components & callouts](/posts/mdx-components-and-callouts)                 |
| i18n                  | [Bilingual content & i18n](/posts/i18n-bilingual-content)                       |
| Search                | [Search with Pagefind](/posts/search-with-pagefind)                             |
| Comments              | [Comments with Giscus](/posts/comments-with-giscus)                             |
| Theming               | [Theming & dark mode](/posts/theming-and-dark-mode)                             |
| Featured images       | [Featured images & media](/posts/featured-images-and-media)                     |

## What's pinned, what's listed

This post is pinned — that's the `pinned: true` flag in its frontmatter
working. Pinned posts always sort to the top of listings and the home
page, even if newer posts exist.

## A word on idiomatic code

Everything in this codebase is meant to read like a normal Astro project,
not a configuration soup. If you want to extend it:

- Components live in [src/components/](src/components/) and
  [src/components/islands/](src/components/islands/).
- Layouts live in [src/layouts/](src/layouts/).
- All site/theme knobs live in [src/config.ts](src/config.ts).
- Translations live in [src/i18n/ui.ts](src/i18n/ui.ts).

Setting up the theme from a fresh clone is documented in detail in the
project **`README.md`** at the root of the repository — open it in your
editor, or click the **Chirping Astro** link in the site footer to jump
to the configured GitHub repo (set `PUBLIC_GITHUB_HANDLE` and
`PUBLIC_GITHUB_REPO` in `.env`).

Happy chirping. ✨
