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

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

import { SITE } from './config';

const localeEnum = z.enum(SITE.locales as unknown as [string, ...string[]]);

const baseFrontmatter = z.object({
  title: z.string().min(1).max(140),
  description: z.string().min(1).max(280),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  heroImage: z.string().optional(),
  canonicalURL: z.url().optional(),
  comments: z.boolean().optional(),
  toc: z.boolean().default(true),
  /** Pin to top of listings. */
  pinned: z.boolean().default(false),
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

export type PostFrontmatter = z.infer<typeof baseFrontmatter>;

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
  }),
  schema: ({ image }) =>
    baseFrontmatter.extend({
      heroImage: image().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/pages',
  }),
  schema: ({ image }) =>
    baseFrontmatter
      .partial({ pubDate: true })
      .extend({
        heroImage: image().optional(),
        /** Pages don't paginate or appear in archives. */
        showInNav: z.boolean().default(false),
      }),
});

export const collections = { posts, pages };
