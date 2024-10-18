import { GetGithubContributions } from '@/lib/graphql'
import type { APIRoute } from 'astro'
import request from 'graphql-request'

const GITHUB_URL = 'https://api.github.com/graphql'

export const GET: APIRoute = async () => {
  const response = await request({
    url: GITHUB_URL,
    document: GetGithubContributions,
    variables: { userName: 'jestsee' },
    requestHeaders: {
      Authorization: `Bearer ${import.meta.env.GITHUB_ACCESS_TOKEN}`
    }
  })

  const options = {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=3600',
      'Content-Type': 'application/json'
    }
  }

  const parsedResponse = (response as any).user.contributionsCollection
    .contributionCalendar

  const mappedResponse = {
    totalContributions: parsedResponse.totalContributions,
    contributions: parsedResponse.weeks.flatMap((week: any) => {
      return week.contributionDays.map((day: any) => day)
    })
  }

  return new Response(JSON.stringify(mappedResponse), options)
}
