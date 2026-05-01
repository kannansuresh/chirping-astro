/**
 * Dynamic OG image endpoint.
 *
 * Generates a 1200×630 PNG for each post that doesn't have a custom
 * heroImage. Posts WITH a heroImage get their image used as the OG
 * directly (handled in the SEO/layout layer) — this endpoint only
 * produces fallback images for posts that lack one.
 *
 * Route: /og/[...slug].png
 * Example: /og/welcome.png → OG image for the "welcome" post (EN)
 */
/* global Response */
import type { GetStaticPaths } from 'astro';
import { generateOgImage } from '../../utils/og-image';
import { getPosts, postSlug, type Post } from '../../utils/posts';
import { SITE, type Locale } from '../../config';
import { formatDate } from '../../i18n/utils';

export const getStaticPaths: GetStaticPaths = async () => {
  // When autoOgImage is disabled, generate no OG images.
  if (!SITE.autoOgImage) return [];

  const paths: Array<{ params: { slug: string }; props: { post: Post; locale: Locale } }> = [];

  for (const locale of SITE.locales) {
    const posts = await getPosts(locale);
    for (const post of posts) {
      // Generate OG images for ALL posts (even those with heroImage)
      // so we always have a consistent, optimized fallback.
      const slug = postSlug(post);
      const prefix = locale === SITE.defaultLocale ? '' : `${locale}/`;
      paths.push({
        params: { slug: `${prefix}${slug}` },
        props: { post, locale },
      });
    }
  }
  return paths;
};

interface Props {
  post: Post;
  locale: Locale;
}

export async function GET({ props }: { props: Props }) {
  const { post, locale } = props;

  const date = post.data.pubDate ? formatDate(post.data.pubDate, locale) : undefined;

  const png = await generateOgImage({
    title: post.data.title,
    description: post.data.description,
    date,
    category: post.data.categories[0],
    tags: post.data.tags,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
