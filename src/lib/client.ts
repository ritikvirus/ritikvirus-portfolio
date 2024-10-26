import { hc } from 'hono/client'

import type { APIType } from '@/pages/api/[...path]'

const URL =
  import.meta.env.VERCE_URL || import.meta.env.DEPLOYED_URL || 'localhost:4321/'

const client = hc<APIType>(`http://${URL}`)

export default client
