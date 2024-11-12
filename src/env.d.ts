/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly MAPTILER_API_KEY: string

  readonly GITHUB_ACCESS_TOKEN: string

  readonly SPOTIFY_CLIENT_ID: string
  readonly SPOTIFY_CLIENT_SECRET: string
  readonly SPOTIFY_REFRESH_TOKEN: string

  readonly MONKEYTYPE_API_KEY: string

  readonly PUBLIC_VERCEL_ENV: 'production' | 'preview' | 'development'
  readonly PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: string
  readonly PUBLIC_VERCEL_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
