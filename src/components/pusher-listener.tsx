"use client"

import { Channels } from "@/lib/notify/channels"
import { useNotificationListener } from "@/lib/notify/client"
import { useState } from "react"

type Message = {
  balls: string,
}
export default function PusherListener() {
  const [messages, setMessages] = useState<string[]>([])
  const updateMessages = (message: string) => {
    console.log(message)
    setMessages((messages) => [...messages, message])
  }
  const { connected } = useNotificationListener(Channels.TRACKING, {
    cock: updateMessages
  })

  return (
    <ul>
      {
        !connected
          ? <li>Not connected</li>
          : messages.map((message) => (<li key={message}>{message}</li>))
      }
    </ul>
  )
}