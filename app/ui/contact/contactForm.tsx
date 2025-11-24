'use client'

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel, FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import Form from "next/form";
import {NativeSelect, NativeSelectOption} from "@/components/ui/native-select";
import React, {useEffect} from "react";
import {ListCheck} from "lucide-react";


export function ContactForm() {
    const [formData, setFormData] = React.useState({
        date: new Date(),
        numberOfDays: 2,
    });

    const [endDate, setEndDate] = React.useState(countDate(formData.date, formData.numberOfDays));
    const [deliveryDate, setDeliveryDate] = React.useState(countDate(formData.date, -1));

    function countDate(startDate: Date, numberOfDays: number) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + numberOfDays);
        return endDate;
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {id, value} = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [id]: id === "date"
                ? new Date(value + "T00:00:00")
                : id === "numberOfDays"
                    ? Number(value)
                    : value,
        }));

    }


    useEffect(() => {
        setEndDate(countDate(formData.date, formData.numberOfDays));
    }, [formData]);

    useEffect(() => {
        const newDeliveryDate = countDate(formData.date, -1);
        setDeliveryDate(newDeliveryDate)
    }, [formData]);

    useEffect(() => {
        console.log('End date:', endDate);
    }, [endDate]);


    return (
        <div className="w-full max-w-md">
            <FieldSet>
                <FieldGroup>
                    <div className='grid grid-cols-2 gap-4'>
                        <Field>
                            <FieldLabel htmlFor="name">Jméno:</FieldLabel>
                            <Input id="name" type="text" placeholder="Jan"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="surname">Přijmení:</FieldLabel>
                            <Input id="surname" type="text" placeholder="Novák"/>
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="email">Email:</FieldLabel>
                        <Input id="email" type="email" placeholder="jan.novak@email.cz"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="telephone">Telefon:</FieldLabel>
                        <Input id="telephone" type="email" placeholder="+420 606 980 435" required/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="city">Město:</FieldLabel>
                        <FieldDescription>Zatím pouze operujeme v Brně!</FieldDescription>
                        <NativeSelect defaultValue="brno" id="city">
                            <NativeSelectOption value="brno">Brno</NativeSelectOption>
                        </NativeSelect>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="adress">Adresa + Číslo popisné:</FieldLabel>
                        <Input id="adress" type="text" placeholder="Pekařská 18"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="date">Datum začátku rezervace:</FieldLabel>
                        <Input
                            id="date"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="numberOfDays">Počet dní</FieldLabel>
                        <FieldDescription>Váš zvolený počet dní: <span
                            className='font-bold text-black'>{formData.numberOfDays}</span></FieldDescription>
                        <Input id="numberOfDays" type="range" placeholder="Pekařská 18" min={2} max={8} step={1}
                               defaultValue={2} onChange={handleChange}/>
                    </Field>
                    <FieldSeparator></FieldSeparator>
                    <Field>
                        <div className='flex items-center gap-2'>
                            <ListCheck width={20} height={20}></ListCheck>
                            <h3 className='font-bold'>
                                Souhrn Vaší rezervace:
                            </h3>
                        </div>
                        <p>
                            <span className='font-semibold'>Termín:</span> Od <span
                            className='font-bold text-black'>{formData.date.toLocaleDateString('cs-CZ')}</span> do <span
                            className='font-bold text-black'>{endDate.toLocaleDateString('cs-CZ')}</span> na <span
                            className='font-bold text-black'>{formData.numberOfDays}</span> dní.
                        </p>
                        <div>
                            <p className='font-semibold'>
                                Poznámka:
                            </p>
                            <p>
                                Váš VR headset Vám přivezeme <span
                                className='font-semibold'>{deliveryDate.toLocaleDateString('cs-CZ')}</span> okolo <span
                                className='font-semibold'>18:00</span> a
                                vyzvedneme si ho <span
                                className='font-semibold'>{endDate.toLocaleDateString('cs-CZ')}</span> opět
                                okolo <span
                                className='font-semibold'>18:00</span>.
                            </p>
                        </div>
                    </Field>
                    <FieldSeparator></FieldSeparator>
                    <Field>
                        <Button type='submit'>Poslat rezervaci</Button>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </div>
    )
}
