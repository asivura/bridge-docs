import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  tableNumber?: number;
  title: string;
  headers: string[];
  rows: { cells: string[] }[];
}

function formatCell(text: string) {
  const parts: React.ReactNode[] = [];
  let i = 0;

  while (i < text.length) {
    const char = text[i];
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

export function GenericTableView({ tableNumber, title, headers, rows }: Props) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">
        {tableNumber != null && <span className="text-muted-foreground text-base font-normal">Table {tableNumber}: </span>}
        {formatCell(title)}
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8 text-center">#</TableHead>
            {headers.map((h, i) => (
              <TableHead key={i}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="text-center text-muted-foreground text-xs">{i + 1}</TableCell>
              {row.cells.map((cell, j) => (
                <TableCell key={j}>{formatCell(cell)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
