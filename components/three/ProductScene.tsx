"use client";

import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { PerspectiveCamera, type Group } from "three";

import { ProductModel } from "@/components/three/ProductModel";

type ProductSceneProps = {
  groupRef: React.RefObject<Group | null>;
  isMobile?: boolean;
  onReady?: () => void;
};

function CameraRig({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();

  useLayoutEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) {
      return;
    }

    camera.fov = isMobile ? 30 : 27;
    const shiftX = isMobile ? -0.12 : -0.18;
    camera.position.set(shiftX, 0.22, isMobile ? 4.7 : 4.35);
    camera.near = 0.1;
    camera.far = 40;
    camera.lookAt(shiftX, 0.16, 0);
    camera.updateProjectionMatrix();
  }, [camera, isMobile]);

  return null;
}

export function ProductScene({
  groupRef,
  isMobile = false,
  onReady,
}: ProductSceneProps) {
  return (
    <>
      <CameraRig isMobile={isMobile} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[3.4, 5.4, 4.6]} intensity={1.35} />
      <directionalLight position={[-3.2, 1.6, 2.2]} intensity={0.42} />
      <directionalLight position={[0.1, 2.2, 6]} intensity={0.28} />
      <ProductModel groupRef={groupRef} onReady={onReady} />
    </>
  );
}
