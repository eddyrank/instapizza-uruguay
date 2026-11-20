import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Live Cloudflare Workers URL — swap for the custom domain if one is attached.

export default defineConfig({
  site: 'https://instapizza-uruguay.instapizza-delivery.workers.dev',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  output: 'static',
  trailingSlash: 'never',
});
