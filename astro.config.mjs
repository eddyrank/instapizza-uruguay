import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// NOTE: placeholder domain — replace with the real Cloudflare Pages URL
// (or custom domain once one is attached) before launch.
export default defineConfig({
  site: 'https://instapizza-uruguay.pages.dev',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  output: 'static',
  trailingSlash: 'never',
});
