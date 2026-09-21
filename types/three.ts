import type { MutableRefObject } from "react";

export type ProductMotion = {
  rotationY: number;
  x: number;
  y: number;
  scale: number;
};

export type ProductMotionRef = MutableRefObject<ProductMotion>;
