"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { DualToneWordmark } from "@/components/shared/DualToneWordmark";
import { cn } from "@/lib/utils";

type SiteNavProps = {
  inverted?: boolean;
  showLogo?: boolean;
  solid?: boolean;
  logoRef?: React.RefObject<HTMLAnchorElement | null>;
  forceScrolled?: boolean;
};

export function SiteNav({
  inverted = false,
  showLogo = false,
  solid = false,
  logoRef,
  forceScrolled,
}: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);
  const [internalScrolled, setInternalScrolled] = useState(false);

  if (currentPath !== pathname) {
    setCurrentPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!inverted || forceScrolled !== undefined) {
      return;
    }

    const update = () => {
      setInternalScrolled(window.scrollY > window.innerHeight * 0.55);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [inverted, forceScrolled]);

  const scrolled = forceScrolled ?? internalScrolled;
  const light = inverted && !scrolled && !open;
  const pill = solid && !open;
  const hideLogoUntilScroll = Boolean(logoRef);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="relative flex items-center justify-between px-4 py-5 md:px-8">
          <button
            type="button"
            className={cn(
              "pointer-events-auto px-3 py-2 text-[11px] tracking-[0.22em] uppercase transition-colors duration-500 md:px-5 md:py-2.5",
              pill
                ? "bg-accent text-background"
                : light
                  ? "border border-white/40 text-white"
                  : "border border-foreground/20 text-foreground",
            )}
            aria-expanded={open}
            aria-controls="site-menu-panel"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>

          <Link
            href="/contact"
            className={cn(
              "pointer-events-auto px-3 py-2 text-[11px] tracking-[0.22em] uppercase transition-colors duration-500 md:px-5 md:py-2.5",
              pill
                ? "bg-accent text-background"
                : light
                  ? "border border-white/40 text-white"
                  : "border border-foreground/20 text-foreground",
            )}
          >
            Contact
          </Link>

          {showLogo ? (
            <div
              data-nav-logo
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              {logoRef ? (
                <DualToneWordmark
                  ref={logoRef}
                  className={cn(
                    "relative pointer-events-auto text-sm tracking-[0.16em] md:text-xl md:tracking-[0.18em]",
                    hideLogoUntilScroll && "opacity-0",
                  )}
                />
              ) : (
                <Link
                  href="/"
                  className="pointer-events-auto font-serif text-sm leading-none tracking-[0.16em] text-accent uppercase md:text-xl md:tracking-[0.18em]"
                >
                  IL BIONDO
                </Link>
              )}
            </div>
          ) : null}
        </div>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
