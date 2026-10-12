import { PassQr } from "@/components/club/PassQr";
import { BrandMark } from "@/components/shared/BrandMark";
import { cn } from "@/lib/utils";

type MembershipCardProps = {
  name?: string;
  number?: string;
  className?: string;
};

export function MembershipCard({
  name = "John Doe",
  number = "00098533",
  className,
}: MembershipCardProps) {
  const serial = number.startsWith("#") ? number : `#${number}`;

  return (
    <article
      className={cn(
        "relative mx-auto flex aspect-[5/7] w-full max-w-[22rem] flex-col overflow-hidden rounded-[1.35rem] bg-accent px-6 py-6 text-background md:px-7 md:py-7",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 text-background md:h-11 md:w-11">
          <BrandMark mark />
        </div>
        <p className="pt-1 text-[11px] tracking-[0.08em] text-background/80">
          {serial}
        </p>
      </div>

      <div className="mt-10 text-center md:mt-12">
        <p className="font-serif text-[clamp(2rem,6vw,2.55rem)] leading-none tracking-[0.12em]">
          IL BIONDO
        </p>
        <p className="mt-3 text-[11px] tracking-[0.42em] text-background/80 uppercase">
          Jordan
        </p>
      </div>

      <div className="mt-10 md:mt-12">
        <p className="text-[10px] tracking-[0.28em] text-background/70 uppercase">
          Name
        </p>
        <p className="mt-1 font-serif text-[1.65rem] leading-none tracking-tight md:text-[1.85rem]">
          {name}
        </p>
      </div>

      <div className="mt-auto flex justify-center pt-8">
        <div className="w-[46%] rounded-[0.45rem] bg-background p-[0.55rem]">
          <PassQr value={`ILBIONDO-${serial}-${name}`} className="h-full w-full" />
        </div>
      </div>
    </article>
  );
}
