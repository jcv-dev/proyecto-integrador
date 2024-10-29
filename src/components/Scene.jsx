import { Canvas } from "@react-three/fiber";
import TreeStump from "./3d-models/TreeStump";
import { OrbitControls } from "@react-three/drei";
import SummerTree from "./3d-models/Tree";
import CutDownTree from "./3d-models/CutDownTree";

const Scene = () => {
  return (
    <>
      <div className="container" style={{ height: "100%", width: "100%", borderRadius: "25"} }>
        <Canvas camera={{ position: [2, 3, 5] }} style={{borderRadius: "25px"}}>
          <OrbitControls />
          <ambientLight />
          <directionalLight position={[-10, 10, 10]} />
          <directionalLight position={[10, 10, -10]} intensity={5} />
          <TreeStump />
          <SummerTree position={[4, 0, 0]} />
          <CutDownTree position={[-4, 0.2, 0]} />
        </Canvas>
      </div>
    </>
  );
};

export default Scene;
