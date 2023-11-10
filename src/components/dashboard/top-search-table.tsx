"use client";

import { EventList } from "@/_data/events";
import { useEventQuery } from "./use-event-query";
import { queryClient } from "@/lib/utils";
import { useNotificationListener } from "@/lib/notify/client";
import { Channels } from "@/lib/notify/channels";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/ui/table";
import { TableSkeleton } from "./table-skeleton";
import { Card } from "@/lib/ui/card";
import { useDashboardContext } from "./dashboard-context";

export default function TopSearchTable({
  title,
  event,
  term,
}: {
  title: string;
  event: string;
  term: string;
}) {
  const { range } = useDashboardContext();
  const { isPending, error, data, queryKey } = useEventQuery<{
    text: string;
  }>(event, range);

  const revalidate = (_: string) =>
    queryClient.invalidateQueries({ queryKey: queryKey });
  const { connected } = useNotificationListener(Channels.TRACKING, {
    [event]: revalidate,
  });

  useEffect(() => {
    console.log("Listening for event updates:", event);
  }, [connected, event]);

  if (isPending) return <TableSkeleton title={title} term={term} />;
  if (error) return "An error has occurred: " + error.message;

  const normalizedData = parse(data.rows);

  return (
    <Card className="p-6">
      <h2 className="font-bold">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{term}</TableHead>
            <TableHead>Frequency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(normalizedData.length > 0 &&
            normalizedData.slice(0, 20).map((row) => (
              <TableRow key={row.label}>
                <TableCell>{row.label}</TableCell>
                <TableCell className="font-bold">{row.value}</TableCell>
              </TableRow>
            ))) || (
            <TableRow>
              <TableCell>Empty record set.</TableCell>
              <TableCell className="font-bold"></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

function parse(data: EventList<{ text: string }>["rows"]) {
  const map = data.reduce(
    (acc, row) => {
      if (acc[row.data.text]) {
        acc[row.data.text]++;
      } else {
        acc[row.data.text] = 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.keys(map)
    .sort((a, b) => map[b] - map[a])
    .map((k) => {
      return {
        label: k,
        value: map[k],
      };
    });
}
