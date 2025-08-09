import type { APIRoute } from 'astro'
import { PRIMARY_SITE } from '@/lib/sites'

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL(PRIMARY_SITE)
  const sitemapURL = new URL('sitemap-index.xml', base)
  return new Response(getRobotsTxt(sitemapURL))
}
