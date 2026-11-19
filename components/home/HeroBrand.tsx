"use client";

import Link from "next/link";
import { useRef } from "react";

import { DualToneWordmark } from "@/components/shared/DualToneWordmark";
import { gsap, useGSAP } from "@/lib/gsap";

export function HeroBrand() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const lineOneRef = useRef<HTMLParagraphElement>(null);
  const lineTwoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const logo = logoRef.current;
      const lineOne = lineOneRef.current;
      const lineTwo = lineTwoRef.current;
      if (!wrap || !logo || !lineOne || !lineTwo) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set([logo, lineOne, lineTwo], { autoAlpha: 0, y: 0 });

      if (reduceMotion) {
        gsap.set(lineTwo, { autoAlpha: 1 });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      intro.to(logo, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
      intro.to(logo, { autoAlpha: 0, duration: 0.4 }, "+=0.7");
      intro.fromTo(
        lineOne,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" },
        "<0.08",
      );
      intro.to(lineOne, { autoAlpha: 0, y: -6, duration: 0.28 }, "+=0.75");
      intro.fromTo(
        lineTwo,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "<0.12",
      );
    },
    { scope: wrapRef },
  );

  return (
    <div
      ref={wrapRef}
      data-hero-brand
      className="pointer-events-none absolute inset-0 z-20 text-white"
    >
      <DualToneWordmark
        ref={logoRef}
        className="pointer-events-auto invisible absolute top-1/2 left-1/2 z-10 h-28 -translate-x-1/2 -translate-y-1/2 opacity-0 md:h-36"
      />
      <p
        ref={lineOneRef}
        className="invisible absolute top-1/2 left-1/2 w-[min(92vw,46rem)] -translate-x-1/2 -translate-y-1/2 text-center font-serif text-[clamp(2.4rem,6.5vw,5.25rem)] leading-[0.95] tracking-[-0.04em] text-white opacity-0"
      >
        <span className="block tracking-[0.06em] uppercase">A considered</span>
        <em className="mt-2 block font-serif tracking-normal">
          approach to Tailoring
        </em>
      </p>
      <div
        ref={lineTwoRef}
        className="invisible absolute top-1/2 left-1/2 flex w-[min(92vw,40rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center opacity-0"
      >
        <p className="font-serif text-[clamp(2.4rem,6.5vw,5.25rem)] leading-[0.95] tracking-[-0.04em] text-white italic">
          made for one
        </p>
        <Link
          href="/appointments"
          className="pointer-events-auto mt-8 inline-flex items-center border border-white/25 bg-white/10 px-8 py-3 text-[11px] tracking-[0.2em] text-white uppercase backdrop-blur-md transition-[background-color,border-color] duration-300 hover:border-white/40 hover:bg-white/20"
        >
          Book your Appointment
        </Link>
      </div>
    </div>
  );
}
