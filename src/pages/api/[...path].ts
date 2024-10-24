import type { APIRoute } from 'astro'
import { Hono } from 'hono'
import getGithubContributions from './_github'

const app = new Hono().basePath('/api').get('/github', async (c) => {
  return c.json(await getGithubContributions())
})

// TODO: create middleware so it only receive request from same origin

export const ALL: APIRoute = (context) => app.fetch(context.request)
export const prerender = false

export type APIType = typeof app
