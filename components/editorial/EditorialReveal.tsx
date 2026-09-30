"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type EditorialRevealProps = {
  children: ReactNode;
  className?: string;
  mode?: "scroll" | "enter";
};

export function EditorialReveal({
  children,
  className,
  mode = "scroll",
}: EditorialRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const lines = gsap.utils.toArray<HTMLElement>(
        "[data-curtain-line]",
        root,
      );
      if (!lines.length) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(lines, { yPercent: 105 });

      if (reduce) {
        gsap.set(lines, { yPercent: 0 });
        return;
      }

      const tween = {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      };

      if (mode === "enter") {
        gsap.to(lines, { ...tween, delay: 0.12 });
        return;
      }

      gsap.to(lines, {
        ...tween,
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [mode] },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
