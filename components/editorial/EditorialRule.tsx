import { cn } from "@/lib/utils";

type EditorialRuleProps = {
  className?: string;
};

export function EditorialRule({ className }: EditorialRuleProps) {
  return (
    <div
      className={cn("h-px w-full bg-accent/15", className)}
      aria-hidden
    />
  );
}
