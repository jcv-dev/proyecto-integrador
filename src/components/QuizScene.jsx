import {
  db,
  doc,
  getDoc,
  setDoc,
  auth,
  updateDoc,
} from "../config/firebaseConfig";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Stars, PositionalAudio } from "@react-three/drei";
import Chainsaw from "./3d-models/Chainsaw";
import { Text } from "@react-three/drei";
import Excavator from "./3d-models/Excavator";
import Wrench from "./3d-models/Wrench";
import { use } from "react";

const QuizScene = () => {
  const audioRef = useRef();
  const user = auth.currentUser;
  const [progress, setProgress] = useState(0);
  const [correct, setCorrect] = useState(0);

  const getProgressFB = async () => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      // Use default value of 0 if the field does not exist
      setProgress(userData.progress || 0); // Default to 0 if progress is not found
      setCorrect(userData.correct || 0); // Default to 0 if correct is not found
    }
  };

  const setProgressFB = async () => {
    const userDocRef = doc(db, "users", user.uid);

    try {
      // Check if the document exists first
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        // If the document exists, update the fields
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
          await audio.context.resume(); // Resume audio context for autoplay policies
          audio.play(); // Ensure the audio starts
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
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[-10, 10, 10]} intensity={0.5} castShadow />
      <directionalLight position={[10, 10, 10]} intensity={0.5} castShadow />
      <Stars
        radius={100}
        depth={50}
        count={5000}
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

      <Chainsaw
        position={[-8, -4, -10]}
        scale={[0.1, 0.1, 0.1]}
        onClick={() => handleClick(true)}
      />
      <Excavator
        position={[0, -4, -10]}
        scale={[0.8, 0.8, 0.8]}
        rotation={[0, -0.5, 0]}
        onClick={() => handleClick(false)}
      />
      <Wrench
        position={[8, -4, -10]}
        scale={[0.05, 0.05, 0.05]}
        onClick={() => handleClick(false)}
      />
    </Canvas>
  );
};

export default QuizScene;
