import type { Metadata } from "next";

import { AboutSection } from "@/components/home/AboutSection";
import { BrandAtelier } from "@/components/home/BrandAtelier";
import { FeaturedBrands } from "@/components/home/FeaturedBrands";
import { HomeIntro } from "@/components/home/HomeIntro";

export const metadata: Metadata = {
  title: {
    absolute: "IL BIONDO | Bespoke Tailoring",
  },
  description:
    "A considered approach to modern tailoring. From the first conversation to the final fitting, every IL BIONDO piece is shaped around the individual.",
};

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <FeaturedBrands />
      <AboutSection />
      <BrandAtelier />
    </>
  );
}
