// Compute a safe base URL for API calls in both server and browser:
// - In the browser, use the current origin so calls stay on the same domain
// - On the server (SSR/preview), prefer explicit env URLs, otherwise fall back to localhost:PORT (default 3000)
const getServerBaseUrl = (): string => {
  try {
    // Prefer explicitly provided public URLs first
    const env = (import.meta as any).env ?? {}
    const explicit =
      env.PUBLIC_VERCEL_URL ||
      env.PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
      env.SITE

    if (typeof explicit === 'string' && explicit.length > 0) {
      return String(explicit).replace(/\/$/, '')
    }

    // Try runtime env (useful in Node adapter preview or custom servers)
    const runtimePort = (globalThis as any).process?.env?.PORT
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
