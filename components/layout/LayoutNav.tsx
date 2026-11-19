"use client";

import { usePathname } from "next/navigation";

import { SiteNav } from "@/components/layout/SiteNav";

const PHOTO_HERO = [
  "/our-story",
  "/services",
  "/club",
  "/appointments",
  "/visit",
];

function hasPhotoHero(pathname: string) {
  return PHOTO_HERO.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function LayoutNav() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <SiteNav inverted={hasPhotoHero(pathname)} showLogo />;
}
