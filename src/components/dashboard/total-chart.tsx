"use client";

import { DataRange, GroupedData } from "@/_data/events";
import { useEffect } from "react";
import { useDashboardContext } from "./dashboard-context";
import { dateLabelByRange, queryClient } from "@/lib/utils";
import { useNotificationListener } from "@/lib/notify/client";
import { Channels } from "@/lib/notify/channels";
import ChartSkeleton from "./chart-skeleton";
import { Card, CardContent, CardTitle } from "@/lib/ui/card";
import { BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltip } from "./chart-tooltip";
import { Badge } from "@/lib/ui/badge";
import { useGroupedEventQuery } from "./use-event-query";

type OrderEventData = {
  total: number;
};

export default function TotalChart({
  event,
  title,
  color,
}: {
  event: string;
  title: string;
  color?: string;
}) {
  const { timezone, range } = useDashboardContext();
  const { isPending, error, data, queryKey } =
    useGroupedEventQuery<OrderEventData>(event, range);

  const revalidate = (_: string) =>
    queryClient.invalidateQueries({ queryKey: queryKey });
  const { connected } = useNotificationListener(Channels.TRACKING, {
    [event]: revalidate,
  });

  useEffect(() => {
    console.log("Listening for event updates:", event);
  }, [connected, event]);

  if (isPending) return <ChartSkeleton title={title} color={color} />;
  if (error) return "An error has occurred: " + error.message;

  const { total, parsedData } = parse(data.groups, range, timezone);

  return (
    <Card className="">
      <CardTitle className="py-2 px-4 border-b border-border text-lg flex gap-1">
        <Badge className="text-white" style={{ backgroundColor: color }}>
          {total}$
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
                content={
                  <ChartTooltip
                    data={parsedData}
                    valueFormatter={(n) => `${n}$`}
                  />
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

const parse = (
  groups: GroupedData<OrderEventData>["groups"],
  range: DataRange,
  timezone: string,
) => {
  let total = 0;
  const parsedData = Object.keys(groups)
    .map((k) => {
      const d = groups[k];
      const date = new Date(parseInt(k));
      const value = d.reduce((p, n) => p + n.data.total, 0);
      total += value;
      return {
        name: dateLabelByRange(date, range, timezone),
        value: value,
      };
    })
    .reverse();
  return { total, parsedData };
};
