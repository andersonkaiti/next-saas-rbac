'use server'

import { acceptInvite } from '@http/accept-invite'
import { signInWithPassword } from '@http/sign-in-with-password'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { SignInSchema } from './sign-in-schema'

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7

export async function signInWithEmailAndPassword(data: SignInSchema) {
  try {
    const { token } = await signInWithPassword(data)
    const cookieStorage = await cookies()
    cookieStorage.set('token', token, { path: '/', maxAge: ONE_WEEK_IN_SECONDS })

    const inviteId = cookieStorage.get('inviteId')?.value
    if (inviteId) {
      try {
        await acceptInvite(inviteId)
        cookieStorage.delete('inviteId')
      } catch {}
    }
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

  redirect('/')
}
