import { useNavigate } from "react-router-dom";
import signOutUser from "../functions/signOut";

const useSignOutAndNavigate = () => {
  const navigate = useNavigate();

  const signOutAndNavigate = async (path = "/") => {
    try {
      await signOutUser();
      navigate(path);
    } catch (error) {
      console.error("Error closing session:", error);
    }
  };

  return signOutAndNavigate;
};

export default useSignOutAndNavigate;
