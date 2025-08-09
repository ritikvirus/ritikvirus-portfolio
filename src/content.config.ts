import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

import { iconSchema } from './content/_icons'

export const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/blog' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      heroImage: z.string(),
      tags: z.array(z.string()).optional().default([]),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      readingTime: z.number().optional(),
      wordsCount: z.number().optional(),
      latestCommitUrl: z.string().optional()
    })
})

export const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        year: z.number(),
        title: z.string(),
        htmlTitle: z.string().optional(),
        description: z.string(),
        heroImage: image(),
        heroImageAlign: z.enum(['top', 'center']).default('top'),
        links: z
          .array(
            z.object({
              icon: iconSchema,
              name: z.string(),
              url: z.string()
            })
          )
          .optional()
          .default([]),
        readingTime: z.number().optional(),
        wordsCount: z.number().optional(),
        updatedDate: z.coerce.date().optional(),
        latestCommitUrl: z.string().optional()
      })
      .transform((data) => ({
        ...data,
        htmlTitle: data.htmlTitle || data.title
      }))
})

export const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/pages' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      updatedDate: z.coerce.date().optional(),
      // Person fields for About page SEO (optional)
      name: z.string().optional(),
      email: z.string().optional(),
      telephone: z.string().optional(),
      location: z.string().optional(),
      sameAs: z.array(z.string()).optional().default([])
    })
})

export const collections = {
  blog,
  projects,
  pages
}
