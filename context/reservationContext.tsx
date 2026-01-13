"use client";

import { getReservedReservations, getVRHeadsets } from "@/lib/db/queries";
import { Reservation, VRHeadset } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const ReservationContext = createContext({
  headsets: [] as VRHeadset[],
  reservations: [] as Reservation[],
});

export function useReservations() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error(
      "useReservations must be used within a ReservationProvider"
    );
  }
  return context;
}

export function ReservationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headsets, setHeadsets] = useState<VRHeadset[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [headsets, reservations] = await Promise.all([
        getVRHeadsets(),
        getReservedReservations(),
      ]);
      setHeadsets(headsets);
      setReservations(reservations);
    }
    fetchData();
  }, []);

  return (
    <ReservationContext.Provider value={{ headsets, reservations }}>
      {children}
    </ReservationContext.Provider>
  );
}
