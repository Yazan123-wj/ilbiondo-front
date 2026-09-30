import { BrandMark } from "@/components/shared/BrandMark";
import { cn } from "@/lib/utils";

type MembershipCardProps = {
  name?: string;
  className?: string;
  tone?: "burgundy" | "cream";
};

export function MembershipCard({
  name = "Member",
  className,
  tone = "burgundy",
}: MembershipCardProps) {
  const burgundy = tone === "burgundy";

  return (
    <div
      className={cn(
        "relative aspect-[1.586/1] w-full max-w-md overflow-hidden",
        burgundy
          ? "bg-accent text-background"
          : "border border-background/15 bg-background text-accent",
        className,
      )}
    >
      <div className="absolute inset-0 p-7 md:p-8">
        <div className="flex items-start justify-between">
          <p className="text-[10px] tracking-[0.32em] uppercase">
            IL BIONDO Club
          </p>
          <div className="h-10 w-10 md:h-12 md:w-12">
            <BrandMark />
          </div>
        </div>
        <p
          className={cn(
            "mt-8 text-[10px] tracking-[0.28em] uppercase",
            burgundy ? "opacity-70" : "opacity-60",
          )}
        >
          Member
        </p>
        <p className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">
          {name}
        </p>
        <div className="absolute inset-x-7 bottom-7 flex items-end justify-between md:inset-x-8 md:bottom-8">
          <p
            className={cn(
              "text-[10px] tracking-[0.22em] uppercase",
              burgundy ? "opacity-60" : "opacity-55",
            )}
          >
            Private membership
          </p>
          <p
            className={cn(
              "text-[10px] tracking-[0.22em] uppercase",
              burgundy ? "opacity-60" : "opacity-55",
            )}
          >
            Amman
          </p>
        </div>
      </div>
    </div>
  );
}
