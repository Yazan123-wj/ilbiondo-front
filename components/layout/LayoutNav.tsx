"use client";

import { usePathname } from "next/navigation";

import { SiteNav } from "@/components/layout/SiteNav";

export function LayoutNav() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <SiteNav showLogo />;
}
