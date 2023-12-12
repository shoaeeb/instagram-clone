import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

function useSignUpWithEmailAndPassword() {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const signup = async function (inputs) {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.userName ||
      !inputs.fullName
    ) {
      showToast("Invalid Input", "Please Fill All the Fields", "error");
      return;
    }

    //fire a query
    const userRef = collection(firestore, "users");
    const q = query(userRef, where("username", "==", inputs.userName));
    const querySnapshot = await getDocs(q);

    //returns an array
    //check if it is empty or not
    //if not then the user exists then just throw an error

    if (!querySnapshot.empty) {
      showToast("Error", "UserName Already Exists", "error");
      return;
    }
    try {
      //checks whether if a user with the same email
      //exists or not
      //returns a newuser if created or undefined
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      //if newuser is undefined and there are error
      if (!newUser && error) {
        console.log(error);
        showToast("Error", error.message, "error");
        return;
      }
      //but if there is a new user create a collection in firebase
      if (newUser) {
        // created newuser has user property which is also an object and then we can read uid
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.userName,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        //firestore object that we get from the firebase pass in the userDoc collection with a userId
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        //setting the current user
        loginUser(userDoc);
      }
    } catch (err) {
      showToast("Error", err.message, "error");
    }
  };
  return { loading, error, signup };
}

export default useSignUpWithEmailAndPassword;
