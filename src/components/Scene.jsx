import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TreeStump } from "./3d-models/TreeStump";
import { OrbitControls } from "@react-three/drei";

const Scene = () => {
  return (
    <>
      <div className="container" style={{ height: "100%", width: "100%" }}>
        <Canvas camera={{ position: [0, 0, 10] }}>
          <OrbitControls />
          <ambientLight />
          <directionalLight position={[-10, 10, 10]} />
          <directionalLight position={[10, 10, -10]} intensity={5} />
          <TreeStump />
        </Canvas>
      </div>
    </>
  );
};

export default Scene;