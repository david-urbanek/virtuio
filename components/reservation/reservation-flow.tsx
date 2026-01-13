"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { AvailabilityCalendar } from "./availability-calendar";
import { HeadsetSelector } from "./headset-selector";
import { OrderSummary } from "./order-summary";

// ... component start
export function ReservationFlow() {
  const [headsets, setHeadsets] = React.useState<string[]>(["meta-quest-3"]);
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <div className="container mx-auto py-10 px-4 max-w-[1400px]">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-left">
        Vytvořit rezervaci
      </h1>
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Part: Headset Selector (Always visible) */}
        <div className="lg:col-span-3 space-y-8 w-full">
          <HeadsetSelector selectedIds={headsets} onSelect={setHeadsets} />
        </div>

        {/* Middle Part: Calendar (Visible only after headset selection) */}
        <div className="lg:col-span-5 space-y-8 flex justify-center lg:block w-full">
          {headsets.length > 0 && (
            <BlurFade
              delay={0.25}
              inView
              className="w-full max-w-full overflow-hidden"
            >
              <AvailabilityCalendar
                date={date}
                setDate={setDate}
                className="w-full"
              />
            </BlurFade>
          )}
        </div>

        {/* Right Part: Summary (Visible after headset selection, stays updated) */}
        <div className="lg:col-span-4 space-y-8 w-full">
          {headsets.length > 0 && (
            <BlurFade delay={0.4} inView className="w-full">
              <OrderSummary selectedHeadsets={headsets} date={date} />
            </BlurFade>
          )}
        </div>
      </div>
    </div>
  );
}
