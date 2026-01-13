import { Faq2 } from "@/components/home/faq";
import { Gallery6 } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { MarqueeDemo } from "@/components/home/marquee";
import { ReservationFlow } from "@/components/reservation/reservation-flow";
import { getReservedReservations, getVRHeadsets } from "@/lib/db/queries";

export default async function Home() {
  const [reservations, vrHeadsets] = await Promise.all([
    getReservedReservations(),
    getVRHeadsets(),
  ]);

  console.log(reservations);
  console.log(vrHeadsets);

  return (
    <>
      <Hero></Hero>
      <MarqueeDemo></MarqueeDemo>
      <Gallery6></Gallery6>
      <Faq2></Faq2>
      <ReservationFlow></ReservationFlow>
    </>
  );
}
