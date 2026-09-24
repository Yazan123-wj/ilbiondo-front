import type { Metadata } from "next";

import { AboutSection } from "@/components/home/AboutSection";
import { BrandAtelier } from "@/components/home/BrandAtelier";
import { ButtonStorySection } from "@/components/home/ButtonStorySection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { FeaturedBrands } from "@/components/home/FeaturedBrands";
import { HomeIntro } from "@/components/home/HomeIntro";
import { PrivateServices } from "@/components/home/PrivateServices";

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
      <ExperienceSection />
      <AboutSection />
      <PrivateServices />
      <BrandAtelier />
      <FeaturedBrands />
      <ButtonStorySection />
    </>
  );
}
