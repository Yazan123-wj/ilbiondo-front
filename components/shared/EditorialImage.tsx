"use client";

import { useRef, useState } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  src?: string;
  alt: string;
  label: string;
  ratio?: "portrait" | "editorial" | "landscape" | "wide" | "square";
  className?: string;
  reveal?: "scroll" | "hero" | "none";
  parallax?: boolean;
};

const RATIOS = {
  portrait: "aspect-[4/5]",
  editorial: "aspect-[3/4]",
  landscape: "aspect-[3/2]",
  wide: "aspect-video",
  square: "aspect-square",
};

export function EditorialImage({
  src,
  alt,
  label,
  ratio = "landscape",
  className,
  reveal = "scroll",
  parallax = false,
}: EditorialImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const media = mediaRef.current;
      if (!wrap || !media || reveal === "none") return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set(wrap, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(media, { scale: 1, yPercent: 0 });
        return;
      }

      gsap.set(wrap, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(media, { scale: 1.08 });

      const revealTween = {
        duration: 1.15,
        ease: "power3.out",
      };

      if (reveal === "hero") {
        gsap.to(wrap, { clipPath: "inset(0% 0% 0% 0%)", ...revealTween, delay: 0.28 });
        gsap.to(media, { scale: 1, duration: 1.25, ease: "power2.out", delay: 0.28 });
      } else {
        gsap.to(wrap, {
          clipPath: "inset(0% 0% 0% 0%)",
          ...revealTween,
          scrollTrigger: { trigger: wrap, start: "top 86%", once: true },
        });
        gsap.to(media, {
          scale: 1,
          duration: 1.25,
          ease: "power2.out",
          scrollTrigger: { trigger: wrap, start: "top 86%", once: true },
        });
      }

      if (parallax) {
        gsap.fromTo(
          media,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: wrapRef, dependencies: [reveal, parallax, showImage] },
  );

  return (
    <div
      ref={wrapRef}
      data-hero-image
      className={cn(
        "relative overflow-hidden bg-[#e7e0d4]",
        RATIOS[ratio],
        className,
      )}
    >
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-end justify-start p-5 md:p-7">
            <p className="text-[9px] tracking-[0.26em] text-foreground/40 uppercase">
              {label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
