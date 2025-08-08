import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import mdx from '@astrojs/mdx';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact({ compat: true }), // compat: true is essential
    mdx(),
    tailwind()
  ],
  site: 'https://zakherwwf.github.io',
  base: '/course_website',
});