import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type PrimaryLinkProps = ComponentProps<typeof Link> & {
  className?: string;
};

export function PrimaryLink({ className, children, ...props }: PrimaryLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex w-fit text-[11px] tracking-[0.28em] text-accent uppercase transition-opacity duration-300 hover:opacity-60",
        className,
      )}
    >
      {children}
    </Link>
  );
}
