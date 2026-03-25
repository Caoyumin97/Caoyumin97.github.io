/**
 * Remark plugin: converts ```mermaid code blocks into raw HTML divs
 * so they bypass Shiki and can be picked up by client-side mermaid.js.
 */
import { visit } from 'unist-util-visit';

export function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid') return;
      const escaped = node.value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
      parent.children[index] = {
        type: 'html',
        value: `<div class="mermaid-diagram" data-mermaid="${escaped}"></div>`,
      };
    });
  };
}
