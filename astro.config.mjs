// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const productionSiteUrl = 'https://portfolio-sebastian-ojeda.pages.dev';
const excludedSitemapPaths = new Set(['/404.html', '/es/404/']);

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || productionSiteUrl,
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !excludedSitemapPaths.has(pathname)
          && pathname !== '/en'
          && !pathname.startsWith('/en/');
      },
    }),
  ],
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
