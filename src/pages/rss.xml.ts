import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { getPosts, postPath } from '../utils/posts';

export const GET: APIRoute = async (context) => {
  const locale = 'en';
  const posts = await getPosts(locale);
  // `BASE_URL` ends with a '/' (e.g. '/' in dev, '/chirping-astro/' on Pages),
  // so we slice it off when concatenating to avoid '//rss/styles.xsl'.
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const siteWithBase = `${(context.site ?? new URL(SITE.url)).origin}${base}`;
  return rss({
    title: SITE.title,
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
    customData: `<language>en-us</language>`,
  });
};
