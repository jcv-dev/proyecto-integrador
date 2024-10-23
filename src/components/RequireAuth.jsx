import { Navigate, Outlet } from "react-router-dom";
import userStore from "../stores/userStore";
import checkAuthState from "../functions/authState";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const RequireAuth = () => {
  const setUser = userStore((state) => state.setUser);
  const currentUser = userStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const firebaseUser = await checkAuthState(); // Wait for Firebase to resolve auth state

      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }

      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }, 200);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading isFadingOut={isFadingOut} />;
  }

  return currentUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireAuth;
