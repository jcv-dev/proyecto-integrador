import Scene from "./Scene";
import userStore from "../stores/userStore";
import "../css/Home.css";
import useSignOutAndNavigate from "../hooks/useSignOutAndNavigate";

function Home() {
  const user = userStore((state) => state.user);
  const signOutAndNavigate = useSignOutAndNavigate();

  return (
    <>
      <div className="home">
        <div className="scene-container">
          <Scene />
        </div>
        <div className="user-photo">
          <img src={user?.photoURL} onClick={() => signOutAndNavigate()} />
        </div>
      </div>
    </>
  );
}

export default Home;
