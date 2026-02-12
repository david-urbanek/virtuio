// ... imports
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createOrderAction } from "@/lib/reservation/action";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { Info } from "lucide-react";
import { useActionState, useEffect } from "react";

// ... imports
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useReservations } from "@/context/reservationContext";
import { subDays } from "date-fns";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface ReservationFormProps {
  totalPrice: number;
  days: number;
  onSuccess?: () => void;
}

// ... imports
// ... imports

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" size="lg" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Zpracovávám...
        </>
      ) : (
        "Objednat"
      )}
    </Button>
  );
}
// ... SubmitButton

export function ReservationForm({
  totalPrice,
  days,
  onSuccess,
}: ReservationFormProps) {
  const {
    headsets,
    selectedHeadsets,
    date,
    formData,
    updateFormField,
    resetAll,
  } = useReservations();

  const headsetNames = headsets.reduce(
    (acc, h) => ({ ...acc, [h.id]: h.name }),
    {} as Record<string, string>,
  );
  const headsetPrices = headsets.reduce(
    (acc, h) => ({ ...acc, [h.id]: h.daily_rate }),
    {} as Record<string, number>,
  );

  const deliveryDate = date?.from ? subDays(date.from, 1) : null;
  const pickupDate = date?.to || date?.from;

  const [state, formAction] = useActionState(createOrderAction, {
    success: false,
    message: "",
    errors: {},
    fields: {},
  });

  // ... inside ReservationForm
  useEffect(() => {
    if (state.success) {
      if (onSuccess) onSuccess();
      resetAll(); // Reset context state on global success
    }
  }, [state.success, onSuccess, resetAll]);

  console.log(state);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10 space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h2 className="text-2xl font-bold text-center">
          Objednávka potvrzena!
        </h2>
        <p className="text-center text-muted-foreground">
          Děkujeme za vaši rezervaci. Brzy vás budeme kontaktovat.
        </p>
      </div>
    );
  }

  // ... after success check
  return (
    <>
      {/* GLOBAL ALERT (Top Right) */}
      {state.message && !state.success && (
        <div className="fixed top-4 right-4 z-[100] w-full max-w-sm animate-in fade-in slide-in-from-top-5">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4 text-white" />
            <AlertTitle>Chyba</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        </div>
      )}

      <form
        action={formAction}
        className="grid gap-6 py-6"
        id="reservation-form"
      >
        {/* Hidden inputs to pass context data to Server Action */}
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
            Kontaktní údaje
          </h3>
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="firstName"
                className={state.errors?.firstName ? "text-destructive" : ""}
              >
                Jméno
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Jan"
                value={formData.firstName || ""}
                onChange={(e) => updateFormField("firstName", e.target.value)}
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
                Příjmení
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Novák"
                value={formData.lastName || ""}
                onChange={(e) => updateFormField("lastName", e.target.value)}
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
              placeholder="jan.novak@example.com"
              value={formData.email || ""}
              onChange={(e) => updateFormField("email", e.target.value)}
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
              Telefon
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+420 123 456 789"
              value={formData.phone || ""}
              onChange={(e) => updateFormField("phone", e.target.value)}
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
            Doručovací adresa
          </h3>
          <div className="grid gap-2">
            <Label htmlFor="city">Město</Label>
            <select
              id="city"
              name="city"
              value={formData.city || "Brno"}
              onChange={(e) => updateFormField("city", e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Brno">Brno</option>
            </select>
            <p className="text-[10px] text-muted-foreground">
              Aktuálně doručujeme pouze po Brně.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="grid gap-2 sm:col-span-2">
              <Label
                htmlFor="street"
                className={state.errors?.street ? "text-destructive" : ""}
              >
                Ulice
              </Label>
              <Input
                id="street"
                name="street"
                placeholder="Hlavní"
                value={formData.street || ""}
                onChange={(e) => updateFormField("street", e.target.value)}
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
                Č.p.
              </Label>
              <Input
                id="houseNumber"
                name="houseNumber"
                placeholder="123"
                value={formData.houseNumber || ""}
                onChange={(e) => updateFormField("houseNumber", e.target.value)}
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
            Souhrn objednávky
          </h3>

          {/* Headsets */}
          <div className="space-y-2">
            {selectedHeadsets.map((id) => (
              <div
                key={id}
                className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:items-center text-sm"
              >
                <span>{headsetNames[id]}</span>
                <Badge variant="outline" className="font-mono">
                  {headsetPrices[id]} Kč/day
                </Badge>
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className="bg-muted/30 p-3 rounded-lg text-xs space-y-1 text-muted-foreground">
            <div className="flex justify-between">
              <span>Od:</span>
              <span className="font-medium text-foreground">
                {date?.from ? format(date.from, "PPP", { locale: cs }) : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Do:</span>
              <span className="font-medium text-foreground">
                {pickupDate ? format(pickupDate, "PPP", { locale: cs }) : "-"}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t mt-1">
              <span>Délka:</span>
              <span>{days} dní</span>
            </div>
          </div>

          {/* Delivery Info */}
          {deliveryDate && (
            <div className="flex gap-2 text-xs text-muted-foreground items-start">
              <Info className="w-4 h-4 text-primary shrink-0" />
              <p>
                Doručení naplánováno na{" "}
                <span className="font-medium text-foreground">
                  {format(deliveryDate, "PPP", { locale: cs })} v 18:00
                </span>
                .
              </p>
            </div>
          )}

          <Separator />

          <div className="flex flex-col gap-1 items-start sm:flex-row sm:justify-between sm:items-end">
            <span className="font-semibold">Celkem k úhradě</span>
            <span className="text-xl sm:text-2xl font-bold text-primary">
              {totalPrice} Kč
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <SubmitButton />
        </div>
      </form>
    </>
  );
}
