'use server'

import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const cookieStorage = await cookies()

  cookieStorage.delete('token')

  return NextResponse.redirect(new URL('/auth/sign-in', request.url))
}
