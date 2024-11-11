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
      numberOfTeamMembers: z.number(),
      description: z.string(),
      heroImage: image(),
      links: z.array(
        z.object({
          icon: iconSchema,
          name: z.string(),
          url: z.string()
        })
      ),
      updatedDate: z.coerce.date().optional()
    })
})

export const collections = {
  blog,
  projects
}
