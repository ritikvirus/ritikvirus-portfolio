// @ts-check
import mdx from '@astrojs/mdx'
import node from '@astrojs/node'
// import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'
import { defineConfig, envField } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

// Allow switching adapters via flags
const isNode = process.argv.includes('--node')
const isCF = process.argv.includes('--cloudflare') || process.env.CF_PAGES === '1'

let adapter = vercel()
if (isCF) {
  const cf = (await import('@astrojs/cloudflare')).default
  adapter = cf()
} else if (isNode) {
  adapter = node({ mode: 'standalone' })
}

// https://astro.build/config
console.log('[astro-config-flags]', { isCF, isNode })
export default defineConfig({
  adapter,
  // Use SSR server output when building with Node or Cloudflare adapter; static otherwise
  output: isNode || isCF ? 'server' : 'static',
  // Ensure base is always a string to avoid path helper errors in image endpoint injection
  base: '/',
  // Use an image service compatible with the current runtime
  image: {
    service: {
      entrypoint: isCF
        ? 'astro/assets/services/squoosh'
        : 'astro/assets/services/sharp'
    },
    endpoint: {
      route: '/_image',
      entrypoint: isCF
        ? 'astro/assets/endpoint/generic'
        : 'astro/assets/endpoint/node'
    }
  },
  // Use the production portfolio domain for absolute URLs and sitemap
  site: 'https://ritik.aidevops.in',

  markdown: {
    shikiConfig: {
      theme: 'poimandres'
    }
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load'
  },

  env: {
    schema: {
      MAPTILER_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),
      GITHUB_ACCESS_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),
      SPOTIFY_CLIENT_ID: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),
      SPOTIFY_CLIENT_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),
      SPOTIFY_REFRESH_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),
      MONKEYTYPE_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),

      PUBLIC_VERCEL_ENV: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: 'development'
      }),
      PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true
      }),
      PUBLIC_VERCEL_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true
      }),
      PUBLIC_PRIMARY_SITE: envField.string({
        context: 'server',
        access: 'public',
        optional: true
      }),
      PUBLIC_BLOG_SITE: envField.string({
        context: 'server',
        access: 'public',
        optional: true
      })
    }
  },

  vite: {
    // Inject a tiny polyfill so React's scheduler (used by react-dom/server on edge)
    // doesn't crash on Cloudflare Workers where MessageChannel may be undefined.
    // This banner runs before any bundled code in each output chunk.
    build: {
      rollupOptions: {
        output: {
          banner: `(()=>{try{if(typeof globalThis.MessageChannel==='undefined'){class MC{constructor(){const port1={onmessage:null,start(){},close(){},postMessage:(d)=>setTimeout(()=>{try{port1.onmessage&&port1.onmessage({data:d})}catch{}})};const port2={start(){},close(){},postMessage:(d)=>setTimeout(()=>{try{port1.onmessage&&port1.onmessage({data:d})}catch{}})};this.port1=port1;this.port2=port2}};globalThis.MessageChannel=MC}}catch{}})();`
        }
      }
    },
    ssr: {
      noExternal: ['path-to-regexp', 'react-tweet']
    }
  },

  integrations: [
    // Force a compatible image config on Cloudflare (Workers)
    {
      name: 'fix-cloudflare-image-endpoint',
      hooks: {
        'astro:config:setup'({ config, updateConfig }) {
          try {
            if (isCF && typeof config?.image?.endpoint === 'string') {
              updateConfig({
                image: {
                  ...config.image,
                  service: { entrypoint: 'astro/assets/services/noop' },
                  endpoint: {
                    route: '/_image',
                    entrypoint: 'astro/assets/endpoint/generic'
                  }
                }
              })
            }
          } catch {}
        }
      }
    },
    {
      name: 'debug-image-config-setup',
      hooks: {
        'astro:config:setup'({ config }) {
          try {
            console.log('[image-config:setup]', config?.image)
          } catch {}
        }
      }
    },
    // Debug the resolved image config during build to trace endpoint values
    {
      name: 'debug-image-config',
      hooks: {
        'astro:config:done'({ config, logger }) {
          try {
            logger.info(`[image-config] ${JSON.stringify(config.image)}`)
          } catch {}
        }
      }
    },
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
    (await import('@playform/compress')).default({
      HTML: {
        'html-minifier-terser': {
          collapseWhitespace: false
        }
      }
    }),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en' } }
    }),
    react(),
    tailwind({
      applyBaseStyles: false
    })
    // Temporarily disabled partytown due to cross-origin issues in WebContainer
    // partytown()
  ]
})