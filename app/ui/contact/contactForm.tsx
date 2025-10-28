import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import Form from "next/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {NativeSelect, NativeSelectOption} from "@/components/ui/native-select";


export function ContactForm() {
    const formAction = ()=>{};
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
                        <NativeSelect>
                            <NativeSelectOption value="">Select status</NativeSelectOption>
                            <NativeSelectOption value="todo">Todo</NativeSelectOption>
                            <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
                            <NativeSelectOption value="done">Done</NativeSelectOption>
                            <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
                        </NativeSelect>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="adress">Adresa + Číslo popisné:</FieldLabel>
                        <Input id="adress" type="text" placeholder="Pekařská 18"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="date">Datum začátku rezervace:</FieldLabel>
                        <Input id="date" type="date" placeholder="Pekařská 18"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="numberOfDays">Počet dní</FieldLabel>
                        <Input id="numberOfdays" type="range" placeholder="Pekařská 18"/>
                    </Field>
                    <Field>
                        <Button type='submit'>Poslat rezervaci</Button>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </div>
    )
}
