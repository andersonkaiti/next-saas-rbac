import { api } from './api-client'

interface ISignInWithGithubRequest {
  code: string
}

interface ISignInWithGithubResponse {
  token: string
}

export async function signInWithGithub({ code }: ISignInWithGithubRequest) {
  const result = await api
    .post('sessions/github', {
      json: {
        code,
      },
    })
    .json<ISignInWithGithubResponse>()

  return result
}
