// Compute a safe base URL for API calls in both server and browser:
// - In the browser, use the current origin so calls stay on the same domain
// - On the server (SSR/preview), prefer platform-provided URLs, then explicit public envs, then SITE, then localhost
const getServerBaseUrl = (): string => {
  try {
    // 1) Platform-provided runtime hostnames (server-only env)
    const procEnv = (globalThis as any).process?.env ?? {}
    // Vercel provides VERCEL_URL without protocol
    const vercelUrl = procEnv.VERCEL_URL ? `https://${procEnv.VERCEL_URL}` : ''
    if (vercelUrl) return vercelUrl
    // Cloudflare Pages provides CF_PAGES_URL with protocol
    const cfPagesUrl = typeof procEnv.CF_PAGES_URL === 'string' ? procEnv.CF_PAGES_URL : ''
    if (cfPagesUrl) return cfPagesUrl.replace(/\/$/, '')

    // 2) Explicit public envs shipped via Vite (import.meta.env)
    const env = (import.meta as any).env ?? {}
    const explicit = env.PUBLIC_VERCEL_URL || env.PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || env.SITE
    if (typeof explicit === 'string' && explicit.length > 0) {
      return String(explicit).replace(/\/$/, '')
    }

    // 3) Local SSR/preview fallback
    const runtimePort = procEnv.PORT
    const port = Number(runtimePort) || 3000
    return `http://localhost:${port}`
  } catch {
    return 'http://localhost:3000'
  }
}

export const BASE_URL =
  typeof window !== 'undefined' && typeof window.location?.origin === 'string'
    ? window.location.origin
    : getServerBaseUrl()
