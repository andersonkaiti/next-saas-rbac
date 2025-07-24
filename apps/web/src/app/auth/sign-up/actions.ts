'use server'

import { signUp } from '@http/sign-up'
import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export interface IActionState {
  success: boolean
  message: string | null
  errors: z.inferFlattenedErrors<typeof signUpSchema>['fieldErrors'] | null
  payload: FormData | null
}

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, enter your full name.',
    }),
    email: z
      .string()
      .email({ message: 'Please, provide a valid e-mail address.' }),
    password: z
      .string()
      .min(6, { message: 'Password should have at least 6 characters.' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords confirmation doesn't match.",
    path: ['password_confirmation'],
  })

export async function signUpAction(_: unknown, data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
      payload: data,
    }
  }

  const { name, email, password } = result.data

  try {
    await signUp({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return {
        success: false,
        message,
        errors: null,
        payload: data,
      }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
      payload: data,
    }
  }

  redirect('/auth/sign-in')
}
