'use server'

import { getCurrentOrg } from '@auth/auth'
import { createInvite } from '@http/create-invite'
import { removeMember } from '@http/remove-member'
import { revokeInvite } from '@http/revoke-invite'
import { transferOwnership } from '@http/transfer-ownership'
import { updateMember } from '@http/update-member'
import { roleSchema, type Role } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import z from 'zod'

const inviteSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail address.' }),
  role: roleSchema,
})

export interface IActionState {
  success: boolean
  message: string | null
  errors: z.inferFlattenedErrors<typeof inviteSchema>['fieldErrors'] | null
  payload: FormData | null
}

export async function createInviteAction(_: unknown, data: FormData) {
  const result = inviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
      payload: data,
    }
  }

  const { email, role } = result.data

  const currentOrg = (await getCurrentOrg()) as string

  try {
    await createInvite({
      org: currentOrg,
      email,
      role,
    })

    revalidateTag(`${currentOrg}/invites`, {})
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
    message: 'Successfully created the invite.',
    errors: null,
    payload: null,
  }
}

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg()

  await removeMember({
    org: currentOrg as string,
    memberId,
  })

  revalidateTag(`${currentOrg}/members`, {})
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg()

  await updateMember({
    org: currentOrg as string,
    memberId,
    role,
  })

  revalidateTag(`${currentOrg}/members`, {})
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg()

  await revokeInvite({
    org: currentOrg as string,
    inviteId,
  })

  revalidateTag(`${currentOrg}/invites`, {})
}

export async function transferOwnershipAction(transferToUserId: string) {
  const currentOrg = await getCurrentOrg()

  await transferOwnership({
    org: currentOrg as string,
    transferToUserId,
  })

  revalidateTag(`${currentOrg}/members`, {})
}
