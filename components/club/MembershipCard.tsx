import { cn } from "@/lib/utils";

type MembershipCardProps = {
  name?: string;
  className?: string;
};

export function MembershipCard({ name = "Member", className }: MembershipCardProps) {
  return (
    <div
      className={cn(
        "relative aspect-[1.586/1] w-full max-w-md overflow-hidden bg-accent text-[#f3efe8]",
        className,
      )}
    >
      <div className="absolute inset-0 p-7 md:p-8">
        <p className="text-[10px] tracking-[0.38em] uppercase">IL BIONDO Club</p>
        <p className="mt-16 font-serif text-3xl tracking-tight md:text-4xl">
          {name}
        </p>
        <div className="absolute inset-x-7 bottom-7 flex items-end justify-between md:inset-x-8 md:bottom-8">
          <p className="text-[10px] tracking-[0.22em] uppercase opacity-70">
            Private membership
          </p>
          <p className="text-[10px] tracking-[0.22em] uppercase opacity-70">
            Amman
          </p>
        </div>
      </div>
    </div>
  );
}
