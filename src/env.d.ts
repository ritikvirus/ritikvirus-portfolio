/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_MAPTILER_API_KEY: string
  readonly SPOTIFY_CLIENT_ID: string
  readonly SPOTIFY_CLIENT_SECRET: string
  readonly SPOTIFY_REFRESH_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
