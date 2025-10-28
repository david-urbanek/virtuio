import React from "react";

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
                  items = [
                      {
                          question: "Jaká je cena pronájmu?",
                          answer:
                              "Cena je 1300Kč/den za jeden VR headset. Minimální dobou pronájmu jsou dva dny",
                      },
                      {
                          question: "What is the purpose of a FAQ?",
                          answer:
                              "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
                      },
                      {
                          question: "How do I create a FAQ?",
                          answer:
                              "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
                      },
                  ],
              }: Faq2Props) => {
    return (
        <section>
            <div className="container max-w-3xl">
                <h2 className="mb-4">
                    {heading}
                </h2>
                <div className="space-y-8">
                    <div className="border-b pb-6">
                        <h3 className="mb-2 font-semibold">Jaká je cena pronájmu?</h3>
                        <p className="text-muted-foreground">Cena je 1300Kč/den za jeden VR headset. Minimální dobou
                            pronájmu jsou dva dny.</p>
                    </div>
                    <div className="border-b pb-6">
                        <h3 className="mb-2 font-semibold">Vysvětlíte mi jak VR ovládat?</h3>
                        <p className="text-muted-foreground">Ano, zcela zdarma Vám ukážeme jak s VR zacházet.</p>
                    </div>
                    <div className="border-b pb-6">
                        <h3 className="mb-2 font-semibold">Jak se ke mně VR dostane?</h3>
                        <p className="text-muted-foreground">Váš pronajatý VR headset Vám osobně doručíme kamkoliv
                            po Brně – dopravu už máte v ceně. Headset přivezeme den předem odpoledne a po skončení
                            pronájmu si ho zase pohodlně vyzvedneme večer.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export {Faq2};
