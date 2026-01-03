"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { differenceInDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

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
  const isComplete = selectedHeadsets.length > 0 && date?.from && date?.to;

  const days =
    date?.from && date?.to
      ? differenceInDays(date.to, date.from) + 1 // Inclusive
      : 0;

  const totalPricePerDay = selectedHeadsets.reduce(
    (sum, id) => sum + (HEADSET_PRICES[id] || 0),
    0
  );
  const total = days * totalPricePerDay;

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

          <Separator />

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
                  {date?.to ? format(date.to, "PPP") : "-"}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>Duration:</span>
                <span>{days > 0 ? `${days} days` : "-"}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Total Section */}
          <div className="flex justify-between items-end pt-2">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-3xl font-bold text-primary">${total}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full text-lg py-6 shadow-md hover:shadow-xl transition-all"
            size="lg"
            disabled={!isComplete}
          >
            Confirm Reservation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
