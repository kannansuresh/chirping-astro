import { defineHastPlugin } from 'satteri';

export function satteriAutolinkHeadings() {
  return defineHastPlugin({
    name: 'satteri-autolink-headings',
    element: [
      {
        filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        visit(node, ctx) {
          if (node.properties && typeof node.properties.id === 'string') {
            const id = node.properties.id;

            const anchorNode = {
              type: 'element' as const,
              tagName: 'a',
              properties: {
                href: `#${id}`,
                className: ['heading-anchor'],
                ariaHidden: 'true',
                tabIndex: -1,
              },
              children: node.children || [],
            };

            ctx.replaceNode(node, {
              ...node,
              children: [anchorNode],
            });
          }
        },
      },
    ],
  });
}
