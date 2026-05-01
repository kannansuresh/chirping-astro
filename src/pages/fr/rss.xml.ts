/* global URL */
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../../config';
import { getPosts, postPath } from '../../utils/posts';

export const GET: APIRoute = async (context) => {
  const locale = 'fr';
  const posts = await getPosts(locale);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const siteWithBase = `${(context.site ?? new URL(SITE.url)).origin}${base}`;
  return rss({
    title: `${SITE.title} (FR)`,
    description: SITE.description,
    site: siteWithBase,
    stylesheet: `${base}/rss/styles.xsl`,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: postPath(post),
      categories: [...post.data.tags, ...post.data.categories],
    })),
    customData: `<language>fr-fr</language>`,
  });
};
