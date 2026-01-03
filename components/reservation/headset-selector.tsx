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
        1. Choose your Headset
      </h2>
      <ToggleGroup
        type="multiple"
        value={selectedIds}
        onValueChange={onSelect}
        className="flex flex-wrap gap-4 justify-start"
      >
        <ToggleGroupItem
          value="meta-quest-3"
          className={cn(
            "h-auto flex-col items-start p-6 gap-2 rounded-xl border-2 border-transparent bg-muted/50 data-[state=on]:border-primary data-[state=on]:bg-primary/10 transition-all hover:bg-muted text-left w-full sm:w-[calc(50%-8px)] lg:w-full min-w-[200px]",
            selectedIds.includes("meta-quest-3") &&
              "border-primary bg-primary/10"
          )}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background mb-2">
            <Monitor className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <div className="font-semibold text-lg text-foreground">
              Meta Quest 3
            </div>
            <div className="text-sm text-muted-foreground">
              The ultimate experience
            </div>
          </div>
          <div className="mt-2 font-mono text-sm font-bold text-primary">
            $50/day
          </div>
        </ToggleGroupItem>

        <ToggleGroupItem
          value="meta-quest-3s"
          className={cn(
            "h-auto flex-col items-start p-6 gap-2 rounded-xl border-2 border-transparent bg-muted/50 data-[state=on]:border-primary data-[state=on]:bg-primary/10 transition-all hover:bg-muted text-left w-full sm:w-[calc(50%-8px)] lg:w-full min-w-[200px]",
            selectedIds.includes("meta-quest-3s") &&
              "border-primary bg-primary/10"
          )}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background mb-2">
            <Smartphone className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <div className="font-semibold text-lg text-foreground">
              Meta Quest 3S
            </div>
            <div className="text-sm text-muted-foreground">
              Lightweight & powerful
            </div>
          </div>
          <div className="mt-2 font-mono text-sm font-bold text-primary">
            $40/day
          </div>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
