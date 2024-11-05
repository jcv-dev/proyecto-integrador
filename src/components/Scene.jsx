import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import World from "./3d-models/World";

const Scene = ({ scene }) => {
  return (
    <div
      className="container"
      style={{
        aspectRatio: "16/9",
        width: "100%",
        height: "100%",
        borderRadius: "25px",
        position: "relative",
        overflow: "hidden", // Ensure controls don't cause scrollbars
      }}
    >
      <Canvas
        camera={{
          position: [2, 3, 5],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        shadows
        style={{
          borderRadius: "25px",
          background: "#bcdff6",
          touchAction: "none", // Prevents touch events from being blocked
        }}
      >
        <OrbitControls
          enabled={scene}
          minPolarAngle={Math.PI / 4} // Limit vertical rotation
          maxPolarAngle={Math.PI / 2}
          maxAzimuthAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 2}
          minDistance={3} // Limit zoom
          maxDistance={10}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-10, 10, 10]} intensity={0.5} castShadow />
        <World receiveShadow castShadow />
      </Canvas>
    </div>
  );
};

export default Scene;
