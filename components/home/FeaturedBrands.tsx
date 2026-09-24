"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { TextReveal } from "@/components/shared/TextReveal";
import { HOUSES } from "@/data/brands";
import { gsap, useGSAP } from "@/lib/gsap";
import { preloadButtonModel } from "@/lib/product";

function HouseMark({
  name,
  origin,
  logo,
}: {
  name: string;
  origin: string;
  logo: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-10 px-8 md:gap-16 md:px-14">
      <div className="flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={name}
          className="h-9 w-auto brightness-0 md:h-11"
        />
        <p className="mt-3 text-[10px] tracking-[0.32em] text-muted uppercase">
          {origin}
        </p>
      </div>
      <span className="hidden h-px w-10 bg-foreground/20 md:block" aria-hidden />
    </div>
  );
}

export function FeaturedBrands() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          preloadButtonModel();
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.scrollWidth / 2;

        const tween = gsap.to(track, {
          x: () => -distance(),
          duration: 48,
          ease: "none",
          repeat: -1,
        });

        const pause = () => tween.pause();
        const play = () => tween.play();
        track.addEventListener("mouseenter", pause);
        track.addEventListener("mouseleave", play);

        return () => {
          track.removeEventListener("mouseenter", pause);
          track.removeEventListener("mouseleave", play);
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="houses"
      className="relative overflow-hidden bg-background pt-24 pb-10 md:pt-36 md:pb-12"
    >
      <TextReveal className="px-6 text-center md:px-10">
        <p className="font-serif text-sm tracking-[0.14em] text-muted">
          the <span className="uppercase tracking-[0.22em]">mills</span>{" "}
          <em className="text-accent">we cut from</em>
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.03em]">
          Cloth from houses
          <br />
          of standing.
        </h2>
        <p className="mx-auto mt-8 max-w-md font-serif text-base leading-8 text-muted italic md:text-[1.05rem] md:leading-9">
          Loro Piana, Holland &amp; Sherry, and the mills that have dressed
          the world — chosen in the atelier for the life you lead.
        </p>
      </TextReveal>

      <div className="relative mt-16 md:mt-24">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-28"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-28"
          aria-hidden
        />
        <div className="overflow-hidden py-4">
          <div ref={trackRef} className="flex w-max will-change-transform">
            <div className="flex items-center">
              {HOUSES.map((house) => (
                <HouseMark
                  key={`a-${house.name}`}
                  name={house.name}
                  origin={house.origin}
                  logo={house.logo}
                />
              ))}
            </div>
            <div className="flex items-center" aria-hidden>
              {HOUSES.map((house) => (
                <HouseMark
                  key={`b-${house.name}`}
                  name={house.name}
                  origin={house.origin}
                  logo={house.logo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center px-6 md:mt-16">
        <Link
          href="/appointments"
          className="inline-flex border-0 bg-accent px-8 py-3.5 text-[11px] tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-85"
        >
          Book an Appointment
        </Link>
      </div>
    </section>
  );
}
