"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { DesktopNavigation } from "@/components/layout/DesktopNavigation";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  if (currentPath !== pathname) {
    setCurrentPath(pathname);
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="relative z-50 flex items-center justify-between px-5 py-5 md:px-10">
        <Link href="/" className="nav-label text-foreground">
          IL BIONDO
        </Link>
        <DesktopNavigation />
        <button
          type="button"
          className="relative h-8 w-8 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={`absolute top-[11px] right-1.5 left-1.5 h-px bg-foreground transition-transform duration-300 ${
              open ? "translate-y-[4.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute top-[20px] right-1.5 left-1.5 h-px bg-foreground transition-transform duration-300 ${
              open ? "-translate-y-[4.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
