import {cn} from "@/lib/utils"
import {Marquee} from "@/components/ui/marquee"

const reviews = [
    {
        name: "Vít Švec",
        username: "@vitsvec",
        body: "Skvělý zážitek! VR mě úplně pohltilo.",
        img: "https://avatar.vercel.sh/vitsvec",
    },
    {
        name: "Nikola Filkuková",
        username: "@nikolafilkukova",
        body: "Neuvěřitelně realistické! Moc jsem si to užila.",
        img: "https://avatar.vercel.sh/nikolafilkukova",
    },
    {
        name: "Richard Rafaj",
        username: "@richardrafaj",
        body: "Perfektní zábava pro partu i firemní akci!",
        img: "https://avatar.vercel.sh/richardrafaj",
    },
    {
        name: "Jakub Čavojský",
        username: "@jakubcavojsky",
        body: "Všechno šlapalo skvěle. Doporučuji!",
        img: "https://avatar.vercel.sh/jakubcavojsky",
    },
    {
        name: "Tomáš Gajárek",
        username: "@tomasgajarek",
        body: "Naprostá pecka! VR stojí za to.",
        img: "https://avatar.vercel.sh/tomasgajarek",
    },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
                        img,
                        name,
                        username,
                        body,
                    }: {
    img: string
    name: string
    username: string
    body: string
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "glass",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
            id='reference'
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img}/>
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    )
}

export function MarqueeDemo() {
    return (
        <section className="relative w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2>
                    Co říkají na VR naši zákazníci
                </h2>
                <p>
                    Naši zákazníci o VR mluví s nadšením — a my jsme rádi, že jim můžeme přinášet nové zážitky a spoustu zábavy. Podívejte se, jak své chvíle ve virtuálním světě hodnotí.
                </p>
            </div>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div
                    className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
                <div
                    className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
            </div>
        </section>

    )
}
