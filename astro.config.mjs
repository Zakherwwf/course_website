import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import mdx from '@astrojs/mdx';
import tailwind from "@astrojs/tailwind";

import sitemap from '@astrojs/sitemap'; // This import is correct

// https://astro.build/config
export default defineConfig({
  // Your site URL and base path are correctly defined for the sitemap
  site: 'https://zakherwwf.github.io',
  base: '/course_website',

  integrations: [
    preact({ compat: true }),
    mdx(),
    tailwind(),
    sitemap() // The sitemap integration is correctly included here
  ],
});