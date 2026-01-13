"use client";

// ... imports
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useReservations } from "@/context/reservationContext";
import { cn } from "@/lib/utils";
import { RectangleGoggles } from "lucide-react";

export function HeadsetSelector() {
  const { headsets, selectedHeadsets, selectHeadsets } = useReservations();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-foreground">
        1. Vyberte si headset
      </h2>
      <ToggleGroup
        type="multiple"
        value={selectedHeadsets}
        onValueChange={selectHeadsets}
        className="flex flex-col gap-4 w-full"
      >
        {headsets.map((headset) => (
          <ToggleGroupItem
            key={headset.id}
            value={headset.id}
            className={cn(
              "h-auto flex-col items-start p-5 gap-4 rounded-xl border-2 border-transparent bg-muted/50 data-[state=on]:border-primary data-[state=on]:bg-primary/10 transition-all hover:bg-muted text-left w-full",
              selectedHeadsets.includes(headset.id) &&
                "border-primary bg-primary/10"
            )}
          >
            <div className="grid grid-cols-[auto_1fr] items-start gap-4 w-full text-left">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background shrink-0 mt-1">
                <RectangleGoggles className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex flex-col items-start gap-3 w-full min-w-0">
                <div className="flex flex-col gap-1.5 w-full">
                  <span className="font-semibold text-foreground leading-none">
                    {headset.name}
                  </span>
                  <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    Profesionální VR set pro náročné hráče
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-primary whitespace-nowrap bg-primary/10 px-2.5 py-1 rounded-md">
                  {headset.daily_rate} Kč/den
                </span>
              </div>
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
