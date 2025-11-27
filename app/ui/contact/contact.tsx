import { ContactForm } from "@/app/ui/contact/contactForm";
import Image from "next/image";
import backgroundObject from "@/app/assets/contact/contact-img.png";
import { BlurFade } from "@/components/ui/blur-fade";


const Contact = () => {
    return (
        <section className='container py-12'>
            <div className='max-w-300 flex flex-col md:flex-row gap-8 md:gap-32'>
                <BlurFade delay={0.1} inView className=' relative overflow-hidden'>
                    <h2 className='pb-2 font-bold'>Zarezervujte si svůj headset!</h2>
                    <p>Stačí vyplnit formulář nebo nám napsat. Do 24 hodin vám rezervaci potvrdíme – a máte hotovo!</p>
                    <Image src={backgroundObject} alt='dekorativní obrazek' className='hidden md:block absolute -z-20 lg:min-h-200'></Image>
                </BlurFade>
                <BlurFade delay={0.2} inView className='backdrop-blur-md p-8 isolate rounded-xl shadow-lg ring-1 ring-black/5 min-w-1/2'>
                    <ContactForm></ContactForm>
                </BlurFade>
            </div>
        </section>
    )
}

export default Contact;