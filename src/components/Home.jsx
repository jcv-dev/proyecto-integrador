import Scene from "./Scene";
import userStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = userStore((state) => state.user);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Bienvenido, {user?.displayName}</h1>
      <Scene />
      <div onClick={() => navigate("/test")}>IR A TEST</div>
    </div>
  );
}

export default Home;
