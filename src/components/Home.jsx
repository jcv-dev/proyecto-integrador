import Scene from "./Scene";
import userStore from "../stores/userStore";
import useSignOutAndNavigate from "../hooks/useSignOutAndNavigate";

function Home() {
  const user = userStore((state) => state.user);
  const signOutAndNavigate = useSignOutAndNavigate();
  return (
    <div>
      <h1>Bienvenido, {user?.displayName}</h1>
      <Scene />
      <div onClick={() => signOutAndNavigate()}>Cerrar sesión</div>
    </div>
  );
}

export default Home;
