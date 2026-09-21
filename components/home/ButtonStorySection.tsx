"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Group } from "three";

import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary";
import { useIsMobile } from "@/hooks/useIsMobile";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { preloadButtonModel } from "@/lib/product";
import { cn } from "@/lib/utils";

const ButtonCanvas = dynamic(
  () =>
    import("@/components/three/ButtonCanvas").then(
      (module) => module.ButtonCanvas,
    ),
  { ssr: false },
);

const QUOTE =
  "font-serif font-normal tracking-[-0.035em] text-[clamp(3.25rem,16vw,5.125rem)] leading-[0.9] md:text-[clamp(5.75rem,10.5vw,11.125rem)] md:leading-[0.88]";

export function ButtonStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<Group | null>(null);
  const [modelReady, setModelReady] = useState(false);
  const [allowCanvas, setAllowCanvas] = useState(false);
  const isMobile = useIsMobile();

  const handleReady = useCallback(() => {
    setModelReady(true);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          preloadButtonModel();
          setAllowCanvas(true);
        }
      },
      { rootMargin: "2200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const quote = quoteRef.current;
      const group = groupRef.current;
      if (!quote || !modelReady || !group) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const startX = 0.04;
      const startZ = 0.02;
      group.rotation.set(startX, 0, startZ);
      group.scale.setScalar(0.94);

      if (reduceMotion) {
        group.rotation.set(startX, 0.22, startZ);
        group.scale.setScalar(1);
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "button-story",
          trigger: quote,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.85,
          invalidateOnRefresh: true,
          refreshPriority: 3,
        },
      });

      timeline.to(
        group.rotation,
        { x: 0.087, y: Math.PI * 0.55, z: 0.01, duration: 0.32 },
        0,
      );
      timeline.to(
        group.rotation,
        { x: -0.052, y: Math.PI * 1.7, z: -0.02, duration: 0.68 },
        0.32,
      );
      timeline.to(group.scale, { x: 1, y: 1, z: 1, duration: 0.5 }, 0);
      timeline.to(
        group.scale,
        { x: 0.96, y: 0.96, z: 0.96, duration: 0.5 },
        0.5,
      );

      const lines = gsap.utils.toArray<HTMLElement>(
        "[data-quote-line]",
        quote,
      );
      lines.forEach((line, index) => {
        gsap.to(line, {
          yPercent: -4,
          x: index % 2 === 0 ? "-0.6vw" : "0.8vw",
          ease: "none",
          scrollTrigger: {
            trigger: quote,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            refreshPriority: 3,
          },
        });
      });

      return () => {
        ScrollTrigger.getById("button-story")?.kill();
      };
    },
    {
      dependencies: [modelReady, isMobile],
      scope: sectionRef,
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="philosophy-quote"
      className="relative overflow-x-clip bg-background"
    >
      <div ref={quoteRef} className="relative">
        <div className="px-[3.5vw] pt-[16vh] pb-10 md:px-[2.4vw] md:pt-[18vh] md:pb-12">
          <h2 className={cn(QUOTE, "text-foreground")}>
            <span data-quote-line className="relative z-10 block">
              <span className="md:hidden">
                THE BEST
                <br />
                TAILORING
              </span>
              <span className="hidden whitespace-nowrap md:inline">
                THE BEST TAILORING
              </span>
            </span>

            <span className="mt-[0.06em] flex flex-col items-center md:mt-0 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-[1.2vw]">
              <span
                data-quote-line
                className="relative z-10 block md:text-right"
              >
                STARTS BY
              </span>
              <div className="relative z-20 my-5 h-[110px] w-[110px] shrink-0 md:my-0 md:h-[min(16vw,210px)] md:w-[min(16vw,210px)] md:min-h-[160px] md:min-w-[160px]">
                {allowCanvas ? (
                  <CanvasErrorBoundary>
                    <ButtonCanvas
                      groupRef={groupRef}
                      isMobile={isMobile}
                      onReady={handleReady}
                    />
                  </CanvasErrorBoundary>
                ) : null}
              </div>
              <span data-quote-line className="relative z-10 block md:text-left">
                KNOWING
              </span>
            </span>

            <span data-quote-line className="relative z-10 mt-[0.06em] block">
              THE PERSON
            </span>

            <span data-quote-line className="relative z-10 mt-[0.06em] block">
              <span className="md:hidden">
                WHO WILL
                <br />
                WEAR IT.
              </span>
              <span className="hidden whitespace-nowrap md:inline">
                WHO WILL WEAR IT.
              </span>
            </span>
          </h2>

          <p className="mt-10 text-center text-[11px] tracking-[0.22em] text-accent uppercase md:mt-12 md:text-[12px] md:tracking-[0.24em]">
            IL BIONDO
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center px-6 py-16 text-center md:py-20">
        <h3 className="max-w-md font-serif text-[1.85rem] leading-[1.15] tracking-tight md:text-[2.15rem]">
          Your suit deserves
          <br />
          to be made for you.
        </h3>
        <p className="mt-6 font-serif text-base text-muted italic md:text-[1.05rem]">
          We’d be honored to begin it with you.
        </p>
        <Link
          href="/appointments"
          className="mt-8 inline-flex items-center bg-accent px-8 py-3.5 text-[11px] tracking-[0.18em] text-background uppercase transition-opacity hover:opacity-85"
        >
          Start{" "}
          <em className="mx-1.5 font-serif text-[1.05rem] font-normal normal-case leading-none tracking-normal italic">
            your
          </em>{" "}
          Commission
        </Link>
      </div>
    </section>
  );
}
