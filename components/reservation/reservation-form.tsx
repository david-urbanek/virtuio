"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createOrderAction } from "@/lib/reservation/action";
import { format } from "date-fns";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { useFormStatus } from "react-dom";

interface ReservationFormProps {
  selectedHeadsets: string[];
  date: DateRange | undefined;
  totalPrice: number;
  headsetNames: Record<string, string>;
  headsetPrices: Record<string, number>;
  days: number;
  deliveryDate: Date | null;
  pickupDate: Date | undefined;
  onSuccess?: () => void;
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

export function ReservationForm({
  selectedHeadsets,
  date,
  totalPrice,
  headsetNames,
  headsetPrices,
  days,
  deliveryDate,
  pickupDate,
  onSuccess,
}: ReservationFormProps) {
  const [state, formAction] = useActionState(createOrderAction, {
    success: false,
    message: "",
    errors: {},
    fields: {},
  });

  useEffect(() => {
    if (state.success) {
      if (onSuccess) onSuccess();
    }
  }, [state.success, onSuccess]);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10 space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h2 className="text-2xl font-bold text-center">Order Confirmed!</h2>
        <p className="text-center text-muted-foreground">
          Thank you for your reservation. We will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* GLOBAL ALERT (Top Right) */}
      {state.message &&
        !state.success &&
        Object.keys(state.errors || {}).length === 0 && (
          <div className="fixed top-4 right-4 z-[100] w-full max-w-sm animate-in fade-in slide-in-from-top-5">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4 text-white" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          </div>
        )}

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
              <Label
                htmlFor="firstName"
                className={state.errors?.firstName ? "text-destructive" : ""}
              >
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                defaultValue={state.fields?.firstName}
                className={state.errors?.firstName ? "border-destructive" : ""}
              />
              {state.errors?.firstName && (
                <p className="text-[10px] text-destructive font-medium">
                  {state.errors.firstName[0]}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="lastName"
                className={state.errors?.lastName ? "text-destructive" : ""}
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                defaultValue={state.fields?.lastName}
                className={state.errors?.lastName ? "border-destructive" : ""}
              />
              {state.errors?.lastName && (
                <p className="text-[10px] text-destructive font-medium">
                  {state.errors.lastName[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className={state.errors?.email ? "text-destructive" : ""}
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              defaultValue={state.fields?.email}
              className={state.errors?.email ? "border-destructive" : ""}
            />
            {state.errors?.email && (
              <p className="text-[10px] text-destructive font-medium">
                {state.errors.email[0]}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="phone"
              className={state.errors?.phone ? "text-destructive" : ""}
            >
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 234 567 890"
              defaultValue={state.fields?.phone}
              className={state.errors?.phone ? "border-destructive" : ""}
            />
            {state.errors?.phone && (
              <p className="text-[10px] text-destructive font-medium">
                {state.errors.phone[0]}
              </p>
            )}
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
              defaultValue="Brno"
            >
              <option value="Brno">Brno</option>
            </select>
            <p className="text-[10px] text-muted-foreground">
              Currently we only deliver to Brno.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2 col-span-2">
              <Label
                htmlFor="street"
                className={state.errors?.street ? "text-destructive" : ""}
              >
                Street
              </Label>
              <Input
                id="street"
                name="street"
                placeholder="Main St"
                defaultValue={state.fields?.street}
                className={state.errors?.street ? "border-destructive" : ""}
              />
              {state.errors?.street && (
                <p className="text-[10px] text-destructive font-medium">
                  {state.errors.street[0]}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="houseNumber"
                className={state.errors?.houseNumber ? "text-destructive" : ""}
              >
                No.
              </Label>
              <Input
                id="houseNumber"
                name="houseNumber"
                placeholder="123"
                defaultValue={state.fields?.houseNumber}
                className={
                  state.errors?.houseNumber ? "border-destructive" : ""
                }
              />
              {state.errors?.houseNumber && (
                <p className="text-[10px] text-destructive font-medium">
                  {state.errors.houseNumber[0]}
                </p>
              )}
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

        <div className="mt-4 space-y-3">
          <SubmitButton />

          <Button
            type="button"
            variant="outline"
            className="w-full dashed border-muted-foreground/50"
            onClick={async () => {
              const formData = new FormData();
              formData.append("firstName", "Jan");
              formData.append("lastName", "Testovač");
              formData.append("email", "jan.testovac@example.com");
              formData.append("phone", "+420777888999");
              formData.append("street", "Testovací Ulice");
              formData.append("houseNumber", "123/A");
              formData.append("city", "Brno");
              // Mocking Headset ID 1 (ensure this exists in your DB or use a valid ID)
              // The action expects numbers now!
              formData.append("headsetIds", JSON.stringify([1]));

              const now = new Date();
              const nextDay = new Date(now);
              nextDay.setDate(now.getDate() + 1);

              formData.append("fromDate", now.toISOString());
              formData.append("toDate", nextDay.toISOString());

              // Trigger the action directly
              formAction(formData);
            }}
          >
            🧪 Test Submit (Mock Data)
          </Button>
        </div>
      </form>
    </>
  );
}
