import Link from "next/link";

import { cn } from "@/lib/utils";

type EditorialCTAProps = {
  href: string;
  children: string;
  className?: string;
  tone?: "dark" | "light";
};

export function EditorialCTA({
  href,
  children,
  className,
  tone = "dark",
}: EditorialCTAProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex w-fit items-center gap-3 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300",
        tone === "dark" ? "text-foreground hover:text-accent" : "text-background",
        className,
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover:translate-x-2"
      >
        →
      </span>
    </Link>
  );
}
