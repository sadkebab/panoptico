import { TrackerEvent } from "../validators"

export const track = (event: TrackerEvent["event"], data: TrackerEvent["data"]) => {
  return fetch("/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event,
      data
    })
  })
}