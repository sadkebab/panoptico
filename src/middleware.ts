import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import track from './lib/track/server'
import { notify } from './lib/notify/server'

export async function middleware(request: NextRequest) {
  track('visit')
  const response = NextResponse.next()

  const identifier = request.cookies.get('uqId')
  if (!identifier?.value) {
    const newIqId = nanoid(16)
    track('unique-user')
    response.cookies.set('uqId', newIqId)
  }

  return response
}

export const config = {
  matcher: '/playground',
}