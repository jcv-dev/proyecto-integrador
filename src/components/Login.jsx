import {
  auth,
  googleProvider,
  signInWithPopup,
  db,
  doc,
  getDoc,
  setDoc,
} from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import userStore from "../stores/userStore";
import "../css/Login.css";
import googleIcon from "../assets/google-icon.svg";

function Login() {
  const navigate = useNavigate();
  const setUser = userStore((state) => state.setUser);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user already exists on db
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If user doesn't exist, create a new doc
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
      }

      // Update user's global state
      setUser({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión con Google.:", error);
    }
  };

  return (
    <div className="login">
      <div className="title">
        <h2>¡Hola!</h2>
        <h2>Por favor inicia sesión.</h2>
      </div>
      <div className="login-button-container">
        <img src={googleIcon} alt="Icono de Google" onClick={handleGoogleSignIn} />
        <p onClick={handleGoogleSignIn}>Entrar con Google</p>
      </div>
    </div>
  );
}

export default Login;
