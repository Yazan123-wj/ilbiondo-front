"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type CountUpProps = {
  to: number;
  from?: number;
  pad?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

export function CountUp({
  to,
  from = 0,
  pad = 2,
  duration = 1.15,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const state = { n: from };
      const render = () => {
        el.textContent = String(Math.round(state.n)).padStart(pad, "0");
      };
      render();

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        state.n = to;
        render();
        return;
      }

      gsap.to(state, {
        n: to,
        duration,
        delay,
        ease: "power3.out",
        onUpdate: render,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [to, from, pad, duration, delay] },
  );

  return (
    <span ref={ref} className={cn(className)}>
      {String(from).padStart(pad, "0")}
    </span>
  );
}
