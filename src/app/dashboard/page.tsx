import { DataRange, getByRange, group, parseRange } from "@/_data/events"
import { RangeChart } from "@/components/dashboard/range-chart"
import { TimezoneWrapper } from "@/components/dashboard/timezone"
import TimezoneCombobox from "@/components/dashboard/timezone-combobox"
import QueryWrapper from "@/components/query-wrapper"
import { Card } from "@/lib/ui/card"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { cookies } from "next/headers"
import Link from "next/link"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Dashboard({ searchParams }: { searchParams: { range?: string } }) {
  const range = parseRange(searchParams.range) || "day"
  const timeZone = cookies().get("user-timezone")?.value || Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase()
  return (
    <div className="p-8">
      <TimezoneWrapper timeZone={timeZone} >
        <Card className="p-2 flex flex-row justify-between">
          <ul className="flex flex-row gap-1">
            <RangeItem range="hour" active={range == "hour"}>Last hour</RangeItem>
            <RangeItem range="day" active={range == "day"}>Last 24 hours</RangeItem>
            <RangeItem range="week" active={range == "week"}>Last week</RangeItem>
            <RangeItem range="month" active={range == "month"}>Last month</RangeItem>
          </ul>
          <TimezoneCombobox />
        </Card>

        <div className="grid grid-cols-3 gap-6 pt-8">
          <QueryWrapper>
            <Suspense fallback="loading...">
              <RangeChart event={"visit"} range={range} title="Page Views" />
              <RangeChart event={"unique-user"} range={range} title="New Viewers" />
            </Suspense>
          </QueryWrapper>
        </div>
      </TimezoneWrapper>
    </div>
  )
}

function RangeItem({ children, range, active }: { children: React.ReactNode, range: DataRange, active?: boolean }) {
  return (
    <Link href={`/dashboard?range=${range}`}>
      <li className={cn("border border-border flex flex-row items-center p-2 gap-1 rounded active:shadow-inner active:scale-95", active && "border-muted-foreground")}>
        {children}
      </li>
    </Link>
  )
}