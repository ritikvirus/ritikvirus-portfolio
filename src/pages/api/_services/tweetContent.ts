import { enrichTweet } from 'react-tweet'
import type { Tweet } from 'react-tweet/api'

// ref: https://github.com/vercel/react-tweet/blob/3367f07a2177462af1d05d62b1785bb9aa4ab787/packages/react-tweet/src/api/fetch-tweet.ts#L36
const getToken = (id: string) => {
  return ((Number(id) / 1e15) * Math.PI)
    .toString(6 ** 2)
    .replace(/(0+|\.)/g, '')
}

const getTweetContent = async (id: string) => {
  const URL = 'https://cdn.syndication.twimg.com/tweet-result?'
  const params = new URLSearchParams({
    id,
    lang: 'en',
    token: getToken(id)
  }).toString()

  try {
    const response = await fetch(URL + params, {
      // prevent long hangs in dev
      signal: AbortSignal.timeout(9000)
    })

    if (!response.ok) {
      return { tweet: null }
    }

    const data = (await response.json()) as Tweet
    return { tweet: enrichTweet(data) }
  } catch {
    return { tweet: null }
  }
}

export default getTweetContent
