import userStore from "../stores/userStore";
import "../css/Home.css";
import useSignOutAndNavigate from "../hooks/useSignOutAndNavigate";
import { useCallback, useState } from "react";
import Scene from "./Scene";

const contentTexts = [
  'La tierra o el suelo es la capa superior de la corteza terrestre donde ocurre una gran cantidad de procesos biológicos, químicos y físicos. Está compuesto por minerales, materia orgánica, agua, aire y organismos vivos, y su estructura varía según su ubicación geográfica y el clima.<br/><br/><hr/> <b className="subtitle">Importancia del suelo</b><br/><br/> ✅ <b>Sustento de la Vida:</b> El suelo es esencial para el crecimiento de plantas, que forman la base de casi todas las cadenas alimenticias. Además, alberga una gran biodiversidad, incluyendo microorganismos, insectos y otros organismos que mantienen el equilibrio ecológico.<br/><hr/> ✅ <b>Ciclo de Nutrientes:</b> Actúa como un sistema de reciclaje natural, descomponiendo y transformando la materia orgánica en nutrientes esenciales para las plantas y otros organismos. <br/><hr/> ✅ <b>Regulación del Agua:</b> Filtra y almacena el agua de lluvia, permitiendo que se infiltre lentamente en acuíferos y manteniendo el equilibrio hídrico de los ecosistemas.<br/><hr/> ✅ <b>Captura de Carbono:</b> Los suelos absorben carbono y ayudan a mitigar el cambio climático, actuando como uno de los principales sumideros de carbono. <br/><hr/> ✅ <b>Sostenibilidad Agrícola:</b> Es el recurso fundamental para la producción de alimentos y otros productos agrícolas, siendo crucial para la seguridad alimentaria global.<br/><br/>',

  '<b className="subtitle">¿Por qué debemos cuidar del suelo?</b><br/> ✅ <b>Prevención de la Erosión:</b> La degradación y pérdida del suelo puede resultar en la erosión, reduciendo la fertilidad y afectando la capacidad de producir alimentos.<br/><hr/> ✅ <b>Protección de la Biodiversidad:</b> La salud del suelo es esencial para mantener la diversidad de organismos y prevenir la extinción de especies.<br/><hr/> ✅ <b>Mitigación del Cambio Climático:</b> Suelos sanos almacenan más carbono, ayudando a reducir los efectos del cambio climático.<br/><hr/> ✅ <b>Conservación de Recursos Hídricos:</b> La degradación del suelo afecta la capacidad de filtración de agua, lo que puede conducir a problemas de abastecimiento y calidad del agua.<br/><hr/>Cuidar el suelo implica prácticas sostenibles, como la agricultura orgánica, la rotación de cultivos, la reducción del uso de químicos y la reforestación, promoviendo un equilibrio que mantenga su vitalidad para las generaciones futuras.',

  '<b className="subtitle">¿Qué es la deforestación?</b><br>La <strong>deforestación</strong> es el proceso de talar o eliminar grandes áreas de bosques, generalmente para dar paso a actividades como la agricultura, la ganadería o la urbanización.<br><br>Esto es perjudicial porque los <strong>bosques</strong> juegan un papel fundamental en el equilibrio ecológico: absorben <em>dióxido de carbono</em>, ayudan a regular el <em>clima</em>, y son hábitat de una gran diversidad de especies.<br><br> Al destruir estos ecosistemas, aumentamos las emisiones de <strong>gases de efecto invernadero</strong>, contribuimos al <strong>cambio climático</strong>, y ponemos en riesgo la <strong>biodiversidad</strong> y los <em>recursos esenciales</em>, como el agua y los suelos fértiles.',
];

const buttonTexts = ["Siguiente", "Siguiente", "Comenzar"];

function Home() {
  const [isScene, setIsScene] = useState(false);
  const sceneStyle = {
    aspectRatio: "16/9",
    width: "80%",
    height: "100%",
    border: "4px solid #1d7874",
    padding: "0",
  };
  const user = userStore((state) => state.user);
  const signOutAndNavigate = useSignOutAndNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const changeContent = useCallback(() => {
    if (currentTextIndex >= contentTexts.length - 1) {
      setIsScene(true);
    }
    setCurrentTextIndex(currentTextIndex + 1);
  });

  return (
    <div className="home">
      <div className="user-photo">
        <img src={user?.photoURL} onClick={() => signOutAndNavigate()} />
      </div>
      <div className="title" style={isScene ? { display: "none" } : {}}>
        <h2>¿Qué es la tierra y por qué es tan importante?</h2>
      </div>
      <div className="content-text" style={isScene ? sceneStyle : {}}>
        {isScene ? (
          <Scene />
        ) : (
          <p
            dangerouslySetInnerHTML={{ __html: contentTexts[currentTextIndex] }}
          />
        )}
      </div>
      <div
        className="next-button"
        onClick={changeContent}
        style={isScene ? { display: "none" } : {}}
      >
        {buttonTexts[currentTextIndex]}
      </div>
    </div>
  );
}

export default Home;
