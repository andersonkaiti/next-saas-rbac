'use server'

import { acceptInvite } from '@http/accept-invite'
import { signInWithGithub } from '@http/sign-in-with-github'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

const ONE_MINUTE_IN_SECONDS = 60
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 60
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24
const ONE_WEEK_IN_SECONDS = ONE_DAY_IN_SECONDS * 7

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuto code was not found.' },
      { status: 400 }
    )
  }

  const { token } = await signInWithGithub({ code })

  const cookieStorage = await cookies()

  cookieStorage.set('token', token, {
    path: '/',
    maxAge: ONE_WEEK_IN_SECONDS,
  })

  const inviteId = cookieStorage.get('inviteId')?.value

  if (inviteId) {
    try {
      await acceptInvite(inviteId)
      cookieStorage.delete('inviteId')
    } catch {}
  }

  return NextResponse.redirect(new URL('/', request.url))
}
