const url =
  import.meta.env.PUBLIC_VERCEL_ENV === 'production'
    ? import.meta.env.PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : import.meta.env.PUBLIC_VERCEL_URL

export const BASE_URL = url ? `https://${url}` : 'http://localhost:4321'
