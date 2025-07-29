import { api } from './api-client'

interface ITransferOwnershipRequest {
  org: string
  transferToUserId: string
}

export async function transferOwnership({
  org,
  transferToUserId,
}: ITransferOwnershipRequest) {
  await api.patch(`organizations/${org}/owner`, {
    json: {
      transferToUserId,
    },
  })
}
