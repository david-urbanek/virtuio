"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { differenceInDays, format, subDays } from "date-fns";
import { Info } from "lucide-react";
import { DateRange } from "react-day-picker";
import { CheckoutSheet } from "./checkout-sheet";

interface OrderSummaryProps {
  selectedHeadset: string | undefined;
  date: DateRange | undefined;
}

const HEADSET_PRICES: Record<string, number> = {
  "meta-quest-3": 50,
  "meta-quest-3s": 40,
};

const HEADSET_NAMES: Record<string, string> = {
  "meta-quest-3": "Meta Quest 3",
  "meta-quest-3s": "Meta Quest 3S",
};

export function OrderSummary({
  selectedHeadsets,
  date,
}: {
  selectedHeadsets: string[];
  date: DateRange | undefined;
}) {
  const isComplete = selectedHeadsets.length > 0 && !!date?.from;

  const days = date?.from
    ? date.to
      ? differenceInDays(date.to, date.from) + 1
      : 1
    : 0;

  const totalPricePerDay = selectedHeadsets.reduce(
    (sum, id) => sum + (HEADSET_PRICES[id] || 0),
    0
  );
  const total = days * totalPricePerDay;

  const deliveryDate = date?.from ? subDays(date.from, 1) : null;
  const pickupDate = date?.to || date?.from;

  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-xl font-semibold text-foreground">3. Overview</h2>
      <Card className="flex flex-col h-full shadow-lg border-2">
        <CardHeader className="pb-4">
          <CardTitle>Your Reservation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 space-y-6">
          {/* Headset Section */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">
              Headset
            </span>
            {selectedHeadsets.length > 0 ? (
              <div className="flex flex-col gap-2">
                {selectedHeadsets.map((id) => (
                  <div key={id} className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {HEADSET_NAMES[id]}
                    </span>
                    <Badge variant="secondary">${HEADSET_PRICES[id]}/day</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-lg font-medium">Not selected</span>
            )}
          </div>

          {/* Date Section */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">
              Dates
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span>From:</span>
                <span className="font-medium">
                  {date?.from ? format(date.from, "PPP") : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>To:</span>
                <span className="font-medium">
                  {date?.to
                    ? format(date.to, "PPP")
                    : date?.from
                    ? format(date.from, "PPP")
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>Duration:</span>
                <span>{days > 0 ? `${days} days` : "-"}</span>
              </div>
            </div>
          </div>

          {/* Delivery Note */}
          {deliveryDate && pickupDate && (
            <div className="bg-muted/50 p-3 rounded-lg text-sm flex gap-3 text-muted-foreground">
              <Info className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
              <div className="space-y-1">
                <p>
                  <span className="font-medium text-foreground">Delivery:</span>{" "}
                  We will bring the VR on{" "}
                  <span className="font-medium text-foreground">
                    {format(deliveryDate, "PPP")} at 18:00
                  </span>
                  .
                </p>
                <p>
                  <span className="font-medium text-foreground">Pickup:</span>{" "}
                  We will collect it on{" "}
                  <span className="font-medium text-foreground">
                    {format(pickupDate, "PPP")} at 18:00
                  </span>
                  .
                </p>
                <p className="text-xs pt-1 opacity-80">
                  *Delivered a day early so you get full 24 hours.
                </p>
              </div>
            </div>
          )}

          {/* Total Section */}
          <div className="flex justify-between items-end pt-2">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-3xl font-bold text-primary">${total}</span>
          </div>
        </CardContent>
        <CardFooter>
          <CheckoutSheet
            selectedHeadsets={selectedHeadsets}
            date={date}
            totalPrice={total}
            headsetNames={HEADSET_NAMES}
            headsetPrices={HEADSET_PRICES}
            days={days}
            deliveryDate={deliveryDate}
            pickupDate={pickupDate}
            disabled={!isComplete}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
