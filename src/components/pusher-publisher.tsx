"use client"

import { track } from "@/lib/track/client"

export default function PusherPublisher() {
  return <button onClick={() => track("cock", {
    balls: "above"
  })}>
    Publish event
  </button>
}