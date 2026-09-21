export const PRODUCT_MODEL_PATH = "/models/ilbiondo-product.glb";
export const BUTTON_MODEL_PATH = "/models/button.glb";
export const HERO_FABRIC_PATH = "/images/hero-fabric.png";

export function preloadButtonModel() {
  if (typeof window === "undefined") {
    return;
  }

  void import("@react-three/drei").then(({ useGLTF }) => {
    useGLTF.preload(BUTTON_MODEL_PATH);
  });
}
