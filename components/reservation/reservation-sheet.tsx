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
import { ReservationForm } from "./reservation-form";

// ... imports

interface CheckoutSheetProps {
  totalPrice: number;
  days: number;
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
          Dokončit rezervaci
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto sm:max-w-lg p-8">
        <SheetHeader className="text-left p-0">
          <SheetTitle>Dokončete svou rezervaci</SheetTitle>
          <SheetDescription>
            Zadejte své údaje pro dokončení rezervace.
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
