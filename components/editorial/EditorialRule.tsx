import { cn } from "@/lib/utils";

type EditorialRuleProps = {
  className?: string;
  tone?: "accent" | "cream";
};

export function EditorialRule({ className, tone = "accent" }: EditorialRuleProps) {
  return (
    <div
      className={cn(
        "h-px w-full",
        tone === "cream" ? "bg-background/20" : "bg-accent/15",
        className,
      )}
      aria-hidden
    />
  );
}
