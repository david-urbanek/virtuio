import {ContactForm} from "@/app/ui/contact/contactForm";
import Image from "next/image";
import backgroundObject from "@/app/assets/contact/objects.png";


const Contact = () => {
    return (
        <section className='container'>
            <div className='max-w-300 flex flex-col md:flex-row gap-8 md:gap-32'>
                <div className='mb-4 relative overflow-hidden'>
                    <h2 className='pb-2 font-bold'>Zarezervujte si svůj headset!</h2>
                    <p>Stačí vyplnit formulář nebo nám napsat. Do 24 hodin vám rezervaci potvrdíme – a máte hotovo!</p>
                    <Image src={backgroundObject} alt='dekorativní obrazek' className='absolute -z-20 lg:min-h-200 animate-float'></Image>
                </div>
                <div className='sm:min-w-1/2 flex items-center justify-center backdrop-blur-md p-8 isolate aspect-video rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5'>
                    <ContactForm></ContactForm>
                </div>
            </div>
        </section>
    )
}

export default Contact;