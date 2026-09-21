"use client";

import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const skipIntro = pathname === "/";

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || skipIntro) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
        );
      });

      return () => mm.revert();
    },
    { dependencies: [pathname, skipIntro], scope: ref, revertOnUpdate: true },
  );

  return (
    <div ref={ref} className="flex-1">
      {children}
    </div>
  );
}
