import { create } from "zustand";
import { auth, onAuthStateChanged } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

const userStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  initializeAuthListener: () => {
    onAuthStateChanged(auth, (user) => {
      const navigate = useNavigate();
      if (user) {
        set({ user });
      } else {
        set({ user: null });
        navigate("/");
      }
    });
  },
}));

export default userStore;
