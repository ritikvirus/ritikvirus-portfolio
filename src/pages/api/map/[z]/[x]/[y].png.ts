import type { APIRoute } from 'astro'
import { MAPTILER_API_KEY } from 'astro:env/server'

interface MapCoordinate {
  z: string
  x: string
  y: string
}

const generateMapUrl = ({ z, x, y }: MapCoordinate): string => {
  if (MAPTILER_API_KEY) {
    // Prefer satellite imagery when MapTiler key is available
    return `https://api.maptiler.com/maps/satellite-v2/${z}/${x}/${y}.jpg?key=${MAPTILER_API_KEY}`
  }
  // Fallback to ESRI World Imagery (satellite) when no MapTiler key is configured.
  // Please be mindful of usage policies for production traffic.
  return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`
}

export const GET: APIRoute = async ({ params }) => {
  const { z, x, y } = params

  if (!z || !x || !y)
    return new Response(null, {
      status: 400,
      statusText: 'Bad request'
    })

  const url = generateMapUrl({ z, x, y })

  const response = await fetch(url, {
    // Identify ourselves politely esp. for third-party tile services
    headers: { 'User-Agent': 'ritikvirus-portfolio/1.0 (contact: ritikvirus6@gmail.com)' }
  })
  if (!response.ok) {
    return new Response('Error fetching tile', { status: response.status })
  }

  const headers = new Headers(response.headers)
  headers.set('Cache-Control', 'max-age=86400')

  return new Response(response.body, {
    status: response.status,
    headers
  })
}

export const prerender = false
