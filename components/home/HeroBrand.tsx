"use client";

import Link from "next/link";
import { useRef } from "react";

import { DualToneWordmark } from "@/components/shared/DualToneWordmark";
import { gsap, useGSAP } from "@/lib/gsap";

type HeroBrandProps = {
  logoRef: React.RefObject<HTMLAnchorElement | null>;
  taglineRef: React.RefObject<HTMLDivElement | null>;
};

export function HeroBrand({ logoRef, taglineRef }: HeroBrandProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const tagline = taglineRef.current;
      if (!wrap || !tagline) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(wrap, { autoAlpha: 0 });
      gsap.set(tagline, { autoAlpha: 0, y: 8 });

      if (reduceMotion) {
        gsap.set(wrap, { autoAlpha: 1 });
        gsap.set(tagline, { autoAlpha: 1, y: 0 });
        return;
      }

      const intro = gsap.timeline();
      intro.to(wrap, {
        autoAlpha: 1,
        duration: 1.05,
        ease: "power3.out",
      });
      intro.to(
        tagline,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
        0.18,
      );
    },
    { scope: wrapRef },
  );

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-20 text-white"
    >
      <DualToneWordmark
        ref={logoRef}
        className="pointer-events-auto absolute top-1/2 left-1/2 z-10 h-32 md:h-44"
      />
      <div
        ref={taglineRef}
        className="absolute top-[calc(50%+6.6rem)] left-1/2 flex w-max -translate-x-1/2 flex-col items-center md:top-[calc(50%+8.6rem)]"
      >
        <p className="font-serif text-sm tracking-[0.16em] text-white/90 italic md:text-base">
          A considered approach to modern tailoring.
        </p>
        <Link
          href="/appointments"
          className="pointer-events-auto mt-6 inline-flex items-center border border-white/25 bg-white/10 px-8 py-3 text-[11px] tracking-[0.2em] text-white uppercase backdrop-blur-md transition-[background-color,border-color] duration-300 hover:border-white/40 hover:bg-white/20"
        >
          Book your Appointment
        </Link>
      </div>
    </div>
  );
}
