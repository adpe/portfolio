import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

export default defineConfig({
  site: "https://adrianperez.me/",
  integrations: [mdx(), sitemap(), react(), markdoc(), keystatic()],
  output: "static",
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});