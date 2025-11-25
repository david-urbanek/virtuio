import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function FaqCard(props: { title: string; description: React.ReactNode }) {
    return (
        <CardSpotlight className="flex flex-col justify-between gap-6">
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-neutral-100 mb-2">{props.title}</h2>
                <div className="text-neutral-300 text-lg">
                    {props.description}
                </div>
            </div>
            <div className="relative z-10">
                <Button className="bg-[#5b4eff] hover:bg-[#4a3df0] text-white font-medium px-6 py-2 rounded-md">
                    <Link href='/kontakt'>
                        Kontaktujte nás
                    </Link>
                </Button>
            </div>
        </CardSpotlight>
    );
}