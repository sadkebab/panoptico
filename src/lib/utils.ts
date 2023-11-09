import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TrackerClient } from "./track/client";
import { QueryClient } from "@tanstack/react-query";
import { DataRange } from "@/_data/events";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const trackerClient = new TrackerClient({
  url: process.env.NEXT_PUBLIC_TRACKER_URL!,
});


export const queryClient = new QueryClient()

export const dateLabelByRange = (date: Date, range: DataRange, timeZone: string) => {

  if (range === "hour" || range === "day") {
    const hours = parseInt(date.toLocaleString("it-IT", {
      timeZone: timeZone,
      hour: "numeric",
    })).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
    const minutes = parseInt(date.toLocaleString("it-IT", {
      timeZone: "UTC",
      minute: "numeric",
    })).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
    return `${hours}:${minutes}`
  }

  const day = parseInt(date.toLocaleString("it-IT", {
    timeZone: "UTC",
    day: "numeric",
  })).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

  const month = parseInt(date.toLocaleString("it-IT", {
    timeZone: "UTC",
    month: "numeric",
  })).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

  return `${day}/${month}`
}