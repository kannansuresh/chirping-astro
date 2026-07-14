// @ts-check
import { satteri, satteriHeadingIdsPlugin } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import { defineConfig, fontProviders, svgoOptimizer } from 'astro/config';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import satteriExternalLinks from 'satteri-external-links';
import { katex } from '@nullpinter/satteri-katex';
import { satteriAlert } from './src/plugins/satteri-alert';
import { satteriAsHTML } from './src/plugins/satteri-ashtml';
import { satteriBaseLinks } from './src/plugins/satteri-base-links';
import { satteriAutolinkHeadings } from './src/plugins/satteri-autolink-headings.ts';
import { satteriMermaid } from './src/plugins/satteri-mermaid.ts';

import { SITE } from './src/config';

const rawBase = (process.env.BASE_PATH ?? '/').replace(/\/$/, '');
const BASE = rawBase.startsWith('/') ? rawBase : `/${rawBase}`;
const SITEMAP_XSL_HREF = `${BASE}/sitemap/styles.xsl`;
const SKIP_RSS_SITEMAP = process.env.CI_SKIP_RSS_SITEMAP === 'true';

/**
 * Set of URL path segments that belong to unlisted posts/pages.
 * Populated by `collectUnlistedUrls()` integration before the sitemap
 * integration runs, so the sitemap `filter` can exclude them.
 *
 * We use path segments (e.g. "posts/my-slug") rather than full URLs so
 * the check works regardless of `SITE_URL` or `BASE_PATH` values.
 */
const unlistedPathSegments = new Set();

/**
 * Integration that reads the content collection at build time and
 * populates `unlistedPathSegments` with the URL path segments of every
 * unlisted post. Must be listed BEFORE `@astrojs/sitemap` in the
 * integrations array.
 */
function collectUnlistedUrls() {
  return {
    name: 'chirpy:collect-unlisted-urls',
    hooks: {
      'astro:build:start': async () => {
        try {
          // Dynamically import so this only runs during builds (not in
          // the config evaluation phase where astro:content isn't ready).
          const { getCollection } = await import('astro:content');
          const entries = await getCollection('posts');
          for (const entry of entries) {
            if (!entry.data.unlisted) continue;
            // Derive locale and slug from the entry id (e.g. "en/my-post.md").
            const segs = entry.id.split(/[\\/]/);
            const locale = segs[0] && /** @type {readonly string[]} */ (SITE.locales).includes(segs[0]) ? segs[0] : SITE.defaultLocale;
            const slug = segs.slice(1).join('/').replace(/\.(md|mdx)$/i, '');
            if (locale === SITE.defaultLocale) {
              unlistedPathSegments.add(`posts/${slug}`);
            } else {
              unlistedPathSegments.add(`${locale}/posts/${slug}`);
            }
          }
        } catch {
          // Content collections aren't available in all build contexts
          // (e.g. CI fast mode). Silently skip — the sitemap will include
          // unlisted posts in that case, which is acceptable for CI.
        }
      },
    },
  };
}

/**
 * Tiny inline integration: after `@astrojs/sitemap` runs, rewrite the
 * absolute XSL `href` it emits (always prefixed with `site`, e.g.
 * `https://aneejian.com/sitemap/styles.xsl`) to a root-relative path.
 *
 * Why: a root-relative href works in BOTH environments
 *   - production: same origin as the sitemap, browsers apply the XSL
 *   - `bun serve` / preview: same origin (localhost), no cross-origin
 *     XSLT block (which renders as a blank page in browsers).
 *
 * Crawlers ignore `<?xml-stylesheet ?>` entirely, so SEO is unaffected.
 */
function rewriteSitemapXslToRelative() {
  return {
    name: 'chirpy:rewrite-sitemap-xsl',
    hooks: {
      'astro:build:done': (/** @type {{ dir: URL }} */ { dir }) => {
        const distDir = fileURLToPath(dir);
        const files = readdirSync(distDir).filter(
          (f) => f.startsWith('sitemap') && f.endsWith('.xml'),
        );
        for (const file of files) {
          const path = join(distDir, file);
          const xml = readFileSync(path, 'utf8');
          const fixed = xml.replace(
            /<\?xml-stylesheet\b[^?]*\?>/,
            `<?xml-stylesheet type="text/xsl" href="${SITEMAP_XSL_HREF}"?>`,
          );
          if (fixed !== xml) writeFileSync(path, fixed);
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  // GitHub Pages serves the project at https://<user>.github.io/<repo>/,
  // so production builds need `base` to match that subpath — every
  // generated asset URL (CSS, JS, images, favicons) is prefixed with it.
  //
  // In `bun run dev`, however, we want the site to open at plain
  // `http://localhost:4321/` for a friction-free local experience. The
  // `BASE_PATH` env var (read from `.env`) lets each environment opt in:
  //   - `.env` (committed empty / unset)         → dev runs at `/`
  //   - CI / Pages workflow sets BASE_PATH=/chirping-astro for the build
  //
  // In source code, always build absolute paths through `withBase()` /
  // `localizedPath()` in `src/i18n/utils.ts` so they pick up this value
  // automatically (via `import.meta.env.BASE_URL`).
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },

  // Image optimization (https://docs.astro.build/en/guides/images/).
  //
  // - Local images imported from `src/` (or `src/assets/`) are optimized
  //   automatically by `astro:assets`.
  // - Images in `public/` are copied as-is and CANNOT be transformed.
  // - Remote URLs must match a `remotePatterns` entry below before they
  //   can be passed to `<Image>` / `<Picture>` for optimization.
  //
  // The default Sharp service generates modern formats (WebP/AVIF) and
  // responsive `srcset`s. With `responsiveStyles: true` and a default
  // `layout`, every `<Image layout="...">` automatically gets the right
  // `width`/`height`/`object-fit` styles applied.
  image: {
    layout: 'constrained',
    responsiveStyles: true,
    remotePatterns: [
      // Unsplash (used by demo posts).
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Common CDNs many users plug in. Extend or trim as needed.
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'imagedelivery.net' },
    ],
  },

  // i18n config: EN is default and serves at root (no prefix), FR served at /fr.
  // We rely on filesystem routing (src/pages and src/pages/[...locale]) for the actual
  // routes, but still expose locales here so integrations like sitemap can
  // generate hreflang alternates correctly.
  i18n: {
    locales: [...SITE.locales],
    defaultLocale: SITE.defaultLocale,
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  markdown: {
    // `remark-math` parses `$inline$` and `$$display$$` blocks into MDAST
    // math nodes; `rehype-katex` converts them to pre-rendered HTML at
    // build time so no JavaScript is shipped to the client.
    //
    // The accompanying KaTeX stylesheet (`katex/dist/katex.min.css`) is
    // loaded ONLY on pages that opt in via `math: true` in frontmatter,
    // through `<MathStyles />` in the post / page layouts. This keeps the
    // CSS (~25kB gzipped) off pages that don't need it.
    processor: satteri({
      features: { math: true },
      mdastPlugins: [satteriAlert(), satteriAsHTML(), katex(), satteriMermaid()],
      hastPlugins: [
        satteriHeadingIdsPlugin(),
        satteriAutolinkHeadings(),
        satteriExternalLinks({
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer']
        }),
        satteriBaseLinks({ base: BASE }),
      ],
    }),
  },

  integrations: [
    icon({
      // Astro-Icon will tree-shake from @iconify-json/lucide so only the
      // icons actually referenced make it into the build.
      iconDir: 'src/icons',
    }),
    // Expressive Code provides syntax highlighting (Shiki under the hood)
    // plus extra features: code-block frames + titles, copy button, line
    // markers, diffs, word wrap, collapsible sections.
    // https://expressive-code.com/
    expressiveCode({
      themes: ['github-light', 'github-dark-dimmed'],
      // Bind the active theme to our `<html data-theme>` attribute instead
      // of the default `prefers-color-scheme` media query so the theme
      // toggle in the sidebar takes effect immediately.
      themeCssSelector: (theme) =>
        `[data-theme='${theme.type === 'dark' ? 'chirpy-dark' : 'chirpy-light'}']`,
      useDarkModeMediaQuery: false,
      shiki: {
        langAlias: {
          env: 'dotenv',
        },
      },
      styleOverrides: {
        borderRadius: '0.5rem',
        codeFontFamily:
          "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        codeFontSize: '0.875rem',
        frames: {
          shadowColor: 'transparent',
        },
      },
    }),
    // MDX must come after Expressive Code so EC can transform fenced
    // code blocks inside .mdx files too.
    mdx(),
    ...(SKIP_RSS_SITEMAP
      ? []
      : [
          collectUnlistedUrls(),
          sitemap({
            i18n: {
              defaultLocale: SITE.defaultLocale,
              locales: Object.fromEntries(SITE.locales.map((l) => [l, l])),
            },
            // Browsers (and only browsers) apply this XSL to render a
            // human-readable view of `sitemap-index.xml` and `sitemap-0.xml`.
            // Search-engine crawlers ignore the processing instruction.
            // Note: `@astrojs/sitemap` rewrites this into an ABSOLUTE URL using
            // `site`. The `rewriteSitemapXslToRelative()` integration below
            // turns it back into a root-relative path so local preview works.
            xslURL: SITEMAP_XSL_HREF,
            filter: (page) => {
              if (page.includes('/draft/') || page.endsWith('/404/')) return false;
              // Exclude unlisted posts from the sitemap.
              for (const seg of unlistedPathSegments) {
                if (page.includes(String(seg))) return false;
              }
              return true;
            },
          }),
          rewriteSitemapXslToRelative(),
        ]),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    contentIntellisense: true,
    // Astro 7.x still exposes SVG optimization as an experimental flag.
    // The 6.2 change renamed the old `experimental.svgo` flag to the new
    // `experimental.svgOptimizer` API; it is not a stable top-level config yet.
    svgOptimizer: svgoOptimizer({
      multipass: true,
    }),
  },

  fonts: [
    // Source Sans 3 — main UI font from @fontsource/source-sans-3 npm package
    {
      name: 'Source Sans 3',
      cssVariable: '--font-source-sans-3',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: [
              './node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff2',
            ],
          },
          {
            weight: '600',
            style: 'normal',
            src: [
              './node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-600-normal.woff2',
            ],
          },
          {
            weight: '700',
            style: 'normal',
            src: [
              './node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-700-normal.woff2',
            ],
          },
          {
            weight: '900',
            style: 'normal',
            src: [
              './node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-900-normal.woff2',
            ],
          },
        ],
      },
    },
    // Lato — secondary font from @fontsource/lato npm package
    {
      name: 'Lato',
      cssVariable: '--font-lato',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: '300',
            style: 'normal',
            src: ['./node_modules/@fontsource/lato/files/lato-latin-300-normal.woff2'],
          },
          {
            weight: '400',
            style: 'normal',
            src: ['./node_modules/@fontsource/lato/files/lato-latin-400-normal.woff2'],
          },
        ],
      },
    },
    // JetBrains Mono — monospace font from @fontsource/jetbrains-mono npm package
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: [
              './node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2',
            ],
          },
          {
            weight: '600',
            style: 'normal',
            src: [
              './node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff2',
            ],
          },
        ],
      },
    },
  ],
});
