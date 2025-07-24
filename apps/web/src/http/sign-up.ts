import { api } from './api-client'

interface ISignUpRequest {
  name: string
  email: string
  password: string
}

type ISignUpResponse = void

export async function signUp({
  name,
  email,
  password,
}: ISignUpRequest): Promise<ISignUpResponse> {
  await api.post('users', {
    json: {
      name,
      email,
      password,
    },
  })
}
