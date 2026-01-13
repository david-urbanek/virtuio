"use client";

import { cs } from "date-fns/locale";
import { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  className?: string;
}

export function AvailabilityCalendar({
  date,
  setDate,
  className,
}: AvailabilityCalendarProps) {
  // Simulate some reserved dates (e.g., next 2 days from now are booked)
  // In a real app, this would come from props or a query based on selected headsets
  const bookedDates = [
    new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000), // Tomorrow
    new Date(new Date().setHours(0, 0, 0, 0) + 48 * 60 * 60 * 1000), // Day after tomorrow
    new Date(new Date().setHours(0, 0, 0, 0) + 96 * 60 * 60 * 1000), // Day after tomorrow
  ];

  const isDateDisabled = (date: Date) => {
    // Disable past dates
    if (date < new Date(new Date().setHours(0, 0, 0, 0))) return true;
    // Disable specific booked dates
    return bookedDates.some(
      (booked) => booked.toDateString() === date.toDateString()
    );
  };

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      // Check if any date in the range is disabled
      let currentDate = new Date(range.from);
      const endDate = range.to;
      let hasDisabled = false;

      while (currentDate <= endDate) {
        if (isDateDisabled(currentDate)) {
          hasDisabled = true;
          break;
        }
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }

      if (hasDisabled) {
        // If range includes disabled dates, reject the range.
        // If the user tried to select a range over a disabled date, we reset the selection.
        // We set the "newly clicked" end date as the new start date to allow "re-starting" the selection elsewhere.
        if (!isDateDisabled(range.from)) {
          // If the start date was valid but the range is invalid, we assume the user clicked a 'To' date that spans over disabled.
          // We reset 'From' to be that new 'To' date (if valid) to let them start a new range there,
          // OR we just keep the original 'From' and ignore the 'To'.
          // User UX preference: usually if I click "From A" then "To B" and it's invalid, it might be better to just select "B" as new "From".
          // But here let's stick to the previous safe logic which was essentially resetting.

          // However, for the specific request: "click twice on same day => select one day".
          // If ranges are same, verify it's not disabled (already done by loop).
          // If valid single day, it falls through to setDate(range) below.

          setDate({ from: range.to, to: undefined });
        }
        return;
      }
    } else if (range?.from && !range?.to) {
      // Single date selected (first click or explicit single).
      // If the user clicked the *same* date again that was already 'from', react-day-picker might send { from: undefined } or { from: date, to: date }.
      // If it sends { from: date, to: date }, it goes into the block above.
      // If it sends undefined (toggle off behavior), we might want to prevent unselecting if we want to enforce selection?
      // But usually unselecting is fine.
    }

    // Explicitly handle the 'same day' selection if passed as { from: X, to: X }
    // The loop above handles it correctly ( runs once for X, checks if disabled).
    // If valid, it falls here.

    setDate(range);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h2 className="text-xl font-semibold text-foreground">
        2. Vyberte termín
      </h2>
      <div className="p-4 border rounded-xl bg-card shadow-sm w-fit max-w-full overflow-x-auto">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleSelect}
          locale={cs}
          numberOfMonths={2}
          disabled={[
            { before: new Date(new Date().setHours(0, 0, 0, 0)) },
            ...bookedDates,
          ]}
          className="rounded-md border-0"
          modifiers={{
            available: (date) => !isDateDisabled(date),
          }}
          modifiersClassNames={{
            disabled: "bg-red-100 text-red-900 opacity-100 hover:bg-red-100",
            available: "bg-green-50 text-green-900 hover:bg-green-100",
          }}
        />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-3 h-3 rounded-full bg-green-100 border border-green-200" />
        <span>Dostupné</span>
        <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200 ml-4" />
        <span>Obsazené</span>
      </div>
    </div>
  );
}
