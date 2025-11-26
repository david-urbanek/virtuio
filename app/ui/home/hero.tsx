import Image from 'next/image';
import heroImage from '@/app/assets/home/hero-image.png'
import { GraduationCapIcon, HouseIcon, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { BlurFade } from "@/components/ui/blur-fade";

const features = [
    {
        title: 'Nejnovější VR na trhu',
        icon: ZapIcon
    },
    {
        title: 'Doručení až k Vám domů',
        icon: HouseIcon
    },
    {
        title: 'Rychlé zaškolení',
        icon: GraduationCapIcon
    }
];

const Hero = () => {

    const featuresElements = features.map((feature, index): React.ReactNode => (
        <div key={index} className='flex flex-col items-center py-4 px-2 gap-2 rounded-lg text-center glass h-fit hover:shadow-lg hover:scale-105 transition-all max-w-24'>
            <feature.icon size={24} />
            <p className='font-semibold'>{feature.title}</p>
        </div>
    ));

    return (
        <section className="py-12">
            <div className='flex flex-col gap-4 items-center md:flex-row md:items-center'>
                {/* Hero heading */}
                <div className='flex flex-col gap-6 items-center justify-center md:items-start'>
                    <div className='flex flex-col gap-4'>
                        <BlurFade delay={0.1} inView>
                            <h1>Nuda v Brně? Chcete zažít virtualní realitu na vlastní kůži?</h1>
                        </BlurFade>
                        <BlurFade delay={0.2} inView>
                            <p>Přivezeme <span className='font-semibold'>Meta Quest 3/S</span> až k Vám domů. Zapojíme, zaškolíme a za 5 minut se bavíte.</p>
                        </BlurFade>
                    </div>
                    <BlurFade delay={0.3} inView className='flex gap-4 items-center'>
                        {featuresElements}
                    </BlurFade>
                    <BlurFade delay={0.4} inView>
                        <HoverBorderGradient
                            duration={1}
                            clockwise={true}
                            as="button"
                            className="rounded-full bg-gray-900 hover:bg-gray-800 text-white border-[1px]"
                        >
                            <Link href='/kontakt'>
                                Kontaktujte nás
                            </Link>
                        </HoverBorderGradient>
                    </BlurFade>
                </div>
                {/* Hero video */}
                <BlurFade delay={0.2} inView className='animate-float sm:min-w-1/2'>
                    <video src='/video/hero-video.mp4' autoPlay={true} loop={true}
                    >
                    </video>
                </BlurFade>
            </div>
        </section>
    )
}

export { Hero };