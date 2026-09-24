import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { SectionLabel } from "@/components/shared/SectionLabel";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, children, className }: PageHeroProps) {
  return (
    <section className={cn("px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40", className)}>
      {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : null}
      <h1
        className={cn(
          "max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl",
          eyebrow && "mt-6",
        )}
      >
        {title}
      </h1>
      {children ? (
        <div className="mt-8 max-w-2xl space-y-6 font-sans text-base leading-8 text-muted md:text-lg md:leading-9">
          {children}
        </div>
      ) : null}
    </section>
  );
}
