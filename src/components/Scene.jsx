import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Clouds,
  Cloud,
  Text3D,
  Sky,
  Html,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { Physics } from "@react-three/rapier";
import { RigidBody } from "@react-three/rapier";
import World from "./3d-models/World";
import Floor from "./3d-models/Floor";
import Wolf from "./3d-models/Wolf";
import Centipede from "./3d-models/Centipede";
import BurnedLog from "./3d-models/BurnedLog";

import "../css/StartText.css";

const LOG_POSITIONS = [
  { pos: [68, -25, 12], rot: [1, 6, 67] },
  { pos: [65, -24, 16], rot: [0, 4, 3] },
  { pos: [65, -24, 24], rot: [1.5, 4, 2.7] },
  { pos: [58, -24, 24], rot: [2, 4, 3.2] },
  { pos: [58, -20, 24], rot: [3, 4, 3.2] },
];

const CHAPTERS = [
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
    position: [60, -25, -3],
    lookAt: [55, -20, 15],
  },
  {
    position: [-65, -25, -70],
    lookAt: [-60, -2, -50],
  },
];

const lerpVector = (start, end, alpha) => {
  return new THREE.Vector3(
    start[0] + (end[0] - start[0]) * alpha,
    start[1] + (end[1] - start[1]) * alpha,
    start[2] + (end[2] - start[2]) * alpha
  );
};

const Scene = React.memo(({ scene, home, chapter }) => {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const cameraRef = useRef();
  const controlsRef = useRef();

  const htmlPosition = useMemo(() => new THREE.Vector3(-2, -2, -10), []);

  const handleNextChapter = useCallback(() => {
    if (!isAnimating && chapterIndex < CHAPTERS.length - 1) {
      setPreviousIndex(chapterIndex);
      setChapterIndex((prev) => prev + 1);
      setIsAnimating(true);
    }
  }, [chapterIndex, isAnimating]);

  useEffect(() => {
    if (chapter) {
      handleNextChapter();
    }
  }, [chapter, handleNextChapter]);

  useEffect(() => {
    const handleKeyNavigation = (event) => {
      if (isAnimating) return;

      switch (event.key) {
        case "ArrowRight":
          if (chapterIndex < CHAPTERS.length - 1) {
            setPreviousIndex(chapterIndex);
            setChapterIndex((prev) => prev + 1);
            setIsAnimating(true);
          }
          break;
        case "ArrowLeft":
          if (chapterIndex > 0) {
            setPreviousIndex(chapterIndex);
            setChapterIndex((prev) => prev - 1);
            setIsAnimating(true);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyNavigation);
    return () => window.removeEventListener("keydown", handleKeyNavigation);
  }, [chapterIndex, isAnimating]);

  useEffect(() => {
    let animationFrame;
    const duration = 1000;
    let startTime;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      if (progress < 1 && cameraRef.current && controlsRef.current) {
        const startPos = CHAPTERS[previousIndex].position;
        const endPos = CHAPTERS[chapterIndex].position;
        const startLookAt = CHAPTERS[previousIndex].lookAt;
        const endLookAt = CHAPTERS[chapterIndex].lookAt;

        const currentPos = lerpVector(startPos, endPos, eased);
        const currentTarget = lerpVector(startLookAt, endLookAt, eased);

        cameraRef.current.position.set(
          currentPos.x,
          currentPos.y,
          currentPos.z
        );
        controlsRef.current.target.copy(
          new THREE.Vector3(...currentTarget.toArray())
        );
        cameraRef.current.lookAt(controlsRef.current.target);

        cameraRef.current.updateMatrixWorld();
        controlsRef.current.update();

        animationFrame = requestAnimationFrame(animate);
      } else {
        if (cameraRef.current && controlsRef.current) {
          const finalPos = CHAPTERS[chapterIndex].position;
          const finalLookAt = CHAPTERS[chapterIndex].lookAt;

          cameraRef.current.position.set(...finalPos);
          controlsRef.current.target.set(...finalLookAt);
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

  const renderClouds = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, index) => (
        <Cloud
          key={index}
          position={[
            (Math.random() - 0.5) * 200,
            50 + Math.random() * 50,
            (Math.random() - 0.5) * 200,
          ]}
          scale={[
            4 + Math.random() * 3,
            2 + Math.random() * 2,
            1 + Math.random(),
          ]}
          opacity={1}
          speed={0.1 + Math.random() * 0.2}
          segments={20 + Math.floor(Math.random() * 10)}
        />
      )),
    []
  );

  const [clickedLogs, setClickedLogs] = useState(new Set());

  const handleLogClick = useCallback((index) => {
    setClickedLogs((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  }, []);

  const InteractiveLog = React.memo(({ index, pos, rot }) => {
    const rigidBodyRef = useRef();

    useEffect(() => {
      if (clickedLogs.has(index) && rigidBodyRef.current) {
        const impulseStrength = 1;
        const impulseDirection = new THREE.Vector3(
          (Math.random() - 0.5) * impulseStrength,
          impulseStrength,
          (Math.random() - 0.5) * impulseStrength
        );

        rigidBodyRef.current.applyImpulse(impulseDirection, true);
      }
    }, [clickedLogs, index]);

    return (
      <RigidBody
        ref={rigidBodyRef}
        type="dynamic"
        mass={10}
        position={pos}
        rotation={rot}
      >
        <group
          scale={[0.1, 0.1, 0.1]}
          onClick={() => handleLogClick(index)}
          onPointerOver={(e) => {
            document.body.style.cursor = "pointer";
            e.stopPropagation();
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          <BurnedLog />
        </group>
      </RigidBody>
    );
  });

  return (
    <div style={{ aspectRatio: "16/9" }}>
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
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={CHAPTERS[chapterIndex].position}
        />
        <OrbitControls
          ref={controlsRef}
          enabled={scene && !isAnimating}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={chapterIndex === 0 ? -Math.PI / 2 : undefined}
          maxAzimuthAngle={chapterIndex === 0 ? Math.PI / 2 : undefined}
          enableZoom={false}
          target={new THREE.Vector3(...CHAPTERS[chapterIndex].lookAt)}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-10, 10, 10]} intensity={0.5} castShadow />

        <Sky
          distance={450000}
          sunPosition={[100, 20, 100]}
          turbidity={10}
          rayleigh={2}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
          inclination={0.5}
          azimuth={0.25}
        />

        <Clouds>{renderClouds}</Clouds>

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
            <button onClick={handleNextChapter} disabled={isAnimating}>
              Iniciar
            </button>
          </div>
        </Html>

        <Text3D
          fontSize={0.5}
          position={[-6, -20, -54]}
          rotation={[0, -1.5, 0]}
          color={"white"}
          fontWeight={800}
          textAlign={"center"}
          transform
          anchorX={"center"}
          anchorY={"top"}
          font={"/fonts/Sevillana_Regular.json"}
          justify={"center"}
        >
          ¿Sabías qué...?
        </Text3D>
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
            "La deforestación destruye el hábitat \nde los lobos, reduciendo sus presas y \nobligándolos a recorrer grandes distancias. \nEsto altera los ecosistemas y aumenta \nlos conflictos con los humanos.\n\nPuedes usar las flechas de tu teclado \npara navegar por la escena..."
          }
        </Text>

        <Physics>
          <Floor position={[0, -28.2, 0]} />
          <Wolf
            receiveShadow
            castShadow
            position={[-6, -25.5, -58]}
            scale={[14, 14, 14]}
            rotation={[0, -1.5, 0]}
          />
          <Text3D
            fontSize={0.5}
            position={[53, -22, -38]}
            rotation={[0, 0, 0]}
            color={"white"}
            fontWeight={800}
            textAlign={"center"}
            transform
            anchorX={"center"}
            anchorY={"top"}
            font={"/fonts/Sevillana_Regular.json"}
            justify={"center"}
          >
            Además...
          </Text3D>
          <Text
            fontSize={0.5}
            position={[55, -22, -38]}
            rotation={[0, 0, 0]}
            color={"white"}
            fontWeight={800}
            textAlign={"center"}
            transform
            anchorX={"center"}
            anchorY={"top"}
          >
            {
              "La deforestación destruye el hábitat \nde los insectos, reduciendo sus fuentes \nde alimento y refugio. \nEsto obliga a muchas especies a desplazarse \ngrandes distancias en busca de nuevos entornos. \nEsta alteración de los ecosistemas afecta \nla polinización y el ciclo de nutrientes, \ny aumenta el riesgo de extinción\npara algunas especies."
            }
          </Text>
          <Centipede
            position={[50, -27, -30]}
            scale={[18, 18, 18]}
            rotation={[0, 1.5, 0]}
          />
          <Text3D
            fontSize={0.5}
            position={[64, -18, 15.5]}
            rotation={[0, 3, 0]}
            color={"white"}
            fontWeight={800}
            textAlign={"center"}
            transform
            anchorX={"center"}
            anchorY={"top"}
            font={"/fonts/Sevillana_Regular.json"}
            justify={"center"}
          >
            No olvidemos...
          </Text3D>
          <Text
            fontSize={0.5}
            position={[61, -18, 15]}
            rotation={[0, 3, 0]}
            color={"white"}
            fontWeight={800}
            textAlign={"center"}
            transform
            anchorX={"center"}
            anchorY={"top"}
          >
            {
              "La deforestación aumenta el riesgo \nde incendios al eliminar la vegetación \nque ayuda a mantener la humedad \ndel suelo. Esto deja grandes áreas \nde material combustible, facilitando \nla propagación del fuego."
            }
          </Text>

          {LOG_POSITIONS.map((log, index) => (
            <InteractiveLog
              key={index}
              index={index}
              pos={log.pos}
              rot={log.rot}
            />
          ))}

          <World />
        </Physics>
      </Canvas>
    </div>
  );
});

export default Scene;
