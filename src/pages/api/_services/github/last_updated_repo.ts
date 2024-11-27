import request from 'graphql-request'

import { GetLastUpdatedTime } from '@/lib/graphql'
import type { GithubRepositoryLastUpdated } from '@/types'

const getLastUpdatedTime = async (): Promise<GithubRepositoryLastUpdated> => {
  const response = await request({
    url: 'https://api.github.com/graphql',
    document: GetLastUpdatedTime,
    variables: { username: 'jestsee', repositoryName: 'portfolio-revamp' },
    requestHeaders: {
      Authorization: `Bearer ${import.meta.env.GITHUB_ACCESS_TOKEN}`
    }
  })

  return (response as any).repository
}

export default getLastUpdatedTime
