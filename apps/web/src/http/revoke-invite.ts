import { api } from './api-client'

interface IRevokeInviteRequest {
  org: string
  inviteId: string
}

export async function revokeInvite({ org, inviteId }: IRevokeInviteRequest) {
  await api.delete(`organizations/${org}/invites/${inviteId}`)
}
