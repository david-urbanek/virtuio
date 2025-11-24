import { Hero } from "@/app/ui/home/hero";
import { Gallery6 } from "@/app/ui/home/gallery";
import { MarqueeDemo } from "@/app/ui/home/marquee";
import { Faq2 } from "@/app/ui/home/faq";
import Contact from "@/app/ui/contact/contact";

export default function Home() {
    return (
        <>
            <Hero></Hero>
            <MarqueeDemo></MarqueeDemo>
            <Gallery6></Gallery6>
            <Faq2></Faq2>
            <Contact></Contact>
        </>
    );
}
