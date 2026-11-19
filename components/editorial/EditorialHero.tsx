"use client";

import { useRef, type ReactNode } from "react";

import { EditorialImage } from "@/components/shared/EditorialImage";
import { CurtainLine } from "@/components/home/CurtainLine";
import { EditorialLabel } from "@/components/editorial/EditorialLabel";
import {
  editorialBody,
  editorialBodyLight,
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type EditorialHeroProps = {
  number?: string;
  eyebrow?: string;
  lines: string[];
  lede?: ReactNode;
  image?: {
    src?: string;
    alt: string;
    label: string;
    ratio?: "portrait" | "editorial" | "landscape" | "wide";
    className?: string;
  };
  aside?: ReactNode;
  imageSide?: "right" | "left" | "full";
  tone?: "light" | "dark";
  compact?: boolean;
  align?: "start" | "end";
  className?: string;
};

export function EditorialHero({
  number,
  eyebrow,
  lines,
  lede,
  image,
  aside,
  imageSide = "full",
  tone = "light",
  compact = false,
  align = "start",
  className,
}: EditorialHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const dark = tone === "dark";
  const cover = Boolean(image) && !aside;
  const onPhoto = cover || dark || imageSide === "full";

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const label = root.querySelector("[data-hero-label]");
      const linesEl = gsap.utils.toArray<HTMLElement>(
        "[data-curtain-line]",
        root,
      );
      const copy = root.querySelector("[data-hero-copy]");

      if (reduce) {
        gsap.set([label, copy].filter(Boolean), { autoAlpha: 1, y: 0 });
        gsap.set(linesEl, { yPercent: 0 });
        return;
      }

      if (label) gsap.set(label, { autoAlpha: 0, y: 10 });
      gsap.set(linesEl, { yPercent: 105 });
      if (copy) gsap.set(copy, { autoAlpha: 0, y: 14 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(label, { autoAlpha: 1, y: 0, duration: 0.4 }, 0);
      tl.to(linesEl, { yPercent: 0, duration: 0.88, stagger: 0.1 }, 0.12);
      tl.to(copy, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.55);
    },
    { scope: ref },
  );

  const title = (
    <h1
      className={cn(
        editorialDisplay,
        "mt-5 text-[clamp(2.1rem,6vw,3.35rem)] leading-[1.06] tracking-[-0.03em] md:mt-6",
        compact
          ? "md:text-[clamp(2.35rem,4vw,3.5rem)]"
          : "md:text-[clamp(2.6rem,4.5vw,4rem)]",
        onPhoto ? "text-background" : "text-foreground",
      )}
    >
      {lines.map((line) => (
        <CurtainLine key={line}>
          <span className="block">{line}</span>
        </CurtainLine>
      ))}
    </h1>
  );

  return (
    <section
      ref={ref}
      className={cn(
        editorialGutter,
        "relative flex flex-col",
        cover
          ? "h-svh min-h-svh justify-end pb-8 pt-28 md:pb-12"
          : align === "end"
            ? "min-h-[85svh] justify-end pb-10 pt-24 md:min-h-[100svh] md:pb-14 md:pt-28"
            : "justify-start pb-10 pt-24 md:pb-14 md:pt-28",
        dark ? "bg-accent" : "bg-background",
        className,
      )}
    >
      {cover && image ? (
        <div className="pointer-events-none absolute inset-0">
          <EditorialImage
            {...image}
            ratio={image.ratio ?? "wide"}
            reveal="hero"
            className="h-full min-h-svh w-full aspect-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/15" />
        </div>
      ) : null}

      <div
        className={cn(
          "relative z-10 grid gap-10 md:grid-cols-12 md:gap-8",
          aside ? "items-end md:items-stretch" : "items-end",
          onPhoto && "text-background",
        )}
      >
        <div
          className={cn(
            aside ? "md:col-span-7" : "md:col-span-6 lg:col-span-5",
          )}
        >
          {eyebrow ? (
            <EditorialLabel
              number={number}
              tone={onPhoto ? "cream" : "accent"}
            >
              {eyebrow}
            </EditorialLabel>
          ) : null}
          {title}
          {lede ? (
            <div
              data-hero-copy
              className={cn(
                onPhoto ? editorialBodyLight : editorialBody,
                "mt-6 max-w-md md:mt-8",
              )}
            >
              {lede}
            </div>
          ) : null}
        </div>

        {aside ? (
          <div className="md:col-span-5 md:h-0 md:min-h-full">{aside}</div>
        ) : null}
      </div>
    </section>
  );
}
