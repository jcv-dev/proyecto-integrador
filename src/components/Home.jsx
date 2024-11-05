import userStore from "../stores/userStore";
import "../css/Home.css";
import useSignOutAndNavigate from "../hooks/useSignOutAndNavigate";
import { useCallback, useState } from "react";
import Scene from "./Scene";
import { useNavigate } from "react-router-dom";

const contentTexts = [
  'La tierra o el suelo es la capa superior de la corteza terrestre donde ocurre una gran cantidad de procesos biológicos, químicos y físicos. Está compuesto por minerales, materia orgánica, agua, aire y organismos vivos, y su estructura varía según su ubicación geográfica y el clima.<br/><br/><hr/> <b className="subtitle">Importancia del suelo</b><br/><br/> ✅ <b>Sustento de la Vida:</b> El suelo es esencial para el crecimiento de plantas, que forman la base de casi todas las cadenas alimenticias. Además, alberga una gran biodiversidad, incluyendo microorganismos, insectos y otros organismos que mantienen el equilibrio ecológico.<br/><hr/> ✅ <b>Ciclo de Nutrientes:</b> Actúa como un sistema de reciclaje natural, descomponiendo y transformando la materia orgánica en nutrientes esenciales para las plantas y otros organismos. <br/><hr/> ✅ <b>Regulación del Agua:</b> Filtra y almacena el agua de lluvia, permitiendo que se infiltre lentamente en acuíferos y manteniendo el equilibrio hídrico de los ecosistemas.<br/>',

  '<b className="subtitle">¿Por qué debemos cuidar del suelo?</b><br/> ✅ <b>Prevención de la Erosión:</b> La degradación y pérdida del suelo puede resultar en la erosión, reduciendo la fertilidad y afectando la capacidad de producir alimentos.<br/><hr/> ✅ <b>Protección de la Biodiversidad:</b> La salud del suelo es esencial para mantener la diversidad de organismos y prevenir la extinción de especies.<br/><hr/> ✅ <b>Mitigación del Cambio Climático:</b> Suelos sanos almacenan más carbono, ayudando a reducir los efectos del cambio climático.<br/><hr/> ✅ <b>Conservación de Recursos Hídricos:</b> La degradación del suelo afecta la capacidad de filtración de agua, lo que puede conducir a problemas de abastecimiento y calidad del agua.<br/><hr/>Cuidar el suelo implica prácticas sostenibles, como la agricultura orgánica, la rotación de cultivos, la reducción del uso de químicos y la reforestación, promoviendo un equilibrio que mantenga su vitalidad para las generaciones futuras.',
];

const buttonTexts = ["Siguiente", "Comenzar"];

function Home() {
  const navigate = useNavigate();

  const user = userStore((state) => state.user);
  const signOutAndNavigate = useSignOutAndNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const changeContent = useCallback(() => {
    if (currentTextIndex >= contentTexts.length - 1) {
      navigate("/experience");
    }
    setCurrentTextIndex(currentTextIndex + 1);
  });

  return (
    <div className="home">
      <div className="scene-container">
        <Scene/>
      </div>
      <div className="user-photo">
        <img src={user?.photoURL} onClick={() => signOutAndNavigate()} />
      </div>
      <div className="title">
        <h2>¿Qué es la tierra y por qué es tan importante?</h2>
      </div>
      <div className="content-text">
        <p
          dangerouslySetInnerHTML={{ __html: contentTexts[currentTextIndex] }}
        />
      </div>
      <div
        className="next-button"
        onClick={changeContent}
      >
        {buttonTexts[currentTextIndex]}
      </div>
    </div>
  );
}

export default Home;
