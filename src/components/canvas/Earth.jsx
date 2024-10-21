import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, PositionalAudio } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = ({ isVisible }) => {
  const earth = useGLTF("./planetp/scene.gltf");
  const soundRef = useRef();

  useEffect(() => {
    if (isVisible && soundRef.current) {
      // Play sound when the planet is visible
      soundRef.current.play();
    } else if (soundRef.current) {
      // Stop sound when the planet is not visible
      soundRef.current.stop();
    }
  }, [isVisible]);

  return (
    <>
      <primitive object={earth.scene} scale={1.2} position-y={0} rotation-y={0} />

      {/* Sound attached to the planet */}
      <PositionalAudio
        ref={soundRef}
        url="./sounds/sonic.mp3" // Your sound file
        distance={1}
        loop
      />
    </>
  );
};

const EarthCanvas = () => {
  const canvasRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on intersection of the canvas
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the canvas is visible
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);

  return (
    <div ref={canvasRef} className="h-full"> {/* Wrapper for the canvas to observe visibility */}
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

          {/* Earth Model with Sound */}
          <Earth isVisible={isVisible} />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;


