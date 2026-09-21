"use client";

import { useRef } from "react";

import { DualToneWordmark } from "@/components/shared/DualToneWordmark";
import { gsap, useGSAP } from "@/lib/gsap";

type HeroBrandProps = {
  logoRef: React.RefObject<HTMLAnchorElement | null>;
  taglineRef: React.RefObject<HTMLParagraphElement | null>;
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
        className="pointer-events-auto absolute top-1/2 left-1/2 z-10 text-5xl tracking-[0.2em] md:text-7xl"
      />
      <div className="absolute top-[calc(50%+2.75rem)] left-1/2 w-max -translate-x-1/2 md:top-[calc(50%+3.85rem)]">
        <p
          ref={taglineRef}
          className="font-serif text-sm tracking-[0.16em] text-white/90 italic md:text-base"
        >
          A considered approach to modern tailoring.
        </p>
      </div>
    </div>
  );
}
