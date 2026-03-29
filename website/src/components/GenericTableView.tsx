import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
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

export function GenericTableView({ title, headers, rows }: Props) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((h, i) => (
              <TableHead key={i}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
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
