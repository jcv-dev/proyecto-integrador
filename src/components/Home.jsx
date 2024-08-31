import Scene from "./Scene";
import useStore from "../stores/userStore";

function Home() {

    const user = useStore((state) => state.user)

    return (
        <div>
          <h1>Bienvenido, {user?.displayName}</h1>
          <Scene />
        </div>
      );
    }

export default Home;
