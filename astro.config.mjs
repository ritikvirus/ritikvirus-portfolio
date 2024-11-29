// @ts-check
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  output: 'hybrid',
  site: 'https://jestsee.com',

  experimental: {
    serverIslands: true
  },

  vite: {
    ssr: {
      noExternal: ['path-to-regexp', 'react-tweet']
    }
  },

  integrations: [
    mdx({
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            headingProperties: {
              class: 'article-heading'
            }
          }
        ]
      ]
    }),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false
    })
  ]
})
