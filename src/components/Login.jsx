import { auth, googleProvider, signInWithPopup, db, doc, getDoc, setDoc } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import useStore from "../stores/userStore";
import '../css/Login.css';

function Login() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

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

      console.log(user.photoURL)

      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión con Google.:", error);
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <button onClick={handleGoogleSignIn}>Iniciar Sesión con Google</button>
    </div>
  );
}

export default Login;
