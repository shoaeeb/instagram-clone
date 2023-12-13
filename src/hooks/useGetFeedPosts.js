import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";

function useGetFeedPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const { setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();
  useEffect(() => {
    async function getFeedPosts() {
      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }
      setIsLoading(true);
      const q = query(
        collection(firestore, "posts"),
        where("createdBy", "in", authUser.following)
      );
      try {
        const querySnapShot = await getDocs(q);
        const feedPosts = [];
        querySnapShot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });
        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    }
    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPosts, setUserProfile]);
  return { isLoading, posts };
}

export default useGetFeedPosts;
