"use client";

import { useRef, type ElementType } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
};

export function BlurText({
  text,
  className,
  delay = 70,
  duration = 0.7,
  animateBy = "words",
  direction = "bottom",
  threshold = 0.16,
  tag: Tag = "p",
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const units =
    animateBy === "letters" ? Array.from(text) : text.split(/(\s+)/);
  const fromY = direction === "top" ? -18 : 18;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = el.querySelectorAll<HTMLElement>("[data-blur-word]");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set(targets, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: fromY, filter: "blur(12px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          ease: "power3.out",
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
      dependencies: [text, delay, duration, animateBy, direction, threshold],
    },
  );

  const Component = Tag as ElementType;

  return (
    <Component ref={ref} className={cn(className)}>
      {units.map((unit, index) => {
        if (animateBy === "words" && /^\s+$/.test(unit)) {
          return <span key={index}>{unit}</span>;
        }

        return (
          <span
            key={`${unit}-${index}`}
            data-blur-word
            className="inline-block will-change-[transform,filter,opacity]"
          >
            {unit === " " ? "\u00A0" : unit}
          </span>
        );
      })}
    </Component>
  );
}
