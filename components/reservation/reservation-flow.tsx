"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { AvailabilityCalendar } from "./availability-calendar";
import { HeadsetSelector } from "./headset-selector";
import { OrderSummary } from "./order-summary";

export function ReservationFlow() {
  const [headsets, setHeadsets] = React.useState<string[]>([]);
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <div className="container mx-auto py-10 px-4 max-w-[1600px]">
      <div className="flex flex-col xl:grid xl:grid-cols-12 gap-8 xl:gap-12">
        {/* Left Part: Headset Selector (Always visible) */}
        <div className="xl:col-span-3 space-y-8">
          <HeadsetSelector selectedIds={headsets} onSelect={setHeadsets} />
        </div>

        {/* Middle Part: Calendar (Visible only after headset selection) */}
        <div className="xl:col-span-6 space-y-8 flex justify-center xl:block">
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
        <div className="xl:col-span-3 space-y-8">
          {headsets.length > 0 && (
            <BlurFade delay={0.4} inView className="h-full">
              <OrderSummary selectedHeadsets={headsets} date={date} />
            </BlurFade>
          )}
        </div>
      </div>
    </div>
  );
}
