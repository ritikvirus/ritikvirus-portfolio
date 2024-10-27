import { hc } from 'hono/client'

import type { APIType } from '@/pages/api/[...path]'

const client = hc<APIType>(import.meta.env.PUBLIC_BASE_URL)

export default client
