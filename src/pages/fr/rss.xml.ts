import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../../config';
import { getPosts, postPath } from '../../utils/posts';

export const GET: APIRoute = async (context) => {
  const locale = 'fr';
  const posts = await getPosts(locale);
  return rss({
    title: `${SITE.title} (FR)`,
    description: SITE.description,
    site: context.site ?? SITE.url,
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
