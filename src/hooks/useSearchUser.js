import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";

function useSearchUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  async function getUserProfile(username) {
    setIsLoading(true);
    setUser(null);
    try {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );
      //execute the query returns a snapshot
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
        return showToast("Error", "User Not Found", "error");
      querySnapshot.forEach((doc) => setUser(doc.data()));
    } catch (error) {
      showToast("error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, getUserProfile, user, setUser };
}

export default useSearchUser;
