import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  dateRange?: string; // Optional: e.g. "Jan 12 - Jan 15"
}

interface OrderSummaryProps {
  items: OrderItem[];
  totalPrice: number;
  currency?: string;
}

export function OrderSummary({
  items,
  totalPrice,
  currency = "CZK",
}: OrderSummaryProps) {
  return (
    <Card className="h-full border-border/50 shadow-sm overflow-hidden bg-card">
      <CardHeader className="bg-muted/30 pb-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </div>
        <CardDescription>Review your items before payment</CardDescription>
      </CardHeader>

      <CardContent className="p-6 gap-4 grid">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start text-sm"
            >
              <div className="grid gap-1">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <span>Quantity: {item.quantity}</span>
                  {item.dateRange && (
                    <>
                      <span>/</span>
                      <span>{item.dateRange}</span>
                    </>
                  )}
                </div>
              </div>
              <span className="font-semibold tabular-nums">
                {(item.price * item.quantity).toLocaleString("cs-CZ", {
                  style: "currency",
                  currency,
                })}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between items-center font-medium">
          <span>Total</span>
          <span className="text-xl font-bold text-primary tabular-nums">
            {totalPrice.toLocaleString("cs-CZ", {
              style: "currency",
              currency,
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
