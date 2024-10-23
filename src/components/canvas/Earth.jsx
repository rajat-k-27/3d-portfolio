import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planetp/scene.gltf");

  return (
    <>
      <primitive object={earth.scene} scale={1.2} position-y={0} rotation-y={0} />
    </>
  );
};

const EarthCanvas = () => {
  return (
    <div className="h-full">
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />

          {/* Lighting */}
          <ambientLight intensity={5} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {/* Earth Model */}
          <Earth />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
