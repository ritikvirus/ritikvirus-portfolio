import type { APIRoute } from 'astro'
import { MAPTILER_API_KEY } from 'astro:env/server'

interface MapCoordinate {
  z: string
  x: string
  y: string
}

const generatePrimaryMapUrl = ({ z, x, y }: MapCoordinate): string => {
  if (MAPTILER_API_KEY) {
    // Prefer satellite imagery when MapTiler key is available
    return `https://api.maptiler.com/maps/satellite-v2/${z}/${x}/${y}.jpg?key=${MAPTILER_API_KEY}`
  }
  // Use OpenStreetMap tiles as primary when no MapTiler key is configured.
  // Be mindful of OSM usage policy for production traffic.
  return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`
}

const generateSecondaryMapUrl = ({ z, x, y }: MapCoordinate): string => {
  // ESRI World Imagery as a secondary fallback
  return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`
}

export const GET: APIRoute = async ({ params }) => {
  const { z, x, y } = params

  if (!z || !x || !y)
    return new Response(null, {
      status: 400,
      statusText: 'Bad request'
    })

  const primaryUrl = generatePrimaryMapUrl({ z, x, y })
  const uaHeader = { 'User-Agent': 'ritikvirus-portfolio/1.0 (contact: ritikvirus6@gmail.com)' }

  let upstream = await fetch(primaryUrl, { headers: uaHeader })
  if (!upstream.ok) {
    const secondaryUrl = generateSecondaryMapUrl({ z, x, y })
    upstream = await fetch(secondaryUrl, { headers: uaHeader })
    if (!upstream.ok) {
      return new Response('Error fetching tile', { status: upstream.status })
    }
  }

  const headers = new Headers(upstream.headers)
  headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=600')

  return new Response(upstream.body, {
    status: upstream.status,
    headers
  })
}

export const prerender = false
