import type { MiddlewareHandler } from 'astro'

// Basic, instance-local throttle to avoid spamming the webhook
const lastNotify = new Map<string, number>()

const getEnv = (key: string, fallback = '') => (globalThis as any).process?.env?.[key] ?? fallback

const WEBHOOK_URL = getEnv('DISCORD_ERROR_WEBHOOK_URL', '')
const NOTIFY_404 = /^true$/i.test(getEnv('ERROR_NOTIFY_404', 'true'))
const COOLDOWN_MS = Number(getEnv('ERROR_NOTIFY_COOLDOWN_MS', '60000'))

const shouldNotify = (status: number, pathname: string, isHtml: boolean) => {
  if (!WEBHOOK_URL) return false
  if (!isHtml) return false // don't notify for assets or API JSON
  if (status >= 500) return true
  if (status === 404 && NOTIFY_404) return true
  return false
}

const throttleKey = (status: number, pathname: string) => `${status}:${pathname}`

const maybeNotifyDiscord = async (status: number, req: Request, error?: unknown) => {
  try {
    const url = new URL(req.url)
    const accept = req.headers.get('accept') || ''
    const isHtml = accept.includes('text/html')
    if (!shouldNotify(status, url.pathname, isHtml)) return

    const key = throttleKey(status, url.pathname)
    const now = Date.now()
    const last = lastNotify.get(key) || 0
    if (now - last < COOLDOWN_MS) return
    lastNotify.set(key, now)

    const ua = req.headers.get('user-agent') || 'unknown'
    const referer = req.headers.get('referer') || '—'
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || '—'

    const content = [
      `🚨 Error ${status} on ${url.pathname}`,
      `Method: ${req.method}`,
      `UA: ${ua}`,
      `Ref: ${referer}`,
      `IP: ${ip}`,
      error ? '```' + String(error) + '```' : ''
    ]
      .filter(Boolean)
      .join('\n')

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
  } catch (e) {
    // Don't let webhook issues break the site
    console.error('Discord notify failed:', e)
  }
}

const renderErrorHtml = (status: number, message?: string) => {
  const is404 = status === 404
  const title = is404 ? '404 Not Found' : `${status} Oops!`
  const emoji = is404 ? '🫠📄' : '🤖🔥'
  const tagline = is404 ? 'This page yeeted itself into the void.' : 'Our servers are having a small existential crisis.'
  const sub = is404
    ? 'Maybe it moved, maybe it never existed, maybe it just needed a break.'
    : 'Give it a sec and try again — we logged this for a human to investigate.'
  const safeMsg = message ? String(message).slice(0, 300) : ''

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title}</title>
  <style>
    :root{color-scheme:dark light}
    *{box-sizing:border-box}
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0b0d;color:#e5e7eb;font:16px/1.6 system-ui,Segoe UI,Roboto,Inter,Segoe UI Emoji}
    .card{max-width:720px;border:1px solid #3f3f46;background:#0c0c10;border-radius:16px;padding:28px;box-shadow:0 10px 30px rgba(0,0,0,.35)}
    .emoji{font-size:48px;line-height:1}
    h1{margin:10px 0 6px;font-size:28px}
    p{margin:6px 0;color:#a1a1aa}
    .row{display:flex;gap:12px;flex-wrap:wrap;margin-top:16px}
    a.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid #3f3f46;border-radius:10px;color:#e5e7eb;text-decoration:none;background:#111114}
    a.btn:hover{border-color:#a1a1aa}
    code{background:#111114;border:1px solid #3f3f46;border-radius:8px;padding:2px 6px}
  </style>
  <meta name="robots" content="noindex" />
  <meta name="turbo-visit-control" content="reload" />
  <meta name="astro-no-hydrate" content />
  <script>history.scrollRestoration='manual'</script>
  
</head>
<body>
  <main class="card" role="main">
    <div class="emoji" aria-hidden="true">${emoji}</div>
    <h1>${title}</h1>
    <p>${tagline}</p>
    <p>${sub}</p>
    <p>Status: <code>${status}</code>${safeMsg ? ` • <code>${safeMsg}</code>` : ''}</p>
    <div class="row">
      <a class="btn" href="/">⬅️ Take me home</a>
      <a class="btn" href="/projects">🧭 Explore projects</a>
    </div>
  </main>
</body>
</html>`
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request } = context
  try {
    const response = await next()

    // Only transform navigations (HTML), not API/asset requests
    const accept = request.headers.get('accept') || ''
    const isHtml = accept.includes('text/html')

    if ((response.status === 404 || response.status >= 500) && isHtml) {
      // Notify (throttled)
      maybeNotifyDiscord(response.status, request).catch(() => {})

      // Replace with our error HTML
      const html = renderErrorHtml(response.status)
      return new Response(html, {
        status: response.status,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    }

    // Add common security headers for all responses
    try {
      const headers = new Headers(response.headers)
      headers.set('X-Content-Type-Options', 'nosniff')
      headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
      headers.set('X-Frame-Options', 'DENY')
      headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
      headers.set('Cross-Origin-Opener-Policy', 'same-origin')
      headers.set('Cross-Origin-Resource-Policy', 'same-origin')

      const isHttps = (() => {
        try {
          return new URL(request.url).protocol === 'https:'
        } catch {
          return false
        }
      })()
      if (isHttps) {
        headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
      }

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      })
    } catch {
      // Fallback to original response on any header mutation issue
      return response
    }
  } catch (err) {
    // Unexpected error — notify and show 500 page
    maybeNotifyDiscord(500, request, err).catch(() => {})
    const html = renderErrorHtml(500, (err as Error)?.message)
    return new Response(html, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  }
}
