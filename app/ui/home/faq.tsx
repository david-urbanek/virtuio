import React from "react";
import FaqCard from "@/app/ui/home/faqCard";
import MeteorCard from "./meteorCard";

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
                <h2 className="mb-12 text-center">
                    {heading}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FaqCard
                        title="Jaká je cena pronájmu?"
                        description={<>Cena je <span className='font-semibold text-black'>1300Kč/den</span> za jeden VR headset.</>}
                    />
                    <FaqCard
                        title="Vysvětlíte mi jak VR ovládat?"
                        description={<>Ano, zcela <span className='font-semibold text-black'>zdarma</span> Vám ukážeme jak s VR zacházet.</>}
                    />
                    <FaqCard
                        title="Jak se ke mně VR dostane?"
                        description={<>Váš pronajatý VR headset Vám osobně doručíme kamkoliv
                            po <span className='font-semibold text-black'>Brně</span> – dopravu už máte v ceně. Headset přivezeme den předem odpoledne a po skončení
                            pronájmu si ho zase pohodlně vyzvedneme večer.</>}
                    />
                    <MeteorCard />
                </div>
            </div>
        </section>
    );
};

export { Faq2 };
