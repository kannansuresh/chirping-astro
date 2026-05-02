/**
 * Global site + theme configuration.
 * Edit values here to rebrand the theme. All values are typed and consumed
 * across layouts, components, RSS, sitemap, and SEO.
 */

export type Locale = 'en' | 'fr';

export interface SiteConfig {
  /** Public URL of the deployed site, no trailing slash. */
  url: string;
  /** Default site title used as homepage <title> and meta. */
  title: string;
  /** Site tagline / description. */
  description: string;
  /** Author/handle shown in footer + meta. */
  author: {
    name: string;
    url?: string;
    avatar?: string;
    bio?: string;
  };
  /** Default OG image relative to /public. */
  defaultOgImage: string;
  /** Default locale. EN, served at root with no prefix. */
  defaultLocale: Locale;
  /** Supported locales. */
  locales: readonly Locale[];
  /** Number of posts per page on listings. */
  postsPerPage: number;
  /** Display ISO 8601 date format if true, otherwise locale-aware. */
  isoDates: boolean;
  /**
   * Site-wide default for whether posts should display their featured
   * image (in cards on listings, and as a hero on the post page).
   * Each post may override via the `showFeaturedImage` frontmatter flag.
   */
  showFeaturedImages: boolean;
  /**
   * Wrap the article body of posts and pages (e.g. About) in a bordered,
   * card-like container. When `false`, content sits directly on the page
   * background — the Chirpy default.
   */
  boxedArticles: boolean;
  /**
   * Control horizontal listing card height behavior on desktop.
   * `false` keeps a fixed Chirpy-like card height for image cards.
   * `true` allows cards to grow when title/description content is longer.
   */
  dynamicPostCardHeight: boolean;
  /**
   * Show the language switcher in the top bar and link to translated
   * pages. Set to `false` for single-language sites — the switcher is
   * hidden and `<link rel="alternate" hreflang>` is omitted.
   * Routes under non-default locale prefixes still build; remove their
   * source pages and content folders if you don't want them at all.
   */
  multilingual: boolean;
  /**
   * Automatically generate Open Graph images for posts that don't have
   * a `heroImage`. Uses Satori + Resvg to produce a themed 1200×630 PNG
   * at build time. Set to `false` to disable and fall back to
   * `defaultOgImage` for all posts without a hero.
   */
  autoOgImage: boolean;
}

export interface NavItem {
  /** Unique key matching i18n.ts entries. */
  key: string;
  /** Path WITHOUT leading locale prefix. The renderer adds it. */
  href: string;
  /** Optional icon name (e.g. "home", "tags"). */
  icon?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface GiscusConfig {
  /** Master switch. */
  enabled: boolean;
  /** GitHub repo (e.g. `user/repo`). */
  repo: string;
  /** Repo ID (from giscus.app). */
  repoId: string;
  /** Discussion category. */
  category: string;
  /** Category ID. */
  categoryId: string;
  /** Discussion mapping strategy. */
  mapping: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  /** Strict matching. */
  strict: '0' | '1';
  /** Enable reactions on the main post. */
  reactionsEnabled: '0' | '1';
  /** Emit metadata events. */
  emitMetadata: '0' | '1';
  /** Comment input position. */
  inputPosition: 'top' | 'bottom';
  /** Lazy load. */
  loading: 'lazy' | 'eager';
}

/**
 * Author + social handles. Filled in from env vars (see `.env.example`)
 * so identifiers never need to be hard-coded into source.
 *
 * Leave any handle as an empty string to drop it from the sidebar
 * automatically — the entry won't render and no broken `your-handle`
 * URL is exposed.
 */
const GITHUB_HANDLE = import.meta.env.PUBLIC_GITHUB_HANDLE ?? '';
const GITHUB_REPO = import.meta.env.PUBLIC_GITHUB_REPO ?? 'chirping-astro';
const TWITTER_HANDLE = import.meta.env.PUBLIC_TWITTER_HANDLE ?? '';
const CONTACT_EMAIL = import.meta.env.PUBLIC_CONTACT_EMAIL ?? '';
const AUTO_OG_DISABLED_IN_CI = (import.meta.env.CI_SKIP_AUTO_OG_IMAGE ?? 'false') === 'true';

/**
 * Public GitHub coordinates of the deployed source. Used by the footer's
 * "Theme" link and anywhere a canonical repo URL is needed. When
 * `PUBLIC_GITHUB_HANDLE` is unset, `url` falls back to a safe default so
 * the footer never points at a 404.
 */
export const REPO = {
  handle: GITHUB_HANDLE,
  name: GITHUB_REPO,
  url: GITHUB_HANDLE ? `https://github.com/${GITHUB_HANDLE}/${GITHUB_REPO}` : 'https://github.com',
} as const;

export const SITE: SiteConfig = {
  // `||` (not `??`) so an explicitly empty `SITE_URL=` in `.env` also
  // falls back to the default. Astro requires `site` to be a valid URL.
  url: import.meta.env.SITE_URL || 'https://chirping-astro.example.com',
  title: 'Chirping Astro',
  description:
    'A modern, multilingual Astro v6 theme inspired by Chirpy — built with Tailwind v4, daisyUI, MDX, Pagefind, and Giscus.',
  author: {
    name: 'Chirping Astro',
    url: GITHUB_HANDLE ? `https://github.com/${GITHUB_HANDLE}` : undefined,
    avatar: '/images/avatar.svg',
    bio: 'A text-focused Astro V6 theme.',
  },
  defaultOgImage: '/images/og-default.svg',
  defaultLocale: 'en',
  locales: ['en', 'fr'] as const,
  postsPerPage: 8,
  isoDates: false,
  showFeaturedImages: true,
  boxedArticles: false,
  dynamicPostCardHeight: false,
  multilingual: true,
  autoOgImage: !AUTO_OG_DISABLED_IN_CI,
};

export const NAV: readonly NavItem[] = [
  { key: 'home', href: '/', icon: 'lucide:home' },
  { key: 'categories', href: '/categories', icon: 'lucide:layers' },
  { key: 'tags', href: '/tags', icon: 'lucide:tag' },
  { key: 'archives', href: '/archives', icon: 'lucide:archive' },
  { key: 'about', href: '/about', icon: 'lucide:info' },
] as const;

/**
 * SOCIALS is built from the env-driven handles above so users only edit
 * one place (`.env` or the constants at the top of this file). Empty
 * handles are filtered out automatically — the icon simply won't appear
 * in the sidebar. RSS is always present.
 *
 * Need a social network the theme doesn't ship with? Just append a
 * literal entry below — the type is `SocialLink`.
 */
export const SOCIALS: readonly SocialLink[] = [
  GITHUB_HANDLE && {
    label: 'GitHub',
    href: `https://github.com/${GITHUB_HANDLE}`,
    icon: 'simple-icons:github',
  },
  TWITTER_HANDLE && {
    label: 'Twitter',
    href: `https://x.com/${TWITTER_HANDLE}`,
    icon: 'simple-icons:x',
  },
  CONTACT_EMAIL && {
    label: 'Email',
    href: `mailto:${CONTACT_EMAIL}`,
    icon: 'lucide:mail',
  },
  { label: 'RSS', href: '/rss.xml', icon: 'lucide:rss' },
].filter(Boolean) as SocialLink[];

/**
 * Giscus comments. Set `enabled: false` to globally disable. Individual
 * posts may opt out via frontmatter `comments: false`.
 *
 * Generate values at https://giscus.app and either set them here or
 * (recommended) provide them via PUBLIC_GISCUS_* env vars at build time.
 */
export const GISCUS: GiscusConfig = {
  enabled: (import.meta.env.PUBLIC_GISCUS_ENABLED ?? 'false') === 'true',
  repo: import.meta.env.PUBLIC_GISCUS_REPO ?? '',
  repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID ?? '',
  category: import.meta.env.PUBLIC_GISCUS_CATEGORY ?? 'Announcements',
  categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID ?? '',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  loading: 'lazy',
};

/**
 * Pagefind runtime settings. The index itself is generated by `bun run pagefind`
 * after `astro build` and written to `dist/_pagefind/`.
 */
export const PAGEFIND = {
  /** Public path where the Pagefind bundle is served. */
  bundlePath: '/_pagefind/',
  /** Number of results to render per locale. */
  pageSize: 10,
} as const;
