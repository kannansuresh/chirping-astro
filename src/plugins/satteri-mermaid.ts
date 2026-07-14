import { defineMdastPlugin } from 'satteri';

/**
 * Custom Sätteri plugin to render `mermaid` fenced code blocks into
 * raw HTML wrappers containing the escaped mermaid source.
 *
 * The client-side Mermaid.astro component will later parse this
 * `data-mermaid-src` and render the SVG, re-rendering it whenever
 * the site theme changes.
 */
export function satteriMermaid() {
  return defineMdastPlugin({
    name: 'satteri-mermaid',
    code(node, ctx) {
      if (node.lang === 'mermaid') {
        const escaped = node.value
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;');

        ctx.replaceNode(node, {
          type: 'html',
          value: `<div class="chirpy-mermaid-wrapper" data-mermaid-src="${escaped}">
  <div class="chirpy-mermaid">${escaped}</div>
</div>`,
        });
      }
    },
  });
}
