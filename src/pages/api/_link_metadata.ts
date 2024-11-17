import ogs from 'open-graph-scraper'

const getLinkMetadata = async (url: string) => {
  const data = await ogs({ url })

  return data.result
}

export default getLinkMetadata
