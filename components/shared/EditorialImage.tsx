"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type EditorialImageProps = {
  src?: string;
  alt: string;
  label: string;
  ratio?: "portrait" | "landscape" | "wide" | "square";
  className?: string;
};

const RATIOS = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  wide: "aspect-video",
  square: "aspect-square",
};

export function EditorialImage({
  src,
  alt,
  label,
  ratio = "landscape",
  className,
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-surface", RATIOS[ratio], className)}>
      {showImage ? (
        // Native img keeps missing public assets from breaking the page.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-end p-6 md:p-8">
          <p className="text-[10px] tracking-[0.28em] uppercase text-muted">{label}</p>
        </div>
      )}
    </div>
  );
}
