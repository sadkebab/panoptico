import { Card } from "@/lib/ui/card";

export function ChartTooltip({
  active,
  payload,
  label,
  data,
  valueFormatter
}: {
  active?: boolean;
  payload?: any;
  label?: number;
  valueFormatter?: (value: number) => string;
  data: {
    name: string,
    value: number
  }[]
}) {
  if (active && payload && payload.length && label) {
    return (
      <Card className="p-1 min-w-[60px] w-fit flex flex-col items-center">
        <p className="text-lg font-bold">
          {
            valueFormatter ? valueFormatter(payload[0].value) : payload[0].value
          }
        </p>
        <p className="text-xs">{data[label].name}</p>
      </Card>
    );
  }

  return null;
};