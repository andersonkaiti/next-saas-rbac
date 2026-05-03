'use server'

import { getCurrentOrg } from '@auth/auth'
import { createInvite } from '@http/create-invite'
import { removeMember } from '@http/remove-member'
import { revokeInvite } from '@http/revoke-invite'
import { transferOwnership } from '@http/transfer-ownership'
import { updateMember } from '@http/update-member'
import type { Role } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import type { InviteSchema } from './invite-schema'

export async function createInviteAction(data: InviteSchema) {
  const currentOrg = (await getCurrentOrg()) as string

  try {
    await createInvite({ org: currentOrg, email: data.email, role: data.role })
    revalidateTag(`${currentOrg}/invites`, {})
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

  return { success: true as const, message: 'Successfully created the invite.' }
}

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg()
  await removeMember({ org: currentOrg as string, memberId })
  revalidateTag(`${currentOrg}/members`, {})
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg()
  await updateMember({ org: currentOrg as string, memberId, role })
  revalidateTag(`${currentOrg}/members`, {})
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg()
  await revokeInvite({ org: currentOrg as string, inviteId })
  revalidateTag(`${currentOrg}/invites`, {})
}

export async function transferOwnershipAction(transferToUserId: string) {
  const currentOrg = await getCurrentOrg()
  await transferOwnership({ org: currentOrg as string, transferToUserId })
  revalidateTag(`${currentOrg}/members`, {})
}
