import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import World from "./3d-models/World";

const SceneHome = () => {
  return (
    <div style={{ aspectRatio: "16/9", width: "100vw", height: "100%" }}>
      <Canvas
        shadows
        style={{
          touchAction: "none",
          width: "100%",
          height: "100%",
          borderRadius: "25px",
          backgroundColor: "#94d4ed",
        }}
      >
        <PerspectiveCamera makeDefault position={[10, 5, 10]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          target={[0, 0, 0]} // Define el punto de rotación
        />

        {/* Luces para resaltar el objeto en el centro */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[-10, 10, 10]} intensity={0.5} castShadow />

        {/* Opcionalmente puedes añadir un objeto de referencia en el centro */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <World shadows />
      </Canvas>
    </div>
  );
};

export default SceneHome;
