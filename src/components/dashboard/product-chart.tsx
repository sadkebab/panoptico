"use client"

import { DataRange, GroupedData } from "@/_data/events";
import { Badge } from "@/lib/ui/badge";
import { Card, CardContent, CardTitle } from "@/lib/ui/card";
import { useContext, useEffect } from "react";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { TimezoneContext } from "./timezone";
import { Channels } from "@/lib/notify/channels";
import { useNotificationListener } from "@/lib/notify/client";
import { dateLabelByRange, queryClient } from "@/lib/utils";
import ChartSkeleton from "./chart-skeleton";
import { ChartTooltip } from "./chart-tooltip";
import { useGroupedEventQuery } from "./use-event-query";

export default function ProductChart({
  range,
  event,
  title,
  color
}: {
  range: DataRange,
  event: string,
  title: string,
  color?: string
}) {
  const { isPending, error, data, queryKey } = useGroupedEventQuery(event, range)
  const { timezone } = useContext(TimezoneContext)

  const revalidate = (_: string) => queryClient.invalidateQueries({ queryKey: queryKey })
  const { connected } = useNotificationListener(Channels.TRACKING, {
    [event]: revalidate
  })

  useEffect(() => {
    console.log("Listening for event updates:", event)
  }, [connected, event])

  if (isPending) return <ChartSkeleton title={title} color={color} />
  if (error) return 'An error has occurred: ' + error.message

  const { count, parsedData } = parse(data.groups, range, timezone)

  return (
    <Card className="">
      <CardTitle className="py-2 px-4 border-b border-border text-lg flex gap-1">
        <Badge className="text-white" style={{ backgroundColor: color }}>{count}</Badge>
        {title}
      </CardTitle>
      <CardContent className="flex flex-row w-full items-center p-4">
        <div className="flex-1 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={200} height={100} data={parsedData}>
              <Bar dataKey="value" fill={color || "var(--chart)"} radius={4} />
              <Tooltip
                cursor={{
                  fill: 'hsl(var(--muted-foreground))',
                  fillOpacity: .5,
                  radius: 4
                }}
                content={<ChartTooltip data={parsedData} />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function parse(groups: GroupedData<any>["groups"], range: DataRange, timezone: string) {
  const parsedData = Object.keys(groups).map((k) => {
    const d = groups[k]
    const date = new Date(parseInt(k))
    console.log(d)
    return {
      name: dateLabelByRange(date, range, timezone),
      value: d.reduce((p, n: any) => p + n.data.quantity, 0),
    }
  }).reverse()
  const count = parsedData.reduce((p, n) => p + n.value, 0)
  return {
    parsedData,
    count
  }
}

