"use client";

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
        // If range includes disabled dates, only allow the start date or reset depending on UX preference.
        // Here we'll just set the 'from' date (if it's not disabled) or nothing.
        // Actually simpler: if the start date isn't disabled, just keep the start date.
        // Or if the user clicked a 'to' date that makes a range crossing disabled, we can reject the 'to' part.

        // Scenario: User clicked From (valid) then To (valid), but there's a disabled date in middle.
        // logic: reject the selection and keep only the 'from' part if it was valid, or just the new clicked date?
        // react-day-picker passes the *new* range.

        // Let's try to just keep the 'from' date if the 'to' date creates an invalid range.
        if (!isDateDisabled(range.from)) {
          setDate({ from: range.to, to: undefined }); // Reset to the newly clicked date as start
        }
        return;
      }
    }

    setDate(range);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h2 className="text-xl font-semibold text-foreground">2. Select Dates</h2>
      <div className="p-4 border rounded-xl bg-card shadow-sm w-fit max-w-full overflow-x-auto">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleSelect}
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
        <span>Available</span>
        <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200 ml-4" />
        <span>Booked</span>
      </div>
    </div>
  );
}
