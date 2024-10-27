/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly MAPTILER_API_KEY: string

  readonly GITHUB_ACCESS_TOKEN: string

  readonly SPOTIFY_CLIENT_ID: string
  readonly SPOTIFY_CLIENT_SECRET: string
  readonly SPOTIFY_REFRESH_TOKEN: string

  readonly MONKEYTYPE_API_KEY: string

  readonly DEPLOYED_URL?: string
  readonly VERCEL_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
