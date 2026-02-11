"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { useReservations } from "@/context/reservationContext";
import { AvailabilityCalendar } from "./availability-calendar";
import { HeadsetSelector } from "./headset-selector";
import { OrderSummary } from "./order-summary";

// ... component start
export function ReservationFlow() {
  // Local state is removed!
  const { selectedHeadsets } = useReservations();

  return (
    <div id="rezervace" className="container mx-auto py-10 px-4 max-w-[1400px]">
      <h2 className="tracking-tight mb-8 text-left">Vytvořit rezervaci:</h2>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Part: Headset Selector (Always visible) */}
        <div className="col-span-1 lg:col-span-3 space-y-8 w-full">
          <HeadsetSelector />
        </div>

        {/* Middle Part: Calendar (Visible only after headset selection) */}
        <div className="col-span-1 lg:col-span-5 space-y-8 flex justify-center lg:block w-full">
          {selectedHeadsets.length > 0 && (
            <BlurFade
              delay={0.25}
              inView
              className="w-full max-w-full overflow-hidden"
            >
              <AvailabilityCalendar className="w-full" />
            </BlurFade>
          )}
        </div>

        {/* Right Part: Summary (Visible after headset selection, stays updated) */}
        <div className="col-span-1 lg:col-span-4 space-y-8 w-full">
          {selectedHeadsets.length > 0 && (
            <BlurFade delay={0.4} inView className="w-full">
              <OrderSummary />
            </BlurFade>
          )}
        </div>
      </div>
    </div>
  );
}
