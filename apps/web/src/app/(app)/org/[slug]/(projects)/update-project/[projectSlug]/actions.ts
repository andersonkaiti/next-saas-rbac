'use server'

import { getCurrentOrg } from '@auth/auth'
import { updateProject } from '@http/update-project'
import { HTTPError } from 'ky'
import z from 'zod'
import { projectSchema } from '../../project-schema'

export interface IActionState {
  success: boolean
  message: string | null
  errors: z.inferFlattenedErrors<typeof projectSchema>['fieldErrors'] | null
  payload: FormData | null
}

export async function updateProjectAction(
  projectId: string,
  _: unknown,
  data: FormData
) {
  const result = projectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
      payload: data,
    }
  }

  const { name, description } = result.data

  try {
    await updateProject({
      org: (await getCurrentOrg()) as string,
      projectId,
      name,
      description,
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
    message: 'Successfully saved the project.',
    errors: null,
    payload: null,
  }
}
