"use client"

import { trackerClient } from "@/lib/utils"

export default function PusherPublisher() {

  return <button onClick={() => trackerClient.send("cock", {
    balls: "above"
  })}>
    Publish event
  </button>
}