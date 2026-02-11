"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { ReservationForm } from "./reservation-form";

interface CheckoutSheetProps {
  selectedHeadsets: string[];
  date: DateRange | undefined;
  totalPrice: number;
  headsetNames: Record<string, string>;
  headsetPrices: Record<string, number>;
  days: number;
  deliveryDate: Date | null;
  pickupDate: Date | undefined;
  disabled?: boolean;
}

export function CheckoutSheet(props: CheckoutSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="w-full text-lg py-6 shadow-md hover:shadow-xl transition-all"
          size="lg"
          disabled={props.disabled}
        >
          Finalize Reservation
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto sm:max-w-lg p-8">
        <SheetHeader>
          <SheetTitle>Complete Your Reservation</SheetTitle>
          <SheetDescription>
            Enter your details to finalize the booking.
          </SheetDescription>
        </SheetHeader>

        <ReservationForm
          {...props}
          onSuccess={() => {
            setTimeout(() => {
              setOpen(false);
            }, 5000);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
