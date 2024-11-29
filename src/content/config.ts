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
    z.object({
      year: z.number(),
      title: z.string(),
      htmlTitle: z.string(),
      description: z.string(),
      heroImage: image(),
      readingTime: z.number().optional(),
      wordsCount: z.number().optional(),
      contributors: z.array(
        z.object({ name: z.string(), username: z.string(), url: z.string() })
      ),
      links: z.array(
        z.object({
          icon: iconSchema,
          name: z.string(),
          url: z.string()
        })
      ),
      updatedDate: z.coerce.date().optional(),
      latestCommitUrl: z.string().optional()
    })
})

export const collections = {
  blog,
  projects
}
