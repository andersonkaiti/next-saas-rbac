import { getMembership } from '@http/get-membership'
import { getProfile } from '@http/get-profile'
import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  return !!(await cookies()).get('token')?.value
}

export async function getCurrentOrg() {
  return (await cookies()).get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  return (await getMembership(org)).membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  return defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })
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
