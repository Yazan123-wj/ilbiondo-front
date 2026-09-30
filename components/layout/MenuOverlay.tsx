"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { MENU_PRIMARY, MENU_SECONDARY } from "@/data/navigation";
import { CONTACT } from "@/lib/contact";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI"] as const;

function isActive(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      const panel = document.getElementById("site-menu-panel");
      if (!panel) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(panel, { autoAlpha: open ? 1 : 0, y: 0 });
        return;
      }

      gsap.to(panel, {
        autoAlpha: open ? 1 : 0,
        y: open ? 0 : 12,
        duration: 0.45,
        ease: "power2.out",
      });
    },
    { dependencies: [open], revertOnUpdate: false },
  );

  return (
    <div
      id="site-menu-panel"
      className={cn(
        "fixed inset-0 z-40 bg-background",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
      {...(open ? {} : { inert: true })}
      style={{ opacity: 0 }}
    >
      <div className="flex h-full flex-col px-5 pt-28 pb-6 md:px-10 md:pt-32 md:pb-8">
        <div className="flex min-h-0 flex-1 items-start justify-between gap-10">
          <nav aria-label="Menu" className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain">
            <ul className="flex flex-col pb-10">
              {MENU_PRIMARY.map((item, index) => {
                const active = isActive(item.href, pathname);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group relative z-10 flex items-center gap-4 py-[0.18em] md:gap-6"
                    >
                      <span className="w-6 shrink-0 font-serif text-[11px] leading-none text-foreground/70 md:w-8 md:text-[13px]">
                        {ROMAN[index]}.
                      </span>
                      <span
                        className={cn(
                          "relative inline-block font-serif text-[clamp(2.15rem,6.2vw,5.35rem)] leading-[0.94] tracking-[-0.035em] text-foreground uppercase",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-x-0 bottom-[0.08em] h-[1.5px] origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                            active
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100",
                          )}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden max-w-[14rem] shrink-0 pt-3 text-right font-serif text-[13px] leading-6 text-foreground md:block">
            <p className="font-serif">Contact:</p>
            {CONTACT.phone ? (
              <p className="font-serif">
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                  {CONTACT.phone}
                </a>
              </p>
            ) : null}
            {CONTACT.email ? (
              <p className="font-serif">
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </p>
            ) : null}
            {!CONTACT.phone && !CONTACT.email ? (
              <>
                <p className="font-serif">{CONTACT.addressLine1}</p>
                <p className="font-serif">{CONTACT.addressLine2}</p>
              </>
            ) : null}
          </div>
        </div>

        <div className="relative z-0 mt-4 flex shrink-0 items-end justify-between md:mt-2 md:justify-end">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-1 hidden justify-center md:flex"
            aria-hidden
          >
            <svg
              viewBox="0 0 12 8"
              className="h-2.5 w-3 text-foreground/45"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M1 1.2 6 6.2 11 1.2" />
            </svg>
          </div>

          <div className="font-serif text-[13px] leading-6 text-foreground/55 italic md:hidden">
            <p className="not-italic">{CONTACT.addressLine2}</p>
          </div>

          <ul className="text-right font-serif text-[13px] leading-6 text-foreground/55 italic md:text-[15px] md:leading-7">
            {MENU_SECONDARY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group relative inline-block"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
