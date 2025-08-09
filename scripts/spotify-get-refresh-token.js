#!/usr/bin/env node
/**
 * One-time helper to obtain a Spotify refresh token for this project.
 *
 * Prereqs:
 * 1) Create a Spotify Application at https://developer.spotify.com/dashboard
 * 2) Add Redirect URI: http://localhost:8888/callback
 * 3) Put the following in your .env (without quotes):
 *    SPOTIFY_CLIENT_ID=...
 *    SPOTIFY_CLIENT_SECRET=...
 *    SPOTIFY_REDIRECT_URI=http://localhost:8888/callback
 *
 * Usage:
 *   node scripts/spotify-get-refresh-token.js
 *
 * Follow the printed URL, login, accept, then copy the printed refresh_token
 * and paste it into .env as SPOTIFY_REFRESH_TOKEN.
 */

import { createServer } from 'http'
import { randomBytes } from 'crypto'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
// Load .env so this script can read SPOTIFY_* when run via `node ...`
try {
  const DIR = dirname(fileURLToPath(import.meta.url))
  // repo root is one level up from scripts/
  const envPath = resolve(DIR, '..', '.env')
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf8')
    for (const line of content.split(/\r?\n/)) {
      if (!line || line.trim().startsWith('#')) continue
      const idx = line.indexOf('=')
      if (idx === -1) continue
      const key = line.slice(0, idx).trim()
      let val = line.slice(idx + 1).trim()
      // remove surrounding quotes if present
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      if (!(key in process.env)) process.env[key] = val
    }
  }
} catch {}

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI =
  process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:8888/callback'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\nMissing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env')
  process.exit(1)
}

if (/localhost/i.test(REDIRECT_URI)) {
  console.warn(
    '\nWarning: Spotify no longer accepts "localhost" as a redirect URI.\n' +
      'Please use a loopback IP literal instead, e.g. http://127.0.0.1:8888/callback or http://[::1]:8888/callback.\n' +
      'Proceeding may fail if your Spotify app is not configured accordingly.'
  )
}

const PORT = Number(new URL(REDIRECT_URI).port || 8888)

const scope = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played'
].join(' ')

const state = randomBytes(8).toString('hex')

const authParams = new URLSearchParams({
  response_type: 'code',
  client_id: CLIENT_ID,
  scope,
  redirect_uri: REDIRECT_URI,
  state
}).toString()

const authUrl = `https://accounts.spotify.com/authorize?${authParams}`

console.log('\nOpen this URL in your browser to authorize:')
console.log(authUrl)

const server = createServer(async (req, res) => {
  try {
    if (!req.url) return
    if (!req.url.startsWith('/callback')) {
      res.statusCode = 404
      res.end('Not found')
      return
    }

    const u = new URL(req.url, `http://localhost:${PORT}`)
    const code = u.searchParams.get('code')
    const returnedState = u.searchParams.get('state')

    if (!code || returnedState !== state) {
      res.statusCode = 400
      res.end('Invalid callback; missing code/state')
      return
    }

    const tokenBody = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    }).toString()

    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

    const tokenResp = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: tokenBody
    })

    const json = await tokenResp.json()
    if (!tokenResp.ok) {
      console.error('\nToken exchange failed:', tokenResp.status, tokenResp.statusText, json)
      res.statusCode = 500
      res.end('Token exchange failed; see terminal output')
      return
    }

    const { refresh_token, access_token } = json
    console.log('\nSuccess! Save this refresh token in your .env:')
    console.log('SPOTIFY_REFRESH_TOKEN=' + refresh_token)
    console.log('\n(You may also note the short-lived access token):')
    console.log('access_token=' + access_token)

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(
      'You can close this tab. Refresh token printed in the terminal.\n' +
        'Remember to add it to .env as SPOTIFY_REFRESH_TOKEN.'
    )
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.end('Unexpected error; see terminal')
  } finally {
    setTimeout(() => server.close(), 500)
  }
})

server.listen(PORT, () => {
  console.log(`\nListening on ${REDIRECT_URI} for the callback...`)
})
