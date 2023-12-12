import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";

function useFollowAndUnfollowUser(userId) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user: authUser, setUser } = useAuthStore();
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  async function handleFollowUser() {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });
      if (isFollowing) {
        setUser({
          ...authUser,
          following: authUser.following.filter((id) => id !== userId),
        });

        setUserProfile({
          ...userProfile,
          followers: authUser.followers.filter((id) => id !== authUser.id),
        });
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((id) => id !== userId),
          })
        );
        setIsFollowing(false);
      } else {
        setUser({
          ...authUser,
          following: [...authUser.following, userId],
        });

        setUserProfile({
          ...userProfile,
          followers: [...userProfile.followers, authUser],
        });

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId],
          })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  }
  useEffect(
    function () {
      if (authUser) {
        const isFollowing = authUser.following.includes(userId);
        setIsFollowing(isFollowing);
      }
    },
    [authUser, userId]
  );

  return { isUpdating, isFollowing, handleFollowUser };
}

export default useFollowAndUnfollowUser;
