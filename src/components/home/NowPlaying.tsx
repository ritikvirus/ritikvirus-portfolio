const fetchData = async () => {
  const res = await fetch('/api/spotify')
  return res.json()
}

const NowPlaying = () => {
  const data = 'data'

  console.log('>>', data)
  return <div>{JSON.stringify(data, null, 2)}</div>
}

export default NowPlaying
