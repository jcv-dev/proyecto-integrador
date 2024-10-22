import Scene from "./Scene";
import userStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";

function Test() {
  const user = userStore((state) => state.user);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Bienvenido, {user?.displayName}</h1>
      <Scene />
    </div>
  );
}

export default Test;
