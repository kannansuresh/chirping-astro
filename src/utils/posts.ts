/**
 * Post helpers.
 *
 * Wraps the `astro:content` collection API to:
 *  - filter drafts in production
 *  - infer locale from filesystem path (posts/en/foo -> 'en')
 *  - sort by pubDate desc, with pinned posts first
 *  - group posts by tag / category / month
 *  - resolve translation siblings via `translationKey`
 */

import { getCollection, type CollectionEntry } from 'astro:content';

import { SITE, type Locale } from '../config';

export type Post = CollectionEntry<'posts'> & {
  data: CollectionEntry<'posts'>['data'] & { lang: Locale; translationKey: string };
};

const isProd = import.meta.env.PROD;

/** Derive the locale from `posts/<locale>/foo` slug-ish ID. */
function localeFromId(id: string): Locale {
  const seg = id.split(/[\\/]/)[0];
  if (seg && (SITE.locales as readonly string[]).includes(seg)) return seg as Locale;
  return SITE.defaultLocale;
}

/** Strip locale prefix from a content ID. */
function stripLocaleFromId(id: string): string {
  const segs = id.split(/[\\/]/);
  if (segs[0] && (SITE.locales as readonly string[]).includes(segs[0])) {
    return segs.slice(1).join('/');
  }
  return id;
}

/** Normalize a post entry: ensure `lang` and `translationKey` are set. */
function normalize(entry: CollectionEntry<'posts'>): Post {
  const lang = entry.data.lang ?? localeFromId(entry.id);
  const translationKey = entry.data.translationKey ?? stripLocaleFromId(entry.id);
  return {
    ...entry,
    data: { ...entry.data, lang, translationKey },
  } as Post;
}

/** Public slug used for the URL: filename minus locale and extension. */
export function postSlug(entry: Post): string {
  return stripLocaleFromId(entry.id).replace(/\.(md|mdx)$/i, '');
}

/** Full localized URL path for a post. */
export function postPath(entry: Post): string {
  const slug = postSlug(entry);
  if (entry.data.lang === SITE.defaultLocale) return `/posts/${slug}/`;
  return `/${entry.data.lang}/posts/${slug}/`;
}

/** Sort posts: pinned first, then by pubDate desc. */
export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    if (a.data.pinned !== b.data.pinned) return a.data.pinned ? -1 : 1;
    const at = a.data.pubDate?.valueOf?.() ?? 0;
    const bt = b.data.pubDate?.valueOf?.() ?? 0;
    return bt - at;
  });
}

/** Get all posts for a locale (drafts hidden in prod, sorted). */
export async function getPosts(locale: Locale): Promise<Post[]> {
  const all = await getCollection('posts', (entry) => {
    if (isProd && entry.data.draft) return false;
    const lang = entry.data.lang ?? localeFromId(entry.id);
    return lang === locale;
  });
  return sortPosts(all.map(normalize));
}

/** Find a single post by locale + slug (path-relative). */
export async function getPostBySlug(locale: Locale, slug: string): Promise<Post | undefined> {
  const posts = await getPosts(locale);
  return posts.find((p) => postSlug(p) === slug);
}

/** All translation siblings of a post (other locales sharing translationKey). */
export async function getTranslations(entry: Post): Promise<Record<Locale, Post | undefined>> {
  const out: Partial<Record<Locale, Post | undefined>> = {};
  for (const locale of SITE.locales) {
    if (locale === entry.data.lang) {
      out[locale] = entry;
      continue;
    }
    const all = await getPosts(locale);
    out[locale] = all.find((p) => p.data.translationKey === entry.data.translationKey);
  }
  return out as Record<Locale, Post | undefined>;
}

/** Tags for a locale, with counts, sorted by count desc then alpha. */
export async function getTagsWithCount(
  locale: Locale,
): Promise<Array<{ name: string; count: number }>> {
  const posts = await getPosts(locale);
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Categories for a locale, with counts. */
export async function getCategoriesWithCount(
  locale: Locale,
): Promise<Array<{ name: string; count: number }>> {
  const posts = await getPosts(locale);
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const c of p.data.categories) map.set(c, (map.get(c) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Group posts by year -> month for the archives page. */
export function groupByYearMonth(
  posts: Post[],
  locale: Locale,
): Array<{
  year: number;
  months: Array<{ month: number; label: string; posts: Post[] }>;
}> {
  const buckets = new Map<number, Map<number, Post[]>>();
  for (const post of posts) {
    const date = post.data.pubDate;
    if (!date) continue;
    const y = date.getFullYear();
    const m = date.getMonth();
    if (!buckets.has(y)) buckets.set(y, new Map());
    const months = buckets.get(y)!;
    if (!months.has(m)) months.set(m, []);
    months.get(m)!.push(post);
  }
  const lang = locale === 'fr' ? 'fr-FR' : 'en-US';
  const fmt = new Intl.DateTimeFormat(lang, { month: 'long' });
  return Array.from(buckets.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, months]) => ({
      year,
      months: Array.from(months.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([month, list]) => ({
          month,
          label: fmt.format(new Date(year, month, 1)),
          posts: list,
        })),
    }));
}

/**
 * Resolve whether a post should display its featured (hero) image,
 * considering the per-post override (`showFeaturedImage`) and the
 * site-wide default (`SITE.showFeaturedImages`).
 *
 * Returns `false` when there is no `heroImage` to show.
 */
export function shouldShowHero(post: Post): boolean {
  if (!post.data.heroImage) return false;
  return post.data.showFeaturedImage ?? SITE.showFeaturedImages;
}

/** The hero image source URL/path for a post (or undefined). */
export function heroImageSrc(post: Post): string | undefined {
  const img = post.data.heroImage;
  if (!img) return undefined;
  if (typeof img === 'string') return img;
  // Accept Astro image-import objects defensively (legacy posts)
  if (typeof img === 'object' && 'src' in (img as Record<string, unknown>)) {
    return (img as { src: string }).src;
  }
  return undefined;
}

/** Slugify a tag/category for use in URLs. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Build the URL for a tag listing page in a given locale. */
export function tagPath(locale: Locale, tag: string): string {
  const slug = slugify(tag);
  return locale === SITE.defaultLocale ? `/tags/${slug}/` : `/${locale}/tags/${slug}/`;
}

/** Build the URL for a category listing page in a given locale. */
export function categoryPath(locale: Locale, category: string): string {
  const slug = slugify(category);
  return locale === SITE.defaultLocale
    ? `/categories/${slug}/`
    : `/${locale}/categories/${slug}/`;
}
