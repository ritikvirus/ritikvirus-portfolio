import { zValidator } from '@hono/zod-validator'
import type { APIRoute } from 'astro'
import { z } from 'astro:schema'
import { Hono } from 'hono'

import getGithubContributions from './_github'
import getLastUpdatedTime from './_last_updated'
import getLastUpdatedTimeByFile from './_last_updated_file'
import getLinkMetadata from './_link_metadata'
import getMonkeytypeData from './_monkeytype'
import getSpotifyData from './_spotify'

const app = new Hono()
  .basePath('/api')
  .onError((error, c) => {
    console.error('error occured >>', error)
    return c.json({ error: 'Something went wrong' }, 500)
  })
  .get('/github', async (c) =>
    c.json(await getGithubContributions(), 200, {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=600'
    })
  )
  .get('/last-updated', async (c) =>
    c.json(await getLastUpdatedTime(), 200, {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=600'
    })
  )
  .get(
    '/last-updated-file',
    zValidator('query', z.object({ path: z.string() })),
    async (c) => {
      const { path } = c.req.valid('query')

      return c.json(await getLastUpdatedTimeByFile(path))
    }
  )
  .get(
    '/link-metadata',
    zValidator('query', z.object({ url: z.string() })),
    async (c) => {
      const { url } = c.req.valid('query')

      return c.json(await getLinkMetadata(url))
    }
  )
  .get('/monkeytype', async (c) =>
    c.json(await getMonkeytypeData(), 200, {
      'Cache-Control': 's-maxage=43200, stale-while-revalidate=600'
    })
  )
  .get('/spotify', async (c) =>
    c.json(await getSpotifyData(), 200, {
      'Cache-Control': 's-maxage=8, stale-while-revalidate=2'
    })
  )

export const ALL: APIRoute = (context) => app.fetch(context.request)

export const prerender = false

export type APIType = typeof app
