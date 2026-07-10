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

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

export function rehypeBaseLinks(options: { base: string }) {
  // If base is empty or just '/', we don't need to rewrite anything.
  const base = options.base === '/' ? '' : options.base.replace(/\/$/, '');

  if (!base) {
    return () => {}; // No-op
  }

  return (tree: HastNode) => {
    function visit(node: HastNode) {
      if (node.type === 'element' && node.properties) {
        // Rewrite <a> tags
        if (node.tagName === 'a' && typeof node.properties.href === 'string') {
          const href = node.properties.href;
          if (href.startsWith('/') && !href.startsWith('//')) {
            node.properties.href = base + href;
          }
        }
        // Rewrite <img> tags
        else if (node.tagName === 'img' && typeof node.properties.src === 'string') {
          const src = node.properties.src;
          if (src.startsWith('/') && !src.startsWith('//')) {
            node.properties.src = base + src;
          }
        }
      }

      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          visit(child);
        }
      }
    }

    visit(tree);
  };
}
