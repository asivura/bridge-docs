import { TableCell, TableRow } from "@/components/ui/table";
import { DiffBadge } from "./DiffBadge";
import { cn } from "@/lib/utils";

interface ComparisonRowProps {
  bid: string;
  ourHcp: string;
  ourDesc: string;
  saycHcp: string;
  saycDesc: string;
  diffType: "HCP" | "DESC" | "BOTH" | "SAME" | "NEW";
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

export function ComparisonRow({
  bid,
  ourHcp,
  ourDesc,
  saycHcp,
  saycDesc,
  diffType,
}: ComparisonRowProps) {
  const hasDiff = diffType !== "SAME";

  return (
    <TableRow className={cn(hasDiff && "bg-muted/30")}>
      <TableCell className="font-mono font-medium">{formatBid(bid)}</TableCell>
      <TableCell className={cn(hasDiff && (diffType === "HCP" || diffType === "BOTH") && "font-semibold")}>
        {ourHcp}
      </TableCell>
      <TableCell className={cn(hasDiff && (diffType === "DESC" || diffType === "BOTH") && "font-semibold")}>
        {ourDesc}
      </TableCell>
      <TableCell>{saycHcp}</TableCell>
      <TableCell>{saycDesc}</TableCell>
      <TableCell>
        <DiffBadge type={diffType} />
      </TableCell>
    </TableRow>
  );
}
