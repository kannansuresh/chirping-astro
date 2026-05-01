---
title: 'Theming, dark mode, and customising the look'
description: 'How the chirpy-light / chirpy-dark daisyUI themes are wired, where to change colours, the no-FOUC theme toggle, and View Transitions for animated swaps.'
pubDate: 2026-04-21
tags: [theme, daisyui, tailwind, dark-mode, customization]
categories: [Tutorials]
translationKey: theming-and-dark-mode
toc: true
---

The theme ships with two custom daisyUI v5 themes — `chirpy-light`
(default) and `chirpy-dark` — both authored from scratch in OKLCH so
the palette stays perceptually balanced. Switching themes uses the
**View Transitions API** where supported, giving you a circular
reveal from the toggle button.

Open the toggle in the sidebar (the sun/moon icon) to try it now. Then
read on for how to customise it.

## Tailwind v4 + daisyUI, the short version

`src/styles/global.css` is the single entry point. It imports Tailwind
v4 with one line and registers daisyUI plus the two custom themes:

```css title="src/styles/global.css"
@import 'tailwindcss';

@plugin "daisyui" {
  themes: false;
  logs: false;
}

@plugin "daisyui/theme" {
  name: 'chirpy-light';
  default: true;
  --color-base-100: oklch(100% 0 0);
  --color-primary: oklch(45% 0.135 264);
  /* ... */
}

@plugin "daisyui/theme" {
  name: 'chirpy-dark';
  prefersdark: true;
  --color-base-100: oklch(22% 0.005 264);
  --color-primary: oklch(72% 0.11 264);
  /* ... */
}
```

The Vite plugin `@tailwindcss/vite` is registered in
[`astro.config.mjs`](astro.config.mjs).

## Customising colours

Open [`src/styles/global.css`](src/styles/global.css) and edit the
OKLCH values inside each `@plugin "daisyui/theme"` block. The token
names (`--color-primary`, `--color-base-100`, …) are the canonical
daisyUI v5 variables — you can also add your own custom tokens, like
the theme's existing `--color-sidebar-from`, `--color-sidebar-to`,
`--width-sidebar`, etc.

Why OKLCH? It's perceptually uniform, so a 10% lightness change feels
like a 10% lightness change, not "much darker for orange but barely
visible for blue". Tools like [oklch.com](https://oklch.com/) make
authoring painless.

## The theme toggle

[`src/components/islands/ThemeToggle.astro`](src/components/islands/ThemeToggle.astro)
is small but does several things at once:

- **Stores the choice** in `localStorage` under the key `theme`.
- **Falls back** to `prefers-color-scheme: dark` when no choice is pinned.
- **Emits a `theme-change` `CustomEvent`** so other islands (Giscus,
  for example) can react.
- **Animates the swap** with the View Transitions API: a circular
  reveal centred on the cursor that respects
  `prefers-reduced-motion: reduce`.

## No FOUC ("Flash of Unstyled Content")

The toggle persists the user's preference, but `localStorage` reads
happen in JavaScript — and JavaScript runs **after** CSS paints. To
prevent a flash of the wrong theme on first load,
[`BaseLayout.astro`](src/layouts/BaseLayout.astro) ships a tiny
`<script is:inline>` block that:

1. Reads `localStorage.theme`.
2. Falls back to `matchMedia('(prefers-color-scheme: dark)')`.
3. Sets `document.documentElement.dataset.theme` **before any styles
   paint**.

Result: the page renders in the correct theme from frame zero, even
on slow connections.

## Code blocks follow the theme

Expressive Code is configured with two themes (`github-light` and
`github-dark-dimmed`) and bound to the site's `data-theme` attribute
via `themeCssSelector`. When the user toggles theme, every code block
on the page **instantly** switches palette without a JavaScript
re-render. See the
[code blocks post](/posts/code-blocks-and-syntax-highlighting) for
details.

## Custom tokens used by the theme

Beyond daisyUI's standard palette, the theme defines a few layout
tokens — change them in `global.css` to retune sizing:

| Token                  | Default   | Used for                    |
| ---------------------- | --------- | --------------------------- |
| `--width-sidebar`      | `18rem`   | Left sidebar width          |
| `--width-panel`        | `14rem`   | Right "Trending tags" panel |
| `--height-topbar`      | `3.25rem` | Top bar height              |
| `--width-prose`        | `50rem`   | Reading column max width    |
| `--color-sidebar-from` | OKLCH     | Sidebar gradient start      |
| `--color-sidebar-to`   | OKLCH     | Sidebar gradient end        |
| `--color-sidebar-text` | OKLCH     | Sidebar text colour         |

## Renaming or replacing themes

If you'd rather call the themes `dawn` and `dusk`, rename them in two
places:

1. `@plugin "daisyui/theme" { name: "dawn"; ... }` in `global.css`.
2. The strings `"chirpy-light"` and `"chirpy-dark"` in
   [`ThemeToggle.astro`](src/components/islands/ThemeToggle.astro),
   [`BaseLayout.astro`](src/layouts/BaseLayout.astro) (no-FOUC script),
   and [`Giscus.astro`](src/components/islands/Giscus.astro) (theme
   sync).

Search for `chirpy-` across the workspace — you'll find every
occurrence in well under a dozen places.

## Adding a third theme

daisyUI happily registers as many themes as you like. Add another
`@plugin "daisyui/theme"` block and extend the toggle to cycle
through three states (or build a separate dropdown). The
`theme-change` event still fires and Giscus / Expressive Code adapt
without further work.

## Disabling animated transitions

If you want a hard cut instead of the circular reveal:

```ts title="src/components/islands/ThemeToggle.astro"
// Remove the document.startViewTransition wrapper:
- if (document.startViewTransition) {
-   document.startViewTransition(applyTheme);
- } else {
-   applyTheme();
- }
+ applyTheme();
```

Or leave the code intact — users with `prefers-reduced-motion: reduce`
already get a hard cut.
