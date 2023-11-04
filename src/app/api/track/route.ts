import { notify } from "@/lib/notify/server"
import track from "@/lib/track/server"
import { TrackerEventValidator } from "@/lib/validators"

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const validated = TrackerEventValidator.parse(body)
    console.log(validated)
    await track(validated.event, validated.data)
    await notify("tracking", validated.event, "received")

    return new Response("Ok", { status: 200 })
  } catch (e) {
    return new Response("Error", { status: 500 })
  }
}