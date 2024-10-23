import Scene from "./Scene";
import userStore from "../stores/userStore";

function Test() {
  const user = userStore((state) => state.user);


  return (
    <div>
      <h1>Bienvenido, {user?.displayName}</h1>
      <Scene />
    </div>
  );
}

export default Test;
