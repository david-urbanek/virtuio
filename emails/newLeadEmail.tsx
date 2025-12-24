import React from "react";

interface NewLeadEmailProps {
  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  date: string;
  numberOfDays: number;
}

export default function NewLeadEmail({
  name,
  surname,
  email,
  phone,
  city,
  address,
  date,
  numberOfDays,
}: NewLeadEmailProps) {
  return (
    <div>
      <h1>Nová poptávka</h1>
      <p>
        <strong>Jméno:</strong> {name} {surname}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Telefon:</strong> {phone}
      </p>
      <p>
        <strong>Město:</strong> {city}
      </p>
      <p>
        <strong>Adresa:</strong> {address}
      </p>
      <p>
        <strong>Datum:</strong> {date}
      </p>
      <p>
        <strong>Počet dní:</strong> {numberOfDays}
      </p>
    </div>
  );
}
