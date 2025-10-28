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


export function ContactForm() {
    const formAction = ()=>{};
    return (
        <Form action={formAction()} className="w-full max-w-md">
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
                        <Select defaultValue="">
                            <SelectTrigger id="checkout-exp-month-ts6">
                                <SelectValue placeholder="MM" />
                            </SelectTrigger>
                            <SelectContent position='popper'>
                                <SelectItem value="01">01</SelectItem>
                                <SelectItem value="02">02</SelectItem>
                                <SelectItem value="03">03</SelectItem>
                                <SelectItem value="04">04</SelectItem>
                                <SelectItem value="05">05</SelectItem>
                                <SelectItem value="06">06</SelectItem>
                                <SelectItem value="07">07</SelectItem>
                                <SelectItem value="08">08</SelectItem>
                                <SelectItem value="09">09</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="11">11</SelectItem>
                                <SelectItem value="12">12</SelectItem>
                            </SelectContent>
                        </Select>
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
        </Form>
    )
}
