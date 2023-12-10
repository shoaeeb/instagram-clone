import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
function useLogout() {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const showToast = useShowToast();
  async function handleLogout() {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      console.log("logout");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }
  return { handleLogout, isLoggingOut, error };
}

export default useLogout;
