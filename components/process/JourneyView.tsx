"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CountUp } from "@/components/bits/CountUp";
import { LogoLoop } from "@/components/bits/LogoLoop";
import { SplitText } from "@/components/bits/SplitText";
import { TiltedCard } from "@/components/bits/TiltedCard";
import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialRule } from "@/components/editorial/EditorialRule";
import {
  editorialBody,
  editorialDisplay,
} from "@/components/editorial/styles";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { MEDIA, PROCESS_IMAGES } from "@/data/editorial-media";
import { PROCESS_STEPS } from "@/data/process";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const IMAGE_LABELS = [
  "ATELIER IMAGE",
  "TAILORING DETAIL",
  "CLOTH DETAIL",
  "TAILORING DETAIL",
  "TAILORING DETAIL",
  "ATELIER IMAGE",
] as const;

const HEADER_OFFSET = 76;

function journeyOffset(nav: HTMLElement | null) {
  return HEADER_OFFSET + (nav?.offsetHeight ?? 0);
}

function JourneyStep({
  number,
  id,
  label,
  title,
  paragraphs,
  cta,
  imageSrc,
  imageLabel,
  reverse,
  showMills,
}: {
  number: string;
  id?: string;
  label: string;
  title: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
  imageSrc: string;
  imageLabel: string;
  reverse: boolean;
  showMills?: boolean;
}) {
  return (
    <article
      id={id}
      data-journey-step
      className="scroll-mt-[var(--journey-scroll-mt,11rem)] py-16 pr-5 md:py-24 md:pr-8 lg:pr-12 pl-10 md:pl-16 lg:pl-20"
    >
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
        <div
          className={cn(
            "md:col-span-6",
            reverse && "md:col-start-7 md:row-start-1",
          )}
        >
          <TiltedCard>
            <EditorialImage
              src={imageSrc}
              alt={label}
              label={imageLabel}
              ratio="editorial"
              parallax
            />
          </TiltedCard>
        </div>

        <div
          className={cn(
            "md:col-span-5",
            reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-8",
          )}
        >
          <p
            className={cn(
              editorialDisplay,
              "text-[clamp(3.4rem,8vw,6.5rem)] leading-none text-accent",
            )}
          >
            <CountUp to={Number(number)} />
          </p>
          <p className="mt-5 text-[11px] tracking-[0.22em] text-accent uppercase">
            {label}
          </p>
          <SplitText
            text={title}
            tag="h2"
            className={cn(
              editorialDisplay,
              "mt-4 block text-[clamp(2.1rem,4.2vw,3.8rem)]",
            )}
            delay={55}
          />
          <div className={cn(editorialBody, "mt-6 space-y-5")}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {cta ? (
            <EditorialCTA href={cta.href} className="mt-8">
              {cta.label}
            </EditorialCTA>
          ) : null}
        </div>
      </div>

      {showMills ? (
        <div className="mt-16 md:mt-20">
          <LogoLoop />
        </div>
      ) : null}
    </article>
  );
}

export function JourneyView() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const scrollToStep = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = Math.max(
      0,
      el.getBoundingClientRect().top + window.scrollY - journeyOffset(navRef.current),
    );
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.history.pushState(null, "", `#${id}`);

    if (reduce) {
      window.scrollTo({ top: y });
      return;
    }

    gsap.to(window, {
      duration: 1.05,
      ease: "power3.inOut",
      overwrite: "auto",
      scrollTo: { y, autoKill: true },
    });
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const applyOffset = () => {
      document.documentElement.style.setProperty(
        "--journey-scroll-mt",
        `${journeyOffset(nav)}px`,
      );
    };

    applyOffset();
    window.addEventListener("resize", applyOffset);
    return () => {
      window.removeEventListener("resize", applyOffset);
      document.documentElement.style.removeProperty("--journey-scroll-mt");
    };
  }, []);

  useGSAP(
    () => {
      const root = timelineRef.current;
      if (!root) return;

      const steps = gsap.utils.toArray<HTMLElement>(
        "[data-journey-step]",
        root,
      );
      const line = root.querySelector<HTMLElement>("[data-progress-line]");

      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });
      });

      if (line) {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        gsap.set(line, { scaleY: reduce ? 1 : 0, transformOrigin: "top center" });

        if (!reduce) {
          gsap.to(line, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 45%",
              end: "bottom 70%",
              scrub: true,
            },
          });
        }
      }
    },
    { scope: timelineRef },
  );

  return (
    <>
      <EditorialHero
        lines={["FROM MEASURE", "TO GARMENT."]}
        image={{
          src: MEDIA.hero,
          alt: "The IL BIONDO journey",
          label: "TAILORING DETAIL",
          ratio: "editorial",
        }}
        lede={
          <>
            <p>A garment does not begin with cloth.</p>
            <p className="mt-5">
              It begins with understanding the person who will wear it.
            </p>
          </>
        }
        meta="THE JOURNEY / IL BIONDO"
      />

      <nav
        ref={navRef}
        aria-label="The journey"
        className={cn(
          "border-y border-accent/10 bg-background px-5 py-6 md:sticky md:top-[4.75rem] md:z-40 md:px-8 md:py-5 lg:px-12",
        )}
      >
        <ol className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-6 md:gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.number}>
              <a
                href={`#${step.id}`}
                onClick={(event) => {
                  if (!step.id) return;
                  event.preventDefault();
                  scrollToStep(step.id);
                }}
                className={cn(
                  "group relative block pb-2 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300",
                  active === index
                    ? "text-accent"
                    : "text-muted hover:text-foreground",
                )}
              >
                <span className="font-serif tracking-[0.08em] text-accent/50">
                  {step.number}
                </span>
                <span className="mt-1 block">{step.label}</span>
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    active === index
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div ref={timelineRef} className="relative">
        <div
          className="pointer-events-none absolute top-0 bottom-0 left-3 hidden w-px overflow-hidden bg-accent/15 md:left-5 md:block lg:left-6"
          aria-hidden
        >
          <span
            data-progress-line
            className="absolute inset-x-0 top-0 block h-full origin-top bg-accent"
          />
        </div>

        {PROCESS_STEPS.map((step, index) => (
          <JourneyStep
            key={step.number}
            number={step.number}
            id={step.id}
            label={step.label}
            title={step.title}
            paragraphs={step.paragraphs}
            cta={step.cta}
            imageSrc={PROCESS_IMAGES[index] ?? MEDIA.library}
            imageLabel={IMAGE_LABELS[index] ?? "TAILORING DETAIL"}
            reverse={index % 2 === 1}
            showMills={step.id === "cloth"}
          />
        ))}
      </div>

      <section className="px-5 pb-20 pt-4 md:px-8 md:pb-32 md:pt-8 lg:px-12">
        <EditorialRule className="mb-12 md:mb-16" />
        <SplitText
          text="ONLY THEN DOES IT LEAVE THE ATELIER."
          tag="p"
          className={cn(
            editorialDisplay,
            "block max-w-5xl text-[clamp(2.2rem,6vw,5.25rem)] uppercase",
          )}
          delay={70}
        />
        <EditorialCTA href="/appointments" className="mt-10">
          Book an Appointment
        </EditorialCTA>
      </section>
    </>
  );
}
