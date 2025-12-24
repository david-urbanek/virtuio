"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { handleFormSubmission } from "@/lib/action";
import { AlertCircle, CheckCircle, ListCheck } from "lucide-react";
import Form from "next/form";
import React, { useActionState, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const initialValues = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  city: "brno",
  address: "",
  date: new Date().toISOString().split("T")[0],
  numberOfDays: 1,
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(handleFormSubmission, {
    message: "",
    success: false,
    errors: {},
  });

  const [formData, setFormData] = useState(initialValues);
  const [visible, setVisible] = useState(false);

  // Date calculation logic
  const [endDate, setEndDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  function countDate(startDate: Date, numberOfDays: number) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + numberOfDays);
    return endDate;
  }

  // Effect for date calculations
  useEffect(() => {
    const dateObj = new Date(formData.date);
    setEndDate(countDate(dateObj, formData.numberOfDays));
    setDeliveryDate(countDate(dateObj, 0));
  }, [formData.date, formData.numberOfDays]);

  // Alert visibility logic
  useEffect(() => {
    if (state.message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  // Reset form on success
  useEffect(() => {
    if (state.success) {
      setFormData(initialValues);
    }
  }, [state.success]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "numberOfDays" ? Number(value) : value,
    }));
  }

  return (
    <div className="w-full max-w-md">
      {visible &&
        createPortal(
          <div className="fixed top-4 right-4 z-[9999]">
            <Alert
              variant={state.success ? "default" : "destructive"}
              className="shadow-lg w-72 bg-white"
            >
              {state.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <div>
                <AlertTitle>
                  {state.success ? "Odesláno ✅" : "Chyba"}
                </AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </div>
            </Alert>
          </div>,
          document.body
        )}

      <Form action={formAction} noValidate>
        <FieldSet>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="name">Jméno:</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jan"
                  value={formData.name}
                  onChange={handleChange}
                />
                {state.errors?.name && (
                  <FieldError>{state.errors.name}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="surname">Přijmení:</FieldLabel>
                <Input
                  id="surname"
                  name="surname"
                  type="text"
                  placeholder="Novák"
                  value={formData.surname}
                  onChange={handleChange}
                />
                {state.errors?.surname && (
                  <FieldError>{state.errors.surname}</FieldError>
                )}
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email:</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jan.novak@email.cz"
                value={formData.email}
                onChange={handleChange}
              />
              {state.errors?.email && (
                <FieldError>{state.errors.email}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Telefon:</FieldLabel>
              <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="+420 606 980 435"
                value={formData.phone}
                onChange={handleChange}
              />
              {state.errors?.phone && (
                <FieldError>{state.errors.phone}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="city">Město:</FieldLabel>
              <FieldDescription>Zatím pouze operujeme v Brně!</FieldDescription>
              <NativeSelect
                defaultValue="brno"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                <NativeSelectOption value="brno">Brno</NativeSelectOption>
              </NativeSelect>
              {state.errors?.city && (
                <FieldError>{state.errors.city}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Adresa + Číslo popisné:</FieldLabel>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Pekařská 18"
                value={formData.address}
                onChange={handleChange}
              />
              {state.errors?.address && (
                <FieldError>{state.errors.address}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="date">Datum začátku rezervace:</FieldLabel>
              <Input
                id="date"
                name="date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={formData.date}
                onChange={handleChange}
              />
              {state.errors?.date && (
                <FieldError>{state.errors.date}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="numberOfDays">Počet dní</FieldLabel>
              <FieldDescription>
                Váš zvolený počet dní:{" "}
                <span className="font-bold text-black">
                  {formData.numberOfDays}
                </span>
              </FieldDescription>
              <Input
                id="numberOfDays"
                name="numberOfDays"
                type="range"
                placeholder="Pekařská 18"
                min={1}
                max={8}
                step={1}
                value={formData.numberOfDays}
                onChange={handleChange}
              />
              {state.errors?.numberOfDays && (
                <FieldError>{state.errors.numberOfDays}</FieldError>
              )}
            </Field>
            <FieldSeparator></FieldSeparator>
            <Field>
              <div className="flex items-center gap-2">
                <ListCheck width={20} height={20}></ListCheck>
                <h3 className="font-bold">Souhrn Vaší rezervace:</h3>
              </div>
              <p>
                <span className="font-semibold">Termín:</span> Od{" "}
                <span className="font-bold text-black">
                  {new Date(formData.date).toLocaleDateString("cs-CZ")}
                </span>{" "}
                do{" "}
                <span className="font-bold text-black">
                  {endDate.toLocaleDateString("cs-CZ")}
                </span>
              </p>
              <p>
                <span className="font-semibold">Celková cena:</span>{" "}
                <span className="font-bold text-black">
                  {formData.numberOfDays * 1300} Kč
                </span>
              </p>
              <div>
                <p className="font-semibold">Poznámka:</p>
                <p>
                  Váš VR headset Vám přivezeme{" "}
                  <span className="font-semibold">
                    {deliveryDate.toLocaleDateString("cs-CZ")}
                  </span>{" "}
                  okolo <span className="font-semibold">18:00</span> a
                  vyzvedneme si ho{" "}
                  <span className="font-semibold">
                    {endDate.toLocaleDateString("cs-CZ")}
                  </span>{" "}
                  opět okolo <span className="font-semibold">18:00</span>.
                </p>
              </div>
            </Field>
            <FieldSeparator></FieldSeparator>
            <Field>
              <HoverBorderGradient duration={1} clockwise={true} as="button">
                {isPending ? "Odesílám..." : "Poslat rezervaci"}
              </HoverBorderGradient>
            </Field>
          </FieldGroup>
        </FieldSet>
      </Form>
    </div>
  );
}
