import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function CopyField({ value, label, masked = false }: { value: string; label?: string; masked?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copié");
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="space-y-1.5">
      {label ? <div className="text-xs font-medium text-muted-foreground">{label}</div> : null}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-1 rounded-md border bg-muted/40 pl-3">
        <code className="min-w-0 truncate font-mono text-sm">{masked ? "•".repeat(24) : value}</code>
        <Button type="button" variant="ghost" size="icon" onClick={copy} aria-label="Copier">
          {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
