import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
function useGetUserByProfileId(userId) {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    async function getUserProfile() {
      setIsLoading(true);
      // setUserProfile(null);
      try {
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    }
    getUserProfile();
  }, [userId, showToast, setUserProfile, setIsLoading]);
  return { isLoading, userProfile, setUserProfile };
}

export default useGetUserByProfileId;
