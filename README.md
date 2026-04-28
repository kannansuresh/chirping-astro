# Chirping Astro

A Chirpy-inspired, single-template, multilingual **Astro v6** theme starter
built with **Tailwind CSS v4**, **daisyUI**, **MDX**, **Pagefind** search,
and **Giscus** comments.

- **Astro 6.x** + Content Collections (loader API) + Zod
- **Bun** as the only package manager / runtime
- **Tailwind CSS v4** via the official `@tailwindcss/vite` plugin
- **daisyUI** with custom Chirpy-flavoured `chirpy-light` / `chirpy-dark`
  themes
- **Markdown + MDX** with Shiki, GFM, autolinked headings, callouts
- **Pagefind** search (modal + dedicated page, lazy-loaded)
- **Giscus** comments synced with theme + locale, per-post overrideable
- **i18n**: English + French, **EN at the URL root**, FR under `/fr`
- Reading time, sticky TOC with scroll-spy, code copy buttons
- RSS per locale, hreflang alternates, locale-aware sitemap
- Strict TypeScript, ESLint, Prettier, accessibility focus

---

## Quickstart (Bun)

```bash
# 1. Install
bun install

# 2. Configure your site
cp .env.example .env       # then edit values
# (or) edit src/config.ts directly

# 3. Develop
bun run dev                # http://localhost:4321

# 4. Build (also runs Pagefind for the search index)
bun run build

# 5. Preview the production build
bun run preview
```

### Bun scripts

| Script              | What it does                                                |
| ------------------- | ----------------------------------------------------------- |
| `bun run dev`       | Astro dev server                                            |
| `bun run build`     | `astro build` then `pagefind --site dist`                   |
| `bun run preview`   | Preview the production build                                |
| `bun run typecheck` | `astro check` (TS + Astro)                                  |
| `bun run lint`      | ESLint (zero warnings allowed)                              |
| `bun run format`    | Prettier write                                              |
| `bun run pagefind`  | Re-run Pagefind only (after `astro build`)                  |

---

## Tailwind v4 + daisyUI setup

This theme follows the official daisyUI install steps:
<https://daisyui.com/docs/install/>.

`src/styles/global.css` is the entry point. It imports Tailwind v4 with a
single line and registers daisyUI plus two custom themes:

```css
@import 'tailwindcss';
@plugin "daisyui" { themes: false; logs: false; }
@plugin "daisyui/theme" { name: "chirpy-light"; default: true; ... }
@plugin "daisyui/theme" { name: "chirpy-dark"; prefersdark: true; ... }
```

The Vite plugin `@tailwindcss/vite` is registered in `astro.config.mjs`.

### Customising the colours

Open `src/styles/global.css` and tweak the OKLCH values inside each
`@plugin "daisyUI/theme"` block. The token names (e.g. `--color-primary`,
`--color-base-100`) are the canonical daisyUI v5 variables.

### Theme toggle

`src/components/islands/ThemeToggle.astro`:

- Stores the choice in `localStorage` under `theme`.
- Falls back to `prefers-color-scheme: dark` when no choice is pinned.
- Emits a `theme-change` `CustomEvent` so islands like Giscus can react.
- A no-FOUC inline `<script is:inline>` in `BaseLayout` applies the theme
  before any styles paint.

---

## i18n

### Routing rules

| Locale | Root        | Posts                | Tags         |
| ------ | ----------- | -------------------- | ------------ |
| `en`   | `/`         | `/posts/<slug>`      | `/tags/...`  |
| `fr`   | `/fr/`      | `/fr/posts/<slug>`   | `/fr/tags/...`|

The default locale (EN) **never has a prefix**. This is enforced by:

- `astro.config.mjs` → `i18n.routing.prefixDefaultLocale: false`
- `src/config.ts` → `defaultLocale: 'en'`
- `src/i18n/utils.ts::localePrefix()` returning `''` for the default locale

### Authoring

Posts go in **per-locale folders**:

```
src/content/posts/
├── en/welcome.md
├── en/astro-mdx-demo.mdx
├── en/writing-content.md
├── fr/welcome.md
├── fr/astro-mdx-demo.mdx
└── fr/writing-content.md
```

The `lang` field is **inferred from the path** (`posts/<lang>/...`) but you
can override it in frontmatter.

### Pairing translations

Two posts that share the same `translationKey` are linked. The language
switcher uses this to land the reader on the equivalent article instead of
the locale's home page.

```yaml
# en/welcome.md
translationKey: welcome
```

```yaml
# fr/welcome.md
translationKey: welcome
```

If no sibling exists, the switcher falls back to the locale home (`/` or
`/fr/`).

### UI strings

`src/i18n/ui.ts` holds dictionaries for every UI label, keyed by locale.
TypeScript ensures all keys are present in every locale:

```ts
const t = useTranslations('fr');
t('nav.home');           // 'Accueil'
formatDate(d, 'fr');     // '12 avril 2026'
```

### Adding a locale (e.g. `de`)

1. Add `'de'` to `SITE.locales` in `src/config.ts`.
2. Add a `de` block in `src/i18n/ui.ts` (TS will complain until all keys
   are present).
3. Update `htmlLang`, `localeLabel`, `formatDate` switches in
   `src/i18n/utils.ts` (the cases use a fallback).
4. Mirror the route folders under `src/pages/de/...`.
5. Add posts under `src/content/posts/de/...`.

---

## Pagefind search

### How it works

- `bun run build` runs `astro build` and then `pagefind --site dist
  --output-subdir _pagefind`.
- Pagefind crawls every static `.html` page and writes the index +
  client bundle to `dist/_pagefind/`.
- The header search button (`SearchButton.astro`) lazy-loads
  `/_pagefind/pagefind-ui.js` only when the user opens the modal.
- A dedicated full-page experience lives at `/search/` (and `/fr/search/`).

### Indexing tips

- Pagefind reads the page's `<main>` block by default. Our `BaseLayout`
  wraps the content area in `<main id="main">` so this just works.
- Add `data-pagefind-ignore` on any element you want excluded.
- Mark a chunk as a primary section with `data-pagefind-body` if you want
  to override the default `<main>` heuristic.
- Per-page filters can be added with `data-pagefind-filter="…"`.

### Customisation

Open `src/components/islands/SearchButton.astro` to:

- Change the keyboard shortcut (`Cmd/Ctrl+K`).
- Toggle `showImages`, `showSubResults`.
- Add filter UI (Pagefind exposes `filter` results).

---

## Giscus comments

### Setup

1. Install <https://github.com/apps/giscus> on your repository.
2. Open <https://giscus.app> and pick:
   - The repository.
   - "pathname" mapping (recommended) so EN and FR posts each get their
     own discussion thread.
   - A Discussions category.
3. Copy the values into `.env`:

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
- Disable on a single post: add `comments: false` in the frontmatter.
- The iframe theme follows the active daisyUI theme: when the
  `ThemeToggle` switches, the island posts a `setConfig` message to the
  Giscus iframe.
- The `data-lang` attribute is set from the page locale (`en` or `fr`).

---

## Theme deep-dive

```
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Sidebar.astro
│   ├── PostCard.astro
│   ├── PostList.astro
│   ├── PostMeta.astro
│   ├── PostNav.astro
│   ├── Pagination.astro
│   ├── Callout.astro
│   ├── Icon.astro
│   ├── SEO.astro
│   └── islands/
│       ├── ThemeToggle.astro
│       ├── LanguageSwitcher.astro
│       ├── SearchButton.astro
│       ├── TableOfContents.astro
│       ├── CodeCopy.astro
│       └── Giscus.astro
├── content/
│   ├── posts/{en,fr}/...
│   └── pages/{en,fr}/...
├── content.config.ts
├── i18n/{ui.ts,utils.ts,index.ts}
├── layouts/{BaseLayout,PostLayout,PageLayout}.astro
├── pages/                # EN routes
│   ├── index.astro
│   ├── page/[page].astro
│   ├── posts/[...slug].astro
│   ├── tags/{index,[tag]}.astro
│   ├── categories/{index,[category]}.astro
│   ├── archives.astro
│   ├── about.astro
│   ├── search.astro
│   ├── 404.astro
│   ├── rss.xml.ts
│   └── fr/                # FR routes mirror EN
│       └── ...
├── styles/global.css
├── utils/{posts,reading-time,seo}.ts
├── config.ts
└── env.d.ts
```

### Hydration footprint

The site is mostly static HTML. JavaScript only runs in five small
islands and only when needed:

| Island               | When loads                          |
| -------------------- | ----------------------------------- |
| `ThemeToggle`        | On every page (very small)          |
| `LanguageSwitcher`   | Pure CSS dropdown — no JS           |
| `SearchButton`       | Pagefind UI loaded on modal open    |
| `TableOfContents`    | Only on posts that have headings    |
| `CodeCopy`           | Only on post pages                  |
| `Giscus`             | Only on posts with comments enabled |

---

## Deployment

The build output (`dist/`) is fully static and works on:

- **Cloudflare Pages**: build command `bun run build`, output `dist`.
- **Netlify**: same. Add a `_redirects` file if you need locale redirects.
- **Vercel**: framework preset "Astro", install `bun install`, build
  `bun run build`.
- **GitHub Pages**: serve `dist/` via `actions/deploy-pages`.

Tip: set `SITE_URL` in your hosting provider's environment so canonicals
and `hreflang` match the deployed URL.

---

## Troubleshooting

| Symptom                              | Fix                                                                 |
| ------------------------------------ | ------------------------------------------------------------------- |
| Search modal says "Search index not available" | Run `bun run build` once (the index is generated to `dist/_pagefind/`). |
| Theme flashes wrong colour on load   | Confirm the inline `<script is:inline>` block is present in `BaseLayout`. |
| Giscus does not render               | Check `PUBLIC_GISCUS_*` env vars; verify the giscus app is installed on the repo. |
| FR routes 404 in dev                 | The `/fr` folder is just static — restart `bun run dev` after adding new files. |
| `astro check` complains about `astro:content` | Ensure `bun run dev` or `bun run build` ran at least once so `.astro/types.d.ts` is generated. |

---

## License

MIT.
