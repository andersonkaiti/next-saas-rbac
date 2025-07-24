import { api } from './api-client'

interface IGetProfileResponse {
  user: {
    name: string | null
    id: string
    avatarUrl: string | null
    email: string
  }
}

export async function getProfile() {
  return await api.get('profile').json<IGetProfileResponse>()
}
