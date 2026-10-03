import Link from "next/link";

import {
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className={cn(
        editorialGutter,
        "relative overflow-hidden py-20 md:py-32",
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-8 left-5 font-serif text-[8rem] leading-none text-accent/15 md:top-12 md:left-12 md:text-[12rem]"
      >
        “
      </span>

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="flex items-center justify-center gap-4 text-[11px] tracking-[0.22em] text-muted uppercase">
          <span aria-hidden className="h-px w-10 bg-border md:w-14" />
          In their words
          <span aria-hidden className="h-px w-10 bg-border md:w-14" />
        </p>
        <h2
          className={cn(
            editorialDisplay,
            "mt-6 text-[clamp(2.4rem,6vw,4.6rem)] normal-case tracking-[-0.03em]",
          )}
        >
          How Was Your <span className="text-accent">Experience?</span>
        </h2>
      </div>

      <div className="relative mx-auto mt-12 max-w-lg bg-[#faf7f1] px-8 py-12 text-center md:mt-16 md:px-14 md:py-16">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border">
          <span aria-hidden className="text-accent">
            ◆
          </span>
        </div>
        <h3 className="mt-8 font-serif text-2xl tracking-tight md:text-3xl">
          For cardholders
        </h3>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-muted md:text-base md:leading-8">
          Feedback is open to members of the club. Add your card and tell us as
          often as you like — we read every note.
        </p>
        <Link
          href="#membership"
          className="mt-10 inline-flex bg-accent px-8 py-3.5 text-[11px] tracking-[0.22em] text-background uppercase transition-opacity hover:opacity-85"
        >
          Join our Club
        </Link>
      </div>
    </section>
  );
}
