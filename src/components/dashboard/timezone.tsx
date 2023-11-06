"use client"
import { getCookie, setCookie } from "@/lib/utils";
import { createContext, useEffect, useState } from "react";

type TimezoneContextType = {
  timezone: string,
  setTimezone: (value: string) => void
}
export const TimezoneContext = createContext({} as TimezoneContextType)

export function TimezoneWrapper({ children, timeZone }: { children: React.ReactNode, timeZone: string }) {
  const [timezone, setTimezoneInner] = useState(timeZone)
  
  useEffect(() => {
    const found = getCookie("user-timezone") || timeZone
    setTimezoneInner(found)
  }, [])

  const setTimezone = (timezone: string) => {
    setCookie("user-timezone", timezone, 365)
    setTimezoneInner(timezone)
  }

  const context = {
    timezone,
    setTimezone
  }
  return (
    <TimezoneContext.Provider value={context}>
      {children}
    </TimezoneContext.Provider>
  )
}