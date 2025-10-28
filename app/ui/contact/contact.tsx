import Form from 'next/form'
import {ContactForm} from "@/app/ui/contact/contactForm";

const Contact = () => {
    return (
        <section>
            <div>
                <h2>Zarezervujte si svůj headset!</h2>
                <p>Stačí vyplnit formulář nebo nám napsat. Do 24 hodin vám rezervaci potvrdíme – a máte hotovo!</p>
            </div>
            <div>
                <div>
                    <a>Email</a>
                    <a>Telefon</a>
                    <p>IČ</p>
                </div>
                <ContactForm></ContactForm>
            </div>

        </section>
    )
}

export default Contact;