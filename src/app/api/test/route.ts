
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})


export const POST = async (req: Request) => {
  const res = await redis.set('foo', 'bar')
  return new Response(JSON.stringify(res), { status: 200 })
}

export const GET = async (req: Request) => {
  const res = await redis.scan(0, { match: "foo*" })
  const r = {} as Record<string, any>
  for (const key of res[1]) {
    r[key] = await redis.get(key)
  }
  return new Response(JSON.stringify(r), { status: 200 })
}