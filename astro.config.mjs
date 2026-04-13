// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkLinkCard from 'remark-link-card-plus';

import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), expressiveCode()],

  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [remarkGfm, remarkBreaks, remarkLinkCard]
  }
});