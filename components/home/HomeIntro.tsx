"use client";

import { useRef, useState } from "react";

import { HeroBrand } from "@/components/home/HeroBrand";
import { HeroLoader } from "@/components/home/HeroLoader";
import { HeroVideo } from "@/components/home/HeroVideo";
import { SiteNav } from "@/components/layout/SiteNav";
import { clipWordmarkToMedia } from "@/components/shared/DualToneWordmark";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

function getLogoTravel(
  heroLogo: HTMLElement,
  navLogo: HTMLElement,
  stage: HTMLElement,
) {
  const stageRect = stage.getBoundingClientRect();
  const navRect = navLogo.getBoundingClientRect();
  const heroWidth = heroLogo.offsetWidth;

  if (!heroWidth || !navRect.width) {
    return { x: 0, y: 0, scale: 1 };
  }

  return {
    x: navRect.left + navRect.width / 2 - (stageRect.left + stageRect.width / 2),
    y: navRect.top + navRect.height / 2 - (stageRect.top + stageRect.height / 2),
    scale: navRect.width / heroWidth,
  };
}

export function HomeIntro() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLAnchorElement>(null);
  const navLogoRef = useRef<HTMLAnchorElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);
  const [navSettled, setNavSettled] = useState(false);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const stage = stageRef.current;
      const frame = frameRef.current;
      const heroLogo = heroLogoRef.current;
      const navLogo = navLogoRef.current;
      const tagline = taglineRef.current;

      if (!hero || !stage || !frame || !heroLogo || !navLogo || !tagline || !done) {
        return;
      }

      const mm = gsap.matchMedia();

      const syncLogoTone = () => {
        clipWordmarkToMedia(heroLogo, frame);
        clipWordmarkToMedia(navLogo, frame);
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(heroLogo, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1 });
        gsap.set(navLogo, { autoAlpha: 1 });
        gsap.set(frame, { scale: 1 });
        syncLogoTone();
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(heroLogo, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: "50% 50%",
        });
        gsap.set(navLogo, { autoAlpha: 0 });
        gsap.set(frame, {
          scale: 1,
          force3D: true,
          transformOrigin: "50% 0%",
        });

        const travel = { x: 0, y: 0, scale: 1 };
        const measureTravel = () => {
          Object.assign(travel, getLogoTravel(heroLogo, navLogo, stage));
        };
        measureTravel();

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: syncLogoTone,
          scrollTrigger: {
            id: "hero-scroll",
            trigger: hero,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.45,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            onUpdate: syncLogoTone,
            onRefresh: () => {
              measureTravel();
              syncLogoTone();
            },
            onLeave: () => setNavSettled(true),
            onEnterBack: () => setNavSettled(false),
          },
        });

        timeline.to(
          tagline,
          {
            autoAlpha: 0,
            y: -12,
            duration: 0.22,
          },
          0.06,
        );

        timeline.fromTo(
          heroLogo,
          { x: 0, y: 0, scale: 1 },
          {
            x: () => travel.x,
            y: () => travel.y,
            scale: () => travel.scale,
            duration: 0.62,
            immediateRender: false,
          },
          0.08,
        );

        timeline.fromTo(
          frame,
          { scale: 1 },
          {
            scale: () => (window.innerWidth < 768 ? 0.96 : 0.94),
            duration: 0.5,
            immediateRender: false,
            force3D: true,
          },
          0.12,
        );

        timeline.to(
          heroLogo,
          {
            autoAlpha: 0,
            duration: 0.1,
            pointerEvents: "none",
          },
          0.68,
        );

        timeline.fromTo(
          navLogo,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.1,
            immediateRender: false,
          },
          0.68,
        );

        syncLogoTone();
        gsap.ticker.add(syncLogoTone);

        void document.fonts.ready.then(() => {
          measureTravel();
          ScrollTrigger.refresh();
          syncLogoTone();
        });

        return () => {
          gsap.ticker.remove(syncLogoTone);
        };
      });

      return () => {
        ScrollTrigger.getById("hero-scroll")?.kill();
        mm.revert();
      };
    },
    { dependencies: [done], scope: heroRef, revertOnUpdate: true },
  );

  return (
    <section
      ref={heroRef}
      className="relative h-[180vh] bg-background md:h-[200vh]"
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-screen overflow-hidden bg-background"
      >
        <div
          ref={frameRef}
          className="absolute inset-0 origin-top overflow-hidden will-change-transform"
        >
          <HeroVideo />
        </div>
        {done ? (
          <HeroBrand logoRef={heroLogoRef} taglineRef={taglineRef} />
        ) : null}
      </div>
      {done ? (
        <SiteNav
          inverted
          solid
          showLogo
          logoRef={navLogoRef}
          forceScrolled={navSettled}
        />
      ) : null}
      {done ? null : (
        <HeroLoader onComplete={() => setDone(true)} />
      )}
    </section>
  );
}
