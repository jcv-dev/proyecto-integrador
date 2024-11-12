import React from "react";
import { Html } from "@react-three/drei";
import "../css/StartText.css";

const StartText = () => {
  return (
    <Html
      occlude
      wrapperClass="welcome-text"
      center
      distanceFactor={15}
      transform
      position={[-2, -2, -10]}
      rotation={[-0.2, 0, 0]}
      style={{
        color: "purple",
        fontSize: "14pt",
      }}
    >
      <div className="start-container">
        <div>Estás a punto de conocer los devastadores efectos de la deforestación.<br/><br/>¿Deseas continuar?</div>
        <button>Iniciar</button>
      </div>
    </Html>
  );
};

export default StartText;
