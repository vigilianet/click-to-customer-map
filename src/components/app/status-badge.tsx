import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "neutral" | "primary";
const tones: Record<Tone, string> = {
  success: "bg-success/12 text-success",
  warning: "bg-warning/15 text-warning-foreground dark:text-warning",
  danger: "bg-destructive/12 text-destructive",
  neutral: "bg-muted text-muted-foreground",
  primary: "bg-primary/12 text-primary",
};

export function StatusBadge({ tone = "neutral", children, dot = true }: { tone?: Tone; children: React.ReactNode; dot?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium", tones[tone])}>
      {dot ? <span className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
