import { CalendarIcon } from "lucide-react";
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const presets = [
  { label: "7 j", days: 7 },
  { label: "30 j", days: 30 },
  { label: "90 j", days: 90 },
];

export function DateRangePicker({ value, onChange }: { value: DateRange; onChange: (r: DateRange) => void }) {
  const label = value.from
    ? `${format(value.from, "d MMM", { locale: fr })}${value.to ? ` – ${format(value.to, "d MMM", { locale: fr })}` : ""}`
    : "Période";
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarIcon className="size-4" />
          <span className="tabular-nums">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        <div className="flex gap-1 border-b p-2">
          {presets.map((p) => (
            <Button key={p.days} variant="ghost" size="sm" onClick={() => onChange({ from: subDays(new Date(), p.days - 1), to: new Date() })}>
              {p.label}
            </Button>
          ))}
        </div>
        <Calendar mode="range" locale={fr} selected={value} onSelect={(r) => r && onChange(r)} numberOfMonths={1} />
      </PopoverContent>
    </Popover>
  );
}
