import { Redis } from "@upstash/redis";
import { TrackerEvent } from "../validators";

export default async function track(event: TrackerEvent["event"], data: TrackerEvent["data"]) {
  await redis.set(event, data);
  const res = await redis.set('foo', 'bar');
}

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})