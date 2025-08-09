import { env } from 'node:process'

// Publicly configurable primary and blog sites; fall back to known domains
export const PRIMARY_SITE = (env.PUBLIC_PRIMARY_SITE || 'https://ritik.aidevops.in').replace(/\/$/, '')
export const BLOG_SITE = (env.PUBLIC_BLOG_SITE || 'https://aidevops.in').replace(/\/$/, '')

// Convenience helpers
export const urlFromPrimary = (path: string) => new URL(path, PRIMARY_SITE + '/').toString()
export const urlFromBlog = (path: string) => new URL(path, BLOG_SITE + '/').toString()
