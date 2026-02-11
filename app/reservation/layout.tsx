"use client";

import { ReservationContextProvider } from "@/context/reservationContext";

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReservationContextProvider>{children}</ReservationContextProvider>;
}
