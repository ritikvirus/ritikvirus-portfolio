// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'

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
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            content: fromHtmlIsomorphic(
              '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M8 6.75a5.25 5.25 0 0 0 0 10.5h1a.75.75 0 0 1 0 1.5H8a6.75 6.75 0 0 1 0-13.5h1a.75.75 0 0 1 0 1.5zm7-1.5a.75.75 0 0 0 0 1.5h1a5.25 5.25 0 1 1 0 10.5h-1a.75.75 0 0 0 0 1.5h1a6.75 6.75 0 0 0 0-13.5z" opacity=".5"/><path fill="currentColor" d="M8.25 12a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75"/></svg>',
              { fragment: true }
            ).children,
            headingProperties: {
              class: 'project-heading'
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
