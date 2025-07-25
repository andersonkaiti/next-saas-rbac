import { api } from './api-client'

interface ISignInWithGithubRequest {
  code: string
}

interface ISignInWithGithubResponse {
  token: string
}

export async function signInWithGithub({ code }: ISignInWithGithubRequest) {
  return await api
    .post('sessions/github', {
      json: {
        code,
      },
    })
    .json<ISignInWithGithubResponse>()
}
