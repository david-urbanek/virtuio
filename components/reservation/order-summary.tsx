// ... imports
import { CheckoutSheet } from "@/components/reservation/reservation-sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { differenceInDays, format, subDays } from "date-fns";
import { cs } from "date-fns/locale";
import { Info } from "lucide-react";
import { DateRange } from "react-day-picker";

// ... imports
import { useReservations } from "@/context/reservationContext";
// ... imports

interface OrderSummaryProps {
  selectedHeadset: string | undefined;
  date: DateRange | undefined;
}

import { Separator } from "@/components/ui/separator";
import { Truck } from "lucide-react";

export function OrderSummary({
  selectedHeadsets,
  date,
}: {
  selectedHeadsets: string[];
  date: DateRange | undefined;
}) {
  const { headsets } = useReservations();

  const headsetNames = headsets.reduce(
    (acc, h) => ({ ...acc, [h.id]: h.name }),
    {} as Record<string, string>
  );
  const headsetPrices = headsets.reduce(
    (acc, h) => ({ ...acc, [h.id]: h.daily_rate }),
    {} as Record<string, number>
  );

  const isComplete = selectedHeadsets.length > 0 && !!date?.from && !!date?.to;

  function countDays() {
    if (!date?.from || !date?.to) return 0;
    if (differenceInDays(date.to, date.from) === 0) return 1;
    if (differenceInDays(date.to, date.from) === 1) return 2;
    return differenceInDays(date.to, date.from) + 1;
  }

  const days = countDays();

  const totalPricePerDay = selectedHeadsets.reduce(
    (sum, id) => sum + (headsetPrices[id] || 0),
    0
  );
  const total = days * totalPricePerDay;

  console.log(days);

  const deliveryDate = date?.from ? subDays(date.from, 1) : null;
  const pickupDate = date?.to || date?.from;

  console.log(date);

  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-xl font-semibold text-foreground">3. Souhrn</h2>
      <Card className="flex flex-col h-full shadow-lg border-2 overflow-hidden">
        <CardContent className="flex-1 p-6 space-y-6">
          {/* Headset Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Vybavení
            </h3>
            {selectedHeadsets.length > 0 ? (
              <div className="flex flex-col gap-3">
                {selectedHeadsets.map((id) => (
                  <div
                    key={id}
                    className="flex justify-between items-center text-sm group"
                  >
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {headsetNames[id]}
                    </span>
                    <span className="font-mono">
                      {headsetPrices[id]}{" "}
                      <span className="text-muted-foreground text-xs font-sans">
                        Kč/den
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground italic">
                Zatím nevybráno
              </span>
            )}
          </div>

          <Separator />

          {/* Date Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Termín
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Od</span>
                <div className="font-medium text-sm">
                  {date?.from
                    ? format(date.from, "d. MMMM yyyy", { locale: cs })
                    : "-"}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Do</span>
                <div className="font-medium text-sm">
                  {date?.to
                    ? format(date.to, "d. MMMM yyyy", { locale: cs })
                    : date?.from
                    ? format(date.from, "d. MMMM yyyy", { locale: cs })
                    : "-"}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm pt-1">
              <span className="text-muted-foreground">Délka zápůjčky</span>
              <Badge variant="secondary" className="font-normal">
                {days > 0 ? `${days} dní` : "-"}
              </Badge>
            </div>
          </div>

          {/* Delivery Note */}
          {deliveryDate && pickupDate && (
            <div className="bg-primary/5 rounded-lg border border-primary/10 p-4 space-y-3 mt-2">
              <div className="flex gap-3 text-sm">
                <Truck className="w-5 h-5 text-primary shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground text-xs uppercase tracking-wide opacity-70 mb-0.5">
                      Doručení
                    </span>
                    <span className="text-foreground">
                      {format(deliveryDate, "d. MMMM", { locale: cs })}{" "}
                      <span className="text-muted-foreground">v 18:00</span>
                    </span>
                  </div>
                  <Separator className="bg-primary/10" />
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground text-xs uppercase tracking-wide opacity-70 mb-0.5">
                      Vyzvednutí
                    </span>
                    <span className="text-foreground">
                      {format(pickupDate, "d. MMMM", { locale: cs })}{" "}
                      <span className="text-muted-foreground">v 18:00</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-xs text-muted-foreground items-start pl-8">
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <p>Doručujeme o den dříve pro vaše pohodlí (zdarma).</p>
              </div>
            </div>
          )}
        </CardContent>

        {/* Footer Area */}
        <div className="bg-muted/30 p-6 border-t mt-auto">
          <div className="flex justify-between items-end mb-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium">
                Celková cena
              </span>
              <span className="text-xs text-muted-foreground/60">
                včetně DPH a dopravy
              </span>
            </div>
            <span className="text-4xl font-bold text-primary tracking-tight">
              {total.toLocaleString("cs-CZ")} Kč
            </span>
          </div>
          <CheckoutSheet
            selectedHeadsets={selectedHeadsets}
            date={date}
            totalPrice={total}
            headsetNames={headsetNames}
            headsetPrices={headsetPrices}
            days={days}
            deliveryDate={deliveryDate}
            pickupDate={pickupDate}
            disabled={!isComplete}
          />
        </div>
      </Card>
    </div>
  );
}
