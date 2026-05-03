'use server'

import { signUp } from '@http/sign-up'
import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import type { SignUpSchema } from './sign-up-schema'

export async function signUpAction(data: SignUpSchema) {
  try {
    await signUp({ name: data.name, email: data.email, password: data.password })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false as const, message }
    }
    console.error(err)
    return {
      success: false as const,
      message: 'Unexpected error, try again in a few minutes.',
    }
  }

  redirect('/auth/sign-in')
}
