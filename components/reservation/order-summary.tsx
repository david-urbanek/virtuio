// ... imports
import { CheckoutSheet } from "@/components/reservation/reservation-sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { differenceInDays, format, subDays } from "date-fns";
import { cs } from "date-fns/locale";
import { Info } from "lucide-react";
import { DateRange } from "react-day-picker";

interface OrderSummaryProps {
  selectedHeadset: string | undefined;
  date: DateRange | undefined;
}

const HEADSET_PRICES: Record<string, number> = {
  "meta-quest-3": 500,
  "meta-quest-3s": 400,
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
      <h2 className="text-xl font-semibold text-foreground">3. Souhrn</h2>
      <Card className="flex flex-col h-full shadow-lg border-2">
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
                    <Badge variant="secondary">
                      {HEADSET_PRICES[id]} Kč/den
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-lg font-medium">Nevybráno</span>
            )}
          </div>

          {/* Date Section */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">
              Termín
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span>Od:</span>
                <span className="font-medium">
                  {date?.from ? format(date.from, "PPP", { locale: cs }) : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Do:</span>
                <span className="font-medium">
                  {date?.to
                    ? format(date.to, "PPP", { locale: cs })
                    : date?.from
                    ? format(date.from, "PPP", { locale: cs })
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>Délka:</span>
                <span>{days > 0 ? `${days} dní` : "-"}</span>
              </div>
            </div>
          </div>

          {/* Delivery Note */}
          {deliveryDate && pickupDate && (
            <div className="bg-muted/50 p-3 rounded-lg text-sm flex gap-3 text-muted-foreground">
              <Info className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
              <div className="space-y-1">
                <p>
                  <span className="font-medium text-foreground">Doručení:</span>{" "}
                  Brýle přivezeme{" "}
                  <span className="font-medium text-foreground">
                    {format(deliveryDate, "PPP", { locale: cs })} v 18:00
                  </span>
                  .
                </p>
                <p>
                  <span className="font-medium text-foreground">
                    Vyzvednutí:
                  </span>{" "}
                  Vyzvedneme si je{" "}
                  <span className="font-medium text-foreground">
                    {format(pickupDate, "PPP", { locale: cs })} v 18:00
                  </span>
                  .
                </p>
                <p className="text-xs pt-1 opacity-80">
                  *Doručujeme o den dříve, abyste měli k dispozici celých 24
                  hodin.
                </p>
              </div>
            </div>
          )}

          {/* Total Section */}
          <div className="flex justify-between items-end pt-2">
            <span className="text-lg font-semibold">Celkem</span>
            <span className="text-3xl font-bold text-primary">{total} Kč</span>
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
