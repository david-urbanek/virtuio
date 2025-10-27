import Image from 'next/image';
import heroImage from '@/app/assets/home/hero-image.png'
import {GraduationCapIcon, HouseIcon, ZapIcon} from "lucide-react";

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
        <div key={index} className='flex flex-col items-center py-4 px-2 gap-2 rounded-lg text-center glass h-fit animate-float'>
            <feature.icon size={24} />
            <p className='font-semibold'>{feature.title}</p>
        </div>
    ));

    return (
        <section>
            <div className='flex flex-col gap-4'>
                {/* Hero heading */}
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-4'>
                        <h1>Nuda v Brně? Chcete zažít virtualní realitu na vlastní kůži?</h1>
                        <p>Přivezeme <span className='font-semibold'>Meta Quest 3</span> až k Vám – domů. Zapojíme, zaškolíme a za 5 minut se bavíte.</p>
                    </div>
                    <div className='flex gap-4 items-center'>
                        {featuresElements}
                    </div>
                </div>
                {/* Hero image */}
                <div>
                    <Image src={heroImage}
                           alt="Obrázek virtualního headsetu Meta Quest 3"
                           placeholder='blur'
                    >
                    </Image>
                </div>
            </div>
            <div>

            </div>
        </section>
    )
}

export {Hero};