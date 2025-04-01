// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';


// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx(), sitemap(), react()],
  output: 'static',
  adapter: vercel(),
  server: {
    allowedHosts: ['gtzujqjssbaa.share.zrok.io'],
  },
})