"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  if (!id) {
    return false;
  }

  const node = document.getElementById(id);
  if (!node) {
    return false;
  }

  const reduce = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  node.scrollIntoView({
    block: "start",
    behavior: reduce ? "auto" : "smooth",
  });
  return true;
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      return;
    }

    let attempts = 0;
    let timer = 0;

    const tryScroll = () => {
      if (scrollToHash(hash) || attempts >= 16) {
        return;
      }
      attempts += 1;
      timer = window.setTimeout(tryScroll, 50);
    };

    const frame = window.requestAnimationFrame(tryScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      scrollToHash(window.location.hash);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
