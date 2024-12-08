import {
  db,
  doc,
  getDoc,
  setDoc,
  auth,
  updateDoc,
} from "../config/firebaseConfig";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Stars, PositionalAudio } from "@react-three/drei";
import Chainsaw from "./3d-models/Chainsaw";
import { Text } from "@react-three/drei";
import Excavator from "./3d-models/Excavator";
import Wrench from "./3d-models/Wrench";
import Elephant from "./3d-models/Elephant";
import Monkey from "./3d-models/Monkey";
import Dolphin from "./3d-models/Dolphin";
import Matches from "./3d-models/Matches";
import Crowbar from "./3d-models/Crowbar";
import Flashlight from "./3d-models/Flashlight";
import Cactus from "./3d-models/Cactus";
import SadFace from "./3d-models/SadFace";

const cameraPositions = [
  [0, 0, 10],
  [0, 100, 10],
  [0, 300, 10],
  [0, 400, 10],
  [0, 500, 10],
];

const RotatingModel = ({
  ModelComponent,
  position,
  scale,
  initialRotation = [0, 0, 0],
  onClick,
  rotationSpeed = 0.05,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (isHovered && meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={initialRotation}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <ModelComponent scale={scale} onClick={onClick} />
    </group>
  );
};

const QuizScene = () => {
  const audioRef = useRef();
  const user = auth.currentUser;
  const [rewardText, setRewardText] = useState("");
  const [rewardTitle, setRewardTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    if (correct === 0 || correct === 1) {
      setRewardText(
        "¡Vaya, parece que no has acertado casi nada!\n¿Acaso te has despistado...?\n\nDesde ahora, te llamaremos: 'Aprendiz Lento'.\nResultado: " +
          correct +
          "/4"
      );
    } else if (correct === 2) {
      setRewardText(
        "¡Muy bien, has acertado un poco!\n\nDesde ahora, te llamaremos: 'Defensor Natural en Formación'.\nResultado: " +
          correct +
          "/4"
      );
    } else if (correct === 3) {
      setRewardText(
        "¡Excelente, has acertado bastante!\n\nDesde ahora, te llamaremos: 'Defensor de la Naturaleza'.\nResultado: " +
          correct +
          "/4"
      );
    } else if (correct === 4) {
      setRewardText(
        "¡Has acertado todo!\n¡Felicitaciones!\n\nDesde ahora, te llamaremos: 'Guardián del Bosque'.\nResultado: " +
          correct +
          "/4"
      );
    }
  }, [correct]);

  const getProgressFB = async () => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      setProgress(userData.progress || 0);
      setCorrect(userData.correct || 0);
    }
  };

  const setProgressFB = async () => {
    const userDocRef = doc(db, "users", user.uid);

    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          progress: progress,
          correct: correct,
        });
      }
    } catch (error) {
      console.error("Error setting progress:", error);
    }
  };

  const handleClick = (bool) => {
    if (bool) {
      setCorrect(correct + 1);
      console.log("Correct");
    } else {
      console.log("Incorrect");
    }
    setProgress(progress + 1);
  };

  useEffect(() => {
    setProgressFB();
  }, [progress, correct]);

  useEffect(() => {
    getProgressFB();
    if (audioRef.current) {
      const audio = audioRef.current;
      const playAudio = async () => {
        try {
          await audio.context.resume();
          audio.play();
        } catch (error) {
          console.error("Audio play error:", error);
        }
      };
      playAudio();
    }
  }, []);

  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "black",
        borderRadius: "25px",
      }}
    >
      <PerspectiveCamera makeDefault position={cameraPositions[progress]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[-10, 10, 10]} intensity={0.5} castShadow />
      <directionalLight position={[10, 10, 10]} intensity={0.5} castShadow />
      <directionalLight position={[10, 195, 10]} intensity={0.5} castShadow />
      <Stars
        radius={500}
        depth={50}
        count={50000}
        factor={4}
        saturation={0}
        fade={true}
      />
      <PositionalAudio
        ref={audioRef}
        url="/audios/quiz-song.mp3"
        loop={true}
        autoplay
        volume={0.3}
      />

      <Text
        fontSize={5}
        position={[0, 30, -95]}
        rotation={[0, 0, 0]}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        transform
        anchorX={"center"}
        anchorY={"top"}
        justify={"center"}
      >
        {"¿Cuál de los siguientes elementos\nse usa para derribar árboles?"}
      </Text>

      <RotatingModel
        ModelComponent={Chainsaw}
        position={[-8, -4, -10]}
        scale={[0.1, 0.1, 0.1]}
        initialRotation={[0, -0.5, 0]}
        onClick={() => handleClick(true)}
        rotationSpeed={0.03}
      />
      <RotatingModel
        ModelComponent={Excavator}
        position={[0, -4, -10]}
        scale={[0.8, 0.8, 0.8]}
        initialRotation={[0, -0.5, 0]}
        onClick={() => handleClick(false)}
        rotationSpeed={0.03}
      />
      <RotatingModel
        ModelComponent={Wrench}
        position={[8, -4, -10]}
        scale={[0.05, 0.05, 0.05]}
        initialRotation={[0, -0.5, 0]}
        onClick={() => handleClick(false)}
        rotationSpeed={0.03}
      />

      <Text
        fontSize={5}
        position={[0, 130, -95]}
        rotation={[0, 0, 0]}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        transform
        anchorX={"center"}
        anchorY={"top"}
        justify={"center"}
      >
        {
          "¿Qué animal suele habitar en los bosques\n y se ve afectado por la deforestación?"
        }
      </Text>

      <RotatingModel
        ModelComponent={Elephant}
        position={[-8, 95, -10]}
        scale={[2.5, 2.5, 2.5]}
        initialRotation={[0, -0.5, 0]}
        onClick={() => handleClick(false)}
        rotationSpeed={0.03}
      />
      <RotatingModel
        ModelComponent={Monkey}
        position={[0, 95, -10]}
        scale={[0.4, 0.4, 0.4]}
        initialRotation={[0, -0.5, 0]}
        onClick={() => handleClick(true)}
        rotationSpeed={0.03}
      />
      <RotatingModel
        ModelComponent={Dolphin}
        position={[8, 96, -10]}
        scale={[0.005, 0.005, 0.005]}
        initialRotation={[0, -0.5, 0]}
        onClick={() => handleClick(false)}
        rotationSpeed={0.03}
      />

      <Text
        fontSize={5}
        position={[0, 330, -95]}
        rotation={[0, 0, 0]}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        transform
        anchorX={"center"}
        anchorY={"top"}
        justify={"center"}
      >
        {
          "¿Qué objeto se utiliza para encender fuegos\n que pueden contribuir a la deforestación por quema?"
        }
      </Text>

      <RotatingModel
        ModelComponent={Matches}
        position={[-100, 270, -200]}
        scale={[0.055, 0.055, 0.055]}
        initialRotation={[1, -0.5, 0]}
        onClick={() => handleClick(true)}
        rotationSpeed={0.03}
      />

      <RotatingModel
        ModelComponent={Crowbar}
        position={[0, 295, -10]}
        scale={[10, 10, 10]}
        initialRotation={[0, -0.5, 0]}
        onClick={() => handleClick(false)}
        rotationSpeed={0.03}
      />

      <RotatingModel
        ModelComponent={Flashlight}
        position={[8, 296, -10]}
        scale={[15, 15, 15]}
        initialRotation={[0, -0.5, 0]}
        onClick={() => handleClick(false)}
        rotationSpeed={0.03}
      />

      <Text
        fontSize={5}
        position={[0, 430, -95]}
        rotation={[0, 0, 0]}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        transform
        anchorX={"center"}
        anchorY={"top"}
        justify={"center"}
      >
        {"Ante la pérdida de nuestros ecosistemas, yo..."}
      </Text>

      <Text
        fontSize={3}
        position={[-40, 400, -95]}
        rotation={[0, 0, 0]}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        transform
        anchorX={"center"}
        anchorY={"top"}
        justify={"center"}
        onClick={() => handleClick(true)}
      >
        {
          "Tomo consciencia, me hago partícipe\nde espacios de diálogo y me\ninvolucro activamente\nen contra de la deforestación."
        }
      </Text>
      <Text
        fontSize={3}
        position={[40, 400, -95]}
        rotation={[0, 0, 0]}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        transform
        anchorX={"center"}
        anchorY={"top"}
        justify={"center"}
        onClick={() => handleClick(false)}
      >
        {
          "No hago nada, permito que la flora\ny fauna se vean afectadas, y\npotencialmente destruidas."
        }
      </Text>

      <Text
        fontSize={5}
        position={[0, 530, -95]}
        rotation={[0, 0, 0]}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        transform
        anchorX={"center"}
        anchorY={"top"}
        justify={"center"}
      >
        {rewardText}
      </Text>

      {correct >= 3 ? (
        <RotatingModel
          ModelComponent={Cactus}
          position={[0, 492, -10]}
          scale={[12, 12, 12]}
          initialRotation={[0, -0.5, 0]}
          onClick={null}
          rotationSpeed={0.03}
        />
      ) : (
        <RotatingModel
          ModelComponent={SadFace}
          position={[0, 492, -10]}
          scale={[2, 2, 2]}
          initialRotation={[0, -0.5, 0]}
          onClick={null}
          rotationSpeed={0.03}
        />
      )}
    </Canvas>
  );
};
export default QuizScene;
