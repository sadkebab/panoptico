"use client";

import { DataRange } from "@/_data/events";
import { useDashboardContext } from "./dashboard-context";
import { Button } from "@/lib/ui/button";
import { cn } from "@/lib/utils";

export function RangeItem({
  children,
  target,
}: {
  children: React.ReactNode;
  target: DataRange;
}) {
  const { setRange, range } = useDashboardContext();
  return (
    <li className="flex-1 md:flex-none h-full">
      <Button
        variant="outline"
        className={cn("w-full", range === target && "border-primary")}
        onClick={() => setRange(target)}
      >
        {children}
      </Button>
    </li>
  );
}
