import { getProfile } from '@http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  const cookieStorage = await cookies()

  return !!cookieStorage.get('token')?.value
}

export async function auth() {
  const cookieStorage = await cookies()

  const token = cookieStorage.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    return await getProfile()
  } catch {}

  redirect('/api/auth/sign-out')
}
