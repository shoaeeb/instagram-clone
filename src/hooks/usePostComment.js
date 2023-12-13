import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
function usePostComment() {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);

  async function handlePostComment(postId, comment) {
    if (!authUser)
      throw new Error("error", "You must be log in to comment", "error");
    setIsCommenting(true);
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };
    try {
      //get the collection ref

      // const commentRef = addDoc(collection(firestore, "comments"), newComment);
      const postRef = doc(firestore, "posts", postId);
      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });
      addComment(postId, newComment);
    } catch (error) {
      showToast("error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  }

  return { isCommenting, handlePostComment };
}

export default usePostComment;
