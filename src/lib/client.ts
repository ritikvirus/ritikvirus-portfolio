import { hc } from 'hono/client'

import type { APIType } from '@/pages/api/[...path]'

const client = hc<APIType>('http://localhost:4321')

export default client
