import { NextRequest, userAgent } from "next/server";

export const GET = async (request: NextRequest) => {
  const ip = request.ip || "undef"
  const geo = request.geo
  const ua = userAgent(request)
  return new Response(JSON.stringify({ ip, geo, ua }), { status: 200 })
}