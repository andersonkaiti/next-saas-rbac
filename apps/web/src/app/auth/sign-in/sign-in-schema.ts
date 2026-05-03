import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})

export type SignInSchema = z.infer<typeof signInSchema>
