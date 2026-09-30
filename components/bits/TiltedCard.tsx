"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type TiltedCardProps = {
  children: ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
};

export function TiltedCard({
  children,
  className,
  rotateAmplitude = 7,
  scaleOnHover = 1.02,
}: TiltedCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;

      if (reduce || !canHover) return;

      gsap.set(inner, {
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      });

      const rotX = gsap.quickTo(inner, "rotationX", {
        duration: 0.5,
        ease: "power3.out",
      });
      const rotY = gsap.quickTo(inner, "rotationY", {
        duration: 0.5,
        ease: "power3.out",
      });
      const scale = gsap.quickTo(inner, "scale", {
        duration: 0.5,
        ease: "power3.out",
      });

      const onMove = (event: PointerEvent) => {
        const rect = wrap.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotX(-py * rotateAmplitude * 2);
        rotY(px * rotateAmplitude * 2);
      };

      const onEnter = () => scale(scaleOnHover);
      const onLeave = () => {
        rotX(0);
        rotY(0);
        scale(1);
      };

      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerenter", onEnter);
      wrap.addEventListener("pointerleave", onLeave);

      return () => {
        wrap.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerenter", onEnter);
        wrap.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: wrapRef, dependencies: [rotateAmplitude, scaleOnHover] },
  );

  return (
    <div ref={wrapRef} className={cn("[perspective:900px]", className)}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
