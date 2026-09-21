"use client";

import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import {
  Box3,
  MeshStandardMaterial,
  Vector3,
  type Group,
  type Mesh,
} from "three";

import { BUTTON_MODEL_PATH } from "@/lib/product";

type ButtonModelProps = {
  groupRef: React.RefObject<Group | null>;
  onReady?: () => void;
};

export function ButtonModel({ groupRef, onReady }: ButtonModelProps) {
  const { scene } = useGLTF(BUTTON_MODEL_PATH);
  const innerRef = useRef<Group>(null);
  const readyRef = useRef(false);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner || readyRef.current) {
      return;
    }

    const box = new Box3().setFromObject(inner);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    inner.position.x -= center.x;
    inner.position.y -= center.y;
    inner.position.z -= center.z;

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      inner.scale.setScalar(1 / maxDim);
    }

    inner.traverse((object) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh) {
        return;
      }

      mesh.frustumCulled = false;
      mesh.castShadow = false;
      mesh.receiveShadow = false;

      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      for (const material of materials) {
        if (material instanceof MeshStandardMaterial) {
          material.envMapIntensity = 0.85;
          material.needsUpdate = true;
        }
      }
    });

    readyRef.current = true;
    onReady?.();
  }, [onReady, scene]);

  return (
    <group ref={groupRef} rotation={[0.04, 0, 0.02]}>
      <group ref={innerRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}
