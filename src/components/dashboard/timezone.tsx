"use client";
import { getCookie, queryClient, setCookie } from "@/lib/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

type TimezoneContextType = {
  timezone: string;
  setTimezone: (value: string) => void;
};
export const TimezoneContext = createContext({} as TimezoneContextType);

export function DashboardContext({
  children,
  timeZone,
}: {
  children: React.ReactNode;
  timeZone: string;
}) {
  const [timezone, setTimezoneInner] = useState(timeZone);

  useEffect(() => {
    const found = getCookie("user-timezone") || timeZone;
    setTimezoneInner(found);
  }, [timeZone]);

  const setTimezone = (timezone: string) => {
    setCookie("user-timezone", timezone, 365);
    setTimezoneInner(timezone);
  };

  const context = {
    timezone,
    setTimezone,
  };
  return (
    <TimezoneContext.Provider value={context}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TimezoneContext.Provider>
  );
}
