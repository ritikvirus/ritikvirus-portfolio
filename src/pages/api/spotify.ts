import type { APIRoute } from 'astro'
import queryString from 'query-string'

const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

//Function to generate an access token using the refresh token everytime the website is opened or refreshed
export const getAccessToken = async (
  clientId: string,
  clientSecret: string,
  refresh_token: string
) => {
  //Creates a base64 code of client_id:client_secret as required by the API
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  //The response will contain the access token
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  })

  return response.json()
}

export const GET: APIRoute = async () => {
  try {
    const { access_token } = await getAccessToken(
      import.meta.env.SPOTIFY_CLIENT_ID,
      import.meta.env.SPOTIFY_CLIENT_SECRET,
      import.meta.env.SPOTIFY_REFRESH_TOKEN
    )

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const song = await response.json()
    const { item } = song

    const spotifyData = {
      albumImageUrl: item.album.images[0].url as string,
      artist: item.artists
        .map((artist: { name: any }) => artist.name)
        .join(', ') as string,
      isPlaying: song.is_playing as string,
      songUrl: item.external_urls.spotify as string,
      title: item.name as string
    }

    const options = {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return new Response(JSON.stringify(spotifyData), options)
  } catch (error) {
    console.error('>>>', error)
    return new Response('An error occurred', { status: 500 })
  }
}
