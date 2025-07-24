import { cookies } from 'next/headers'

export async function isAuthenticated() {
  const cookieStorage = await cookies()

  return !!cookieStorage.get('token')?.value
}
