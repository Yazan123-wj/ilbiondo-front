"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { NAV_GROUPS } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function DesktopNavigation() {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  const open = (id: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }
    setOpenId(id);
  };

  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setOpenId(null), 120);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
      {NAV_GROUPS.map((group) => {
        const isOpen = openId === group.id;

        return (
          <div
            key={group.id}
            className="relative"
            onMouseEnter={() => open(group.id)}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className="nav-label text-foreground/75 transition-colors duration-300 hover:text-foreground"
              aria-expanded={isOpen}
              aria-haspopup="true"
              onFocus={() => open(group.id)}
            >
              {group.label}
            </button>
            <div
              className={cn(
                "absolute right-0 top-full z-50 min-w-56 pt-5 transition-opacity duration-300",
                isOpen ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              <div className="border border-border bg-background px-6 py-5">
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[12px] tracking-[0.16em] uppercase text-foreground/80 transition-colors hover:text-foreground"
                        onClick={() => setOpenId(null)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
