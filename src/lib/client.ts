import { hc } from 'hono/client'

import type { APIType } from '@/pages/api/[...path]'

export const getBaseUrl = () => {
  return import.meta.env.VERCEL_ENV === 'production'
    ? `https://portfolio-revamp-gilt.vercel.app`
    : import.meta.env.VERCEL_URL
      ? `https://${import.meta.env.VERCEL_URL}`
      : `http://localhost:4321`
}

const client = hc<APIType>(getBaseUrl())

export default client
