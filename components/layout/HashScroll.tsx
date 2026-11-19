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

  const header = document.querySelector("header");
  const offset = (header?.getBoundingClientRect().height ?? 96) + 20;
  const top = node.getBoundingClientRect().top + window.scrollY - offset;
  const reduce = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.scrollTo({
    top: Math.max(0, top),
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

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a[href^='#']");
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      event.preventDefault();
      window.history.pushState(null, "", href);
      scrollToHash(href);
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
