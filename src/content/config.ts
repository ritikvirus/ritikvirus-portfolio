import { defineCollection, z } from 'astro:content'

import { iconSchema } from './_icons'

export const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional()
  })
})

export const projects = defineCollection({
  type: 'content',
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

export const collections = {
  blog,
  projects
}
