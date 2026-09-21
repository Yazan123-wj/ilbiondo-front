"use client";

import { cn } from "@/lib/utils";

type CurtainLineProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function CurtainLine({
  children,
  className,
  innerClassName,
}: CurtainLineProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div data-curtain-line className={cn("will-change-transform", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
