import { api } from './api-client'

interface ISignInWithPasswordRequest {
  email: string
  password: string
}

interface ISignInWithPasswordResponse {
  token: string
}

export async function signInWithPassword({
  email,
  password,
}: ISignInWithPasswordRequest) {
  return await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<ISignInWithPasswordResponse>()
}
