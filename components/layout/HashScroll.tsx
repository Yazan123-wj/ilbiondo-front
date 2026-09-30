"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({
        block: "start",
        behavior: reduce ? "auto" : "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
