// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const productionSiteUrl = 'https://portfolio-sebastian-ojeda.pages.dev';
const excludedSitemapPaths = new Set(['/404.html', '/en/404/']);

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || productionSiteUrl,
  integrations: [
    sitemap({
      filter: (page) => !excludedSitemapPaths.has(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
