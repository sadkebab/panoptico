import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { trackerClient } from "./lib/utils";

export async function middleware(request: NextRequest) {
  trackerClient.send("visit", {});
  const response = NextResponse.next();

  const identifier = request.cookies.get("uqId");
  if (!identifier?.value) {
    const newIqId = nanoid(16);
    trackerClient.send("unique-user", {});
    response.cookies.set("uqId", newIqId);
  }

  return response;
}

export const config = {
  matcher: "/playground",
};
