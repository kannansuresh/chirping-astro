---
title: About
description: Chirping Astro — a Chirpy-inspired, multilingual Astro theme built for writers and tinkerers.
translationKey: about
---

**Chirping Astro** is an open-source theme that brings the look and feel of
the popular [Chirpy Jekyll theme](https://chirpy.cotes.page/) to
[Astro](https://astro.build/) — with first-class internationalization, a
modern toolchain, and zero-JavaScript reading by default.

It is intended for personal blogs, technical journals, and documentation
sites where typography, search, and quiet, focused reading matter more
than animations and ad slots.

## What's in the box

- **Reading-first layout** — fixed left sidebar with avatar, vertical nav,
  theme toggle, and social links; centered main column capped at 1250px;
  right rail with “Recently Updated” and “Trending Tags”.
- **Light & dark themes** — the original Chirpy palette, ported to
  daisyUI v5 tokens, with a circular reveal transition between modes.
- **Bilingual content (EN + FR)** — English served at the root, French
  under `/fr/`. Posts are paired by `translationKey`, and a language
  switcher in the sidebar jumps between translations.
- **Markdown + MDX** — Astro Content Collections with typed frontmatter,
  Shiki syntax highlighting, GFM, footnotes, an automatic table of
  contents, and a bundled `<Callout>` component.
- **LaTeX math** — opt-in KaTeX support per post via `math: true`.
- **Instant search** — [Pagefind](https://pagefind.app/) generates a
  static search index at build time; the search overlay loads on demand.
- **Comments** — [Giscus](https://giscus.app/) integration backed by
  GitHub Discussions, with per-post opt-out.
- **Smooth navigation** — Astro view transitions with a subtle fade and
  motion-reduced fallback for accessibility.
- **SEO out of the box** — OpenGraph, Twitter cards, RSS feeds per locale,
  hreflang, and a sitemap.

## Built with

- [**Astro 6.x**](https://astro.build/) — Content Collections, MDX, RSS,
  and view transitions
- [**Tailwind CSS v4**](https://tailwindcss.com/) via the `@tailwindcss/vite`
  plugin, with [**daisyUI v5**](https://daisyui.com/) for theming
- [**Pagefind**](https://pagefind.app/) for static search
- [**Giscus**](https://giscus.app/) for comments
- [**Shiki**](https://shiki.style/), [**KaTeX**](https://katex.org/), and
  [**Lucide**](https://lucide.dev/) icons

## Make it yours

Almost everything is wired through a single typed config file at
[`src/config.ts`](https://github.com/) — site title, author, navigation,
social links, posts-per-page, default locale, Giscus credentials, and
feature flags. Restart `bun run dev` after editing it.

New posts go in `src/content/posts/<locale>/`. Pair translations by
setting the same `translationKey` in both files. The frontmatter
reference in this demo site explains every field.

## License & credits

Released under the **MIT License**. The visual design is a tribute to
[Cotes Chung's Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy);
the Astro implementation, content, and code are independent.
