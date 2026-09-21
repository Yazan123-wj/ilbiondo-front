"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Group } from "three";

import { ProductScene } from "@/components/three/ProductScene";

type ProductCanvasProps = {
  groupRef: React.RefObject<Group | null>;
  isMobile?: boolean;
  onReady?: () => void;
  className?: string;
};

export function ProductCanvas({
  groupRef,
  isMobile = false,
  onReady,
  className,
}: ProductCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "30% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <Canvas
        className="h-full w-full"
        frameloop={visible ? "always" : "never"}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={isMobile ? [1, 1.15] : [1, 1.25]}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none",
        }}
        camera={{
          position: [0, 0.22, 4.35],
          fov: 27,
          near: 0.1,
          far: 40,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <ProductScene
            groupRef={groupRef}
            isMobile={isMobile}
            onReady={onReady}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
