"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { OrthographicCamera, type Group } from "three";

import { ButtonModel } from "@/components/three/ButtonModel";

type ButtonCanvasProps = {
  groupRef: React.RefObject<Group | null>;
  isMobile?: boolean;
  onReady?: () => void;
};

function CameraRig() {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (!(camera instanceof OrthographicCamera)) {
      return;
    }

    camera.position.set(0, 0, 5);
    camera.near = 0.1;
    camera.far = 20;
    const fill = Math.min(size.width, size.height) * 0.82;
    camera.zoom = fill;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

export function ButtonCanvas({
  groupRef,
  isMobile = false,
  onReady,
}: ButtonCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "20% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        orthographic
        className="h-full w-full"
        frameloop={visible ? "always" : "never"}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        camera={{ position: [0, 0, 5], zoom: 120, near: 0.1, far: 20 }}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <CameraRig />
        <ambientLight intensity={isMobile ? 0.62 : 0.5} />
        <hemisphereLight
          color="#fff6ea"
          groundColor="#7a7268"
          intensity={isMobile ? 0.28 : 0.38}
        />
        <directionalLight
          position={[2.2, 2.6, 4.2]}
          intensity={isMobile ? 1.05 : 1.35}
        />
        {!isMobile ? (
          <directionalLight position={[-2.4, 0.5, 1.8]} intensity={0.32} />
        ) : null}
        <Suspense fallback={null}>
          <ButtonModel groupRef={groupRef} onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
