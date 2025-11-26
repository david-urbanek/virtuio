import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function FaqCard(props: { title: string; description: React.ReactNode }) {
    return (
        <MagicCard className="flex flex-col justify-between gap-6 h-full bg-white border-neutral-200 hover:shadow-xl hover:translate-y-[-10px] transition-all rounded-2xl px-4 py-8">
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">{props.title}</h3>
                <div className="text-neutral-600 dark:text-neutral-300 text-base font-normal">
                    {props.description}
                </div>
            </div>
        </MagicCard>
    );
}