"use client";

import { useRef } from "react";

import { HOUSES } from "@/data/brands";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type LogoLoopProps = {
  className?: string;
  duration?: number;
};

const COPIES = 3;

function MillSequence({ copy }: { copy: number }) {
  return (
    <ul className="flex shrink-0 list-none items-center gap-16 pr-16 md:gap-24 md:pr-24">
      {HOUSES.map((house) => (
        <li key={`${copy}-${house.name}`} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={house.logo}
            alt={copy === 0 ? house.name : ""}
            className="h-10 w-auto max-w-[9rem] object-contain object-center md:h-12 md:max-w-[11rem]"
          />
        </li>
      ))}
    </ul>
  );
}

export function LogoLoop({ className, duration = 36 }: LogoLoopProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.scrollWidth / COPIES;
        const tween = gsap.to(track, {
          x: () => -distance(),
          duration,
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
    { scope: sectionRef, dependencies: [duration] },
  );

  return (
    <div
      ref={sectionRef}
      className={cn("relative overflow-hidden", className)}
      aria-label="Cloth houses"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent md:w-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent md:w-16"
        aria-hidden
      />
      <div
        ref={trackRef}
        className="flex w-max flex-nowrap items-center will-change-transform"
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <MillSequence key={copy} copy={copy} />
        ))}
      </div>
    </div>
  );
}
