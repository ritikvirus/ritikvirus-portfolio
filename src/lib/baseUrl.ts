// Compute a safe base URL for API calls in both server and browser:
// - In the browser, use the current origin so calls stay on the same domain
// - On the server (build/prerender), fall back to Astro's configured site
// - Finally, default to localhost for local dev
const serverFallback = (import.meta as any).env?.SITE?.replace(/\/$/, '') || 'http://localhost:4321'

export const BASE_URL =
  typeof window !== 'undefined' && typeof window.location?.origin === 'string'
    ? window.location.origin
    : serverFallback
