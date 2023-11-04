import { type NextRequest } from 'next/server'
import { userAgent } from 'next/server'

export async function middleware(request: NextRequest) {
  const ip = request.ip
  const geo = request.geo
  const ua = userAgent(request)
  console.log(ip, geo, ua)
}

export const config = {
  matcher: '/playground',
}