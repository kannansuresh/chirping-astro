# Agents.md — Chirping Astro

> Agentic development guide for the `kannansuresh/chirping-astro` repository.
> This file documents project conventions, architecture, key files, and
> task-specific guidance for AI agents working on this codebase.

---

## Project Overview

**Chirping Astro** is a Chirpy-inspired, multilingual, statically generated blog
theme built on **Astro 6.x**. It targets technical writers who need a fast,
accessible blog with first-class i18n, dark mode, MDX authoring, and zero
server-side runtime.

| Dimension       | Value                                                                           |
| --------------- | ------------------------------------------------------------------------------- |
| Framework       | Astro 6.x (static output)                                                       |
| Package manager | **Bun ≥ 1.1.0** (only supported PM; lockfile is `bun.lock`)                     |
| Styling         | Tailwind CSS v4 + daisyUI v5                                                    |
| Languages       | TypeScript (strict), Astro, MDX, CSS                                            |
| Locales         | User-defined. Ships with `en` + `fr`; any locale can be added or set as default |
| Default locale  | Always served at the URL root (no prefix). Configurable in `src/config.ts`      |
| Search          | Pagefind (static index, built post `astro build`)                               |
| Comments        | Giscus (optional, GitHub Discussions backed)                                    |
| Math            | KaTeX (opt-in per post via `math: true` frontmatter)                            |
| CI              | GitHub Actions — `deploy.yml` (Pages) + `pr-checks.yml`                         |

---

## Repository Layout

```text
.
├── astro.config.mjs           # Astro + integrations config
├── bunfig.toml                # Bun runtime config
├── eslint.config.js           # Flat ESLint config (zero warnings policy)
├── tsconfig.json
├── package.json
├── .env.example               # All recognised env vars with comments
├── public/
│   └── images/                # Static assets (avatar, OG default, etc.)
└── src/
    ├── config.ts              # ★ Primary knobs: SITE, NAV, SOCIALS, GISCUS
    ├── content.config.ts      # Zod schema — post + page frontmatter
    ├── env.d.ts               # Astro env type shim
    ├── components/
    │   └── islands/           # Client-hydrated Astro islands
    │       ├── ThemeToggle.astro
    │       ├── LanguageSwitcher.astro
    │       ├── SearchButton.astro
    │       ├── TableOfContents.astro
    │       ├── BackToTop.astro
    │       └── Giscus.astro
    ├── content/
    │   ├── pages/<locale>/    # About + Privacy pages — one folder per locale
    │   └── posts/<locale>/    # Blog posts (.md / .mdx) — one folder per locale
    ├── i18n/
    │   ├── ui.ts              # Per-locale UI string dictionaries
    │   ├── utils.ts           # localePrefix(), formatDate(), etc.
    │   └── index.ts           # Re-exports
    ├── layouts/
    │   ├── BaseLayout.astro   # Shell: topbar, sidebar, footer, no-FOUC script
    │   ├── PageLayout.astro   # Wrapper for static pages
    │   └── PostLayout.astro   # Wrapper for blog posts (TOC, Giscus, etc.)
    ├── pages/                 # Default locale routes (no URL prefix — always)
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
    │   └── <locale>/          # One sub-folder per non-default locale (mirrors root)
    ├── styles/global.css      # Tailwind v4 entry + daisyUI themes + CSS tokens
    └── utils/
        ├── posts.ts           # Collection helpers: sort, filter, paginate
        ├── reading-time.ts
        └── seo.ts
```

---

## Environment Variables

All variables live in `.env` (local) or the hosting provider's build environment.
The file `.env.example` is the canonical reference — never commit `.env`.

| Variable                      | Required          | Purpose                                                                    |
| ----------------------------- | ----------------- | -------------------------------------------------------------------------- |
| `SITE_URL`                    | ✅                | Canonical origin (no trailing slash). Used for OG, RSS, sitemap, hreflang. |
| `BASE_PATH`                   | GitHub Pages only | Sub-path prefix (e.g. `/chirping-astro`). Leave empty for root hosting.    |
| `PUBLIC_GITHUB_HANDLE`        | Optional          | Sidebar GitHub icon + `SITE.author.url`                                    |
| `PUBLIC_GITHUB_REPO`          | Optional          | Footer "Theme" link                                                        |
| `PUBLIC_TWITTER_HANDLE`       | Optional          | Sidebar Twitter icon                                                       |
| `PUBLIC_CONTACT_EMAIL`        | Optional          | Sidebar email icon                                                         |
| `PUBLIC_GISCUS_ENABLED`       | Optional          | Master switch (`true`/`false`). Default: `false`.                          |
| `PUBLIC_GISCUS_REPO`          | Giscus            | `<handle>/<repo>`                                                          |
| `PUBLIC_GISCUS_REPO_ID`       | Giscus            | From giscus.app                                                            |
| `PUBLIC_GISCUS_CATEGORY`      | Giscus            | Discussion category name                                                   |
| `PUBLIC_GISCUS_CATEGORY_ID`   | Giscus            | From giscus.app                                                            |
| `CI_SKIP_AUTO_OG_IMAGE`       | CI only           | Skip Satori OG generation in PR builds                                     |
| `CI_SKIP_RSS_SITEMAP`         | CI only           | Skip RSS + sitemap in PR builds                                            |
| `CI_SKIP_CONTENT_COLLECTIONS` | CI only           | Skip post-collection reads in PR builds                                    |

> **Rule:** `PUBLIC_*` variables are intentionally public. Use GitHub
> **Variables** (not Secrets) for them. Reserve Secrets for deploy tokens.

---

## Configuration Knobs (`src/config.ts`)

`src/config.ts` is the **single source of truth** for site identity. Do not
hard-code URLs in component files — read them from `SITE` or env vars.

```ts
// Key fields an agent may need to modify:
SITE.title; // Site display name
SITE.description; // Meta description / tagline
SITE.author.name; // Author display name
SITE.author.avatar; // Path relative to /public
SITE.author.bio; // Sidebar one-liner
SITE.defaultLocale; // ★ The locale served at the URL root (no prefix).
//   Must be one of the values in SITE.locales.
//   Changing this requires a coordinated multi-file update — see i18n section.
SITE.locales; // ★ Full list of enabled locales, e.g. ['en', 'fr', 'de'].
//   Every locale here must have: route files, content folders, i18n strings.
SITE.postsPerPage; // Listing page size (default 8)
SITE.multilingual; // false hides language switcher + hreflang
SITE.autoOgImage; // false disables Satori OG generation
SITE.showPrivacyPolicy; // false removes footer privacy link
SITE.boxedArticles; // true wraps post content in a card
SITE.dynamicPostCardHeight; // true lets listing cards grow with content

NAV; // Array of top-bar links; keys must exist in i18n/ui.ts
SOCIALS; // Derived from PUBLIC_* env vars; extend for extra networks
GISCUS; // Mirror of PUBLIC_GISCUS_* env vars
```

---

## Content Schema (`src/content.config.ts`)

Posts and pages are validated by Zod at build time. The locale is inferred from
the file path — **do not add a `lang:` field** unless overriding.

### Post frontmatter

| Field                   | Type     | Required | Notes                                                           |
| ----------------------- | -------- | -------- | --------------------------------------------------------------- |
| `title`                 | string   | ✅       |                                                                 |
| `description`           | string   | ✅       | Max 280 chars                                                   |
| `pubDate`               | date     | ✅       | ISO 8601 (`2026-05-01`)                                         |
| `updatedDate`           | date     | ❌       | Shows "updated" label                                           |
| `heroImage`             | string   | ❌       | Path or URL; suppresses auto OG image                           |
| `tags`                  | string[] | ❌       | Drives `/tags/` pages                                           |
| `categories`            | string[] | ❌       | Drives `/categories/` pages                                     |
| `draft`                 | boolean  | ❌       | Excluded from prod build + RSS                                  |
| `pinned`                | boolean  | ❌       | Float to top of listing                                         |
| `toc`                   | boolean  | ❌       | Enable sticky TOC (default: true on posts)                      |
| `math`                  | boolean  | ❌       | Loads KaTeX stylesheet for this page only                       |
| `comments`              | boolean  | ❌       | `false` disables Giscus on this post                            |
| `translationKey`        | string   | ❌       | Pairs the same post across locales; auto-pairs on matching slug |
| `dynamicPostCardHeight` | boolean  | ❌       | Per-post override of `SITE.dynamicPostCardHeight`               |

### File naming

The **default locale** folder maps to prefix-free URLs. All other locale
folders map to `/<locale>/` prefixed URLs. This is determined entirely by
`SITE.defaultLocale` in `src/config.ts`.

```bash
# Assuming defaultLocale = 'en':
src/content/posts/en/my-post.md      → /posts/my-post       ← no prefix (default)
src/content/posts/fr/my-post.md      → /fr/posts/my-post
src/content/posts/de/my-post.md      → /de/posts/my-post

src/content/pages/en/about.md        → /about               ← no prefix (default)
src/content/pages/fr/about.md        → /fr/about

# If defaultLocale were changed to 'fr':
src/content/posts/fr/my-post.md      → /posts/my-post       ← no prefix (new default)
src/content/posts/en/my-post.md      → /en/posts/my-post    ← now prefixed
```

---

## i18n Rules

### The No-Prefix Invariant

> **The default locale always occupies the URL root — never a prefixed path.**
> This is enforced by `prefixDefaultLocale: false` in `astro.config.mjs` and
> by `localePrefix()` in `src/i18n/utils.ts` returning `''` for
> `SITE.defaultLocale`. It cannot be overridden per-page or per-route.

This means:

- The **root `src/pages/` folder** always belongs to whichever locale is set as
  `SITE.defaultLocale`. Its routes emit without any locale prefix.
- Every other locale in `SITE.locales` gets a **sub-folder** inside
  `src/pages/<locale>/` and its routes emit under `/<locale>/`.
- When `defaultLocale` changes, the root `src/pages/` folder conceptually
  "re-labels" — its physical files stay in place but they now serve a different
  locale. The **old** default locale must gain a new sub-folder.

### General rules

- All internal links **must** go through `localizedPath()` from
  `src/i18n/utils.ts`. **Never write bare `<a href="/foo">`** — the helper
  inserts the correct prefix for non-default locales and nothing for the default.
- UI strings live in `src/i18n/ui.ts`. TypeScript enforces all keys exist in
  every configured locale — a missing key is a compile error.
- The language switcher is hidden on a post page if no sibling translation exists
  for that post, preventing dead-end 404s.
- `hreflang` alternates are emitted only for locales that actually have a sibling
  for the current post. `x-default` is included only when the default locale
  has a sibling.
- Locale is **inferred from the content file path** (`posts/<locale>/…`). Do not
  add a `lang:` frontmatter field unless intentionally overriding.

---

### Adding a new locale (e.g. `de`)

Work through this checklist in order. TypeScript compilation will fail until
every step is complete, which is by design.

1. **`src/config.ts`** — Add `'de'` to `SITE.locales`:

   ```ts
   // ...
   const SITE = {
     // ...
     locales: ['en', 'fr', 'de'] as const,
     // ...
   };
   ```

2. **`src/i18n/ui.ts`** — Add a `de` block with every key that exists in the
   other locale blocks. The TypeScript type system will show exactly which keys
   are missing.

3. **`src/i18n/utils.ts`** — Update these three switch/map structures:
   - `htmlLang` — maps locale code → BCP 47 language tag (e.g. `'de' → 'de'`)
   - `localeLabel` — maps locale code → display name (e.g. `'de' → 'Deutsch'`)
   - `formatDate` — adds a `case 'de':` branch for locale-aware date formatting

4. **`src/pages/de/`** — Mirror the structure of an existing non-default locale
   folder (e.g. copy `src/pages/fr/` as a template). Every route file must exist.

5. **`src/content/posts/de/`** — Create the folder. Add translated posts here.
   Use the same `translationKey` as the source-language post to pair them.

6. **`src/content/pages/de/`** — Create `about.md` and `privacy.md` (or at
   minimum `about.md`).

7. **`src/pages/de/rss.xml.ts`** — Add an RSS endpoint for the new locale,
   mirroring `src/pages/fr/rss.xml.ts`.

The sitemap, Pagefind search index, language switcher, and `hreflang` tags all
pick up the new locale automatically from `SITE.locales`.

---

### Changing the default locale

> ⚠️ This is a **breaking, atomic, multi-file operation**. Every step below must
> be completed in the same commit. A partial change will produce mismatched URLs,
> broken canonical links, and incorrect `hreflang` tags.

**Example:** Changing the default from `en` to `fr`.

#### 1. `src/config.ts`

```ts
// ...
const SITE = {
  // ...
  defaultLocale: 'fr', // was 'en'
  // ...
};
```

#### 2. `astro.config.mjs`

The i18n config derives `defaultLocale` from `SITE.defaultLocale`. Confirm that
`prefixDefaultLocale: false` is still set — this must never change.

#### 3. Root `src/pages/` folder — re-language the default routes

The files in `src/pages/` (root level) now serve the **new** default locale
(`fr`). Update every string, i18n call, and locale reference inside them to
target `fr` instead of `en`.

#### 4. Create `src/pages/en/` — add prefix routes for the old default

Create a new `src/pages/en/` folder that mirrors what `src/pages/fr/` looks
like (i.e. a prefixed non-default locale). Every route file must be present so
that existing EN URLs (`/en/posts/…`) resolve correctly.

#### 5. Move or duplicate content

- Content under `src/content/posts/en/` and `src/content/pages/en/` does **not**
  move — the locale is inferred from the folder name, not from `defaultLocale`.
- `src/content/posts/fr/` continues to be served from the root-prefixed URLs
  because `fr` is now the default.

#### 6. RSS endpoints

- The root `src/pages/rss.xml.ts` must now generate the FR feed.
- Add `src/pages/en/rss.xml.ts` for the EN feed.

#### 7. `src/i18n/utils.ts` — `localePrefix()`

Confirm the helper returns `''` for the **new** default locale and a non-empty
prefix for all others. The logic is tied to `SITE.defaultLocale`, so if the
helper reads from `config.ts` at runtime this step may be automatic — verify it.

#### 8. `.env` / hosting environment

Update `SITE_URL` if the canonical domain changes, and rebuild to regenerate
the Pagefind index and OG images.

#### 9. Verify

```bash
bun run typecheck   # must pass with zero errors
bun run build       # inspect dist/ — default locale URLs must have no prefix
bun run preview     # manually test /, /posts/…, /en/posts/…, /fr/ language switch
```

---

### Routing reference

| Scenario                     | URL pattern                                                |
| ---------------------------- | ---------------------------------------------------------- |
| Default locale, any page     | `/`, `/posts/<slug>`, `/tags/…` (no prefix)                |
| Non-default locale, any page | `/<locale>/`, `/<locale>/posts/<slug>`, `/<locale>/tags/…` |
| RSS — default locale         | `/rss.xml`                                                 |
| RSS — non-default locale     | `/<locale>/rss.xml`                                        |
| Search — default locale      | `/search`                                                  |
| Search — non-default locale  | `/<locale>/search`                                         |

---

## Styling System

| Layer                | File                    | Notes                               |
| -------------------- | ----------------------- | ----------------------------------- |
| Tailwind v4 entry    | `src/styles/global.css` | Single `@import 'tailwindcss'` line |
| daisyUI themes       | `src/styles/global.css` | `chirpy-light` + `chirpy-dark`      |
| Vite integration     | `astro.config.mjs`      | `@tailwindcss/vite` plugin          |
| Custom layout tokens | `src/styles/global.css` | CSS vars listed below               |

### Custom CSS tokens

| Token                  | Default   | Purpose                  |
| ---------------------- | --------- | ------------------------ |
| `--width-sidebar`      | `18rem`   | Left sidebar width       |
| `--width-panel`        | `14rem`   | Right panel width        |
| `--height-topbar`      | `3.25rem` | Top bar height           |
| `--width-prose`        | `50rem`   | Reading column max width |
| `--color-sidebar-from` | OKLCH     | Sidebar gradient start   |
| `--color-sidebar-to`   | OKLCH     | Sidebar gradient end     |
| `--color-sidebar-text` | OKLCH     | Sidebar foreground       |

### Theme names

`chirpy-light` and `chirpy-dark` are referenced in **five places** — change
all of them atomically if renaming:

1. `src/styles/global.css` (`@plugin "daisyui/theme"` blocks)
2. `src/components/islands/ThemeToggle.astro`
3. `src/layouts/BaseLayout.astro` (no-FOUC inline script)
4. `src/components/islands/Giscus.astro` (theme sync)
5. `astro.config.mjs` (`themeCssSelector` for Expressive Code)

---

## Hydration Islands

The site is mostly static HTML. These are the only client-side islands:

| Island           | File                             | Loads when                         |
| ---------------- | -------------------------------- | ---------------------------------- |
| ThemeToggle      | `islands/ThemeToggle.astro`      | Every page (tiny)                  |
| LanguageSwitcher | `islands/LanguageSwitcher.astro` | Pure CSS — no JS                   |
| SearchButton     | `islands/SearchButton.astro`     | Pagefind lazy-loaded on modal open |
| TableOfContents  | `islands/TableOfContents.astro`  | Posts with headings + `toc: true`  |
| BackToTop        | `islands/BackToTop.astro`        | All pages (tiny)                   |
| Giscus           | `islands/Giscus.astro`           | Posts with `comments: true`        |

**Do not add client-side JS outside of islands** unless there is a compelling
reason. The zero-FOUC theme script in `BaseLayout.astro` is the one exception —
it must remain an `is:inline` script.

---

## Bun Scripts

```bash
bun run dev            # Dev server at http://localhost:4321
bun run build          # astro build → pagefind index (output: dist/)
bun run preview        # Serve dist/ locally (search works here, not in dev)
bun run typecheck      # astro check (TypeScript + Astro types)
bun run lint           # ESLint — zero warnings allowed
bun run format         # Prettier write (auto-fixes formatting in place)
bun run format:check   # Prettier check — exits non-zero if any file is unformatted (CI gate)
bun run pagefind       # Re-run Pagefind only (after astro build)
```

> `bun run format` and `bun run format:check` are complementary:
> run `format` locally to fix files, run `format:check` to verify nothing
> was missed before committing. Both must agree — `format:check` is what CI
> enforces.
> ⚠️ **Pagefind search does not work in `bun run dev`.**
> Always run `bun run build` then `bun run preview` to test search.

---

## CI / GitHub Actions

| Workflow    | File                              | Trigger             | Notes                                       |
| ----------- | --------------------------------- | ------------------- | ------------------------------------------- |
| Deploy      | `.github/workflows/deploy.yml`    | Push to `main`      | Full build + deploy to GitHub Pages         |
| PR Checks   | `.github/workflows/pr-checks.yml` | PR + push to `main` | PRs use fast mode (skip OG/RSS/collections) |
| Sync Labels | `.github/workflows/labels.yml`    | Manual dispatch     | Applies `.github/labels.yml` to the repo    |

### PR fast mode env vars (set automatically by `pr-checks.yml`)

```text
CI_SKIP_AUTO_OG_IMAGE=true
CI_SKIP_RSS_SITEMAP=true
CI_SKIP_CONTENT_COLLECTIONS=true
```

These are **CI-only**. Never set them in `.env` for local builds.

---

## SEO & OG Images

- The `<SEO>` component (`src/components/SEO.astro`) handles `<title>`,
  meta description, OpenGraph, Twitter card, canonical URL, and hreflang.
- When `SITE.autoOgImage = true` (default), Satori + Resvg generates a
  1200×630 PNG at build time for every post without a `heroImage`.
- `SITE_URL` is the canonical origin. Set it identically in `.env` and the
  hosting provider's environment.
- RSS is generated per locale. The default locale emits `rss.xml` at the root;
  each non-default locale emits `/<locale>/rss.xml`. Drafts are excluded.
- Sitemap uses `@astrojs/sitemap` with i18n config — every URL gets
  `xhtml:link rel="alternate"` for every translated variant.

---

## Common Agent Tasks

### Add a new blog post

1. Create `src/content/posts/<locale>/<slug>.md` (or `.mdx` for components/JS).
2. Include required frontmatter: `title`, `description`, `pubDate`.
3. To pair with a translation in another locale, add the same `translationKey`
   to both files.

### Add a new locale

Follow the full checklist in the [Adding a new locale](#adding-a-new-locale-eg-de) section of i18n Rules.

### Change the default locale

Follow the full checklist in the [Changing the default locale](#changing-the-default-locale) section of i18n Rules. This is a breaking, atomic operation.

### Add a nav link

1. Add entry to `NAV` in `src/config.ts`:

   ```ts
   { key: 'projects', href: '/projects', icon: 'lucide:hammer' }
   ```

2. Add `'nav.projects'` key to **every locale** in `src/i18n/ui.ts`.
3. Create the route file at `src/pages/projects.astro` (default locale).
4. Create `src/pages/<locale>/projects.astro` for each non-default locale.

### Add a social icon

- If the network can be represented by a `PUBLIC_*` env var, add it to `.env` and
  update the `SOCIALS` derivation logic in `src/config.ts`.
- For unsupported networks, append a literal `SocialLink` entry directly to the
  `SOCIALS` array. Array order = sidebar order.

### Change brand colour

1. Open `src/styles/global.css`.
2. Edit `--color-primary` in the `chirpy-light` block and its dark counterpart in
   `chirpy-dark`. Use [oklch.com](https://oklch.com) for perceptually consistent
   values.

### Enable math on a post

Add `math: true` to the post's frontmatter. The KaTeX stylesheet (~29 kB) is
loaded only on that page.

### Enable/disable Giscus globally

Set `PUBLIC_GISCUS_ENABLED=true/false` in `.env` (or `GISCUS.enabled` in
`src/config.ts`). Per-post: add `comments: false` to frontmatter.

### Disable auto OG image generation

Set `SITE.autoOgImage = false` in `src/config.ts`. Posts without `heroImage`
fall back to `SITE.defaultOgImage`.

### Change search keyboard shortcut

Edit the keydown handler at the bottom of `src/components/islands/SearchButton.astro`.

---

## Constraints & Pitfalls

| Constraint                                  | Detail                                                                                                                                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bun only**                                | Do not generate `package-lock.json` or `pnpm-lock.yaml`. Always use `bun install`.                                                                                                        |
| **No bare `/` links**                       | All internal `href` values must go through `localizedPath()` from `src/i18n/utils.ts`.                                                                                                    |
| **Default locale = no prefix, always**      | `prefixDefaultLocale: false` is a hard architectural rule. The default locale is always at the URL root regardless of which locale code it is. Never add a prefix for the default locale. |
| **Changing default locale is atomic**       | Requires coordinated changes to `config.ts`, `astro.config.mjs`, root `src/pages/`, `src/i18n/utils.ts`, and RSS endpoints. Partial changes cause broken URLs.                            |
| **Locale inferred from path**               | Don't add `lang:` to frontmatter unless intentionally overriding.                                                                                                                         |
| **Every locale needs all 7 pieces**         | Route folder, content posts folder, content pages folder, i18n UI strings, `htmlLang`, `localeLabel`, `formatDate` entry, and an RSS endpoint.                                            |
| **Pagefind needs a build**                  | Search is not available in `bun run dev`. Run `bun run build` + `bun run preview`.                                                                                                        |
| **Zero ESLint warnings**                    | `bun run lint` must pass with no warnings before merging.                                                                                                                                 |
| **Math is opt-in**                          | Never load KaTeX globally — use `math: true` frontmatter per post.                                                                                                                        |
| **Five places for theme names**             | Renaming `chirpy-light`/`chirpy-dark` requires updating all five locations atomically.                                                                                                    |
| **hreflang only for existing translations** | Don't manually add hreflang tags — they are generated automatically from `translationKey` pairs.                                                                                          |
| **`draft: true` posts**                     | Excluded from prod builds, RSS, and sitemap, but visible in `bun run dev`.                                                                                                                |
| **GitHub Pages needs `BASE_PATH`**          | Set to `/<repo-name>` for project Pages; leave empty for root/custom domain.                                                                                                              |

---

## Troubleshooting Reference

| Symptom                                                 | Fix                                                                                                 |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Search modal: "index not available"                     | Run `bun run build`. Pagefind index only exists in `dist/`.                                         |
| Theme flashes on first paint                            | Confirm the `is:inline` script is present in `BaseLayout.astro`.                                    |
| Giscus not rendering                                    | Verify `PUBLIC_GISCUS_*` env vars and that Discussions are enabled in the repo.                     |
| Giscus theme stuck                                      | Theme attribute must be `chirpy-light` or `chirpy-dark`. Update `Giscus.astro` if renamed.          |
| New locale routes 404 in dev                            | Restart `bun run dev` after adding files under `src/pages/<locale>/`.                               |
| `astro check` fails on `astro:content`                  | Run `bun run dev` or `bun run build` once to generate `.astro/types.d.ts`.                          |
| Math rendered as raw `$…$`                              | Add `math: true` to frontmatter and rebuild.                                                        |
| `pubDate: Required` build error                         | A post is missing `pubDate` in frontmatter — error message names the file.                          |
| Sitemap missing hreflang                                | Ensure both translations share the same `translationKey` (or identical slug).                       |
| After changing default locale, old default URLs now 404 | The old default locale needs its own `src/pages/<old-locale>/` folder with every route file.        |
| After changing default locale, canonical URLs wrong     | Verify `localePrefix()` in `src/i18n/utils.ts` returns `''` for the new `defaultLocale`.            |
| Language switcher sends user to wrong URL               | `localizedPath()` is likely still hard-coded to the old default locale — check `src/i18n/utils.ts`. |

---

## Key External Dependencies

| Package                        | Version | Purpose                        |
| ------------------------------ | ------- | ------------------------------ |
| `astro`                        | 6.x     | Framework                      |
| `@tailwindcss/vite`            | v4      | Tailwind Vite integration      |
| `daisyui`                      | v5      | Component/theme library        |
| `astro-expressive-code`        | latest  | Syntax-highlighted code blocks |
| `remark-math` + `rehype-katex` | latest  | LaTeX math support             |
| `pagefind`                     | latest  | Static search index            |
| `@astrojs/sitemap`             | latest  | Sitemap generation             |
| `@astrojs/mdx`                 | latest  | MDX support                    |
| `@satori/resvg-js`             | latest  | Automatic OG image generation  |

---

## Agent Self-Maintenance

This file is a **living document**. AI agents working in this repository are
responsible for keeping it accurate. Outdated documentation is worse than no
documentation — if you change the architecture, update this file in the same
commit.

This repository is a **public Astro theme**. That means code changes often have
a wider blast radius than a typical app — users depend on the README, the starter
template, and the demo posts to understand the theme. Every meaningful change
must be reflected across all four artefacts below.

---

### The four artefacts to keep in sync

| Artefact           | Location                                                                                                      | Update when                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **`Agents.md`**    | `/Agents.md` (this file)                                                                                      | Any architectural change                                                                                       |
| **Main README**    | `/README.md`                                                                                                  | Any user-facing feature, config option, frontmatter field, script, or deployment instruction changes           |
| **Starter README** | `https://github.com/kannansuresh/chirping-astro-starter` — update via a separate PR/commit to that repository | Any change that affects how a new user sets up or configures the theme from scratch                            |
| **Demo posts**     | `src/content/posts/<locale>/`                                                                                 | Any change to an existing feature that is demonstrated in a post; or any new feature that needs a post written |

**Rule: never ship a feature without updating all four artefacts that are relevant to it.** The test: could a user who only reads the README and demo posts understand and use the new or changed feature correctly? If not, the docs are not done.

---

### When to update each artefact

#### `Agents.md` (this file)

Update whenever you make a change that affects how a future agent would
understand or work in this codebase.

| Change made                                | Sections to update                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------ |
| New locale added                           | Repository Layout · i18n Rules · Routing reference table                             |
| Default locale changed                     | i18n Rules (no-prefix invariant) · Routing reference · File naming · Troubleshooting |
| New file or folder added to `src/`         | Repository Layout                                                                    |
| New env variable added                     | Environment Variables                                                                |
| `src/config.ts` shape changed              | Configuration Knobs                                                                  |
| New frontmatter field added/removed        | Content Schema — Post frontmatter table                                              |
| New Astro island added                     | Hydration Islands table                                                              |
| New `bun run` script added                 | Bun Scripts                                                                          |
| New GitHub Actions workflow added          | CI / GitHub Actions                                                                  |
| New constraint or known pitfall discovered | Constraints & Pitfalls                                                               |
| New recurring error pattern discovered     | Troubleshooting Reference                                                            |
| New external dependency added              | Key External Dependencies                                                            |
| Theme names changed                        | Styling System — Theme names section                                                 |

#### `/README.md`

The README is the primary user-facing reference. Update it for any change that
affects what a theme user sees, configures, or does.

| Change made                                | README sections to update                 |
| ------------------------------------------ | ----------------------------------------- |
| New `SITE.*` config field                  | Configuration walkthrough table           |
| New frontmatter field                      | Authoring content — frontmatter reference |
| New env variable                           | Quickstart step 3 + deployment env table  |
| New `bun run` script                       | Bun scripts table                         |
| New feature (search, comments, math, etc.) | Add or update its dedicated section       |
| Deployment behaviour changed               | Deployment section                        |
| i18n / locale behaviour changed            | i18n section                              |
| Troubleshooting entry discovered           | Troubleshooting table                     |

#### Starter README (`chirping-astro-starter`)

The starter is what new users clone. Its README should always reflect the
minimal, "fresh install" experience. Update it when:

- The quickstart steps change (install command, env setup, first-run flow).
- A config field that a new user must set on day one changes name, type, or
  default.
- A new env variable becomes required or commonly needed at setup time.
- The deployment instructions change for any supported host.

File a separate commit/PR to the starter repository. Reference the main repo
commit in the PR description so the two are linked.

#### Demo posts (`src/content/posts/`)

The demo posts are the interactive documentation for the theme. They are
read by real users in the browser, so they must stay accurate.

**Updating an existing demo post** — required when:

- A feature demonstrated by a post changes behaviour, syntax, or config.
- A frontmatter field shown in a post is renamed, added, or removed.
- A code example in a post would produce different output with the new code.

**Writing a new demo post** — required for every new feature. Follow these
conventions:

1. Create `src/content/posts/en/<feature-slug>.mdx` (and a paired
   `src/content/posts/<other-locale>/<feature-slug>.mdx` if translations exist).
2. Use the same `translationKey` across locale variants.
3. Set `pinned: false` unless it's a critical getting-started post.
4. Link the new post from the welcome/index post if it belongs in the guided tour.
5. The post must demonstrate the feature end-to-end — not just describe it.
   Show real frontmatter, real config, and real rendered output.
6. Add the post slug to any "feature index" or table-of-contents post that lists
   all demo content.

---

### How to update this file

1. **Read the relevant section first.** Never append blindly — check whether the
   information already exists and needs editing rather than adding.

2. **Be surgical.** Edit only the sections the change actually affects. Do not
   reformat unrelated sections.

3. **Keep the tone consistent.** Entries are written as direct, imperative facts
   for an agent audience — not as prose explanations for a human reader.

4. **Update the footer timestamp** at the bottom of the file to today's date.

5. **Commit `Agents.md` together with the code change** — never in a separate
   commit. A reviewer (human or automated) should be able to diff both in one
   place.

---

### What not to change

- Do not remove the **No-Prefix Invariant** callout or weaken its language —
  it exists because agents have historically gotten this wrong.
- Do not summarise or shorten the **Changing the default locale** checklist —
  it is intentionally exhaustive.
- Do not change section heading text without searching the codebase for any
  anchor links that reference them.

---

### Self-check before committing

```text
[ ] bun run typecheck       — must pass with zero errors
[ ] bun run lint            — must pass with zero warnings
[ ] bun run format:check    — must pass (run `bun run format` first if it fails)
[ ] bun run build           — must succeed; inspect dist/ for obvious breakage
[ ] Agents.md updated       — every affected section reflects the change
[ ] README.md updated       — every user-facing change is documented
[ ] Starter README updated  — if the change affects first-run setup (separate PR)
[ ] Demo post updated       — existing post corrected if behaviour changed
[ ] New demo post written   — if this is a new feature
[ ] No locale-specific examples snuck in (use <locale>, <slug> placeholders)
[ ] Routing reference table still matches actual dist/ output
```

---

_This file was last updated on 2026-05-04._
