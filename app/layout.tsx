import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { HashScroll } from "@/components/layout/HashScroll";
import { LayoutNav } from "@/components/layout/LayoutNav";
import { PageTransition } from "@/components/layout/PageTransition";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "IL BIONDO",
    template: "%s | IL BIONDO",
  },
  description:
    "IL BIONDO is a private tailoring atelier in Amman, creating garments around the individual.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <HashScroll />
        <LayoutNav />
        <main id="content" className="flex flex-1 flex-col">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
