import { Canvas } from "@react-three/fiber";
import World from "./3d-models/World";
import { OrbitControls } from "@react-three/drei";


const Scene = () => {
  return (
    <>
      <div className="container" style={{ aspectRatio: "16/9", width: "100%", borderRadius: "25px", position:"relative"}}>
        <Canvas camera={{ position: [2, 3, 5] }} shadows={true} style={{borderRadius: "25px", background: "#bcdff6"}}>
          <OrbitControls />
          <ambientLight />
          <directionalLight position={[-10, 10, 10]} castShadow/>
          <World receiveShadow castShadow/>
        </Canvas>
      </div>
    </>
  );
};

export default Scene;
