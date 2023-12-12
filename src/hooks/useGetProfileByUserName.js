import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";

function useGetProfileByUserName(username) {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();
  useEffect(
    function () {
      async function getUserProfile() {
        setIsLoading(true);
        try {
          const q = query(
            collection(firestore, "users"),
            where("username", "==", username)
          );
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) return setUserProfile(null);
          let userDoc;
          querySnapshot.forEach((doc) => {
            userDoc = doc.data();
          });
          setUserProfile(userDoc);
        } catch (error) {
          showToast("error", error.message, "error");
        } finally {
          setIsLoading(false);
        }
      }
      getUserProfile();
    },
    [setUserProfile, username, showToast]
  );
  return { isLoading, userProfile };
}

export default useGetProfileByUserName;
