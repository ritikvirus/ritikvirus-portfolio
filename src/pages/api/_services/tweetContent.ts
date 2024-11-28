// ref: https://github.com/vercel/react-tweet/blob/3367f07a2177462af1d05d62b1785bb9aa4ab787/packages/react-tweet/src/api/fetch-tweet.ts#L36
function getToken(id: string) {
  return ((Number(id) / 1e15) * Math.PI)
    .toString(6 ** 2)
    .replace(/(0+|\.)/g, '')
}

async function getTweetContent(id: string) {
  const URL = 'https://cdn.syndication.twimg.com/tweet-result?'
  const params = new URLSearchParams({
    id,
    lang: 'en',
    token: getToken(id)
  }).toString()

  const response = await fetch(URL + params)

  if (!response.ok) {
    return new Response('Error fetching tweet', { status: response.status })
  }

  const data = await response.json()
  return { data }
}

export default getTweetContent
