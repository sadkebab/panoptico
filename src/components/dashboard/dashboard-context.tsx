"use client";
import { DataRange } from "@/_data/events";
import { getCookie, queryClient, setCookie } from "@/lib/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type DashboardContextType = {
  timezone: string;
  setTimezone: (value: string) => void;
  range: DataRange;
  setRange: (value: DataRange) => void;
};
export const DashBoardContext = createContext({} as DashboardContextType);

export const useDashboardContext = () => {
  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContextProvider",
    );
  }
  return context;
};

export function DashboardContext({
  children,
  timeZone,
  dataRange,
}: {
  children: React.ReactNode;
  timeZone: string;
  dataRange: DataRange;
}) {
  const [timezone, setTimezoneInner] = useState(timeZone);
  const [range, setRangeInner] = useState<DataRange>(dataRange);

  useEffect(() => {
    const found = getCookie("user-timezone") || timeZone;
    setTimezoneInner(found);
  }, [timeZone]);

  const setTimezone = (timezone: string) => {
    setCookie("user-timezone", timezone, 365);
    setTimezoneInner(timezone);
  };

  const setRange = (range: DataRange) => {
    setCookie("dashboard-range", range, 365);
    setRangeInner(range);
  };

  const context = {
    timezone,
    setTimezone,
    range,
    setRange,
  };
  return (
    <DashBoardContext.Provider value={context}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </DashBoardContext.Provider>
  );
}
