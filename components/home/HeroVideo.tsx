"use client";

export const HERO_IMAGE_PATH = "/images/hero.png";

export function HeroVideo() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#12080a]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_IMAGE_PATH}
        alt="Evening cloth, a chessboard, and a glass in hand"
        fetchPriority="high"
        className="h-full w-full object-cover object-[68%_center]"
      />
    </div>
  );
}
