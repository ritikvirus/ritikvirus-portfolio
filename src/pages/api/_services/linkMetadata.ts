type LinkMetadataResponse =
  | {
      success: true
      title?: string
      description: string
      faviconUrl?: string
      requestUrl?: string
      image?: {
        url: string
        alt?: string
        width?: number
        height?: number
      }
    }
  | { success: false }

const resolveUrl = (maybeRel: string | undefined, base: URL): string | undefined => {
  if (!maybeRel) return undefined
  try {
    return new URL(maybeRel, base).toString()
  } catch {
    return undefined
  }
}

const matchMeta = (html: string, name: string): string | undefined => {
  const re = new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*?content=["']([^"']+)["'][^>]*?>`, 'i')
  const m = html.match(re)
  return m?.[1]
}

const matchFavicon = (html: string): string | undefined => {
  const rels = [
    'icon',
    'shortcut icon',
    'apple-touch-icon',
    'apple-touch-icon-precomposed'
  ]
  for (const rel of rels) {
    const re = new RegExp(`<link[^>]+rel=["']${rel}["'][^>]*?href=["']([^"']+)["'][^>]*?>`, 'i')
    const m = html.match(re)
    if (m?.[1]) return m[1]
  }
  return undefined
}

const getLinkMetadata = async (url: string): Promise<LinkMetadataResponse> => {
  try {
    const reqUrl = new URL(url)
    const res = await fetch(reqUrl.toString(), {
      headers: {
        'user-agent':
          'Mozilla/5.0 (compatible; LinkMetaBot/1.0; +https://ritik.aidevops.in)'
      }
    })
    if (!res.ok) return { success: false }

    const html = await res.text()

    const title =
      matchMeta(html, 'twitter:title') ||
      matchMeta(html, 'og:title') ||
      (html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? undefined)

    const description =
      matchMeta(html, 'twitter:description') ||
      matchMeta(html, 'og:description') ||
      matchMeta(html, 'description') ||
      ''

    const imageUrlRaw = matchMeta(html, 'twitter:image') || matchMeta(html, 'og:image')
    const image = imageUrlRaw
      ? {
          url: resolveUrl(imageUrlRaw, reqUrl)!,
          alt: title
        }
      : undefined

    const favRaw = matchFavicon(html) || '/favicon.ico'
    const faviconUrl = resolveUrl(favRaw, reqUrl)

    return {
      success: true,
      title,
      description,
      faviconUrl,
      requestUrl: reqUrl.toString(),
      image
    }
  } catch (e) {
    return { success: false }
  }
}

export default getLinkMetadata
