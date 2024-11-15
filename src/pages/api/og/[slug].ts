import { ImageResponse } from '@vercel/og'
import type { APIRoute } from 'astro'
import { type CollectionEntry, getCollection } from 'astro:content'
import fs from 'fs'
import path from 'path'
import type { ReactElement } from 'react'

type OGAPIRoute = APIRoute<
  { project: CollectionEntry<'projects'> },
  { slug: string }
>

const generateHtml = (
  data: CollectionEntry<'projects'>['data']
): ReactElement => {
  const image = fs.readFileSync(
    path.resolve(process.cwd(), 'public/images/og_background.png')
  )

  return {
    key: 'html',
    type: 'div',
    props: {
      tw: 'h-full w-full p-32 flex flex-col relative',
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
            tw: 'flex self-start items-center rounded-full gap-4 py-3 pl-3 pr-4 border border-slate-600 text-white',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'w-5 h-5 mr-3 bg-green-300 text-green-300 rounded-full'
                }
              },
              {
                type: 'div',
                props: {
                  tw: 'text-3xl flex',
                  children: [
                    {
                      type: 'div',
                      props: {
                        tw: 'mr-5',
                        children: 'Jesica'
                      }
                    },
                    {
                      type: 'div',
                      props: {
                        tw: 'mr-5',
                        children: '|'
                      }
                    },
                    {
                      type: 'div',
                      props: {
                        tw: 'mr-5',
                        children: 'jestsee.com'
                      }
                    }
                  ]
                }
              }
            ],
            style: {
              fontFamily: 'Plus Jakarta Sans Medium'
            }
          }
        },
        {
          type: 'div',
          props: {
            tw: 'text-6xl font-bold text-white mt-12 tracking-tight',
            children: data.title.replace('\\n', ' '),
            style: {
              fontFamily: 'Plus Jakarta Sans Bold'
            }
          }
        },
        {
          type: 'div',
          props: {
            tw: 'mt-8 text-3xl font-medium text-gray-300',
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
    path.resolve(process.cwd(), 'public/fonts/PlusJakartaSans-Bold.ttf')
  )

  const PlusJakartaSansMedium = fs.readFileSync(
    path.resolve(process.cwd(), 'public/fonts/PlusJakartaSans-Medium.ttf')
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
