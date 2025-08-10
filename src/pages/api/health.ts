import type { APIRoute } from 'astro'
import {
  GITHUB_ACCESS_TOKEN,
  MONKEYTYPE_API_KEY,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN
} from 'astro:env/server'

export const GET: APIRoute = ({ request }) => {
  const url = new URL(request.url)
  const json = {
    ok: true,
    runtime: 'server',
    url: url.origin,
    vercel: {
      VERCEL: (globalThis as any).process?.env?.VERCEL ?? null,
      VERCEL_URL: (globalThis as any).process?.env?.VERCEL_URL ?? null,
      NODE_VERSION: (globalThis as any).process?.version ?? null
    },
    has: {
      githubToken: Boolean(GITHUB_ACCESS_TOKEN),
      monkeytypeKey: Boolean(MONKEYTYPE_API_KEY),
      spotifyClient: Boolean(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET),
      spotifyRefresh: Boolean(SPOTIFY_REFRESH_TOKEN)
    }
  }
  return new Response(JSON.stringify(json, null, 2), {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  })
}

export const prerender = false


