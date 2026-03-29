import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type DiffType = "HCP" | "DESC" | "BOTH" | "SAME" | "NEW";

interface DiffBadgeProps {
  type: DiffType;
  className?: string;
}

const config: Record<DiffType, { label: string; variant: "destructive" | "outline" | "secondary" | "default" }> = {
  HCP: { label: "HCP", variant: "destructive" },
  DESC: { label: "DESC", variant: "outline" },
  BOTH: { label: "BOTH", variant: "destructive" },
  SAME: { label: "Same", variant: "secondary" },
  NEW: { label: "New", variant: "default" },
};

export function DiffBadge({ type, className }: DiffBadgeProps) {
  const { label, variant } = config[type];
  return (
    <Badge
      variant={variant}
      className={cn(
        type === "DESC" && "border-amber-500 text-amber-700",
        type === "NEW" && "bg-blue-600 text-white",
        className,
      )}
    >
      {label}
    </Badge>
  );
}
