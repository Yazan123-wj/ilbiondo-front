"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

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
          className="h-16 w-auto max-w-[12rem] object-contain object-center md:h-20 md:max-w-[15rem]"
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
      className="relative overflow-hidden bg-surface pt-24 pb-20 md:pt-36 md:pb-32"
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent md:w-28"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent md:w-28"
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

      <div className="mx-auto mt-20 max-w-2xl px-6 text-center md:mt-28 md:px-10">
        <h2 className="font-serif text-[clamp(2rem,4.5vw,3.15rem)] leading-[1.12] tracking-[-0.03em]">
          Your suit begins here.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[15px] leading-8 text-muted md:text-base md:leading-8">
          IL BIONDO is the atelier where a garment is cut, fitted and
          finished around one person. Cloth, proportion and detail are
          chosen with you — then made by hand until the suit is yours.
        </p>
        <Link
          href="/appointments"
          className="mt-10 inline-flex bg-accent px-8 py-3.5 text-[11px] tracking-[0.22em] text-background uppercase transition-opacity hover:opacity-85"
        >
          Book your Appointment
        </Link>
      </div>
    </section>
  );
}
