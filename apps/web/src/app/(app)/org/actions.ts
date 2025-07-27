'use server'

import { getCurrentOrg } from '@auth/auth'
import { createOrganization } from '@http/create-organization'
import { updateOrganization } from '@http/update-organization'
import { HTTPError } from 'ky'
import z from 'zod'
import { organizationSchema } from './organization-schema'

export interface IActionState {
  success: boolean
  message: string | null
  errors:
    | z.inferFlattenedErrors<typeof organizationSchema>['fieldErrors']
    | null
  payload: FormData | null
}

export async function createOrganizationAction(_: unknown, data: FormData) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
      payload: data,
    }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
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

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
      payload: data,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization.',
    errors: null,
    payload: null,
  }
}

export async function updateOrganizationAction(_: unknown, data: FormData) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
      payload: data,
    }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    await updateOrganization({
      org: (await getCurrentOrg()) as string,
      name,
      domain,
      shouldAttachUsersByDomain,
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

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
      payload: data,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization.',
    errors: null,
    payload: null,
  }
}
