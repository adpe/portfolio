import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://adrianperez.me/',
  integrations: [mdx(), sitemap()],
  output: 'static',
  vite: {
    ssr: {
      external: ['svgo']
    }
  }
});
