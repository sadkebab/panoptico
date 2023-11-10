"use client";

import { DataRange, GroupedData } from "@/_data/events";
import { Badge } from "@/lib/ui/badge";
import { Card, CardContent, CardTitle } from "@/lib/ui/card";
import { useEffect } from "react";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";
import { useDashboardContext } from "./dashboard-context";
import { Channels } from "@/lib/notify/channels";
import { useNotificationListener } from "@/lib/notify/client";
import { dateLabelByRange, queryClient } from "@/lib/utils";
import ChartSkeleton from "./chart-skeleton";
import { ChartTooltip } from "./chart-tooltip";
import { useGroupedEventQuery } from "./use-event-query";

export default function RangeChart({
  event,
  title,
  color,
  className,
}: {
  event: string;
  title: string;
  color?: string;
  className?: string;
}) {
  const { timezone, range } = useDashboardContext();
  const { isPending, error, data, queryKey } = useGroupedEventQuery(
    event,
    range,
  );

  const revalidate = (_: string) =>
    queryClient.invalidateQueries({ queryKey: queryKey });
  const { connected } = useNotificationListener(Channels.TRACKING, {
    [event]: revalidate,
  });

  useEffect(() => {
    console.log("Listening for event updates:", event);
  }, [connected, event]);

  if (isPending)
    return <ChartSkeleton className={className} title={title} color={color} />;
  if (error) return "An error has occurred: " + error.message;

  const parsedData = parse(data.groups, range, timezone);

  return (
    <Card className={className}>
      <CardTitle className="py-2 px-4 border-b border-border text-lg flex gap-1">
        <Badge className="text-white" style={{ backgroundColor: color }}>
          {data.count}
        </Badge>
        {title}
      </CardTitle>
      <CardContent className="flex flex-row w-full items-center p-4">
        <div className="flex-1 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={200} height={100} data={parsedData}>
              <Bar dataKey="value" fill={color || "var(--chart)"} radius={4} />
              <Tooltip
                cursor={{
                  fill: "hsl(var(--muted-foreground))",
                  fillOpacity: 0.5,
                  radius: 4,
                }}
                content={<ChartTooltip data={parsedData} />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

const parse = (
  groups: GroupedData<any>["groups"],
  range: DataRange,
  timezone: string,
) => {
  return Object.keys(groups)
    .map((k) => {
      const d = groups[k];
      const date = new Date(parseInt(k));
      return {
        name: dateLabelByRange(date, range, timezone),
        value: d.length,
      };
    })
    .reverse();
};
