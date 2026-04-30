# Chirping Astro

A Chirpy-inspired, single-template, multilingual **Astro v6** theme
built with **Tailwind CSS v4**, **daisyUI v5**, **MDX**, **Pagefind**
search, **Giscus** comments, and **KaTeX** for math.

It targets technical writers who want a fast, accessible, statically
generated blog with first-class i18n, dark mode, and a modern
authoring experience — without writing your own theme from scratch.

> **Live demo posts on this site walk through every feature in
> detail.** Once it's running locally, browse from
> [/posts/welcome](http://localhost:4321/posts/welcome) to find a
> guided tour and links to feature-specific deep dives.

---

## Table of contents

1. [Features at a glance](#features-at-a-glance)
2. [Requirements](#requirements)
3. [Quickstart](#quickstart)
4. [Project layout](#project-layout)
5. [Configuration walkthrough](#configuration-walkthrough)
6. [Authoring content](#authoring-content)
7. [Tailwind v4 + daisyUI](#tailwind-v4--daisyui)
8. [Code blocks (Expressive Code)](#code-blocks-expressive-code)
9. [LaTeX math (KaTeX)](#latex-math-katex)
10. [i18n](#i18n)
11. [Pagefind search](#pagefind-search)
12. [Giscus comments](#giscus-comments)
13. [SEO, RSS, sitemap](#seo-rss-sitemap)
14. [Hydration footprint](#hydration-footprint)
15. [Bun scripts](#bun-scripts)
16. [Deployment](#deployment)
17. [Customisation cookbook](#customisation-cookbook)
18. [Troubleshooting](#troubleshooting)
19. [License](#license)

---

## Features at a glance

- **Astro 6.x** + Content Collections (loader API) + Zod-validated
  frontmatter
- **Bun** as the only package manager / runtime (>= 1.1.0)
- **Tailwind CSS v4** via the official `@tailwindcss/vite` plugin
- **daisyUI v5** with custom Chirpy-flavoured `chirpy-light` /
  `chirpy-dark` themes
- **Markdown + MDX** with [Expressive Code](https://expressive-code.com)
  (syntax highlighting, frame titles, copy buttons, line markers,
  diffs, collapsible sections), GFM, autolinked headings, callouts
- **LaTeX math** via [KaTeX](https://katex.org) (`remark-math` +
  `rehype-katex`), pre-rendered at build time. The stylesheet is
  loaded **only on pages that opt in** with `math: true` in
  frontmatter, so non-math pages stay lean
- **Pagefind** static search (modal + dedicated page, lazy-loaded,
  locale-filtered)
- **Giscus** comments synced with theme and locale, per-post
  overrideable, with a friendly setup notice when not configured
- **i18n**: English + French out of the box, **EN at the URL root**,
  FR under `/fr`, with translation pairing and a context-aware
  language switcher
- Reading time, sticky TOC with scroll-spy, no-FOUC theme toggle
  with View Transitions API animation
- RSS per locale, hreflang alternates, locale-aware sitemap
- Strict TypeScript, ESLint (zero warnings), Prettier, accessibility
  focus (skip-to-content, ARIA roles, `prefers-reduced-motion`)

---

## Requirements

- **[Bun](https://bun.sh)** >= 1.1.0 (used as both package manager and
  Node-compatible runtime). The lockfile is `bun.lockb`. Other tools
  (`npm`, `pnpm`, `yarn`) will work but are untested — Bun is what CI
  and the scripts assume.
- A modern terminal (PowerShell, bash, zsh, fish all fine).
- For deployment: any static host (Cloudflare Pages, Netlify, Vercel,
  GitHub Pages, S3 + CloudFront, etc.).

You do **not** need Node.js installed alongside Bun.

---

## Quickstart

### 1. Get the code

```bash
git clone https://github.com/your-handle/chirping-astro.git my-blog
cd my-blog
```

### 2. Install

```bash
bun install
```

This installs Astro, the daisyUI v5 plugin, MDX, Expressive Code,
remark/rehype plugins, Pagefind, KaTeX, and the dev tooling.

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

```env
# Public site URL (no trailing slash). Used for canonical, OG, hreflang, sitemap.
SITE_URL=https://chirping-astro.example.com

# Author / social handles. Leave any of them blank to drop the matching
# icon from the sidebar. The footer's "Theme" link uses GITHUB_HANDLE +
# GITHUB_REPO, so users never have to edit URLs by hand.
PUBLIC_GITHUB_HANDLE=
PUBLIC_GITHUB_REPO=chirping-astro
PUBLIC_TWITTER_HANDLE=
PUBLIC_CONTACT_EMAIL=

# Master switch. Set "true" once you have Giscus configured below.
PUBLIC_GISCUS_ENABLED=false

# Generate these four values at https://giscus.app
PUBLIC_GISCUS_REPO=your-handle/your-repo
PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxxx
PUBLIC_GISCUS_CATEGORY=Announcements
PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxxx
```

You can leave `PUBLIC_GISCUS_*` as placeholders for now — the theme
will detect this and show a helpful setup notice on post pages
instead of a broken iframe.

The handle vars feed `SITE.author.url`, the `SOCIALS` array, and the
footer's repo link automatically. They are also the recommended way to
configure identity — do **not** edit URLs in `src/config.ts` directly.

### 4. Configure your site identity

Open `src/config.ts` and edit:

```ts
export const SITE: SiteConfig = {
  url: import.meta.env.SITE_URL ?? 'https://your-domain.com',
  title: 'Your Site Title',
  description: 'Your site tagline here.',
  author: {
    name: 'Your Name',
    // `url` is built automatically from PUBLIC_GITHUB_HANDLE — leave it.
    avatar: '/images/avatar.svg',
    bio: 'A one-line bio shown in the sidebar.',
  },
  defaultOgImage: '/images/og-default.svg',
  defaultLocale: 'en',
  locales: ['en', 'fr'] as const,
  postsPerPage: 8,
  isoDates: false,
  showFeaturedImages: true,
};
```

The `SOCIALS` array further down is **derived from your env handles**:
the GitHub / Twitter / Email entries appear only when the matching
`PUBLIC_*_HANDLE` (or email) is set in `.env`. To add a network the
theme doesn't ship with (Mastodon, LinkedIn, Bluesky…), append a
literal `SocialLink` entry to that array. Order in the array is the
order shown in the sidebar.

The `NAV` array controls the top-level navigation links — add or
remove entries as needed. Each entry's `key` must match an i18n
string in `src/i18n/ui.ts` (`nav.home`, `nav.about`, etc.).

### 5. Replace the demo content

The repo ships with eleven demo posts (in EN and FR) that explain
each feature of the theme. Once you have explored them locally,
replace them with your own:

```bash
# Look at the demos first:
bun run dev
# Browse to http://localhost:4321/posts/welcome

# Then, when ready, clear them out:
rm src/content/posts/en/*.md src/content/posts/en/*.mdx
rm src/content/posts/fr/*.md src/content/posts/fr/*.mdx
```

Update the about pages too:

```
src/content/pages/en/about.md
src/content/pages/fr/about.md
```

### 6. Develop

```bash
bun run dev
```

The Astro dev server starts on `http://localhost:4321`. Hot-reload
works for content, components, and CSS.

### 7. Build

```bash
bun run build
```

This runs `astro build` and then `pagefind --site dist
--output-subdir _pagefind`, generating the static search index. The
output is in `dist/`.

### 8. Preview the production build

```bash
bun run preview
```

This serves `dist/` exactly as a static host would. **Search will
not work in `dev`** — only after `bun run build`. This is by design.

---

## Project layout

```
.
├── astro.config.mjs           # Astro + integrations
├── bunfig.toml                # Bun configuration
├── eslint.config.js           # Flat ESLint config
├── tsconfig.json
├── package.json
├── public/
│   ├── images/                # Static assets served at /images/...
│   ├── robots.txt
│   └── ...
└── src/
    ├── config.ts              # SITE, NAV, SOCIALS, GISCUS — your knobs
    ├── content.config.ts      # Zod schema for posts and pages
    ├── env.d.ts
    ├── components/
    │   ├── BaseLayout-related (Topbar, Sidebar, Footer, Panel, SEO, ...)
    │   └── islands/           # Client-hydrated bits
    │       ├── ThemeToggle.astro
    │       ├── LanguageSwitcher.astro
    │       ├── SearchButton.astro
    │       ├── TableOfContents.astro
    │       ├── BackToTop.astro
    │       └── Giscus.astro
    ├── content/
    │   ├── pages/{en,fr}/about.md
    │   └── posts/{en,fr}/...
    ├── i18n/
    │   ├── ui.ts              # Per-locale UI strings
    │   ├── utils.ts           # Locale helpers, formatDate, etc.
    │   └── index.ts
    ├── layouts/
    │   ├── BaseLayout.astro
    │   ├── PageLayout.astro
    │   └── PostLayout.astro
    ├── pages/                 # EN routes (no /en prefix)
    │   ├── index.astro
    │   ├── 404.astro
    │   ├── about.astro
    │   ├── archives.astro
    │   ├── search.astro
    │   ├── rss.xml.ts
    │   ├── page/[page].astro
    │   ├── posts/[...slug].astro
    │   ├── tags/{index,[tag]}.astro
    │   ├── categories/{index,[category]}.astro
    │   └── fr/                # FR routes mirror EN
    │       └── ...
    ├── styles/global.css      # Tailwind + daisyUI themes + tokens
    └── utils/
        ├── posts.ts           # Collection helpers, sort, filter
        ├── reading-time.ts
        └── seo.ts
```

---

## Configuration walkthrough

Every customisable knob lives in a small number of files:

| Knob                                | File                                      |
| ----------------------------------- | ----------------------------------------- |
| Site title, URL, author, locales    | `src/config.ts` → `SITE`                  |
| Sidebar navigation links            | `src/config.ts` → `NAV`                   |
| Sidebar social icons                | `src/config.ts` → `SOCIALS`               |
| Giscus comments                     | `src/config.ts` → `GISCUS` + `.env`       |
| Theme colours (light + dark)        | `src/styles/global.css` (OKLCH tokens)    |
| Layout sizing (sidebar width, etc.) | `src/styles/global.css` (custom CSS vars) |
| UI strings per locale               | `src/i18n/ui.ts`                          |
| Date formatting per locale          | `src/i18n/utils.ts` → `formatDate`        |
| Posts-per-page on listings          | `src/config.ts` → `SITE.postsPerPage`     |
| Frontmatter validation rules        | `src/content.config.ts`                   |
| Astro / build integrations          | `astro.config.mjs`                        |

---

## Authoring content

### Folder convention

```
src/content/
├── pages/
│   ├── en/about.md
│   └── fr/about.md
└── posts/
    ├── en/welcome.md
    ├── en/typography-and-markdown.mdx
    ├── fr/welcome.md
    └── fr/typography-and-markdown.mdx
```

The locale is **inferred from the file path**. You don't need to set
`lang:` in frontmatter unless you really want to override it.

### Required frontmatter

Every post needs `title`, `description`, and `pubDate`:

```yaml
---
title: My first post
description: A short summary, max 280 characters.
pubDate: 2026-05-01
---
```

The full schema (including `tags`, `categories`, `heroImage`, `math`,
`comments`, `pinned`, `toc`, `translationKey`, etc.) is documented
in the demo post **/posts/frontmatter-reference** and codified in
`src/content.config.ts`.

### Markdown vs MDX

- Use `.md` for plain Markdown — quicker to write, more portable.
- Use `.mdx` when you want to import an Astro component (e.g. the
  bundled `<Callout>`) or use JS expressions like
  `{new Date().toDateString()}`.

Both formats live side-by-side in the same `posts/` folder.

### Pairing translations

Two posts that share a `translationKey` are considered translations
of each other. The language switcher uses this to land the reader on
the equivalent article instead of the locale home page.

```yaml
# en/welcome.md
translationKey: welcome
```

```yaml
# fr/welcome.md
translationKey: welcome
```

If you omit `translationKey`, matching slugs across `en/` and `fr/`
are auto-paired.

### Drafts

Set `draft: true` to keep a post out of production builds, the
sitemap, and the RSS feed. Drafts still render in `bun run dev` so
you can preview them.

---

## Tailwind v4 + daisyUI

This theme follows the official daisyUI v5 install steps:
<https://daisyui.com/docs/install/>.

`src/styles/global.css` is the entry point. It imports Tailwind v4
with one line and registers daisyUI plus two custom themes:

```css
@import 'tailwindcss';

@plugin "daisyui" {
  themes: false;
  logs: false;
}

@plugin "daisyui/theme" {
  name: 'chirpy-light';
  default: true;
  /* OKLCH tokens here */
}

@plugin "daisyui/theme" {
  name: 'chirpy-dark';
  prefersdark: true;
  /* dark OKLCH tokens here */
}
```

The Vite plugin `@tailwindcss/vite` is registered in
`astro.config.mjs`.

### Customising colours

Edit the OKLCH values inside each `@plugin "daisyui/theme"` block.
The token names (`--color-primary`, `--color-base-100`, ...) are the
canonical daisyUI v5 variables.

### Theme toggle

`src/components/islands/ThemeToggle.astro`:

- Stores the choice in `localStorage` under `theme`.
- Falls back to `prefers-color-scheme: dark` when no choice is pinned.
- Emits a `theme-change` `CustomEvent` so islands like Giscus can react.
- Animates the swap with the View Transitions API (circular reveal),
  respecting `prefers-reduced-motion: reduce`.
- A no-FOUC inline `<script is:inline>` in `BaseLayout` applies the
  theme **before any styles paint**.

### Custom layout tokens

| Token                  | Default   | Purpose                     |
| ---------------------- | --------- | --------------------------- |
| `--width-sidebar`      | `18rem`   | Left sidebar width          |
| `--width-panel`        | `14rem`   | Right "Trending tags" panel |
| `--height-topbar`      | `3.25rem` | Top bar height              |
| `--width-prose`        | `50rem`   | Reading column max width    |
| `--color-sidebar-from` | OKLCH     | Sidebar gradient start      |
| `--color-sidebar-to`   | OKLCH     | Sidebar gradient end        |
| `--color-sidebar-text` | OKLCH     | Sidebar foreground          |

---

## Code blocks (Expressive Code)

Fenced code blocks in Markdown / MDX are rendered at build time by
[`astro-expressive-code`](https://expressive-code.com). Authoring
features:

- **Frame titles** — `title="path/to/file.ts"` after the language.
- **Copy button** — automatic, top-right, with a checkmark on success.
- **Line markers** — `{1,3-5}`, `ins={5-8}`, `del={2}`,
  `mark="literal"`.
- **Diffs** — `diff` language, `+`/`-` lines coloured automatically.
- **Terminal frame** — `frame="terminal"`.
- **Word wrap** — `wrap` modifier.
- **Collapsible sections** — `collapse={start-end}`.

Themes (`github-light` / `github-dark-dimmed`) are bound to the
site's `<html data-theme="...">` attribute via `themeCssSelector`,
so the code palette flips instantly when the user toggles the theme.

See the demo post **/posts/code-blocks-and-syntax-highlighting** for
working examples of every feature.

---

## LaTeX math (KaTeX)

Math is parsed by `remark-math` and rendered to plain HTML + CSS at
build time by `rehype-katex`. **No JavaScript ships to the client**
for math.

### Performance: opt-in stylesheet

The KaTeX stylesheet (~29 kB) is **not** loaded globally. Add
`math: true` to a post's frontmatter to enable it for that single
document:

```yaml
---
title: My math-heavy post
math: true
---
```

`src/components/MathStyles.astro` imports `katex/dist/katex.min.css`,
and Astro's per-page CSS bundling guarantees the stylesheet (and its
font assets) is emitted **only on pages that include it**.

### Authoring

- **Inline:** `$ ... $` — `$E = mc^2$`
- **Display:** `$$ ... $$` on its own lines
- **Escape literal dollars** with `\$`, e.g. `\$5.00`
- Same syntax in `.md` and `.mdx`

See the demo **/posts/latex-math-with-katex** for a full showcase
(matrices, integrals, Maxwell's equations, etc.).

---

## i18n

### Routing rules

| Locale | Root   | Posts              | Tags           |
| ------ | ------ | ------------------ | -------------- |
| `en`   | `/`    | `/posts/<slug>`    | `/tags/...`    |
| `fr`   | `/fr/` | `/fr/posts/<slug>` | `/fr/tags/...` |

The default locale (EN) **never has a prefix**. This is enforced by:

- `astro.config.mjs` → `i18n.routing.prefixDefaultLocale: false`
- `src/config.ts` → `defaultLocale: 'en'`
- `src/i18n/utils.ts` → `localePrefix()` returning `''` for the default

### UI strings

`src/i18n/ui.ts` holds dictionaries for every UI label, keyed by
locale. TypeScript ensures all keys are present in every locale.

```ts
const t = useTranslations('fr');
t('nav.home'); // 'Accueil'
formatDate(d, 'fr'); // '12 avril 2026'
```

### Adding a third locale (e.g. `de`)

1. Add `'de'` to `SITE.locales` in `src/config.ts`.
2. Add a `de` block in `src/i18n/ui.ts` (TS will fail until all
   keys are present — by design).
3. Update `htmlLang`, `localeLabel`, and `formatDate` switches in
   `src/i18n/utils.ts`. Each falls back gracefully.
4. Mirror the route folders under `src/pages/de/...`.
5. Add posts under `src/content/posts/de/...` and pages under
   `src/content/pages/de/...`.

The sitemap, RSS, search, sidebar widgets, and language switcher
all pick up the new locale automatically.

---

## Pagefind search

### How it works

- `bun run build` runs `astro build` and then
  `pagefind --site dist --output-subdir _pagefind`.
- Pagefind crawls every static `.html` page Astro emitted and writes
  the index + client bundle to `dist/_pagefind/`.
- The header search button (`SearchButton.astro`) lazy-loads
  `/_pagefind/pagefind.js` only when the user opens the modal.
- A dedicated full-page experience lives at `/search/` and
  `/fr/search/`.

### Indexing tips

- Pagefind reads the page's `<main>` block by default. The theme's
  `BaseLayout` wraps the content in `<main id="main">` so this just
  works.
- Add `data-pagefind-ignore` on any element you want excluded.
- Mark a chunk as the primary section with `data-pagefind-body` if
  you want to override the default `<main>` heuristic.
- Per-page filters can be added with `data-pagefind-filter="..."`.

### Customisation

Open `src/components/islands/SearchButton.astro` to:

- Change the keyboard shortcut (default: `/` and `Cmd/Ctrl+K`).
- Replace the result row markup.
- Add filter chips (the headless API exposes `pagefind.filters()`).

The component uses Pagefind's headless API, not the bundled
`pagefind-ui` package — no extra Pagefind CSS is shipped.

---

## Giscus comments

### Setup

1. Install <https://github.com/apps/giscus> on your repository.
2. The repo must be **public** with **Discussions enabled** in
   _Settings → General → Features_.
3. Open <https://giscus.app> and pick:
   - The repository.
   - **`pathname`** mapping — so EN and FR posts each get their own
     thread.
   - A Discussion category (announcement-style is recommended).
4. Copy the four values into `.env`:

```env
PUBLIC_GISCUS_ENABLED=true
PUBLIC_GISCUS_REPO=your-handle/your-repo
PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxxx
PUBLIC_GISCUS_CATEGORY=Announcements
PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxxx
```

(Or set them directly in `src/config.ts → GISCUS`.)

### Behaviour

- Giscus is rendered **only on post pages** and **only when enabled**.
- Disable globally: `PUBLIC_GISCUS_ENABLED=false`.
- Disable on a single post: add `comments: false` in frontmatter.
- The iframe theme follows the active daisyUI theme — when
  `ThemeToggle` switches, the island posts a `setConfig` message to
  the iframe.
- The iframe `data-lang` attribute follows the page locale.

### The setup notice

If `PUBLIC_GISCUS_ENABLED=true` but the IDs are still placeholders
(detected by looking for substrings like `xxx` or `your-`), the
theme renders a friendly setup card listing the four steps above.
Readers never see a broken iframe.

---

## SEO, RSS, sitemap

- **`<SEO>` component** in `src/components/SEO.astro` injects
  `<title>`, `<meta description>`, OpenGraph, Twitter card, canonical,
  and `hreflang` alternate links.
- **RSS** is generated per locale by
  `src/pages/rss.xml.ts` (EN) and `src/pages/fr/rss.xml.ts` (FR).
  Drafts are excluded.
- **Sitemap** comes from the `@astrojs/sitemap` integration with
  `i18n` config — every URL gets `xhtml:link rel="alternate"` for
  every translated variant.
- `SITE_URL` is the source of truth for canonical URLs. Set it in
  your hosting provider's environment too.

---

## Hydration footprint

The site is mostly static HTML. Client JavaScript runs in five small
islands and only when needed:

| Island             | When loads                                   |
| ------------------ | -------------------------------------------- |
| `ThemeToggle`      | On every page (very small)                   |
| `LanguageSwitcher` | Pure CSS dropdown — no JS                    |
| `SearchButton`     | Pagefind script loaded on modal open only    |
| `TableOfContents`  | Only on posts that have headings (and `toc`) |
| `BackToTop`        | All pages, tiny                              |
| `Giscus`           | Only on posts with comments enabled          |

Fenced code blocks emit Expressive Code's tiny client script for
copy-to-clipboard buttons.

---

## Bun scripts

| Script              | What it does                               |
| ------------------- | ------------------------------------------ |
| `bun run dev`       | Astro dev server (`http://localhost:4321`) |
| `bun run build`     | `astro build` then `pagefind --site dist`  |
| `bun run preview`   | Preview the production build               |
| `bun run typecheck` | `astro check` (TS + Astro)                 |
| `bun run lint`      | ESLint (zero warnings allowed)             |
| `bun run format`    | Prettier write                             |
| `bun run pagefind`  | Re-run Pagefind only (after `astro build`) |

---

## Deployment

The build output (`dist/`) is fully static and works on:

- **Cloudflare Pages**: build command `bun run build`, output `dist`.
- **Netlify**: same. Add a `_redirects` file if you need locale
  redirects.
- **Vercel**: framework preset "Astro", install `bun install`, build
  `bun run build`.
- **GitHub Pages**: serve `dist/` via `actions/deploy-pages`. See the
  [GitHub Pages deployment](#github-pages-deployment) section below —
  it requires setting `base` in `astro.config.mjs` to your repo name.
- **S3 + CloudFront / static hosts**: upload `dist/` as-is.

Set `SITE_URL` in your hosting provider's environment so canonical
URLs and `hreflang` match the deployed URL.

### GitHub Pages deployment

GitHub Pages serves project sites under a sub-path:
`https://<user>.github.io/<repo>/`. Astro must know about that
sub-path **at build time** so every generated asset URL (CSS, JS,
favicons, images, internal links) gets prefixed correctly.

1. **Set `BASE_PATH` to your repository name** at build time. The
   theme's `astro.config.mjs` reads it from the environment, so you
   don't have to edit any source file:

   ```env title=".env (or CI secret)"
   BASE_PATH=/chirping-astro
   ```

   Local dev (`bun run dev`) leaves `BASE_PATH` empty, so the site
   opens at `http://localhost:4321/` with no prefix. Production builds
   on GitHub Actions read `BASE_PATH` from the workflow `env:` block
   (see step 3) and emit asset URLs prefixed with `/chirping-astro/`.

   This is wired into the existing helpers (`withBase`, `localizedPath`)
   so every internal `<a>`, `<img>`, favicon, RSS link, Pagefind script,
   and pagination URL automatically picks up the prefix. **Never write
   `<a href="/foo">` by hand** — always go through `localizedPath()`
   from `src/i18n/utils.ts`.

2. **Set `SITE_URL`** to the github.io origin (no path):

   ```env
   SITE_URL=https://<user>.github.io
   ```

   Astro joins `site` + `base` when emitting absolute URLs (canonical,
   OG, sitemap, RSS), so the path component must live in `base`, not
   `SITE_URL`.

3. **Workflow** — a minimal Pages deploy:

   ```yaml title=".github/workflows/deploy.yml"
   name: Deploy to GitHub Pages
   on:
     push: { branches: [main] }
     workflow_dispatch:
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: oven-sh/setup-bun@v2
           with: { bun-version: latest }
         - run: bun install --frozen-lockfile
         - run: bun run build
           env:
             SITE_URL: https://<user>.github.io
             BASE_PATH: /<repo>
             PUBLIC_GITHUB_HANDLE: <user>
             PUBLIC_GITHUB_REPO: <repo>
         - uses: actions/upload-pages-artifact@v3
           with: { path: dist }
     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

4. **Repo settings** → _Settings → Pages → Source_ = **GitHub Actions**.

5. **Custom domain?** Leave `BASE_PATH` empty (the site is served at
   the domain root) and add a `public/CNAME` file containing your
   domain. Astro will copy it into `dist/` on every build.

### GitHub Actions example

```yaml title=".github/workflows/deploy.yml"
name: Deploy
on: { push: { branches: [main] } }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
        with: { bun-version: latest }
      - run: bun install --frozen-lockfile
      - run: bun run build
        env: { SITE_URL: 'https://your-domain.com' }
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: my-blog
          directory: dist
```

---

## Customisation cookbook

### Change the brand colour

Open `src/styles/global.css` and edit `--color-primary` (and its
darker `chirpy-dark` counterpart). Use [oklch.com](https://oklch.com)
to pick perceptually consistent values.

### Rename the themes

Search the workspace for `chirpy-light` and `chirpy-dark` — they
appear in:

- `src/styles/global.css` (`@plugin "daisyui/theme"` blocks)
- `src/components/islands/ThemeToggle.astro`
- `src/layouts/BaseLayout.astro` (no-FOUC inline script)
- `src/components/islands/Giscus.astro` (theme sync)
- `astro.config.mjs` (Expressive Code `themeCssSelector`)

### Add a navigation link

Edit `NAV` in `src/config.ts`:

```ts
{ key: 'projects', href: '/projects', icon: 'lucide:hammer' },
```

Then add the matching i18n string in `src/i18n/ui.ts`:

```ts
en: { 'nav.projects': 'Projects', /* ... */ },
fr: { 'nav.projects': 'Projets',  /* ... */ },
```

### Add a new locale

See [i18n → Adding a third locale](#i18n).

### Disable comments site-wide

Set `PUBLIC_GISCUS_ENABLED=false` in `.env`, or
`GISCUS.enabled = false` in `src/config.ts`.

### Change the keyboard shortcut for search

Edit the keydown handler at the bottom of
`src/components/islands/SearchButton.astro`.

### Replace the avatar

Drop a new file at `public/images/avatar.svg` (or change the path in
`SITE.author.avatar`).

---

## Troubleshooting

| Symptom                                                           | Fix                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Search modal says "Search index not available"                    | Run `bun run build` once. The index lives at `dist/_pagefind/`. Search **does not** work in `bun run dev`.               |
| Theme flashes wrong colour on first paint                         | Confirm the inline `<script is:inline>` block is present in `BaseLayout`.                                                |
| Giscus does not render                                            | Check `PUBLIC_GISCUS_*` env vars; verify the giscus app is installed; verify Discussions are enabled in repo settings.   |
| Giscus iframe theme stuck on light/dark                           | The site theme attribute must be `chirpy-light` or `chirpy-dark`. If you renamed the themes, also update `Giscus.astro`. |
| FR routes 404 in dev                                              | Restart `bun run dev` after adding new files under `src/pages/fr/...`.                                                   |
| `astro check` complains about `astro:content`                     | Ensure `bun run dev` or `bun run build` ran at least once so `.astro/types.d.ts` is generated.                           |
| Math formula appears as raw `$x^2$`                               | Add `math: true` to the post's frontmatter and rebuild.                                                                  |
| `Cannot find module '../../../components/Callout.astro'` from MDX | Confirm the relative path. From `src/content/posts/<locale>/file.mdx`, the path is exactly three `../`.                  |
| Build fails with `pubDate: Required`                              | A post is missing `pubDate` in frontmatter. The error message names the file.                                            |
| Sitemap missing hreflang alternates                               | Ensure both translations share the same `translationKey` (or matching slug).                                             |

---

## License

MIT.

---

## Acknowledgements

- [Chirpy Jekyll theme](https://chirpy.cotes.page/) for the original
  design language this theme is inspired by.
- [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com),
  [daisyUI](https://daisyui.com), [Pagefind](https://pagefind.app),
  [Giscus](https://giscus.app), [Expressive Code](https://expressive-code.com),
  and [KaTeX](https://katex.org) for the building blocks.
