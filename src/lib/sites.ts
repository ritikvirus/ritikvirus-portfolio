// Access env safely across Node and Workers
const getEnv = (key: string): string | undefined => {
	try {
		// @ts-ignore - astro:env may not be available at config time here
		if (typeof Astro !== 'undefined' && typeof Astro.env?.get === 'function') {
			// Astro v5 experimental getSecret not needed for public vars
			return undefined
		}
	} catch {}
	return (globalThis as any)?.process?.env?.[key]
}

// Publicly configurable primary and blog sites; fall back to known domains
export const PRIMARY_SITE = (getEnv('PUBLIC_PRIMARY_SITE') || 'https://ritik.aidevops.in').replace(/\/$/, '')
export const BLOG_SITE = (getEnv('PUBLIC_BLOG_SITE') || 'https://aidevops.in').replace(/\/$/, '')

// Convenience helpers
export const urlFromPrimary = (path: string) => new URL(path, PRIMARY_SITE + '/').toString()
export const urlFromBlog = (path: string) => new URL(path, BLOG_SITE + '/').toString()
