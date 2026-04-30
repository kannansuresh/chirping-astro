// @ts-check
import { defineConfig } from 'astro/config';
import process from 'node:process';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { SITE } from './src/config';

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
  // We rely on filesystem routing (src/pages and src/pages/fr) for the actual
  // routes, but still expose locales here so integrations like sitemap can
  // generate hreflang alternates correctly.
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
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
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['heading-anchor'],
            ariaHidden: 'true',
            tabIndex: -1,
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer'],
        },
      ],
    ],
    gfm: true,
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
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          fr: 'fr',
        },
      },
      filter: (page) => !page.includes('/draft/') && !page.endsWith('/404/'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    contentIntellisense: true,
  },
});
