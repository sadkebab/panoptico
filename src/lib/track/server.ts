import { db } from "../db";
import { TrackerEvent } from "../validators";
import { events } from "../../schema";
import { nanoid } from "nanoid";

export default async function track(
  event: TrackerEvent["event"],
  data?: TrackerEvent["data"],
) {
  const row = {
    id: nanoid(),
    type: event,
    timestamp: Date.now(),
    data: JSON.stringify(data),
  };

  console.log("new event", JSON.stringify(row));
  await db.insert(events).values(row);
}
