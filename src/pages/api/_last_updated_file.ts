const getLastUpdatedTimeByFile = async (filePath: string): Promise<string> => {
  const API_URL = `https://api.github.com/repos/jestsee/portfolio-revamp/commits?`

  const params = new URLSearchParams({
    path: `src/content/${filePath}`,
    per_page: '1'
  }).toString()

  const response = await fetch(API_URL + params, {
    headers: { Authorization: `Bearer ${import.meta.env.GITHUB_ACCESS_TOKEN}` }
  })

  const [data] = await response.json()

  return data.commit.committer.date
}

export default getLastUpdatedTimeByFile
