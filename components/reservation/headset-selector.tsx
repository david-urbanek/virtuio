"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Monitor, Smartphone } from "lucide-react";

interface HeadsetSelectorProps {
  selectedId: string | undefined;
  onSelect: (value: string) => void;
}

export function HeadsetSelector({
  selectedIds,
  onSelect,
}: {
  selectedIds: string[];
  onSelect: (value: string[]) => void;
}) {
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
        <ToggleGroupItem
          value="meta-quest-3"
          className={cn(
            "h-auto flex-col items-start p-4 gap-2 rounded-xl border-2 border-transparent bg-muted/50 data-[state=on]:border-primary data-[state=on]:bg-primary/10 transition-all hover:bg-muted text-left w-full",
            selectedIds.includes("meta-quest-3") &&
              "border-primary bg-primary/10"
          )}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background shrink-0">
              <Monitor className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground truncate">
                Meta Quest 3
              </div>
              <div className="text-xs text-muted-foreground truncate">
                Ultimátní zážitek
              </div>
            </div>
            <div className="font-mono text-sm font-bold text-primary shrink-0">
              500 Kč/den
            </div>
          </div>
        </ToggleGroupItem>

        <ToggleGroupItem
          value="meta-quest-3s"
          className={cn(
            "h-auto flex-col items-start p-4 gap-2 rounded-xl border-2 border-transparent bg-muted/50 data-[state=on]:border-primary data-[state=on]:bg-primary/10 transition-all hover:bg-muted text-left w-full",
            selectedIds.includes("meta-quest-3s") &&
              "border-primary bg-primary/10"
          )}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background shrink-0">
              <Smartphone className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground truncate">
                Meta Quest 3S
              </div>
              <div className="text-xs text-muted-foreground truncate">
                Lehký a výkonný
              </div>
            </div>
            <div className="font-mono text-sm font-bold text-primary shrink-0">
              400 Kč/den
            </div>
          </div>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
