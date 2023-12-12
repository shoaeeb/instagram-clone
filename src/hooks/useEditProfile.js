import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

function useEditProfile() {
  const [isUpdating, setIsUpdating] = useState(false);

  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  const showToast = useShowToast();

  async function editProfile(inputs, selectedFile) {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);
    //get a storage reference
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);

    //get userDoc ref
    const userDocRef = doc(firestore, "users", authUser.uid);

    let URL = "";
    try {
      if (selectedFile) {
        //upload the image
        await uploadString(storageRef, selectedFile, "data_url");
        //get the image link from storage
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }
      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.userName || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      showToast("Success", "Profile Updated Successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  }

  return { editProfile, isUpdating };
}

export default useEditProfile;
