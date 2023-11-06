"use client"

import { DataRange, GroupedData } from "@/_data/events";
import { Badge } from "@/lib/ui/badge";
import { Card, CardContent, CardTitle } from "@/lib/ui/card";
import { Separator } from "@/lib/ui/separator";
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { TimezoneContext } from "./timezone";

export function RangeChart({ range, event, title }: { range: DataRange, event: string, title: string }) {
  const { isPending, error, data } = useQuery({
    queryKey: ['chart', range, event],
    queryFn: () =>
      fetch(`api/events/${event}/${range}/grouped`).then(
        (res) => res.json() as Promise<GroupedData>,
      ),
    refetchInterval: 15000,
  })
  const { timezone } = useContext(TimezoneContext)


  if (isPending) return <ChartSkeleton title={title} />

  if (error) return 'An error has occurred: ' + error.message

  const normalizedData = chartify(data.groups, range, timezone)
  
  return (
    <Card className="">
      <CardTitle className="p-4 border-b border-border">{title}</CardTitle>
      <CardContent className="flex flex-row w-full items-center p-4">
        <Badge className="text-base">{data.count}</Badge>
        <div className="flex-1 h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={200} height={100} data={normalizedData}>
              <Bar dataKey="value" fill="var(--chart)" radius={4} />
              <Tooltip cursor={{ fill: 'hsl(var(--muted-foreground))', fillOpacity: .5, radius: 4}} content={<CustomTooltip data={normalizedData} />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const CustomTooltip = ({
  active, payload, label, data
}: {
  active?: boolean;
  payload?: any;
  label?: number;
  data: ReturnType<typeof chartify>;
}) => {
  if (active && payload && payload.length && label) {
    return (
      <Card className="p-1 min-w-[60px] w-fit flex flex-col items-center">
        <p className="text-lg font-bold">{payload[0].value}</p>
        <p className="text-xs">{data[label].name}</p>
      </Card>
    );
  }

  return null;
};

function ChartSkeleton({ title }: { title: string }) {
  return (
    <Card className="">
      <CardTitle className="p-4 border-b border-border">{title}</CardTitle>
      <CardContent className="flex flex-row w-full items-center p-4">
        <Badge className="text-base text-muted animation-pulse bg-muted animate-pulse">??</Badge>
        <div className="flex-1 h-60 p-4">
          <div className="bg-muted animate-pulse w-full h-full rounded-lg"></div>
        </div>
      </CardContent>
    </Card>
  )
}

const chartify = (groups: GroupedData["groups"], range: DataRange, timezone: string) => {
  return Object.keys(groups).map((k) => {
    const d = groups[k]
    const date = new Date(parseInt(k))
    return {
      name: dateLabelByRange(date, range, timezone),
      value: d.length,
    }
  }).reverse()
}

const dateLabelByRange = (date: Date, range: DataRange, timeZone: string) => {

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