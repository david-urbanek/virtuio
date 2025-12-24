"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import aimXRImage from "@/app/assets/home/games/aim-xr.jpg";
import beatSaberImage from "@/app/assets/home/games/beat-saber.jpg";
import brinkTravelerImage from "@/app/assets/home/games/bring-traveler.jpg";
import epicRollerCoastersImage from "@/app/assets/home/games/epic-roller-coasters.jpg";
import firstHandImage from "@/app/assets/home/games/first-hand.png";
import superHotImage from "@/app/assets/home/games/super-hot.webp";
import elevenTableTennisImage from "@/app/assets/home/games/table-tenis.webp";

import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string | StaticImport;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
}

const Gallery6 = ({
  heading = "U nás si vyzkoušíte to nejlepší z VR",
  demoUrl = "https://www.shadcnblocks.com",
  items = [
    {
      id: "item-1",
      title: "Beat Saber",
      summary:
        "Rytmická hra, kde sekáš kostky do rytmu hudby. Skvělá zábava a perfektní trénink reflexů.",
      url: "https://www.youtube.com/watch?v=vL39Sg2AqWg",
      image: beatSaberImage,
    },
    {
      id: "item-2",
      title: "Superhot VR",
      summary:
        "Čas se hýbe, jen když se hýbeš ty. Strategická akce, která tě vtáhne naplno.",
      url: "https://www.youtube.com/watch?v=pzG7Wc6mbwE",
      image: superHotImage,
    },
    {
      id: "item-3",
      title: "Brink Traveler",
      summary:
        "Procestuj svět z pohodlí domova. Realistické 3D lokace a dechberoucí výhledy.",
      url: "https://www.youtube.com/watch?v=GcMvyhGrDL4",
      image: brinkTravelerImage,
    },
    {
      id: "item-4",
      title: "Eleven Table Tennis",
      summary:
        "Nejrealističtější stolní tenis ve VR. Skvělý pro soutěžení i zlepšování reflexů.",
      url: "https://www.youtube.com/watch?v=hWJ3q4lyl8M",
      image: elevenTableTennisImage,
    },
    {
      id: "item-5",
      title: "AIM XR",
      summary:
        "Multiplayerová akční střílečka, kde rozhoduje přesnost, týmová spolupráce a rychlé reakce.",
      url: "https://www.youtube.com/watch?v=BQQsi4esvOQ",
      image: aimXRImage,
    },
    {
      id: "item-6",
      title: "First Hand",
      summary:
        "Ideální hra pro začátečníky ve VR. Vyzkoušej si virtuální svět s humorem a stylem.",
      url: "https://www.youtube.com/watch?v=TFJJ8BNo-1g",
      image: firstHandImage,
    },
    {
      id: "item-7",
      title: "Epic Roller Coasters",
      summary:
        "Zažij jízdu na horské dráze, kterou bys v reálu nezvládl. Adrenalin zaručen!",
      url: "https://www.youtube.com/watch?v=w5A7xHj7FM0",
      image: epicRollerCoastersImage,
    },
  ],
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section className="w-full py-12" id="games">
      <div className="container">
        <BlurFade
          delay={0.1}
          inView
          className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16"
        >
          <div>
            <h2 className="mb-3">{heading}</h2>
            <a
              href={demoUrl}
              className="group flex items-center gap-1 text-sm font-semibold md:text-base lg:text-lg"
            >
              Zarezervovat si termín
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
              aria-label="Previous slide"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
              aria-label="Next slide"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </BlurFade>
      </div>
      <BlurFade delay={0.2} inView className="w-full max-w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative w-full max-w-full md:left-[-1rem]"
        >
          <CarouselContent className="hide-scrollbar w-full max-w-full md:-mr-4 md:ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="ml-8 md:max-w-[452px]">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-3/2 flex overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <Image
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.title}
                  </div>
                  <div className="text-muted-foreground mb-8 line-clamp-2 text-sm md:mb-12 md:text-base lg:mb-9">
                    {item.summary}
                  </div>
                  <div className="flex items-center text-sm">
                    Odkaz na trailer{" "}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </BlurFade>
    </section>
  );
};

export { Gallery6 };
