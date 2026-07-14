import { defineMdastPlugin } from 'satteri';

export function satteriAsHTML() {
  return defineMdastPlugin({
    name: 'remark-ashtml',
    code(node, ctx) {
      if (node.lang === 'ashtml') {
        ctx.replaceNode(node, {
          type: 'html',
          value: node.value,
        });
      }
    },
  });
}
