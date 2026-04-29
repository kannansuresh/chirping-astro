---
title: 'Search with Pagefind: instant, static, and fully offline'
description: 'How the bundled Pagefind search works — modal vs full-page UX, indexing rules, keyboard shortcuts, locale filtering and customisation hooks.'
pubDate: 2026-04-23
tags: [search, pagefind, performance]
categories: [Tutorials]
translationKey: search-with-pagefind
heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop'
heroImageAlt: 'A magnifying glass resting on an open notebook'
toc: true
---

This site has **instant, fully-static search** powered by
[Pagefind](https://pagefind.app/). No third-party service, no server,
no API key — Pagefind crawls the built `dist/` directory after
`astro build` and writes a small index plus a tiny client bundle into
`dist/_pagefind/`.

Try it now: press <kbd>/</kbd> or <kbd>Cmd</kbd>+<kbd>K</kbd>
(<kbd>Ctrl</kbd>+<kbd>K</kbd> on Windows/Linux) to open the modal.

## Two ways to search

### 1. The header modal

A button lives in the top bar (and on mobile in the sidebar). Opening
it lazy-loads
[`/_pagefind/pagefind.js`](public/) — until you open the modal, **zero
search code is shipped**.

Highlights:

- Auto-focused input
- Arrow keys navigate, <kbd>Enter</kbd> follows, <kbd>Esc</kbd> closes
- Result list shows title, breadcrumb, and excerpt
- Filtered to the **current locale**

### 2. The dedicated `/search/` page

For deep linking, sharing, or paginated browsing, the theme also ships a
full-page search at [`/search/`](/search/) (and `/fr/search/`). It is
identical to the modal but takes the entire prose column.

## How indexing works

`bun run build` runs Astro, then runs:

```bash frame="terminal"
pagefind --site dist --output-subdir _pagefind
```

Pagefind crawls every static `.html` page Astro emitted and reads the
content of the `<main>` element by default. The theme's
[`BaseLayout.astro`](src/layouts/BaseLayout.astro) wraps the content
area in `<main id="main">`, so this just works.

### Excluding content

To exclude a region from the index, mark it with `data-pagefind-ignore`:

```astro
<aside data-pagefind-ignore>
  <p>Marketing CTA — not useful in search results.</p>
</aside>
```

The theme already excludes the sidebar, footer, and right panel so
they don't pollute search hits with navigation text.

### Choosing a different content root

If `<main>` is too broad, mark the **real** content with
`data-pagefind-body`:

```astro
<article data-pagefind-body>
  <!-- only this is indexed -->
</article>
```

### Adding filters

Pagefind also supports filters (e.g. by tag, category, locale) via
`data-pagefind-filter`:

```astro
<article data-pagefind-filter="category:Tutorials"></article>
```

The default UI does not display filter chips, but the headless API
exposes them — see "Customisation" below.

## Keyboard shortcuts

| Key                                                        | Action                  |
| ---------------------------------------------------------- | ----------------------- |
| <kbd>/</kbd>                                               | Open the search modal   |
| <kbd>Cmd</kbd>+<kbd>K</kbd> / <kbd>Ctrl</kbd>+<kbd>K</kbd> | Open the search modal   |
| <kbd>↑</kbd> / <kbd>↓</kbd>                                | Navigate results        |
| <kbd>Enter</kbd>                                           | Open highlighted result |
| <kbd>Esc</kbd>                                             | Close the modal         |

The shortcuts are wired in
[`src/components/islands/SearchButton.astro`](src/components/islands/SearchButton.astro).

## Internationalisation

Search is locale-aware. The theme reads the active locale from the
`<html lang>` attribute, then constrains the Pagefind query to that
locale's index. French readers do not see English hits and vice-versa.

Translation strings (placeholder text, "no results", keyboard hints)
live in [`src/i18n/ui.ts`](src/i18n/ui.ts) under the `search.*` keys.

## Performance numbers

Pagefind is purpose-built for static sites. For a typical 50-post
bilingual blog you can expect:

- **~50 kB** of compressed JS shipped to the client (only on modal open)
- **~150 kB** of compressed index data, fetched lazily and cached
- **~5–20 ms** average query latency (in-browser, no network round-trip)

The modal does not load anything until you click it, so the cost on
the home page is **zero**.

## Customising the search

Open
[`src/components/islands/SearchButton.astro`](src/components/islands/SearchButton.astro)
to:

- Change the keyboard shortcut.
- Toggle showing images / sub-results.
- Add a filter UI (the headless API exposes
  `pagefind.filters()`).
- Replace the result row markup with your own template.

The component uses the **headless** Pagefind API (`pagefind.js`) — not
the bundled `pagefind-ui.js` — so you have full control over the
layout and styling. No extra Pagefind CSS is shipped; everything is
styled with Tailwind.

## Troubleshooting

| Symptom                                 | Fix                                                                          |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| "Search index not available"            | Run `bun run build` once. The index lives in `dist/_pagefind/`.              |
| Search works in `preview` but not `dev` | Expected — Pagefind only runs after `astro build`.                           |
| Old content still showing up            | Re-run `bun run build`. Or run `bun run pagefind` alone if `dist/` is fresh. |
| Sidebar text appears in results         | Confirm the regions carry `data-pagefind-ignore`.                            |
