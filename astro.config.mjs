// @ts-check
import { defineConfig } from 'astro/config';
import { remarkMermaid } from './remark-mermaid.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://caoyumin97.github.io',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkMermaid],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
