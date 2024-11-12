import { ImageResponse } from '@vercel/og'
import type { APIRoute } from 'astro'
import { type CollectionEntry, getCollection } from 'astro:content'
import fs from 'fs'
import path from 'path'
import type { ReactElement } from 'react'

import ogBackground from '@/assets/og_background.png'

type OGAPIRoute = APIRoute<
  { project: CollectionEntry<'projects'> },
  { slug: string }
>

const generateHtml = (
  data: CollectionEntry<'projects'>['data']
): ReactElement => {
  const image = fs.readFileSync(
    process.env.NODE_ENV === 'development'
      ? path.resolve(ogBackground.src.replace(/\?.*/, '').replace('/@fs', ''))
      : path.resolve(ogBackground.src.replace('/', 'dist/'))
  )

  return {
    key: 'html',
    type: 'div',
    props: {
      tw: 'h-full w-full px-32 py-24 flex flex-col relative',
      style: {
        fontFamily: 'Plus Jakarta Sans Medium'
      },
      children: [
        {
          type: 'img',
          props: {
            tw: 'absolute left-0 top-0',
            src: image.buffer,
            width: 1200,
            height: 630
          }
        },
        {
          type: 'div',
          props: {
            tw: 'text-6xl font-bold text-white',
            children: data.title.replace('\\n', ' '),
            style: {
              fontFamily: 'Plus Jakarta Sans Bold'
            }
          }
        },
        {
          type: 'div',
          props: {
            tw: 'mt-8 max-w-[720px] text-2xl font-medium text-gray-300',
            children: data.description
          }
        }
      ]
    }
  }
}

export const GET: OGAPIRoute = async ({ props }) => {
  const {
    project: { data }
  } = props
  const html = generateHtml(data)

  const PlusJakartaSansBold = fs.readFileSync(
    path.resolve('./src/assets/fonts/PlusJakartaSans-Bold.ttf')
  )
  const PlusJakartaSansMedium = fs.readFileSync(
    path.resolve('./src/assets/fonts/PlusJakartaSans-Medium.ttf')
  )

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Plus Jakarta Sans Bold',
        data: PlusJakartaSansBold.buffer as ArrayBuffer,
        style: 'normal'
      },
      {
        name: 'Plus Jakarta Sans Medium',
        data: PlusJakartaSansMedium.buffer as ArrayBuffer,
        style: 'normal'
      }
    ]
  })
}

export async function getStaticPaths() {
  const projects = await getCollection('projects')

  return projects.map((project) => ({
    params: {
      slug: project.slug
    },
    props: { project }
  }))
}
