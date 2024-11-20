import { Canvas } from "@react-three/fiber";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  Clouds,
  Cloud,
  Text3D,
  Sky
} from "@react-three/drei";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import World from "./3d-models/World";
import "../css/StartText.css";
import { Text } from "@react-three/drei";

const Scene = ({ scene, home, chapter }) => {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0); // Track previous index
  const cameraRef = useRef();
  const controlsRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);
  const htmlPosition = new THREE.Vector3(-2, -2, -10);

  const chapters = [
    {
      position: [-2, 0, 8],
      lookAt: [-2, -2, -10],
    },
    {
      position: [-20, -10, -50],
      lookAt: [-2, -28, -55],
    },
    {
      position: [60, -35, -25],
      lookAt: [45, -25, -50],
    },
    {
      position: [-65, -25, -70],
      lookAt: [-60, -2, -50],
    },
    {
      position: [60, -5, 10],
      lookAt: [55, -20, 15],
    },
  ];

  const lerpVector = (start, end, alpha) => {
    return new THREE.Vector3(
      start[0] + (end[0] - start[0]) * alpha,
      start[1] + (end[1] - start[1]) * alpha,
      start[2] + (end[2] - start[2]) * alpha
    );
  };

  useCallback(() => {
    nextChapter();
  }, [chapter]);

  useEffect(() => {
    if (controlsRef.current) {
      const target = new THREE.Vector3(...chapters[chapterIndex].lookAt);
      controlsRef.current.target.copy(target);
    }
  }, [chapterIndex]);

  useEffect(() => {
    let animationFrame;
    let startTime;
    const duration = 1000;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      if (progress < 1 && cameraRef.current && controlsRef.current) {
        const startPos = chapters[previousIndex].position; // Use previousIndex
        const endPos = chapters[chapterIndex].position;
        const startLookAt = chapters[previousIndex].lookAt; // Use previousIndex
        const endLookAt = chapters[chapterIndex].lookAt;

        const currentPos = lerpVector(startPos, endPos, eased);
        const currentTarget = lerpVector(startLookAt, endLookAt, eased);

        cameraRef.current.position.set(
          currentPos.x,
          currentPos.y,
          currentPos.z
        );

        controlsRef.current.target.copy(
          new THREE.Vector3(currentTarget.x, currentTarget.y, currentTarget.z)
        );

        cameraRef.current.lookAt(controlsRef.current.target);
        cameraRef.current.updateMatrixWorld();
        controlsRef.current.update();

        animationFrame = requestAnimationFrame(animate);
      } else {
        if (cameraRef.current && controlsRef.current) {
          const finalPos = chapters[chapterIndex].position;
          const finalLookAt = chapters[chapterIndex].lookAt;

          cameraRef.current.position.set(finalPos[0], finalPos[1], finalPos[2]);

          controlsRef.current.target.set(
            finalLookAt[0],
            finalLookAt[1],
            finalLookAt[2]
          );
          controlsRef.current.update();

          cameraRef.current.lookAt(controlsRef.current.target);
          cameraRef.current.updateMatrixWorld();
        }
        setIsAnimating(false);
      }
    };

    if (isAnimating && cameraRef.current && controlsRef.current) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [chapterIndex, isAnimating, previousIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isAnimating) return;

      switch (event.key) {
        case "ArrowRight":
          if (chapterIndex < chapters.length - 1) {
            setPreviousIndex(chapterIndex); // Store current index before changing
            setChapterIndex((prev) => prev + 1);
            setIsAnimating(true);
          }
          break;
        case "ArrowLeft":
          if (chapterIndex > 0) {
            setPreviousIndex(chapterIndex); // Store current index before changing
            setChapterIndex((prev) => prev - 1);
            setIsAnimating(true);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chapterIndex, isAnimating, chapters.length]);

  const nextChapter = () => {
    if (!isAnimating && chapterIndex < chapters.length - 1) {
      setPreviousIndex(chapterIndex); // Store current index before changing
      setChapterIndex((prev) => prev + 1);
      setIsAnimating(true);
    }
  };

  return (
    <div style={{ aspectRatio: "16/9" }}>
      <Canvas
        shadows
        style={{
          touchAction: "none",
          width: "100%",
          height: "100%",
          borderRadius: "25px",
          backgroundColor: "#94d4ed", // Background color for fallback
        }}
      >
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={chapters[chapterIndex].position}
        />
        <OrbitControls
          ref={controlsRef}
          enabled={scene && !isAnimating}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={chapterIndex === 0 ? -Math.PI / 2 : undefined}
          maxAzimuthAngle={chapterIndex === 0 ? Math.PI / 2 : undefined}
          enableZoom={false}
          target={new THREE.Vector3(...chapters[chapterIndex].lookAt)}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-10, 10, 10]} intensity={0.5} castShadow />

        {/* Add the Sky component */}
        <Sky
          distance={450000} // Distance of the sky dome
          sunPosition={[100, 20, 100]} // Position of the sun
          turbidity={10} // Cloudiness
          rayleigh={2} // Scattering effect
          mieCoefficient={0.005} // Mie scattering coefficient
          mieDirectionalG={0.8} // Anisotropy factor
          inclination={0.5} // Elevation angle
          azimuth={0.25} // Azimuth angle
        />

        {/* Clouds spread across the sky */}
        <Clouds>
          {Array.from({ length: 15 }).map((_, index) => (
            <Cloud
              key={index}
              position={[
                (Math.random() - 0.5) * 200, // Spread across X-axis
                50 + Math.random() * 50, // Spread across Y-axis (higher sky)
                (Math.random() - 0.5) * 200, // Spread across Z-axis
              ]}
              scale={[
                4 + Math.random() * 3, // Randomize size
                2 + Math.random() * 2,
                1 + Math.random(),
              ]}
              opacity={1} // Fully opaque for white clouds
              speed={0.1 + Math.random() * 0.2} // Subtle variation in movement speed
              segments={20 + Math.floor(Math.random() * 10)} // Vary segments for detail
            />
          ))}
        </Clouds>

        <Html
          occlude
          wrapperClass="welcome-text"
          center
          distanceFactor={15}
          transform
          position={htmlPosition}
          rotation={[-0.2, 0, 0]}
          style={
            chapterIndex === 0 && !home
              ? { color: "purple", fontSize: "14pt" }
              : { opacity: "0", color: "purple", fontSize: "14pt" }
          }
        >
          <div className="start-container">
            <div>
              Estás a punto de conocer los devastadores efectos de la
              deforestación.
              <br />
              <br />
              ¿Deseas continuar?
            </div>
            <button onClick={nextChapter} disabled={isAnimating}>
              Iniciar
            </button>
          </div>
        </Html>

        <Text
          fontSize={0.5}
          position={[-6, -21, -50]}
          rotation={[0, -1.5, 0]}
          color={"white"}
          fontWeight={800}
          textAlign={"center"}
          transform
          anchorX={"center"}
          anchorY={"top"}
        >
          {
            "Las ardillas dependen de los árboles \npara construir nidos, refugiarse de \ndepredadores y desplazarse.\nLa tala masiva de árboles \nreduce los espacios donde pueden vivir,\nobligándolas a migrar a otros lugares, \na menudo menos adecuados.\n \nPuedes usar las flechas de tu teclado \npara navegar por la escena..."
          }
        </Text>
        <World receiveShadow castShadow />
      </Canvas>
    </div>
  );
};

export default Scene;
