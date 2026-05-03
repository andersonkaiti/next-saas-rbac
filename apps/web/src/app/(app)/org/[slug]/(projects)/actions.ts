'use server'

import { getCurrentOrg } from '@auth/auth'
import { createProject } from '@http/create-project'
import { deleteProject } from '@http/delete-project'
import { updateProject } from '@http/update-project'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import type { ProjectSchema } from './project-schema'

export async function createProjectAction(data: ProjectSchema) {
  const currentOrg = (await getCurrentOrg()) as string

  try {
    await createProject({ org: currentOrg, name: data.name, description: data.description })
    revalidateTag(`${currentOrg}/projects`, {})
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
  return { success: true as const, message: 'Successfully saved the project.' }
}

export async function updateProjectAction(projectId: string, data: ProjectSchema) {
  const currentOrg = (await getCurrentOrg()) as string

  try {
    await updateProject({ org: currentOrg, projectId, name: data.name, description: data.description })
    revalidateTag(`${currentOrg}/projects`, {})
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
  return { success: true as const, message: 'Successfully saved the project.' }
}

export async function deleteProjectAction(projectId: string) {
  const currentOrg = await getCurrentOrg()
  await deleteProject({ org: currentOrg as string, projectId })
  revalidateTag(`${currentOrg}/projects`, {})
}
