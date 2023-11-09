import { Channels } from "@/lib/notify/channels";
import { notify } from "@/lib/notify/server";
import track from "@/lib/track/server";
import { TrackerEventValidator } from "@/lib/validators";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const validated = TrackerEventValidator.parse(body);

    await track(validated.event, validated.data);
    await notify(Channels.TRACKING, validated.event, "received");

    return new Response("Ok", { status: 200 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
};
