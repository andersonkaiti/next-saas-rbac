import z from 'zod'

export const projectSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, include at least 4 characters.' }),
  description: z.string(),
})

export type ProjectSchema = z.infer<typeof projectSchema>
