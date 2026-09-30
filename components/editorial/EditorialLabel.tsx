import { cn } from "@/lib/utils";

type EditorialLabelProps = {
  number?: string;
  children: string;
  className?: string;
  tone?: "accent" | "muted" | "cream";
};

export function EditorialLabel({
  number,
  children,
  className,
  tone = "accent",
}: EditorialLabelProps) {
  return (
    <p
      data-hero-label
      className={cn(
        "text-[11px] tracking-[0.22em] uppercase",
        tone === "accent" && "text-accent",
        tone === "muted" && "text-muted",
        tone === "cream" && "text-background/75",
        className,
      )}
    >
      {number ? `${number} — ${children}` : children}
    </p>
  );
}
