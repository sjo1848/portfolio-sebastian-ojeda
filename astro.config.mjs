// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const productionSiteUrl = 'https://portfolio-sebastian-ojeda.pages.dev';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || productionSiteUrl,
  integrations: [sitemap()],
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
