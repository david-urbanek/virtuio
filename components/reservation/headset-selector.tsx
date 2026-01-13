"use client";

// ... imports
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useReservations } from "@/context/reservationContext";
import { cn } from "@/lib/utils";
import { RectangleGoggles } from "lucide-react";

interface HeadsetSelectorProps {
  selectedIds: string[];
  onSelect: (value: string[]) => void;
}

export function HeadsetSelector({
  selectedIds,
  onSelect,
}: HeadsetSelectorProps) {
  const { headsets } = useReservations();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-foreground">
        1. Vyberte si headset
      </h2>
      <ToggleGroup
        type="multiple"
        value={selectedIds}
        onValueChange={onSelect}
        className="flex flex-col gap-4 w-full"
      >
        {headsets.map((headset) => (
          <ToggleGroupItem
            key={headset.id}
            value={headset.id}
            className={cn(
              "h-auto flex-col items-start p-4 gap-2 rounded-xl border-2 border-transparent bg-muted/50 data-[state=on]:border-primary data-[state=on]:bg-primary/10 transition-all hover:bg-muted text-left w-full",
              selectedIds.includes(headset.id) && "border-primary bg-primary/10"
            )}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background shrink-0">
                <RectangleGoggles className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground truncate">
                  {headset.name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  Profesionální VR set
                </div>
              </div>
              <div className="font-mono text-sm font-bold text-primary shrink-0">
                {headset.daily_rate} Kč/den
              </div>
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
