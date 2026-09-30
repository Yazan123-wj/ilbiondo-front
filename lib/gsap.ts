"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginsRegistered = false;

export function registerGsapPlugins() {
  if (pluginsRegistered || typeof window === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
  pluginsRegistered = true;
}

registerGsapPlugins();

export { gsap, ScrollTrigger, ScrollToPlugin, useGSAP };
export default gsap;
