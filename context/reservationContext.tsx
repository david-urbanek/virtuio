"use client";

import { getReservedReservations, getVRHeadsets } from "@/lib/db/queries";
import { Reservation, VRHeadset } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export type ReservationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  houseNumber: string;
  city: string;
};

const INITIAL_FORM_DATA: ReservationFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  houseNumber: "",
  city: "Brno",
};

interface ReservationContextType {
  // DB Data
  headsets: VRHeadset[];
  reservations: Reservation[];
  // User Selection
  selectedHeadsets: string[];
  selectHeadsets: (ids: string[]) => void;
  date: DateRange | undefined;
  selectDate: (date: DateRange | undefined) => void;
  // Form Data
  formData: ReservationFormData;
  updateFormField: (key: keyof ReservationFormData, value: string) => void;
  // Actions
  resetAll: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

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
  // DB Data
  const [headsets, setHeadsets] = useState<VRHeadset[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // User Selection State
  const [selectedHeadsets, setSelectedHeadsets] = useState<string[]>([]);
  const [date, setDate] = useState<DateRange | undefined>();
  const [formData, setFormData] =
    useState<ReservationFormData>(INITIAL_FORM_DATA);

  // Load persistence
  useEffect(() => {
    const cached = localStorage.getItem("vr_reservation_cache");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.selectedHeadsets)
          setSelectedHeadsets(parsed.selectedHeadsets);
        if (parsed.formData) setFormData(parsed.formData);
      } catch (e) {
        console.error("Failed to parse cache", e);
      }
    }
  }, []);

  // Save persistence
  useEffect(() => {
    const cacheData = {
      selectedHeadsets,
      formData,
    };
    localStorage.setItem("vr_reservation_cache", JSON.stringify(cacheData));
  }, [selectedHeadsets, formData]);

  // Fetch DB Data
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

  // Handlers
  const selectHeadsets = (ids: string[]) => setSelectedHeadsets(ids);
  const selectDate = (d: DateRange | undefined) => setDate(d);
  const updateFormField = (key: keyof ReservationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const resetAll = () => {
    setSelectedHeadsets([]);
    setFormData(INITIAL_FORM_DATA);
    localStorage.removeItem("vr_reservation_cache");
  };

  return (
    <ReservationContext.Provider
      value={{
        headsets,
        reservations,
        selectedHeadsets,
        selectHeadsets,
        date,
        selectDate,
        formData,
        updateFormField,
        resetAll,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
