"use client";

import { useRef, useState } from "react";

import { HeroBrand } from "@/components/home/HeroBrand";
import { HeroVideo } from "@/components/home/HeroVideo";
import { SiteNav } from "@/components/layout/SiteNav";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function HomeIntro() {
  const heroRef = useRef<HTMLElement>(null);
  const [navSettled, setNavSettled] = useState(false);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const brand = hero?.querySelector("[data-hero-brand]");
      if (!hero) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (brand) gsap.set(brand, { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (brand) {
          gsap.to(brand, {
            autoAlpha: 0,
            y: -12,
            ease: "none",
            scrollTrigger: {
              id: "hero-brand-fade",
              trigger: hero,
              start: "top top",
              end: "center top",
              scrub: 0.45,
            },
          });
        }

        ScrollTrigger.create({
          id: "hero-nav-ivory",
          trigger: hero,
          start: "bottom top",
          onEnter: () => setNavSettled(true),
          onLeaveBack: () => setNavSettled(false),
        });
      });

      return () => {
        ScrollTrigger.getById("hero-brand-fade")?.kill();
        ScrollTrigger.getById("hero-nav-ivory")?.kill();
        mm.revert();
      };
    },
    { scope: heroRef, revertOnUpdate: true },
  );

  return (
    <section
      ref={heroRef}
      className="relative h-[180vh] bg-background md:h-[200vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        <div className="absolute inset-0 origin-top overflow-hidden">
          <HeroVideo />
        </div>
        <HeroBrand />
      </div>
      <SiteNav inverted solid showLogo forceScrolled={navSettled} />
    </section>
  );
}
