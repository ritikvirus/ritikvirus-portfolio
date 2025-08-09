import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN
} from 'astro:env/server'
import queryString from 'query-string'

const BASE_URL = 'https://api.spotify.com/v1/me/player'

type AccessToken = { access_token: string }
const toBase64 = (s: string) =>
  typeof Buffer !== 'undefined'
    ? Buffer.from(s).toString('base64')
    : (globalThis as any).btoa(s)

const getAccessToken = async (): Promise<AccessToken | null> => {
  try {
    const clientId = SPOTIFY_CLIENT_ID
    const clientSecret = SPOTIFY_CLIENT_SECRET
    const refreshToken = SPOTIFY_REFRESH_TOKEN

    if (!clientId || !clientSecret || !refreshToken) {
      return null
    }

  const basic = toBase64(`${clientId}:${clientSecret}`)

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: queryString.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    })

    if (!response.ok) {
      console.error('Spotify token error:', response.status, response.statusText)
      return null
    }

    return response.json()
  } catch (error) {
    console.error('Error getting Spotify access token:', error)
    return null
  }
}

const getAccessTokenHeader = (accessToken: string) => {
  return { headers: { Authorization: `Bearer ${accessToken}` } }
}

const getNowPlayingResponse = async (accessToken: string) => {
  return fetch(`${BASE_URL}/currently-playing?market=from_token`, getAccessTokenHeader(accessToken))
}

const getPlayerResponse = async (accessToken: string) => {
  return fetch(`${BASE_URL}?market=from_token`, getAccessTokenHeader(accessToken))
}

const mapSpotifyData = (item: any) => {
  if (!item) {
    return { songUrl: '', title: 'No track available', albumImageUrl: '', artist: 'Unknown' }
  }

  // Episode (podcast)
  if (item.type === 'episode' || item?.show) {
    const img = item?.images?.[0]?.url || item?.show?.images?.[0]?.url || ''
    const url = item?.external_urls?.spotify || item?.show?.external_urls?.spotify || ''
    const title = item?.name || 'Unknown episode'
    const artist = item?.show?.publisher || item?.show?.name || 'Podcast'
    return { songUrl: url, title, albumImageUrl: img, artist }
  }

  // Track (music)
  const url = item?.external_urls?.spotify || ''
  const title = item?.name || 'Unknown track'
  const albumImageUrl = item?.album?.images?.[0]?.url || ''
  const artist = Array.isArray(item?.artists)
    ? item.artists.map((a: any) => a?.name).filter(Boolean).join(', ')
    : 'Unknown'
  return { songUrl: url, title, albumImageUrl, artist }
}

const getRecentlyPlayed = async (accessToken: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recently-played?limit=1`,
      getAccessTokenHeader(accessToken)
    )

    if (!response.ok) {
      console.error('Spotify recently played error:', response.status, response.statusText)
      return { isPlaying: false, ...mapSpotifyData(null) }
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      return { isPlaying: false, ...mapSpotifyData(null) }
    }

    const first = data.items[0]
    const item = first.track || first.episode || first
    return { isPlaying: false, ...mapSpotifyData(item) }
  } catch (error) {
    console.error('Error getting recently played:', error)
    return { isPlaying: false, ...mapSpotifyData(null) }
  }
}

const getSpotifyData = async () => {
  try {
    const tokenData = await getAccessToken()

    if (!tokenData || !tokenData.access_token) {
      return { isPlaying: false, ...mapSpotifyData(null) }
    }

    const { access_token } = tokenData

    // First attempt
    let resp = await getNowPlayingResponse(access_token)
    if (resp.status === 204 || !resp.ok) {
      // Second attempt via /me/player which often returns even when /currently-playing is 204
      const playerResp = await getPlayerResponse(access_token)
      if (playerResp.ok) {
        const p = await playerResp.json()
        if (p && p.item) {
          return { isPlaying: Boolean(p.is_playing), ...mapSpotifyData(p.item) }
        }
      } else {
        console.error('Spotify player error:', playerResp.status, playerResp.statusText)
      }
      return getRecentlyPlayed(access_token)
    }

    const data = await resp.json()
    if (data?.item) {
      return { isPlaying: Boolean(data.is_playing), ...mapSpotifyData(data.item) }
    }
    return getRecentlyPlayed(access_token)
  } catch (error) {
    console.error('Error getting Spotify data:', error)
    return { isPlaying: false, ...mapSpotifyData(null) }
  }
}

export type SpotifyData = ReturnType<typeof mapSpotifyData> & {
  isPlaying: boolean
}

export default getSpotifyData