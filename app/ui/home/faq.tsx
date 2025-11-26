import React from "react";
import FaqCard from "@/app/ui/home/faqCard";
import MeteorCard from "./meteorCard";
import { BlurFade } from "@/components/ui/blur-fade";

interface FaqItem {
    question: string;
    answer: string;
}

interface Faq2Props {
    heading?: string;
    items?: FaqItem[];
}

const Faq2 = ({
    heading = "Často kladené otázky?",
}: Faq2Props) => {
    return (
        <section id='faq' className="py-12">
            <div className="container max-w-6xl mx-auto px-4">
                <BlurFade delay={0.1} inView>
                    <h2 className="mb-12 text-center">
                        {heading}
                    </h2>
                </BlurFade>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BlurFade delay={0.2} inView className="h-full">
                        <FaqCard
                            title="Jaká je cena pronájmu?"
                            description={<>Cena je <span className='font-semibold text-black'>1300Kč/den</span> za jeden VR headset.</>}
                        />
                    </BlurFade>
                    <BlurFade delay={0.3} inView className="h-full">
                        <FaqCard
                            title="Vysvětlíte mi jak VR ovládat?"
                            description={<>Ano, zcela <span className='font-semibold text-black'>zdarma</span> Vám ukážeme jak s VR zacházet.</>}
                        />
                    </BlurFade>
                    <BlurFade delay={0.4} inView className="h-full">
                        <FaqCard
                            title="Jak se ke mně VR dostane?"
                            description={<>Váš pronajatý VR headset Vám osobně doručíme kamkoliv
                                po <span className='font-semibold text-black'>Brně</span> – dopravu už máte v ceně. Headset přivezeme den předem odpoledne a po skončení
                                pronájmu si ho zase pohodlně vyzvedneme večer.</>}
                        />
                    </BlurFade>
                    <BlurFade delay={0.5} inView className="h-full">
                        <MeteorCard />
                    </BlurFade>
                </div>
            </div>
        </section>
    );
};

export { Faq2 };
