import React from "react";
import userStore from "../stores/userStore";
import "../css/Experiences.css";
import QuizScene from "./QuizScene";
import { useState } from "react";
import ForestImg from "../assets/forest-img.jpg";
import useSignOutAndNavigate from "../hooks/useSignOutAndNavigate";

const Experiences = () => {
  const signOutAndNavigate = useSignOutAndNavigate();
  const user = userStore((state) => state.user);
  const [isScene, setIsScene] = useState(true);
  const sceneStyle = {
    aspectRatio: "16/9",
    width: "80vw",
    height: "auto",
    border: "4px solid #1d7874",
    padding: "0",
    borderRadius: "25px",
    opacity: "1",
    transition: "all 0.5s ease-in-out",
    zIndex: "1",
    top: "auto",
  };

  return (
    <div className="experiences">
      <div className="user-photo">
        <img src={user?.photoURL} onClick={() => signOutAndNavigate()} />
      </div>
      <div className="title">
        <h2>{!isScene && "Selecciona una experiencia:"}</h2>
      </div>
      <div
        className="experiences-container"
        style={isScene ? { aspectRatio: "16/9", width: "80vw" } : {}}
      >
        <div
          className="deforestation"
          onClick={() => setIsScene(true)}
          style={isScene ? sceneStyle : {}}
        >
          <h3 style={isScene ? { display: "none" } : {}}>Deforestación</h3>
          <p style={isScene ? { display: "none" } : {}}>
            La deforestación es la eliminación o destrucción de bosques y áreas
            verdes, generalmente para actividades como la agricultura, ganadería
            o urbanización. Esto reduce la biodiversidad, afecta el clima y
            disminuye la calidad del aire al eliminar los árboles que absorben
            dióxido de carbono.
          </p>
          {!isScene ? (
            <img src={ForestImg} style={isScene ? { display: "none" } : {}} />
          ) : (
            <QuizScene />
          )}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
