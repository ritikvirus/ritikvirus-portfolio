import { hc } from 'hono/client'

import type { APIType } from '@/pages/api/[...path]'

const BASE_URL =
  import.meta.env.PUBLIC_VERCEL_ENV === 'production'
    ? import.meta.env.PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : import.meta.env.PUBLIC_VERCEL_URL

const client = hc<APIType>(
  BASE_URL ? `https://${BASE_URL}` : 'http://localhost:4321'
)

export default client
