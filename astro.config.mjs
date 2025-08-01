import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import mdx from '@astrojs/mdx';
import { fileURLToPath } from 'url'; // Import this new line
import path from 'path'; // Import this new line

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), mdx()],
  site: 'https://zakherwwf.github.io',
  base: '/course_website',

  // ADD THIS NEW SECTION
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src')
      }
    }
  }
});