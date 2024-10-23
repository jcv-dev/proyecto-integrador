import {
  auth,
  googleProvider,
  signInWithPopup,
  db,
  doc,
  getDoc,
  setDoc,
  browserLocalPersistence,
  setPersistence,
} from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import userStore from "../stores/userStore";
import "../css/Login.css";
import googleIcon from "../assets/google-icon.svg";
import { useEffect, useState } from "react";
import checkAuthState from "../functions/authState";
import Loading from "./Loading";

function Login() {
  const navigate = useNavigate();
  const setUser = userStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);

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

  useEffect(() => {
    const fetchUser = async () => {
      const firebaseUser = await checkAuthState();
      console.log("Hola");
      if (firebaseUser) {
        navigate("/home");
      }
      setIsFadingOut(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading isFadingOut={isFadingOut} />;
  }

  return (
    <div className="login">
      <div className="title">
        <h2>¡Hola!</h2>
        <h2>Por favor inicia sesión.</h2>
      </div>
      <div className="login-button-container">
        <img
          src={googleIcon}
          alt="Icono de Google"
          onClick={handleGoogleSignIn}
        />
        <p onClick={handleGoogleSignIn}>Entrar con Google</p>
      </div>
    </div>
  );
}

export default Login;
