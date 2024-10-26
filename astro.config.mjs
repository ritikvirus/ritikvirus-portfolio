// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  output: 'hybrid',
  site: 'https://example.com',

  experimental: {
    serverIslands: true
  },

  vite: {
    ssr: {
      noExternal: ['path-to-regexp']
    }
  },

  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false
    })
  ]
})
