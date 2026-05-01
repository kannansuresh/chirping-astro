/**
 * Content Collections (Astro v6 loader API).
 *
 * Folder convention: `src/content/<collection>/<locale>/**`
 *  - posts/en/**  -> EN posts
 *  - posts/fr/**  -> FR posts
 *  - pages/en/**  -> EN static pages (about, etc.)
 *  - pages/fr/**  -> FR static pages
 *
 * The locale is derived from the file path so authors do not need to set it
 * manually (but they may override it in frontmatter).
 */

import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

import { SITE } from './config';

const localeEnum = z.enum(SITE.locales as unknown as [string, ...string[]]);

/**
 * Build the post / page frontmatter schema.
 *
 * `heroImage` accepts THREE shapes:
 *   1. An imported asset via `image()` — a path RELATIVE TO THE
 *      MARKDOWN FILE pointing into `src/assets/...`. Astro resolves
 *      it through its image pipeline (WebP, responsive `srcset`,
 *      width/height inferred). This is the recommended option.
 *   2. A public path (e.g. `/images/foo.jpg`) — copied as-is, NOT
 *      optimized.
 *   3. An external URL (https://…) — optimized at build if the host
 *      is allow-listed in `image.remotePatterns` in `astro.config.mjs`.
 */
const baseFrontmatter = ({ image }: SchemaContext) =>
  z.object({
    title: z.string().min(1).max(140),
    description: z.string().min(1).max(280),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.union([image(), z.string()]).optional(),
    /** Optional alt-text for the hero/featured image. */
    heroImageAlt: z.string().optional(),
    /** Per-post override of SITE.showFeaturedImages (cards + hero). */
    showFeaturedImage: z.boolean().optional(),
    /** Per-post override of SITE.dynamicPostCardHeight on listing cards. */
    dynamicPostCardHeight: z.boolean().optional(),
    canonicalURL: z.url().optional(),
    comments: z.boolean().optional(),
    toc: z.boolean().default(true),
    /** Pin to top of listings. */
    pinned: z.boolean().default(false),
    /**
     * Opt in to LaTeX math rendering (KaTeX). When `true`, the layout
     * loads `katex.min.css` only on this page so the stylesheet stays
     * off posts/pages that don't use math.
     */
    math: z.boolean().default(false),
    /** Optional locale override; otherwise inferred from path. */
    lang: localeEnum.optional(),
    /**
     * Maps translated variants together. Posts that share a translationKey
     * across locales are considered translations of each other and the
     * language switcher will jump between them on the same article.
     *
     * If omitted, falls back to the file slug (relative to the locale folder).
     */
    translationKey: z.string().optional(),
  });

export type PostFrontmatter = z.infer<ReturnType<typeof baseFrontmatter>>;

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
  }),
  schema: baseFrontmatter,
});

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/pages',
  }),
  schema: (ctx) =>
    baseFrontmatter(ctx)
      .partial({ pubDate: true })
      .extend({
        /** Pages don't paginate or appear in archives. */
        showInNav: z.boolean().default(false),
      }),
});

export const collections = { posts, pages };
