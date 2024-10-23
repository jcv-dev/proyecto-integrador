import { auth, onAuthStateChanged } from "../config/firebaseConfig";

const checkAuthState = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

export default checkAuthState;
