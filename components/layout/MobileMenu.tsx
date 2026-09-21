"use client";

import Link from "next/link";
import { useEffect } from "react";

import { NAV_GROUPS } from "@/data/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      const panel = document.getElementById("mobile-menu-panel");
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
        y: open ? 0 : 16,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { dependencies: [open], revertOnUpdate: false },
  );

  return (
    <div
      id="mobile-menu-panel"
      className={cn(
        "fixed inset-0 z-40 bg-background px-5 pb-10 pt-24 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
      inert={!open}
      style={{ opacity: 0 }}
    >
      <nav aria-label="Mobile" className="h-full overflow-y-auto">
        <ul className="space-y-10">
          {NAV_GROUPS.map((group) => (
            <li key={group.id}>
              <p className="nav-label text-accent">{group.label}</p>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-serif text-3xl leading-tight transition-colors hover:text-accent"
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
