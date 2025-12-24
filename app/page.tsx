import Contact from "@/components/contact/contact";
import { Faq2 } from "@/components/home/faq";
import { Gallery6 } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { MarqueeDemo } from "@/components/home/marquee";

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
