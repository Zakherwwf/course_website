import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), mdx()],
  site: 'https://zakherwwf.github.io', // IMPORTANT: Replace with your GitHub username
  base: '/course_website',                     // IMPORTANT: This should match your repo name
});