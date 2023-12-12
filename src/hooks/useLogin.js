import { getDoc, doc } from "firebase/firestore";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

function useLogin() {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  async function login(inputs) {
    if (!inputs.email || !inputs.password) {
      showToast("Missing Fields", "Please Fill All the fields", "error");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      //if success then
      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data()); //setting the state
        console.log(docSnap.data());
      }
    } catch (error) {
      console.log(error);
      showToast("error", error.message, "error");
    }
  }

  return { loading, error, login };
}

export default useLogin;
