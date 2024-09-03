import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function MovingBox() {
  const meshRef = useRef();
  const [direction, setDirection] = useState(1)

  useFrame(({ clock }) => {
 
    const time = clock.getElapsedTime();
    const speed = 1; 
    const amplitude = 5; 

    // Movimiento en el eje x (rebote)
    meshRef.current.position.x += direction * speed * 0.05; 
    if (meshRef.current.position.x > amplitude || meshRef.current.position.x < -amplitude) {
      setDirection(direction * -1); 
    }

 
    meshRef.current.position.y = Math.cos(time * 2) * 2; 
  });

  return (
    <mesh ref={meshRef} scale={0.3}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color="blue" />
    </mesh>
  );
}

function Scene() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', display: 'block' }}>
      {/* Lighting */}
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <ambientLight intensity={0.5} />

      {/* Insert box */}
      <MovingBox />
    </Canvas>
  );
}

export default Scene;