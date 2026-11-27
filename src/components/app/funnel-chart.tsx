export type FunnelStep = { label: string; value: number };

export function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  const max = Math.max(1, ...steps.map((s) => s.value));
  return (
    <div className="space-y-3">
      {steps.map((s, i) => {
        const prev = i > 0 ? steps[i - 1]?.value ?? 0 : 0;
        const rate = i > 0 && prev > 0 ? (s.value / prev) * 100 : null;
        return (
          <div key={s.label} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="min-w-0 truncate text-muted-foreground">{s.label}</span>
              <span className="shrink-0 tabular-nums">
                <span className="font-medium">{s.value.toLocaleString("fr-FR")}</span>
                {rate !== null ? <span className="ml-2 text-xs text-muted-foreground">{rate.toFixed(1)}%</span> : null}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(s.value / max) * 100}%`, opacity: 1 - i * 0.12 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
