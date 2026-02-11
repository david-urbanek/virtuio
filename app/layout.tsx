import { Footer6 } from "@/components/footer";
import { Navbar17 } from "@/components/navbar17";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Virtuio",
    default: "Pronájem virtuální reality Brno - Virtuio",
  },
  description:
    "Zažijte virtuální realitu z pohodlí domova. Pronajímáme VR headsety Meta Quest 3 a 3S v Brně s doručením až k Vám. Zábava pro celou rodinu i firemní akce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${inter.className} ${inter.variable} antialiased min-w-screen flex flex-col items-center justify-center px-4 md:px-16 lg:px-32 min-h-[100dvh] w-full`}
      >
        <header className="container flex flex-col items-center justify-center">
          <Navbar17></Navbar17>
        </header>
        <main className="container flex flex-col gap-16">{children}</main>
        <footer className="container w-full mt-16">
          <Footer6></Footer6>
        </footer>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
