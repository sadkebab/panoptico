import { TrackerEvent } from "../validators";

export class TrackerClient {
  private url: string;

  constructor({ url }: { url: string }) {
    this.url = url.replace(/\/$/, "");
  }

  send = (event: TrackerEvent["event"], data: TrackerEvent["data"]) => {
    return fetch(`${this.url}/api/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event,
        data,
      }),
    });
  };
}
