import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function StatCard({
  label, value, delta, icon: Icon, loading,
}: { label: string; value: string | number; delta?: number; icon?: LucideIcon; loading?: boolean }) {
  return (
    <Card className="gap-0 p-5">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="truncate">{label}</span>
        {Icon ? <Icon className="size-4 shrink-0" /> : null}
      </div>
      {loading ? (
        <Skeleton className="mt-3 h-8 w-20" />
      ) : (
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-semibold tabular-nums tracking-tight">{value}</span>
          {delta !== undefined ? (
            <span className={cn("text-xs font-medium tabular-nums", delta >= 0 ? "text-success" : "text-destructive")}>
              {delta >= 0 ? "+" : ""}{delta.toFixed(1)}%
            </span>
          ) : null}
        </div>
      )}
    </Card>
  );
}
