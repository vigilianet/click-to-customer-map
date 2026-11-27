import type { ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "./empty-state";

export type Column<T> = { key: string; header: string; cell: (row: T) => ReactNode; className?: string };

export function DataTable<T>({
  columns, rows, loading, empty = "Aucune donnée", rowKey,
}: { columns: Column<T>[]; rows: T[]; loading?: boolean; empty?: string; rowKey: (row: T) => string }) {
  if (!loading && rows.length === 0) return <EmptyState title={empty} />;
  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.key} className={c.className}>{c.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((c) => (
                    <TableCell key={c.key}><Skeleton className="h-4 w-full max-w-32" /></TableCell>
                  ))}
                </TableRow>
              ))
            : rows.map((r) => (
                <TableRow key={rowKey(r)}>
                  {columns.map((c) => (
                    <TableCell key={c.key} className={c.className}>{c.cell(r)}</TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
