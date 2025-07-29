'use server'

import { getCurrentOrg } from '@auth/auth'
import { deleteProject } from '@http/delete-project'
import { revalidateTag } from 'next/cache'

export async function deleteProjectAction(projectId: string) {
  const currentOrg = await getCurrentOrg()

  await deleteProject({
    org: currentOrg as string,
    projectId,
  })

  revalidateTag(`${currentOrg}/projects`)
}
