import { defineCollection, type ImageFunction, z } from 'astro:content'

import { iconSchema } from '../_icons'

const projectSchema = ({ image }: { image: ImageFunction }) =>
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

export const projectCollection = defineCollection({
  type: 'content',
  schema: projectSchema
})

export type ProjectProps = z.infer<
  ReturnType<NonNullable<typeof projectSchema>>
>
