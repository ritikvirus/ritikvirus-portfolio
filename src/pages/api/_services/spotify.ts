import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN
} from 'astro:env/server'
import queryString from 'query-string'

const BASE_URL = 'https://api.spotify.com/v1/me/player'

type AccessToken = { access_token: string }
const getAccessToken = async (): Promise<AccessToken | null> => {
  try {
    const clientId = SPOTIFY_CLIENT_ID
    const clientSecret = SPOTIFY_CLIENT_SECRET
    const refreshToken = SPOTIFY_REFRESH_TOKEN

    if (!clientId || !clientSecret || !refreshToken) {
      return null
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

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
  return fetch(
    `${BASE_URL}/currently-playing`,
    getAccessTokenHeader(accessToken)
  )
}

const mapSpotifyData = (track: any) => {
  if (!track || !track.external_urls || !track.name || !track.album || !track.artists) {
    return {
      songUrl: '',
      title: 'No track available',
      albumImageUrl: '',
      artist: 'Unknown'
    }
  }

  return {
    songUrl: track.external_urls.spotify as string,
    title: track.name as string,
    albumImageUrl: track.album.images?.[0]?.url || '',
    artist: track.artists
      .map((artist: { name: any }) => artist.name)
      .join(', ') as string
  }
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

    const { track } = data.items[0]
    return { isPlaying: false, ...mapSpotifyData(track) }
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

    const nowPlayingResponse = await getNowPlayingResponse(access_token)

    if (nowPlayingResponse.status === 204) {
      return getRecentlyPlayed(access_token)
    }

    if (!nowPlayingResponse.ok) {
      console.error('Spotify now playing error:', nowPlayingResponse.status, nowPlayingResponse.statusText)
      return getRecentlyPlayed(access_token)
    }

    const data = await nowPlayingResponse.json()
    
    if (!data.item) {
      return getRecentlyPlayed(access_token)
    }

    return { isPlaying: true, ...mapSpotifyData(data.item) }
  } catch (error) {
    console.error('Error getting Spotify data:', error)
    return { isPlaying: false, ...mapSpotifyData(null) }
  }
}

export type SpotifyData = ReturnType<typeof mapSpotifyData> & {
  isPlaying: boolean
}

export default getSpotifyData