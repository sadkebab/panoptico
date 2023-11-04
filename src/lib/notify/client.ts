import { Channel } from "pusher-js"
import { useEffect, useState } from "react"
import { pusherClient } from "../pusher"

export const useNotificationListener = <T>(room: string, callbacks: Record<string, (data: T) => void>) => {
  const [channel, setChannel] = useState<Channel>()
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    setChannel(pusherClient.subscribe(room))
  }, [])

  useEffect(() => {
    if (!channel) return
    Object.entries(callbacks).forEach(([event, callback]) => {
      channel.bind(event, callback)
    })
    
    setConnected(true)
  }, [channel])

  return { connected }
}