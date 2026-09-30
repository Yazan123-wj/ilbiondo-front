export const MEDIA = {
  hero: "/images/hero.png",
  fabric: "/images/lifestyle/oxfords.png",
  library: "/images/lifestyle/library.jpg",
  gloves: "/images/lifestyle/gloves.png",
  oxfords: "/images/lifestyle/oxfords.png",
  armchair: "/images/lifestyle/armchair.png",
  bag: "/images/lifestyle/bag.png",
  casino: "/images/lifestyle/casino.png",
  chess: "/images/lifestyle/chess.jpg",
  elevator: "/images/lifestyle/elevator.png",
} as const;

export const SERVICE_IMAGES = [
  MEDIA.library,
  MEDIA.elevator,
  MEDIA.oxfords,
  MEDIA.armchair,
  MEDIA.casino,
  MEDIA.bag,
] as const;

export const PROCESS_IMAGES = [
  MEDIA.library,
  MEDIA.elevator,
  MEDIA.oxfords,
  MEDIA.gloves,
  MEDIA.bag,
  MEDIA.armchair,
] as const;

export const PRIVILEGE_IMAGES = [
  MEDIA.casino,
  MEDIA.library,
  MEDIA.gloves,
  MEDIA.bag,
  MEDIA.armchair,
] as const;
