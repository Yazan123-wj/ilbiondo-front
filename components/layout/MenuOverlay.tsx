"use client";

import Link from "next/link";
import { useEffect } from "react";

import { NAV_GROUPS } from "@/data/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
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
        "fixed inset-0 z-40 bg-background px-6 pb-12 pt-24 md:px-10",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
      inert={!open}
      style={{ opacity: 0 }}
    >
      <nav aria-label="Menu" className="mx-auto h-full max-w-5xl overflow-y-auto">
        <ul className="grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-12">
          {NAV_GROUPS.map((group) => (
            <li key={group.id}>
              <p className="nav-label text-accent">{group.label}</p>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-serif text-3xl leading-tight text-foreground transition-colors hover:text-accent md:text-4xl"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
