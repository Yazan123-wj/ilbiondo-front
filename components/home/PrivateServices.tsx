"use client";

import Link from "next/link";
import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const FEATURED = [
  {
    number: "01",
    title: "Made to Measure",
    copy: "Your proportions, your cloth, your details — cut from a pattern that already knows you.",
    href: "/services#made-to-measure",
    image: "/images/lifestyle/elevator.png",
    object: "object-[center_18%]",
  },
  {
    number: "02",
    title: "Bespoke",
    copy: "A pattern created from nothing but you. Fittings, posture, and a garment that will exist once.",
    href: "/services#bespoke",
    image: "/images/lifestyle/library.jpg",
    object: "object-center",
  },
  {
    number: "03",
    title: "The Groom",
    copy: "The complete wedding wardrobe, held with care from the first cloth to the morning of.",
    href: "/services#the-groom",
    image: "/images/lifestyle/casino.png",
    object: "object-[center_22%]",
  },
] as const;

export function PrivateServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;

      if (!section || !pin || !track) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        return;
      }

      const getDistance = () =>
        Math.max(0, track.scrollWidth - pin.offsetWidth);

      const scrollTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          id: "featured-horizontal",
          trigger: pin,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 2,
          start: "top top",
          end: () => `+=${getDistance() * 1.15}`,
        },
      });

      if (progress) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => `+=${getDistance() * 1.15}`,
              scrub: 0.85,
              invalidateOnRefresh: true,
              refreshPriority: 2,
            },
          },
        );
      }

      const media = gsap.utils.toArray<HTMLElement>("[data-parallax-media]");
      media.forEach((image) => {
        gsap.fromTo(
          image,
          { xPercent: -14 },
          {
            xPercent: 14,
            ease: "none",
            scrollTrigger: {
              trigger: image.parentElement,
              containerAnimation: scrollTween,
              start: "left 110%",
              end: "left -30%",
              scrub: true,
            },
          },
        );
      });

      const images = section.querySelectorAll("img");
      images.forEach((image) => {
        if (image.complete) {
          return;
        }
        image.addEventListener("load", () => ScrollTrigger.refresh(), {
          once: true,
        });
      });

      return () => {
        ScrollTrigger.getById("featured-horizontal")?.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="featured-services"
      className="relative bg-background"
    >
      <div
        ref={pinRef}
        className="relative h-[100svh] overflow-hidden bg-background motion-reduce:h-auto motion-reduce:overflow-visible"
      >
        <div
          ref={trackRef}
          className="flex h-full w-max items-end gap-3 pr-[14vw] pb-10 pl-[5vw] will-change-transform md:gap-4 md:pr-[16vw] md:pb-12 md:pl-[6vw] motion-reduce:h-auto motion-reduce:w-full motion-reduce:flex-col motion-reduce:items-stretch motion-reduce:px-5 motion-reduce:py-24 motion-reduce:pr-5"
        >
          <div className="flex h-[78vh] w-[min(88vw,42rem)] shrink-0 flex-col justify-end pb-4 md:w-[min(48vw,40rem)]">
            <h2 className="font-serif text-5xl leading-[0.92] tracking-tight md:text-7xl">
              Three ways
              <br />
              to begin
              <em className="font-serif font-normal text-accent italic"> a garment.</em>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted md:text-base md:leading-8">
              Every IL BIONDO commission starts with one person. Move through
              the atelier to choose how closely the piece is built around you.
            </p>
          </div>

          {FEATURED.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group relative block h-[78vh] w-[min(88vw,42rem)] shrink-0 overflow-hidden bg-surface md:w-[min(48vw,40rem)]"
            >
              <div className="absolute inset-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-parallax-media
                  src={service.image}
                  alt={service.title}
                  className={cn(
                    "absolute top-0 left-[-12%] h-full w-[130%] max-w-none object-cover",
                    service.object,
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161412]/85 via-[#161412]/20 to-[#161412]/10" />
              </div>
              <p className="absolute top-6 left-6 text-[11px] tracking-[0.32em] text-white/70 uppercase md:top-8 md:left-8">
                {service.number}
              </p>
              <div className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8">
                <h3 className="font-serif text-3xl leading-none tracking-tight text-white md:text-5xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-6 text-white/80 md:max-w-sm md:text-[15px] md:leading-7">
                  {service.copy}
                </p>
              </div>
            </Link>
          ))}

          <div className="flex h-[78vh] w-[min(88vw,42rem)] shrink-0 flex-col justify-end pb-4 md:w-[min(48vw,40rem)]">
            <p className="font-serif text-3xl leading-[1.1] tracking-tight md:text-4xl">
              The rest of the house
              <em className="font-serif font-normal text-accent italic"> awaits.</em>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
              Private wardrobe, club tailoring, and personal styling — all cut
              to the same standard.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex w-fit bg-accent px-8 py-3.5 text-[11px] tracking-[0.22em] text-background uppercase transition-opacity hover:opacity-85"
            >
              View all services
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-5 bottom-6 md:inset-x-10">
          <div className="h-px overflow-hidden bg-border">
            <div
              ref={progressRef}
              className="h-full w-full origin-left bg-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
