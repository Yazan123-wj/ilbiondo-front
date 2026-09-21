"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function useScrollAnimation<T extends HTMLElement = HTMLElement>() {
  const scopeRef = useRef<T | null>(null);

  useGSAP(
    () => {
      // Future scroll-driven section animations should be registered here.
      // ScrollTrigger is already registered via `@/lib/gsap`.
    },
    { scope: scopeRef },
  );

  return { scopeRef, gsap, ScrollTrigger };
}
