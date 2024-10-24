import type { APIRoute } from 'astro'
import { Hono } from 'hono'
import getGithubContributions from './_github'
import getSpotifyData from './_spotify'

const app = new Hono()
  .basePath('/api')
  .onError((_, c) => c.json({ error: 'Something went wrong' }, 500))
  .get('/github', async (c) =>
    c.json(await getGithubContributions(), 200, {
      'Cache-Control': 'max-age=3600'
    })
  )
  .get('/spotify', async (c) => c.json(await getSpotifyData()))

export const ALL: APIRoute = (context) => app.fetch(context.request)

export const prerender = false

export type APIType = typeof app
