'use server';

import NotificationEmail from "@/app/emails/notificationEmail";
import { z } from "zod";
import { Resend } from "resend";
import newLeadEmail from "@/app/emails/newLeadEmail";

const formSchema = z.object({
    name: z.string().min(1, "Zadejte své jméno."),
    surname: z.string().min(1, "Zadejte své příjmení."),
    email: z.email("Zadejte platnou e-mailovou adresu."),
    phone: z.string()
        .min(9, "Telefonní číslo musí mít alespoň 9 číslic.")
        .max(15, "Telefonní číslo může mít maximálně 15 znaků."),
    city: z.string().min(1, "Zadejte město."),
    address: z.string().min(1, "Zadejte ulici a číslo popisné."),
    date: z.string().min(1, "Vyberte datum."),
    numberOfDays: z.coerce.number().min(1, "Minimálně 1 den."),
});

export type FormState = {
    message: string
    success: boolean
    errors?: {
        name?: string
        surname?: string
        email?: string
        phone?: string
        city?: string
        address?: string
        date?: string
        numberOfDays?: string
    }
}

export async function handleFormSubmission(initialState: { message: string }, formData: FormData): Promise<FormState> {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return {
            message: 'Chyba serveru: Chybí API klíč pro odesílání emailů (RESEND_API_KEY).',
            success: false,
            errors: {}
        }
    }
    const resend = new Resend(apiKey);

    const validatedData = formSchema.safeParse({
        name: formData.get('name'),
        surname: formData.get('surname'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        city: formData.get('city'),
        address: formData.get('address'),
        date: formData.get('date'),
        numberOfDays: formData.get('numberOfDays'),
    });

    if (!validatedData.success) {
        const errors = validatedData.error.issues.reduce((acc, error) => {
            const fieldName = error.path[0] as string
            acc[fieldName] = error.message
            return acc
        }, {} as Record<string, string>)

        return {
            message: 'Nastala chyba při odesílání formuláře. Zkontrolujte, že máte vyplněná všechna povinná pole.',
            success: false,
            errors: errors
        }
    }

    const { name, surname, email, phone, city, address, date, numberOfDays } = validatedData.data;

    const { data: leadData, error: leadError } = await resend.emails.send({
        from: 'info@virtuio.cz', // TODO: Update this to the correct sender
        to: 'david.urbanek@virtuio.cz', // TODO: Update this to the correct receiver
        subject: `Nová poptávka od ${name} ${surname}`,
        react: newLeadEmail({ name, surname, email, phone, city, address, date, numberOfDays }),
    });

    if (leadError) {
        console.error("Lead email error:", leadError);
        return {
            message: 'Nastala chyba při odesílání formuláře. Zkuste nás kontaktovat telefonicky nebo pomocí našeho emailu.',
            success: false,
            errors: {}
        }
    }

    const { data: notificationData, error: notificationError } = await resend.emails.send({
        from: 'info@virtuio.cz', // TODO: Update this
        to: `${validatedData.data.email}`,
        subject: `Potvrzení o přijetí poptávky`,
        react: NotificationEmail()
    });

    if (notificationError) {
        console.error("Notification email error:", notificationError);
        // We don't return error here to not confuse the user if the admin email went through, 
        // but ideally we should handle this. For now, we'll assume success if lead email sent.
    }

    return {
        message: 'Vaše poptávka byla úspěšně odeslána. Brzy Vás budeme kontaktovat.',
        success: true,
        errors: {}
    }
}
