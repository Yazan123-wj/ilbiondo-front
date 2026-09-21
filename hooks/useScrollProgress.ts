"use client";

import { useEffect, useState } from "react";

export function useScrollProgress(targetId?: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      if (targetId) {
        const element = document.getElementById(targetId);
        if (!element) {
          return;
        }

        const rect = element.getBoundingClientRect();
        const total = element.offsetHeight - window.innerHeight;
        const value = total <= 0 ? 0 : Math.min(Math.max(-rect.top / total, 0), 1);
        setProgress(value);
        return;
      }

      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total <= 0 ? 0 : window.scrollY / total);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  return progress;
}
