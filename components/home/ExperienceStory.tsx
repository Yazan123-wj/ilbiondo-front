"use client";

import Link from "next/link";
import { useRef } from "react";

import { CurtainLine } from "@/components/home/CurtainLine";
import { useIsMobile } from "@/hooks/useIsMobile";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const DISPLAY =
  "font-serif text-[clamp(2.85rem,7.8vw,7.85rem)] leading-[0.9] tracking-[-0.045em] md:leading-[0.88]";

function curtainLines(root: HTMLElement) {
  return gsap.utils.toArray<HTMLElement>("[data-curtain-line]", root);
}

export function ExperienceStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const finalTitleRef = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const blur = blurRef.current;
      const fade = fadeRef.current;
      const finalLayer = finalRef.current;
      const finalTitle = finalTitleRef.current;
      const stage1 = stage1Ref.current;
      const stage2 = stage2Ref.current;

      if (
        !section ||
        !blur ||
        !fade ||
        !finalLayer ||
        !finalTitle ||
        !stage1 ||
        !stage2
      ) {
        return;
      }

      const navLogo = document.querySelector<HTMLElement>("[data-nav-logo]");
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const stage1Lines = curtainLines(stage1);
      const stage2Lines = curtainLines(stage2);
      const finalTitleLine = curtainLines(finalTitle)[0];

      gsap.set(stage1Lines, { yPercent: 110 });
      gsap.set(stage2Lines, { yPercent: 110 });
      gsap.set(stage2, { autoAlpha: 0 });
      gsap.set(stage1, { autoAlpha: 1 });
      gsap.set(finalLayer, { autoAlpha: 0, y: 36 });
      gsap.set(fade, { autoAlpha: 0 });
      if (finalTitleLine) {
        gsap.set(finalTitleLine, { yPercent: 110 });
      }
      gsap.set(blur, { filter: "blur(0px)", autoAlpha: 1, scale: 1 });

      if (reduceMotion) {
        gsap.set([...stage1Lines, ...stage2Lines], { yPercent: 0 });
        gsap.set(finalLayer, { autoAlpha: 1, y: 0 });
        if (finalTitleLine) {
          gsap.set(finalTitleLine, { yPercent: 0 });
        }
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "experience-copy",
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      const enter = 0.1;
      const hold = 0.28;
      const leave = 0.08;
      const stage1Out = enter + hold;
      const stage2In = stage1Out + 0.02;
      const stage2Out = stage2In + enter + hold;

      timeline.to(
        stage1Lines,
        { yPercent: 0, duration: enter, stagger: 0.02 },
        0,
      );
      timeline.to(
        stage1Lines,
        { yPercent: -108, duration: leave, stagger: 0.015 },
        stage1Out,
      );
      timeline.to(stage1, { autoAlpha: 0, duration: 0.04 }, stage1Out + leave - 0.02);

      timeline.set(stage2, { autoAlpha: 1 }, stage2In);
      timeline.to(
        stage2Lines,
        { yPercent: 0, duration: enter, stagger: 0.02 },
        stage2In,
      );
      timeline.to(
        stage2Lines,
        { yPercent: -108, duration: leave, stagger: 0.015 },
        stage2Out,
      );
      timeline.to(stage2, { autoAlpha: 0, duration: 0.05 }, stage2Out + 0.03);

      if (navLogo) {
        timeline.fromTo(
          navLogo,
          { autoAlpha: 1, y: 0 },
          { autoAlpha: 0, y: -8, duration: 0.08, immediateRender: false },
          stage2Out,
        );
      }

      timeline.to(fade, { autoAlpha: 1, duration: 0.1 }, stage2Out);
      timeline.to(
        blur,
        {
          filter: `blur(${isMobile ? 10 : 14}px)`,
          autoAlpha: 0.42,
          duration: 0.1,
        },
        stage2Out + 0.02,
      );
      timeline.to(
        finalLayer,
        { autoAlpha: 1, y: 0, duration: 0.1 },
        stage2Out + 0.04,
      );
      if (finalTitleLine) {
        timeline.to(finalTitleLine, { yPercent: 0, duration: 0.08 }, stage2Out + 0.06);
      }

      return () => {
        ScrollTrigger.getById("experience-copy")?.kill();
      };
    },
    {
      dependencies: [isMobile],
      scope: sectionRef,
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[240vh] overflow-x-clip bg-background md:h-[260vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-background">
        <div
          ref={finalRef}
          className="pointer-events-none absolute inset-0 z-50 flex items-end justify-center px-6 pb-[18vh] text-center md:pb-[16vh]"
        >
          <div className="pointer-events-auto max-w-xl">
            <div ref={finalTitleRef}>
              <CurtainLine>
                <h2 className="font-serif text-[1.85rem] leading-[1.15] tracking-tight md:text-[2.35rem]">
                  Your suit begins here.
                </h2>
              </CurtainLine>
            </div>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-foreground/80 md:text-base md:leading-8">
              IL BIONDO is the atelier where a garment is cut, fitted and
              finished around one person. Cloth, proportion and detail are
              chosen with you — then made by hand until the suit is yours.
            </p>
            <Link
              href="/appointments"
              className="mt-8 inline-flex bg-accent px-7 py-3 text-[11px] tracking-[0.22em] text-background uppercase transition-opacity hover:opacity-85"
            >
              Book your Appointment
            </Link>
          </div>
        </div>

        <div
          ref={blurRef}
          className="pointer-events-none absolute inset-0 z-20 will-change-[filter,opacity]"
        >
          <div
            ref={stage1Ref}
            className="absolute inset-0 z-10 flex items-center justify-center px-5 text-center"
          >
            <div>
              <CurtainLine>
                <p className={cn(DISPLAY, "uppercase")}>A CONSIDERED</p>
              </CurtainLine>
              <CurtainLine>
                <p className={DISPLAY}>
                  <em className="mr-3 font-serif font-normal tracking-normal text-accent italic">
                    approach to
                  </em>
                  <span className="uppercase">TAILORING.</span>
                </p>
              </CurtainLine>
            </div>
          </div>

          <div
            ref={stage2Ref}
            className="absolute inset-0 z-10 flex items-center justify-center px-5 text-center"
          >
            <div>
              <CurtainLine>
                <p className={cn(DISPLAY, "uppercase")}>MADE FOR</p>
              </CurtainLine>
              <CurtainLine>
                <p className={DISPLAY}>
                  <em className="font-serif font-normal tracking-normal text-accent italic">
                    one.
                  </em>
                </p>
              </CurtainLine>
            </div>
          </div>

          <div
            ref={fadeRef}
            className="absolute inset-x-0 bottom-0 z-30 h-[42vh] bg-gradient-to-t from-background via-background/75 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
