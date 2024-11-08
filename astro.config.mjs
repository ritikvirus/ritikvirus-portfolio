// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

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
    mdx({
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'prepend' }]
      ]
    }),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false
    })
  ]
})
