import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DiffBadge } from "./DiffBadge";
import { cn } from "@/lib/utils";

interface BiddingEntry {
  bid: string;
  hcp: string;
  description: string;
  diffType?: "HCP" | "DESC" | "BOTH" | "SAME" | "NEW";
}

interface BiddingTableProps {
  title: string;
  prefix?: string;
  entries: BiddingEntry[];
  showDiff?: boolean;
}

function formatBid(bid: string) {
  const parts: React.ReactNode[] = [];
  let i = 0;

  while (i < bid.length) {
    const char = bid[i];
    if (char === "♣" || char === "♠") {
      parts.push(
        <span key={i} className="text-gray-900 dark:text-gray-100 font-semibold">
          {char}
        </span>,
      );
    } else if (char === "♦" || char === "♥") {
      parts.push(
        <span key={i} className="text-red-600 font-semibold">
          {char}
        </span>,
      );
    } else {
      parts.push(char);
    }
    i++;
  }

  return <>{parts}</>;
}

export function BiddingTable({ title, prefix, entries, showDiff = false }: BiddingTableProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Bid</TableHead>
            <TableHead className="w-20">HCP</TableHead>
            <TableHead>Description</TableHead>
            {showDiff && <TableHead className="w-20">Diff</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, i) => (
            <TableRow
              key={i}
              className={cn(
                showDiff && entry.diffType && entry.diffType !== "SAME" && "bg-muted/30",
              )}
            >
              <TableCell className="font-mono font-medium">
                {prefix && <span className="text-muted-foreground">{formatBid(prefix)} → </span>}
                {formatBid(entry.bid)}
              </TableCell>
              <TableCell>{entry.hcp}</TableCell>
              <TableCell>{entry.description}</TableCell>
              {showDiff && (
                <TableCell>
                  {entry.diffType && <DiffBadge type={entry.diffType} />}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
