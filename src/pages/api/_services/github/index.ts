import { zValidator } from '@hono/zod-validator'
import { z } from 'astro:schema'
import { Hono } from 'hono'

import getGithubContributions from './contributions'
import getLastUpdatedTimeByFile from './lastUpdatedFile'
import getLastUpdatedTime from './repoInfo'

const github = new Hono()
  .get('/contributions', async (c) => {
    try {
      return c.json(await getGithubContributions(), 200, {
        // Avoid caching zeros if token isn't configured during first deploy
        'Cache-Control': 'no-store'
      })
    } catch {
      return c.json({ lastPushedAt: 0, totalContributions: 0, contributions: [] }, 200)
    }
  })
  .get(
    '/last-updated-file',
    zValidator('query', z.object({ path: z.string() })),
    async (c) => {
      try {
        const { path } = c.req.valid('query')
        return c.json(await getLastUpdatedTimeByFile(path))
      } catch {
        return c.json({ lastUpdatedTime: new Date(0).toISOString(), latestCommitUrl: '' }, 200)
      }
    }
  )
  .get(
    '/repo-info/:owner/:repository',
    zValidator(
      'param',
      z.object({
        owner: z.string(),
        repository: z.string()
      })
    ),
    async (c) => {
      try {
        const { owner, repository } = c.req.valid('param')
        return c.json(await getLastUpdatedTime(owner, repository), 200, {
          'Cache-Control': 'no-store'
        })
      } catch {
        return c.json(
          {
            name: '',
            description: '',
            forkCount: 0,
            stargazerCount: 0,
            url: '',
            pushedAt: new Date(0).toISOString(),
            updatedAt: new Date(0).toISOString()
          },
          200
        )
      }
    }
  )

export default github
