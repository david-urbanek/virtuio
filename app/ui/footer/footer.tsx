import { Mail, Smartphone } from "lucide-react";
import Image from "next/image";

const sitemap = [
    {
        title: "Company",
        links: [
            {
                title: "About Us",
                href: "#",
            },
            {
                title: "Careers",
                href: "#",
            },
            {
                title: "Contact",
                href: "#",
            },
            {
                title: "Press",
                href: "#",
            },
        ],
    },
    {
        title: "Support",
        links: [
            {
                title: "Help Center",
                href: "#",
            },
            {
                title: "Community",
                href: "#",
            },
            {
                title: "Status",
                href: "#",
            },
            {
                title: "API Docs",
                href: "#",
            },
        ],
    },
];

const Footer6 = () => {
    return (
        <section className="py-8 mt-8">
            <div className="container">
                <footer>
                    <div className="relative mb-8 flex w-full flex-col gap-x-28 gap-y-8 md:flex-row md:justify-between md:gap-y-0">
                        <div className="max-w-96">
                            <div className="flex items-center gap-3 mb-4">
                                <Image
                                    src="/logo/virtuio-logo.svg"
                                    alt="Logo firmy virtuio.cz"
                                    width="139"
                                    height="29"
                                />
                            </div>
                            <p className="text-muted-foreground text-base font-medium">
                                Virtualní realita k Vám domů. Zažijte nový rozměr zábavy s našimi VR headsety.
                            </p>
                        </div>
                        <div>
                            <h2 className='mb-4 font-medium'>Kontakt_</h2>
                            <div className='flex gap-6 flex-col'>
                                <div className='flex gap-2 items-center'><Mail width={20} height={20}></Mail>
                                    <a href="mailto:info@virtuio.cz?subject=Rezervace%20VR%20headsetu&body=Dobrý%20den,"
                                        className="text-primary font-medium hover:underline">info.virtuio.cz</a>
                                </div>
                                <div className='flex gap-2 items-center'><Smartphone width={20}
                                    height={20}></Smartphone>
                                    <a href='tel:+420606980435' className="text-primary font-medium hover:underline">+420
                                        606 980
                                        435</a>
                                </div>
                                <p>IČ: <span className='text-primary font-medium'>23375281</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="border-border flex flex-col items-baseline justify-between gap-8 border-t pt-8 md:flex-row md:gap-16">
                        <div className="text-muted-foreground text-xs sm:text-sm">
                            &copy; virtuio.cz 2024
                        </div>
                        <div className="text-muted-foreground flex flex-col items-start gap-4 text-xs sm:text-sm md:flex-row lg:items-center">
                            <a href="#" className="hover:text-accent-foreground">
                                Terms & Conditions
                            </a>
                            <a href="#" className="hover:text-accent-foreground">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export { Footer6 };
