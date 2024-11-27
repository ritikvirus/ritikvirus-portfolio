import { zValidator } from '@hono/zod-validator'
import { z } from 'astro:schema'
import { Hono } from 'hono'

import getGithubContributions from './contributions'
import getLastUpdatedTimeByFile from './lastUpdatedFile'
import getLastUpdatedTime from './repoInfo'

const github = new Hono()
  .get('/contributions', async (c) =>
    c.json(await getGithubContributions(), 200, {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=600'
    })
  )
  .get(
    '/last-updated-file',
    zValidator('query', z.object({ path: z.string() })),
    async (c) => {
      const { path } = c.req.valid('query')

      return c.json(await getLastUpdatedTimeByFile(path))
    }
  )
  .get('/repo-info', async (c) =>
    c.json(await getLastUpdatedTime(), 200, {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=600'
    })
  )

export default github
