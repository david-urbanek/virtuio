"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { createOrderAction } from "@/lib/reservation/action";
import { format } from "date-fns";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useFormStatus } from "react-dom";

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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" size="lg" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Place Order"
      )}
    </Button>
  );
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
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(createOrderAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      // Close sheet after successful order (maybe add a delay or show success message first)
      const timer = setTimeout(() => {
        setOpen(false);
        // Redirect or clean up state here if needed
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="w-full text-lg py-6 shadow-md hover:shadow-xl transition-all"
          size="lg"
          disabled={disabled}
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

        {state.success ? (
          <div className="flex flex-col items-center justify-center h-full py-10 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h2 className="text-2xl font-bold text-center">Order Confirmed!</h2>
            <p className="text-center text-muted-foreground">
              Thank you for your reservation. We will contact you shortly.
            </p>
          </div>
        ) : (
          <form action={formAction} className="grid gap-6 py-6">
            <input
              type="hidden"
              name="headsetIds"
              value={JSON.stringify(selectedHeadsets)}
            />
            <input
              type="hidden"
              name="fromDate"
              value={date?.from?.toISOString() || ""}
            />
            <input
              type="hidden"
              name="toDate"
              value={date?.to?.toISOString() || ""}
            />

            {/* Contact Details Form */}
            <div className="grid gap-4">
              <h3 className="font-semibold text-sm text-foreground">
                Contact Information
              </h3>
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 890"
                  required
                />
              </div>

              {/* Address */}
              <h3 className="font-semibold text-sm text-foreground mt-2">
                Delivery Address
              </h3>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <select
                  id="city"
                  name="city"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  // disabled // Disabled inputs are not sent in FormData! Use readOnly or hidden input if needed.
                  // For now, let's just make it a single option select, effectively readonly.
                >
                  <option value="Brno">Brno</option>
                </select>
                <p className="text-[10px] text-muted-foreground">
                  Currently we only deliver to Brno.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    name="street"
                    placeholder="Main St"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="houseNumber">No.</Label>
                  <Input
                    id="houseNumber"
                    name="houseNumber"
                    placeholder="123"
                    required
                  />
                </div>
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

            {state.message && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <div className="mt-4">
              <SubmitButton />
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
