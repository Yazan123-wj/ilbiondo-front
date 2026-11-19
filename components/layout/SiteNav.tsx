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
  filled?: boolean;
  logoRef?: React.RefObject<HTMLAnchorElement | null>;
  forceScrolled?: boolean;
};

export function SiteNav({
  inverted = false,
  showLogo = false,
  solid = false,
  filled = false,
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
      setInternalScrolled(window.scrollY > window.innerHeight * 0.88);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [inverted, forceScrolled]);

  const scrolled = forceScrolled ?? internalScrolled;
  const light = inverted && !scrolled && !open;
  const pill = solid && !open;
  const ivory = open || filled || !inverted || scrolled;
  const ctaClassName = cn(
    "pointer-events-auto border px-3 py-2 text-[11px] tracking-[0.22em] uppercase transition-colors duration-500 md:px-5 md:py-2.5",
    open
      ? "border-foreground/20 bg-background text-foreground"
      : light
        ? "border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
        : inverted
          ? "border-accent bg-transparent text-accent hover:bg-accent hover:text-background"
          : pill
            ? "border-accent bg-accent text-background"
            : "border-foreground/20 text-foreground hover:border-accent hover:bg-accent hover:text-background",
  );

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 origin-top border-b bg-background transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            ivory
              ? "scale-y-100 border-border"
              : "scale-y-0 border-transparent",
          )}
        />
        <div className="relative flex items-center justify-between px-4 py-5 md:px-8">
          <button
            type="button"
            className={ctaClassName}
            aria-expanded={open}
            aria-controls="site-menu-panel"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>

          {open ? null : (
            <Link href="/contact" className={ctaClassName}>
              Contact
            </Link>
          )}

          {showLogo && !open ? (
            <div
              data-nav-logo
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <DualToneWordmark
                ref={logoRef}
                onMedia={!ivory}
                className="relative pointer-events-auto h-12 md:h-16"
              />
            </div>
          ) : null}
        </div>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
