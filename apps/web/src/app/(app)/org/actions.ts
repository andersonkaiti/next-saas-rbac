'use server'

import { getCurrentOrg } from '@auth/auth'
import { createOrganization } from '@http/create-organization'
import { updateOrganization } from '@http/update-organization'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import type { OrganizationSchema } from './organization-schema'

export async function createOrganizationAction(data: OrganizationSchema) {
  try {
    await createOrganization(data)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false as const, message }
    }
    return {
      success: false as const,
      message: 'Unexpected error, try again in a few minutes.',
    }
  }
  revalidateTag('organizations')
  return { success: true as const, message: 'Successfully saved the organization.' }
}

export async function updateOrganizationAction(data: OrganizationSchema) {
  try {
    await updateOrganization({
      org: (await getCurrentOrg()) as string,
      ...data,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false as const, message }
    }
    return {
      success: false as const,
      message: 'Unexpected error, try again in a few minutes.',
    }
  }
  revalidateTag('organizations')
  return { success: true as const, message: 'Successfully saved the organization.' }
}
