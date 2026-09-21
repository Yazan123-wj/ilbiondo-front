"use client";

import Link from "next/link";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export function clipWordmarkToMedia(logo: HTMLElement, media: HTMLElement) {
  const overlay = logo.querySelector("[data-logo-on-media]");
  if (!(overlay instanceof HTMLElement)) {
    return;
  }

  const logoRect = logo.getBoundingClientRect();
  const mediaRect = media.getBoundingClientRect();
  const height = logoRect.height || 1;
  const width = logoRect.width || 1;

  const top = Math.min(
    100,
    Math.max(0, ((mediaRect.top - logoRect.top) / height) * 100),
  );
  const left = Math.min(
    100,
    Math.max(0, ((mediaRect.left - logoRect.left) / width) * 100),
  );
  const bottom = Math.min(
    100,
    Math.max(0, ((logoRect.bottom - mediaRect.bottom) / height) * 100),
  );
  const right = Math.min(
    100,
    Math.max(0, ((logoRect.right - mediaRect.right) / width) * 100),
  );

  overlay.style.clipPath = `inset(${top}% ${right}% ${bottom}% ${left}%)`;
}

type DualToneWordmarkProps = {
  className?: string;
};

export const DualToneWordmark = forwardRef<
  HTMLAnchorElement,
  DualToneWordmarkProps
>(function DualToneWordmark({ className }, ref) {
  return (
    <Link
      ref={ref}
      href="/"
      className={cn(
        "relative inline-block whitespace-nowrap font-serif leading-none uppercase",
        className,
      )}
    >
      <span className="text-accent">IL BIONDO</span>
      <span
        data-logo-on-media
        className="absolute inset-0 text-white"
        aria-hidden
      >
        IL BIONDO
      </span>
    </Link>
  );
});
