// Cloudflare build stub for @vercel/og
// Prevents Vite from resolving react-dom/server.edge in Workers runtime
export class ImageResponse {
  constructor() {
    throw new Error('OG image generation is disabled on Cloudflare build.')
  }
}
