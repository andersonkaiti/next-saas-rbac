import { api } from './api-client'

interface IRemoveMemberRequest {
  org: string
  memberId: string
}

export async function removeMember({ org, memberId }: IRemoveMemberRequest) {
  await api.delete(`organizations/${org}/members/${memberId}`)
}
