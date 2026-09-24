import Link from "next/link";

import { TextReveal } from "@/components/shared/TextReveal";

export function AboutSection() {
  return (
    <section id="about" className="bg-accent text-background">
      <TextReveal className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center md:px-10 md:py-36">
        <p className="text-[11px] tracking-[0.28em] uppercase">About IL BIONDO</p>
        <h2 className="mt-6 font-serif text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.95] tracking-[-0.03em]">
          Built around the individual.
        </h2>
        <p className="mt-8 max-w-lg text-base leading-8 text-background/75 md:text-[1.05rem] md:leading-9">
          The best tailoring starts by knowing the person who will wear it.
          Before there was an atelier, there were appointments in homes and
          offices — meeting clients personally and creating garments around
          them.
        </p>
        <p className="mt-5 max-w-lg text-base leading-8 text-background/75 md:text-[1.05rem] md:leading-9">
          Today, the Amman atelier continues that same philosophy: personal
          service, considered design, and tailoring made for one.
        </p>
        <Link
          href="/our-story"
          className="mt-10 inline-flex bg-background px-8 py-3.5 text-[11px] tracking-[0.2em] text-accent uppercase transition-opacity hover:opacity-85"
        >
          Our Story
        </Link>
      </TextReveal>
    </section>
  );
}
