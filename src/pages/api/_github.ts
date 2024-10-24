import request from 'graphql-request'

import { GetGithubContributions } from '@/lib/graphql'
import type { GithubContributionData } from '@/types'

const getGithubContributions = async (): Promise<GithubContributionData> => {
  console.log('masok getgithub')
  const response = await request({
    url: 'https://api.github.com/graphql',
    document: GetGithubContributions,
    variables: { userName: 'jestsee' },
    requestHeaders: {
      Authorization: `Bearer ${import.meta.env.GITHUB_ACCESS_TOKEN}`
    }
  })

  // TODO: cache response for 1 hour
  // const options = {
  //   status: 200,
  //   headers: {
  //     'Cache-Control': 's-maxage=3600',
  //     'Content-Type': 'application/json'
  //   }
  // }

  const parsedResponse = (response as any).user.contributionsCollection
    .contributionCalendar

  return {
    lastPushedAt: (response as any).user.repositories.nodes[0].pushedAt,
    totalContributions: parsedResponse.totalContributions,
    contributions: parsedResponse.weeks.flatMap((week: any) => {
      return week.contributionDays.map((day: any) => {
        return {
          count: day.contributionCount,
          date: day.date.replace(/-/g, '/')
        }
      })
    })
  }
}

export default getGithubContributions
