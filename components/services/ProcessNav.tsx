"use client";

import { useEffect, useState } from "react";

import { editorialGutter } from "@/components/editorial/styles";
import type { ProcessStep } from "@/data/process";
import { cn } from "@/lib/utils";

type ProcessNavProps = {
  steps: ProcessStep[];
};

export function ProcessNav({ steps }: ProcessNavProps) {
  const [top, setTop] = useState(80);
  const [active, setActive] = useState(steps[0]?.id);

  useEffect(() => {
    const header = document.querySelector("header");
    const update = () => {
      setTop(Math.round(header?.getBoundingClientRect().height ?? 80));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const nodes = steps
      .map((step) => document.getElementById(step.id))
      .filter((node): node is HTMLElement => node !== null);

    if (!nodes.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const next = visible[0]?.target.id;
        if (next) {
          setActive(next);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps]);

  return (
    <nav
      data-journey-nav
      aria-label="The Experience"
      className={cn(
        editorialGutter,
        "sticky z-30 border-b border-border bg-background/95 backdrop-blur-sm",
      )}
      style={{ top }}
    >
      <ol className="grid grid-cols-4">
        {steps.map((step) => {
          const current = step.id === active;
          return (
            <li key={step.id}>
              <a
                href={`#${step.id}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "group flex h-full flex-col gap-1 border-t pt-3 pb-3 transition-colors md:gap-2 md:pt-4 md:pb-4",
                  current
                    ? "border-accent"
                    : "border-border hover:border-accent",
                )}
              >
                <span className="font-serif text-[10px] tracking-[0.12em] text-accent md:text-sm">
                  {step.number}
                </span>
                <span
                  className={cn(
                    "font-serif text-[0.7rem] leading-snug tracking-tight md:text-[1.05rem] md:leading-snug",
                    current
                      ? "text-accent"
                      : "text-foreground group-hover:text-accent",
                  )}
                >
                  {step.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
