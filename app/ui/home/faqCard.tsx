import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FaqCard(props: { title: string; description: string }) {
    return (
        <CardSpotlight>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <Button>
                <Link href='/kontakt'>
                    Kontaktujte nás
                </Link>
            </Button>
        </CardSpotlight>
    );
}