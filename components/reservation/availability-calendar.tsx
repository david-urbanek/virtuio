"use client";

import { useReservations } from "@/context/reservationContext";
import { eachDayOfInterval, isSameDay } from "date-fns";
import { cs } from "date-fns/locale";
import { useMemo } from "react";
import { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  selectedHeadsets: string[];
  className?: string;
}

export function AvailabilityCalendar({
  date,
  setDate,
  selectedHeadsets,
  className,
}: AvailabilityCalendarProps) {
  const { reservations } = useReservations();

  const bookedDates = useMemo(() => {
    // 1. Filtr rezervací pro vybrané headsety
    // Pokud je vybráno více headsetů, termín je obsazený, pokud je ALESPOŇ JEDEN z nich nedostupný?
    // Nebo pokud hledám termín pro 2 brýle, potřebuji, aby OBA byly volné.
    // Logika: Chci rezervovat [A, B].
    // Pokud A je reserved Po-Út a B je reserved St-Čt.
    // Pak Po-Út nemůžu (nemám A), St-Čt nemůžu (nemám B).
    // Takže bereme sjednocení všech obsazených termínů pro vybrané headsety.

    const relevantReservations = reservations.filter((r) =>
      selectedHeadsets.includes(r.headset_id)
    );

    const dates = relevantReservations.flatMap((reservation) => {
      const start = new Date(reservation.start_time);
      const end = new Date(reservation.end_time);
      // Ošetření nevalidních dat
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
        return [];
      }
      return eachDayOfInterval({ start, end });
    });

    return dates;
  }, [reservations, selectedHeadsets]);

  const isDateDisabled = (date: Date) => {
    // Disable past dates
    if (date < new Date(new Date().setHours(0, 0, 0, 0))) return true;
    // Disable specific booked dates
    return bookedDates.some((booked) => isSameDay(booked, date));
  };

  const handleSelect = (range: DateRange | undefined, selectedDay: Date) => {
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
        // Pokud rozsah obsahuje blokované dny (např. chci propojit 14. a 28., ale mezi tím je obsazeno),
        // považujeme to za neplatný rozsah.
        // Místo toho, abychom to celé zahodili, začneme novou rezervaci od dne, na který uživatel PŘÁVĚ KLIKNUL.
        if (!isDateDisabled(selectedDay)) {
          setDate({ from: selectedDay, to: selectedDay });
        }
        return;
      }
    } else if (range?.from && !range?.to) {
      // Single date selected
    }

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
            { before: new Date(new Date().setDate(new Date().getDate() + 2)) },
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
