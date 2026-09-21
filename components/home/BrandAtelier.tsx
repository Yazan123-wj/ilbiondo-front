"use client";

import Link from "next/link";
import { useRef } from "react";

import { TextReveal } from "@/components/shared/TextReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const LIFE = {
  chess: "/images/lifestyle/chess.jpg",
  elevator: "/images/lifestyle/elevator.png",
  armchair: "/images/lifestyle/armchair.png",
  bag: "/images/lifestyle/bag.png",
  oxfords: "/images/lifestyle/oxfords.png",
  gloves: "/images/lifestyle/gloves.png",
} as const;

function Plate({
  src,
  alt,
  object,
  className,
}: {
  src: string;
  alt: string;
  object?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn("absolute inset-0 h-full w-full object-cover", object)}
      />
    </div>
  );
}

export function BrandAtelier() {
  const accentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = accentRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { scale: 0.58 },
          {
            scale: 1,
            ease: "none",
            transformOrigin: "50% 50%",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "center 55%",
              scrub: 0.5,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: accentRef },
  );

  return (
    <section id="the-house" className="relative bg-background">
      <header className="px-6 pt-24 pb-10 text-center md:pt-32 md:pb-12">
        <p className="font-serif text-sm tracking-[0.14em] text-muted">
          a <span className="uppercase tracking-[0.22em]">process built</span>{" "}
          <em className="text-accent">around the individual</em>
        </p>
        <h2 className="mx-auto mt-6 max-w-5xl font-serif text-[clamp(2.6rem,8vw,6.4rem)] leading-[0.9] tracking-[-0.03em]">
          <em className="font-serif font-normal text-accent italic">so</em> THAT YOU
          <br />
          ARE DRESSED FOR LIFE.
        </h2>
      </header>

      <div className="px-4 pt-5 md:px-8 md:pt-8">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
        <div className="relative h-[70vh] md:sticky md:top-8 md:h-[calc(100svh-4rem)]">
          <Plate
            src={LIFE.chess}
            alt="A tailored life"
            object="object-center"
            className="h-full w-full"
          />
        </div>

        <div className="bg-background">
          <div className="grid grid-cols-2 gap-2">
            <Plate
              src={LIFE.armchair}
              alt="Cloth and ease"
              object="object-[center_20%]"
              className="aspect-[4/5]"
            />
            <Plate
              src={LIFE.bag}
              alt="The details"
              object="object-center"
              className="aspect-[4/5]"
            />
          </div>

          <TextReveal className="flex min-h-[88svh] flex-col items-center justify-center px-8 py-24 text-center md:px-14">
            <h3 className="max-w-md font-serif text-3xl leading-[1.12] tracking-tight md:text-[2.6rem]">
              Worn for years.
              <br />
              Never made to be ordinary.
            </h3>
            <p className="mt-8 max-w-md font-serif text-base leading-8 text-muted italic md:text-[1.05rem] md:leading-9">
              A garment at IL BIONDO is cut for one person. You wear it to work,
              to travel, to the days that matter — and it should still feel
              considered years later.
            </p>
            <p className="mt-6 max-w-md text-sm leading-7 text-foreground/80 md:text-base md:leading-8">
              In the Amman atelier we take the measure, choose the cloth, and
              build the suit through fittings until the line belongs to you.
              Nothing is imposed. Everything is made to be lived in.
            </p>
          </TextReveal>

          <div className="flex flex-col items-center gap-10 px-8 pb-8 md:px-14">
            <div
              ref={accentRef}
              className="aspect-[4/3] w-[min(38%,12rem)] origin-center will-change-transform"
            >
              <Plate
                src={LIFE.oxfords}
                alt="Evening cloth"
                object="object-center"
                className="h-full w-full"
              />
            </div>
            <Link
              href="/process"
              className="inline-flex bg-accent px-8 py-3.5 text-[11px] tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-85"
            >
              Discover <em className="mx-1.5 font-serif normal-case tracking-normal italic">the</em> Process
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Plate
              src={LIFE.gloves}
              alt="Winter cloth"
              object="object-[center_15%]"
              className="aspect-[4/5]"
            />
            <Plate
              src={LIFE.elevator}
              alt="Cut for the life you lead"
              object="object-[center_12%]"
              className="aspect-[4/5]"
            />
          </div>

          <TextReveal className="flex min-h-[90svh] flex-col items-center justify-center px-8 py-28 text-center md:px-16">
            <blockquote className="max-w-md font-serif text-2xl leading-[1.25] tracking-tight md:text-[1.85rem] md:leading-[1.3]">
              “Luxury is found in understanding — proportion, cloth,
              construction, and above all the person. The result should never
              feel imposed. It should simply feel yours.”
            </blockquote>
            <p className="mt-10 text-[11px] tracking-[0.22em] text-muted uppercase">
              IL BIONDO
              <span className="mt-1 block font-serif font-normal tracking-normal text-accent italic lowercase">
                Amman
              </span>
            </p>
          </TextReveal>
        </div>
      </div>
      </div>
    </section>
  );
}
