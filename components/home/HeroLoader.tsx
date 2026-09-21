"use client";

import { useRef, useState, type RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

type HeroLoaderProps = {
  videoRef?: RefObject<HTMLVideoElement | null>;
  onComplete: () => void;
};

function windowMetrics() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const width = viewportWidth < 768 ? 110 : 128;
  const height = Math.round(width * (9 / 16));
  const scale =
    Math.max(viewportWidth / width, viewportHeight / height) * 1.04;

  return {
    width,
    height,
    endWidth: width * scale,
    endHeight: height * scale,
  };
}

function applyHole(
  mask: HTMLDivElement,
  frame: HTMLDivElement,
  width: number,
  height: number,
) {
  mask.style.setProperty("--hole-w", `${width}px`);
  mask.style.setProperty("--hole-h", `${height}px`);
  frame.style.width = `${Math.max(width, 0)}px`;
  frame.style.height = `${Math.max(height, 0)}px`;
}

export function HeroLoader({ videoRef, onComplete }: HeroLoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const topCopyRef = useRef<HTMLDivElement>(null);
  const bottomCopyRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const mask = maskRef.current;
      const frame = frameRef.current;
      const topCopy = topCopyRef.current;
      const bottomCopy = bottomCopyRef.current;
      const meta = metaRef.current;
      const line = lineRef.current;
      const video = videoRef?.current;
      if (!overlay || !mask || !frame || !topCopy || !bottomCopy || !meta || !line) {
        return;
      }

      const html = document.documentElement;
      const body = document.body;
      const previousHtmlOverflow = html.style.overflow;
      const previousBodyOverflow = body.style.overflow;
      const metrics = windowMetrics();

      html.style.overflow = "hidden";
      body.style.overflow = "hidden";

      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      const hole = { width: 0, height: 0 };
      const progress = { value: 0 };
      applyHole(mask, frame, 0, 0);
      gsap.set([topCopy, bottomCopy], { y: 0 });
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(frame, { autoAlpha: 0 });

      const finish = () => {
        html.style.overflow = previousHtmlOverflow;
        body.style.overflow = previousBodyOverflow;
        onComplete();
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(progress, {
          value: 100,
          duration: 0.8,
          ease: "none",
          onUpdate: () => setPercent(progress.value),
        });
        gsap.to(overlay, { autoAlpha: 0, duration: 0.3, delay: 0.8, onComplete: finish });
        return () => {
          html.style.overflow = previousHtmlOverflow;
          body.style.overflow = previousBodyOverflow;
        };
      }

      const timeline = gsap.timeline({ onComplete: finish });

      timeline.to(progress, {
        value: 100,
        duration: 2.85,
        ease: "none",
        onUpdate: () => setPercent(progress.value),
      }, 0);
      timeline.to(line, { scaleX: 1, duration: 2.85, ease: "none" }, 0);

      timeline.to(topCopy, { y: -56, duration: 0.7, ease: "power3.inOut" }, 0.38);
      timeline.to(bottomCopy, { y: 56, duration: 0.7, ease: "power3.inOut" }, 0.38);

      timeline.to(
        hole,
        {
          width: metrics.endWidth,
          height: metrics.endHeight,
          duration: 2.25,
          ease: "power4.inOut",
          onStart: () => {
            gsap.set(overlay, { backgroundColor: "transparent" });
            void video?.play();
          },
          onUpdate: () => applyHole(mask, frame, hole.width, hole.height),
        },
        0.5,
      );

      timeline.to(frame, { autoAlpha: 1, duration: 0.22, ease: "power2.out" }, 0.55);
      timeline.to(frame, { autoAlpha: 0, duration: 0.32, ease: "power2.out" }, 1.05);
      timeline.to(
        [topCopy, bottomCopy, meta],
        { autoAlpha: 0, duration: 0.42, ease: "power2.out" },
        1.45,
      );

      return () => {
        html.style.overflow = previousHtmlOverflow;
        body.style.overflow = previousBodyOverflow;
      };
    },
    { scope: overlayRef },
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-background"
      aria-busy="true"
      aria-live="polite"
    >
      <div ref={maskRef} className="hero-loader-mask absolute inset-0" />
      <div
        ref={frameRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-black/15"
      />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-black">
        <div ref={topCopyRef}>
          <p className="font-serif text-[2.7rem] leading-[0.95] tracking-[0.08em] uppercase md:text-7xl">
            Bespoke,
          </p>
          <p className="mt-1 font-serif text-[2.7rem] leading-[0.95] tracking-[0.08em] uppercase md:text-7xl">
            <em className="mr-3 font-serif tracking-normal normal-case">made</em>
            Personal.
          </p>
        </div>
        <div ref={bottomCopyRef}>
          <p className="font-serif text-[2.7rem] leading-[0.95] tracking-[0.08em] uppercase md:text-7xl">
            A considered
          </p>
          <p className="mt-1 font-serif text-[2.7rem] leading-[0.95] tracking-[0.08em] uppercase md:text-7xl">
            <em className="mr-3 font-serif tracking-normal normal-case">
              approach.
            </em>
          </p>
        </div>
      </div>

      <div
        ref={metaRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30"
      >
        <p className="mb-3 text-center text-[11px] tracking-[0.28em] text-black uppercase">
          {`${String(Math.round(percent)).padStart(3, "0")}%`}
        </p>
        <div className="h-[2px] w-full bg-black/15">
          <div ref={lineRef} className="h-full w-full origin-left bg-black" />
        </div>
      </div>
    </div>
  );
}
