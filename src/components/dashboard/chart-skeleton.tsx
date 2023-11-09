import { Card, CardContent, CardTitle } from "@/lib/ui/card";
import { Badge } from "lucide-react";

export default function ChartSkeleton({
  title,
  color,
  className,
}: {
  title: string;
  color?: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardTitle className="px-4 py-2 border-b border-border text-xl flex gap-1">
        <Badge
          className="text-muted animation-pulse bg-muted animate-pulse"
          style={{
            backgroundColor: color,
            opacity: 0.1,
            color: color,
          }}
        >
          ?
        </Badge>
        {title}
      </CardTitle>
      <CardContent className="flex flex-row w-full items-center p-4">
        <div className="flex-1 h-44">
          <div
            className="bg-muted animate-pulse w-full h-full rounded-lg"
            style={{
              backgroundColor: color,
              opacity: 0.1,
            }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}
