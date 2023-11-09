import { Channel } from "pusher-js";
import { useEffect, useState } from "react";
import PusherClient from "pusher-js";

export const useNotificationListener = <T>(
  room: string,
  callbacks: Record<string, (data: T) => void>,
) => {
  const [channel, setChannel] = useState<Channel>();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setChannel(pusherClient.subscribe(room));
  }, [room]);

  useEffect(() => {
    if (!channel) return;
    Object.entries(callbacks).forEach(([event, callback]) => {
      channel.bind(event, callback);
    });

    setConnected(true);
  }, [channel, callbacks]);

  return { connected };
};

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  },
);
