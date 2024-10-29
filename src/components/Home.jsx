import Scene from "./Scene";
import userStore from "../stores/userStore";
import "../css/Home.css";
import useSignOutAndNavigate from "../hooks/useSignOutAndNavigate";

function Home() {
  const user = userStore((state) => state.user);
  const signOutAndNavigate = useSignOutAndNavigate();

  return (
    <div className="home">
      <div className="user-photo">
        <img src={user?.photoURL} onClick={() => signOutAndNavigate()} />
      </div>
      <div className="title">
        <h2>¿Qué es la tierra y por qué es tan importante?</h2>
      </div>
      <div className="content-text">
      <p>
        La tierra o el suelo es la capa superior de la corteza terrestre donde
        ocurre una gran cantidad de procesos biológicos, químicos y físicos.
        Está compuesto por minerales, materia orgánica, agua, aire y organismos
        vivos, y su estructura varía según su ubicación geográfica y el clima.<br/><br/>
        <b className="subtitle">Importancia del suelo</b><br/><br/>
        ✅ <b>Sustento de la Vida:</b> El suelo es esencial para el
        crecimiento de plantas, que forman la base de casi todas las cadenas
        alimenticias. Además, alberga una gran biodiversidad, incluyendo
        microorganismos, insectos y otros organismos que mantienen el equilibrio
        ecológico.<br/>
        ✅ <b>Ciclo de Nutrientes:</b> Actúa como un sistema de reciclaje
        natural, descomponiendo y transformando la materia orgánica en
        nutrientes esenciales para las plantas y otros organismos. <br/>
        ✅ <b>Regulación
        del Agua:</b> Filtra y almacena el agua de lluvia, permitiendo que se
        infiltre lentamente en acuíferos y manteniendo el equilibrio hídrico de
        los ecosistemas.<br/>
        ✅ <b>Captura de Carbono:</b> Los suelos absorben carbono y
        ayudan a mitigar el cambio climático, actuando como uno de los
        principales sumideros de carbono. <br/>
        ✅ <b>Sostenibilidad Agrícola:</b> Es el recurso
        fundamental para la producción de alimentos y otros productos agrícolas,
        siendo crucial para la seguridad alimentaria global.<br/><br/>
        <b className="subtitle">¿Por qué debemos cuidar del suelo?</b><br/>
        Prevención de la Erosión: La degradación y pérdida del
        suelo puede resultar en la erosión, reduciendo la fertilidad y afectando
        la capacidad de producir alimentos. Protección de la Biodiversidad: La
        salud del suelo es esencial para mantener la diversidad de organismos y
        prevenir la extinción de especies. Mitigación del Cambio Climático:
        Suelos sanos almacenan más carbono, ayudando a reducir los efectos del
        cambio climático. Conservación de Recursos Hídricos: La degradación del
        suelo afecta la capacidad de filtración de agua, lo que puede conducir a
        problemas de abastecimiento y calidad del agua. Cuidar el suelo implica
        prácticas sostenibles, como la agricultura orgánica, la rotación de
        cultivos, la reducción del uso de químicos y la reforestación,
        promoviendo un equilibrio que mantenga su vitalidad para las
        generaciones futuras.
      </p>
      </div>
    </div>
  );
}

export default Home;
