"use client";

import { useRef, type ReactNode } from "react";

import { EditorialImage } from "@/components/shared/EditorialImage";
import { CurtainLine } from "@/components/home/CurtainLine";
import { EditorialLabel } from "@/components/editorial/EditorialLabel";
import {
  editorialBody,
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
  meta?: string;
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
  meta,
  image,
  aside,
  imageSide = "right",
  tone = "light",
  compact = false,
  align = "start",
  className,
}: EditorialHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const dark = tone === "dark";

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
      const metaEl = root.querySelector("[data-hero-meta]");

      if (reduce) {
        gsap.set([label, copy, metaEl].filter(Boolean), { autoAlpha: 1, y: 0 });
        gsap.set(linesEl, { yPercent: 0 });
        return;
      }

      if (label) gsap.set(label, { autoAlpha: 0, y: 10 });
      gsap.set(linesEl, { yPercent: 105 });
      if (copy) gsap.set(copy, { autoAlpha: 0, y: 14 });
      if (metaEl) gsap.set(metaEl, { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(label, { autoAlpha: 1, y: 0, duration: 0.4 }, 0);
      tl.to(linesEl, { yPercent: 0, duration: 0.88, stagger: 0.1 }, 0.12);
      tl.to(copy, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.55);
      tl.to(metaEl, { autoAlpha: 1, duration: 0.4 }, 0.72);
    },
    { scope: ref },
  );

  const framed = Boolean(image) && imageSide !== "full" && !aside;
  const title = (
    <h1
      className={cn(
        editorialDisplay,
        "mt-6 text-[clamp(2.1rem,6vw,3.35rem)] leading-[1.06] tracking-[-0.03em] md:mt-8",
        compact
          ? "md:text-[clamp(2.35rem,4vw,3.5rem)]"
          : "md:text-[clamp(2.6rem,4.5vw,4rem)]",
        dark || imageSide === "full" ? "text-background" : "text-foreground",
      )}
    >
      {lines.map((line) => (
        <CurtainLine key={line}>
          <span className="block">{line}</span>
        </CurtainLine>
      ))}
    </h1>
  );

  const copy = (
    <>
      {eyebrow ? (
        <EditorialLabel
          number={number}
          tone={dark || imageSide === "full" ? "cream" : "accent"}
        >
          {eyebrow}
        </EditorialLabel>
      ) : null}
      {title}
      {lede ? (
        <div
          data-hero-copy
          className={cn(
            editorialBody,
            "mt-8 md:mt-10",
            (dark || imageSide === "full") && "text-background/80",
          )}
        >
          {lede}
        </div>
      ) : null}
    </>
  );

  const metaLine = meta ? (
    <p
      data-hero-meta
      className={cn(
        "text-[10px] tracking-[0.22em] uppercase",
        framed ? "mt-8 md:mt-0" : "relative mt-12 md:mt-16",
        dark || imageSide === "full" ? "text-background/55" : "text-muted",
      )}
    >
      {meta}
    </p>
  ) : null;

  return (
    <section
      ref={ref}
      className={cn(
        editorialGutter,
        "relative flex flex-col",
        framed
          ? "justify-start pb-8 pt-24 md:h-svh md:min-h-svh md:pb-8 md:pt-28"
          : imageSide === "full" || align === "end"
            ? "min-h-[85svh] justify-end pb-10 pt-24 md:min-h-[100svh] md:pb-14 md:pt-28"
            : "justify-start pb-10 pt-24 md:pb-14 md:pt-28",
        dark ? "bg-accent" : "bg-background",
        className,
      )}
    >
      {imageSide === "full" && image ? (
        <div className="pointer-events-none absolute inset-0">
          <EditorialImage
            {...image}
            ratio={image.ratio ?? "wide"}
            reveal="hero"
            className="h-full min-h-[85svh] w-full md:min-h-[100svh] md:aspect-auto"
          />
          <div className="absolute inset-0 bg-foreground/35" />
        </div>
      ) : null}

      <div
        className={cn(
          "relative grid items-end gap-10 md:grid-cols-12 md:gap-8",
          framed && "md:min-h-0 md:flex-1 md:items-stretch",
          aside ? "md:items-stretch" : !framed && "md:items-start",
          imageSide === "full" && "text-background",
        )}
      >
        <div
          className={cn(
            image && !aside
              ? imageSide === "left"
                ? "md:col-span-5 md:col-start-8"
                : imageSide === "full"
                  ? "md:col-span-7"
                  : "md:col-span-5"
              : aside
                ? "md:col-span-7"
                : "md:col-span-10",
            framed && "flex flex-col justify-between",
          )}
        >
          <div>{copy}</div>
          {framed ? metaLine : null}
        </div>

        {aside ? (
          <div className="md:col-span-5 md:h-0 md:min-h-full">{aside}</div>
        ) : image && imageSide !== "full" ? (
          <div
            className={cn(
              "h-[min(62svh,28rem)] md:h-full md:min-h-0 md:col-span-7",
              imageSide === "left" && "md:col-start-1 md:row-start-1",
            )}
          >
            <EditorialImage
              {...image}
              ratio={image.ratio ?? "portrait"}
              reveal="hero"
              className={image.className ?? "h-full w-full aspect-auto"}
            />
          </div>
        ) : null}
      </div>

      {!framed ? metaLine : null}
    </section>
  );
}
