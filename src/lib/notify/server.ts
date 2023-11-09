import { pusherServer } from "../pusher";

export const notify = async <T>(channel: string, event: string, data: T) => {
  await pusherServer.trigger(channel, event, data);
};
