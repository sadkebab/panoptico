import { Card } from "@/lib/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/ui/table";

export function TableSkeleton({
  title,
  term,
}: {
  title: string;
  term: string;
}) {
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
          {Array.from(Array(6).keys()).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
              </TableCell>
              <TableCell>
                <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
