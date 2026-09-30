"use client";

import { createElement, useRef, type CSSProperties } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  textAlign?: CSSProperties["textAlign"];
};

export function SplitText({
  text,
  className,
  delay = 50,
  duration = 0.9,
  ease = "power3.out",
  splitType = "words",
  from = { opacity: 0, yPercent: 110 },
  to = { opacity: 1, yPercent: 0 },
  threshold = 0.18,
  tag = "p",
  textAlign,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const units =
    splitType === "chars" ? Array.from(text) : text.split(/(\s+)/);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = el.querySelectorAll<HTMLElement>("[data-split-inner]");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set(targets, { opacity: 1, yPercent: 0, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start: `top ${(1 - threshold) * 100}%`,
            once: true,
          },
        },
      );
    },
    {
      scope: ref,
      dependencies: [text, delay, duration, ease, splitType, threshold],
    },
  );

  return createElement(
    tag,
    {
      ref,
      className: cn(className),
      style: { textAlign, lineHeight: 1.12 },
    },
    units.map((unit, index) => {
      if (splitType === "words" && /^\s+$/.test(unit)) {
        return <span key={index}>{unit}</span>;
      }

      return (
        <span
          key={`${unit}-${index}`}
          className="inline-block overflow-hidden pb-[0.28em] align-bottom leading-[1.12]"
        >
          <span
            data-split-inner
            className="inline-block leading-[1.12] will-change-transform"
          >
            {unit === " " ? "\u00A0" : unit}
          </span>
        </span>
      );
    }),
  );
}
