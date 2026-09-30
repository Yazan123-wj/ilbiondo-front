"use client";

import { useRef } from "react";

import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialRule } from "@/components/editorial/EditorialRule";
import {
  editorialBody,
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { MEDIA, SERVICE_IMAGES } from "@/data/editorial-media";
import { SERVICES } from "@/data/services";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const OBJECT = [
  "object-center",
  "object-[center_30%]",
  "object-[center_40%]",
  "object-center",
  "object-[center_22%]",
  "object-center",
] as const;

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ServicesView() {
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

      const applyHeight = () => {
        const next = `${Math.round(pin.offsetHeight + getDistance() * 1.15)}px`;
        if (section.style.height !== next) {
          section.style.height = next;
        }
      };

      applyHeight();

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          id: "services-horizontal",
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 2,
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
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
              refreshPriority: 2,
            },
          },
        );
      }

      const goToHash = () => {
        const hash = window.location.hash.replace("#", "");
        const card = hash
          ? track.querySelector<HTMLElement>(`[data-service-id="${hash}"]`)
          : null;
        const trigger = ScrollTrigger.getById("services-horizontal");
        if (!card || !trigger) return;

        const distance = getDistance();
        if (distance <= 0) return;
        const ratio = Math.min(1, Math.max(0, card.offsetLeft / distance));
        window.scrollTo({
          top: trigger.start + ratio * (trigger.end - trigger.start),
        });
      };

      let pending = 0;
      const images = section.querySelectorAll("img");
      const settle = () => {
        applyHeight();
        ScrollTrigger.refresh();
        goToHash();
      };
      images.forEach((image) => {
        if (image.complete) return;
        pending += 1;
        image.addEventListener(
          "load",
          () => {
            pending -= 1;
            if (pending === 0) settle();
          },
          { once: true },
        );
      });

      requestAnimationFrame(settle);
      window.addEventListener("hashchange", goToHash);

      return () => {
        window.removeEventListener("hashchange", goToHash);
        section.style.height = "";
        ScrollTrigger.getById("services-horizontal")?.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <>
      <EditorialHero
        lines={["AT YOUR", "SERVICE."]}
        image={{
          src: MEDIA.elevator,
          alt: "IL BIONDO services",
          label: "ATELIER IMAGE",
          ratio: "editorial",
        }}
        lede={
          <p>
            From a single garment to a complete wardrobe, our services are
            designed around the individual.
          </p>
        }
        meta="SERVICES / IL BIONDO"
      />

      <section
        ref={sectionRef}
        id="all-services"
        className="relative bg-background"
      >
        <div
          ref={pinRef}
          className="sticky top-0 z-10 h-[100svh] overflow-hidden bg-background motion-reduce:relative motion-reduce:h-auto motion-reduce:overflow-visible"
        >
          <div
            ref={trackRef}
            className="flex h-full w-max items-end gap-3 pr-[14vw] pb-10 pl-[5vw] md:gap-4 md:pr-[16vw] md:pb-12 md:pl-[6vw] motion-reduce:h-auto motion-reduce:w-full motion-reduce:flex-col motion-reduce:items-stretch motion-reduce:gap-6 motion-reduce:px-5 motion-reduce:py-24 motion-reduce:pr-5"
          >
            {SERVICES.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                data-service-id={service.id}
                className="relative h-[78vh] w-[min(88vw,42rem)] shrink-0 overflow-hidden bg-surface md:w-[min(48vw,40rem)]"
              >
                <div className="absolute inset-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SERVICE_IMAGES[index] ?? MEDIA.library}
                    alt={service.label}
                    className={cn(
                      "h-full w-full object-cover",
                      OBJECT[index],
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161412]/85 via-[#161412]/20 to-[#161412]/10" />
                </div>
                <p className="absolute top-6 left-6 text-[11px] tracking-[0.32em] text-white/70 uppercase md:top-8 md:left-8">
                  {pad(index)}
                </p>
                <div className="absolute inset-x-6 bottom-6 z-10 md:inset-x-8 md:bottom-8">
                  <h2 className="font-serif text-3xl leading-none tracking-tight text-white md:text-5xl">
                    {service.label}
                  </h2>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-white/80 line-clamp-3 md:max-w-sm md:text-[15px] md:leading-7">
                    {service.paragraphs[0]}
                  </p>
                  <EditorialCTA
                    href={service.cta?.href ?? "/appointments"}
                    tone="light"
                    className="mt-6 hover:text-white"
                  >
                    {service.cta?.label ?? "Book an Appointment"}
                  </EditorialCTA>
                </div>
              </article>
            ))}
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

      <section
        id="book"
        className={cn(
          editorialGutter,
          "bg-background pb-20 pt-20 md:pb-32 md:pt-28",
        )}
      >
        <EditorialRule className="mb-12 md:mb-16" />
        <h2
          className={cn(
            editorialDisplay,
            "text-[clamp(2.4rem,6vw,5.25rem)] uppercase",
          )}
        >
          Make an
          <br />
          appointment.
        </h2>
        <div className={cn(editorialBody, "mt-8 space-y-5 md:mt-10")}>
          <p>Every IL BIONDO journey begins with a conversation.</p>
          <p>
            Reserve a private appointment at our Amman atelier and allow our
            team to guide you through fabrics, proportions, construction and
            the details that will define your garment.
          </p>
        </div>
        <EditorialCTA href="/appointments" className="mt-10">
          Book an Appointment
        </EditorialCTA>
      </section>
    </>
  );
}
