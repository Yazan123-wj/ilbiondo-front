import { cn } from "@/lib/utils";

type SectionLabelProps = {
  number?: string;
  children: string;
  className?: string;
};

export function SectionLabel({ number, children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] tracking-[0.28em] uppercase text-muted",
        className,
      )}
    >
      {number ? <span>{number}</span> : null}
      <span>{children}</span>
    </p>
  );
}
