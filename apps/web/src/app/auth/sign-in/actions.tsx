'use server'

import { signInWithPassword } from '@http/sign-in-with-password'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export interface IActionState {
  success: boolean
  message: string | null
  errors: { email?: string[]; password?: string[] } | null
  payload: FormData | null
}

const ONE_MINUTE_IN_SECONDS = 60
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 60
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24
const ONE_WEEK_IN_SECONDS = ONE_DAY_IN_SECONDS * 7

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})

export async function signInWithEmailAndPassword(_: unknown, data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
      payload: data,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email: email,
      password: password,
    })

    const cookieStorage = await cookies()

    cookieStorage.set('token', token, {
      path: '/',
      maxAge: ONE_WEEK_IN_SECONDS,
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

  redirect('/')
}
