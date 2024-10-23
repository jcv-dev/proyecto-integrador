import { auth, signOut } from "../config/firebaseConfig";

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      alert(error.message);
    });
};

export default signOutUser;
