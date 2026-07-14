/**
 * rehype-base-links — Automatically prefixes absolute URLs in Markdown links
 * and images with the configured `BASE_PATH`.
 *
 * In Astro, standard markdown links like `[link](/posts/foo)` generate
 * `<a href="/posts/foo">`. If the site is deployed to a subpath (e.g.,
 * GitHub Pages at `/<repo-name>`), these links will 404 because they
 * lack the base path prefix.
 *
 * This plugin runs at build time to rewrite those paths natively.
 */

import { defineHastPlugin } from 'satteri';

export function satteriBaseLinks(options: { base: string }) {
  const base = options.base === '/' ? '' : options.base.replace(/\/$/, '');

  if (!base) {
    return defineHastPlugin({ name: 'rehype-base-links-noop' });
  }

  return defineHastPlugin({
    name: 'rehype-base-links',
    element: [
      {
        filter: ['a'],
        visit(node, ctx) {
          if (node.properties && typeof node.properties.href === 'string') {
            const href = node.properties.href;
            if (href.startsWith('/') && !href.startsWith('//')) {
              ctx.replaceNode(node, {
                ...node,
                properties: { ...node.properties, href: base + href },
              });
            }
          }
        },
      },
      {
        filter: ['img'],
        visit(node, ctx) {
          if (node.properties && typeof node.properties.src === 'string') {
            const src = node.properties.src;
            if (src.startsWith('/') && !src.startsWith('//')) {
              ctx.replaceNode(node, {
                ...node,
                properties: { ...node.properties, src: base + src },
              });
            }
          }
        },
      },
    ],
  });
}
