import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { TextReveal } from "@/components/shared/TextReveal";
import { FounderProfile } from "@/components/story/FounderProfile";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "IL BIONDO began with a simple belief: the best tailoring starts by knowing the person who will wear it.",
};

export default function OurStoryPage() {
  return (
    <>
      <PageHero title="Built around the individual.">
        <p>IL BIONDO began with a simple belief:</p>
        <p>The best tailoring starts by knowing the person who will wear it.</p>
        <p>
          Before there was an atelier, there were appointments in homes and
          offices — meeting clients personally, understanding their lives and
          creating garments around them.
        </p>
        <p>That personal relationship became the foundation of IL BIONDO.</p>
        <p>
          Today, our atelier in Amman continues the same philosophy: personal
          service, considered design and tailoring created around the
          individual.
        </p>
      </PageHero>

      <section id="founders" className="px-5 py-16 md:px-10 md:py-28">
        <SectionLabel>The Founders</SectionLabel>
        <h2 className="mt-5 font-serif text-4xl tracking-tight md:text-6xl">
          The Founders
        </h2>
        <div className="mt-16 space-y-24">
          <FounderProfile
            name="Ammar Mehyar"
            role="Co-Founder"
            imageSrc="/images/founders/ammar-mehyar.jpg"
            copy="Ammar brings together the client experience, fabric selection and the details that shape the IL BIONDO wardrobe."
          />
          <FounderProfile
            name="Ali Alashqar"
            role="Co-Founder"
            imageSrc="/images/founders/ali-alashqar.jpg"
            copy="Ali's approach is rooted in personal service and an understanding of how tailoring should complement the individual rather than define him."
          />
        </div>
      </section>

      <section id="philosophy" className="px-5 py-24 md:px-10 md:py-40">
        <TextReveal>
          <SectionLabel>Our Philosophy</SectionLabel>
          <h2 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl">
            Personal. Precise. Timeless.
          </h2>
          <div className="mt-10 max-w-2xl space-y-5 text-base leading-8 text-muted md:text-lg md:leading-9">
            <p>We believe luxury is found in understanding.</p>
            <p>Understanding proportion.</p>
            <p>Understanding cloth.</p>
            <p>Understanding construction.</p>
            <p>And, above all, understanding the person.</p>
            <p>The result should never feel imposed.</p>
            <p>It should simply feel yours.</p>
          </div>
        </TextReveal>
      </section>
    </>
  );
}
