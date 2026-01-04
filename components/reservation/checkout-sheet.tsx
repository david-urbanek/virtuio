"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { Info } from "lucide-react";
import { DateRange } from "react-day-picker";

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

export function CheckoutSheet({
  selectedHeadsets,
  date,
  totalPrice,
  headsetNames,
  headsetPrices,
  days,
  deliveryDate,
  pickupDate,
  disabled,
}: CheckoutSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-full text-lg py-6 shadow-md hover:shadow-xl transition-all"
          size="lg"
          disabled={disabled}
        >
          Confirm Reservation
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Complete Your Reservation</SheetTitle>
          <SheetDescription>
            Enter your details to finalize the booking.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-6 py-6">
          {/* Contact Details Form */}
          <div className="grid gap-4">
            <h3 className="font-semibold text-sm text-foreground">
              Contact Information
            </h3>
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+1 234 567 890" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Input id="address" placeholder="123 VR Street, Reality City" />
            </div>
          </div>

          <Separator />

          {/* Review Order Summary */}
          <div className="grid gap-4">
            <h3 className="font-semibold text-sm text-foreground">
              Order Summary
            </h3>

            {/* Headsets */}
            <div className="space-y-2">
              {selectedHeadsets.map((id) => (
                <div
                  key={id}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{headsetNames[id]}</span>
                  <Badge variant="outline" className="font-mono">
                    ${headsetPrices[id]}/day
                  </Badge>
                </div>
              ))}
            </div>

            {/* Dates */}
            <div className="bg-muted/30 p-3 rounded-lg text-xs space-y-1 text-muted-foreground">
              <div className="flex justify-between">
                <span>From:</span>
                <span className="font-medium text-foreground">
                  {date?.from ? format(date.from, "PPP") : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>To:</span>
                <span className="font-medium text-foreground">
                  {pickupDate ? format(pickupDate, "PPP") : "-"}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t mt-1">
                <span>Duration:</span>
                <span>{days} days</span>
              </div>
            </div>

            {/* Delivery Info */}
            {deliveryDate && (
              <div className="flex gap-2 text-xs text-muted-foreground items-start">
                <Info className="w-4 h-4 text-primary shrink-0" />
                <p>
                  Delivery scheduled for{" "}
                  <span className="font-medium text-foreground">
                    {format(deliveryDate, "PPP")} at 18:00
                  </span>
                  .
                </p>
              </div>
            )}

            <Separator />

            <div className="flex justify-between items-end">
              <span className="font-semibold">Total to Pay</span>
              <span className="text-2xl font-bold text-primary">
                ${totalPrice}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button className="w-full" size="lg">
            Place Order
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
