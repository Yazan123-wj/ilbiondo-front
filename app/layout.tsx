import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/Footer";
import { HashScroll } from "@/components/layout/HashScroll";
import { LayoutNav } from "@/components/layout/LayoutNav";
import { PageTransition } from "@/components/layout/PageTransition";

import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/satoshi/satoshi-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/satoshi-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/satoshi/satoshi-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/satoshi-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
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
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
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
