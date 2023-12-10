// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// for authentication
import { getAuth } from "firebase/auth";

import { getFireStore } from "firebase/firestore";
// for storage
import { getStorage } from "firebase/storage";

//configuration of the app that we want to connect to
const firebaseConfig = {
  apiKey: "AIzaSyC2h523SnI6pjTFyvAjsMKNSFfJvlxVpEY",
  authDomain: "instagram-clone-704a1.firebaseapp.com",
  projectId: "instagram-clone-704a1",
  storageBucket: "instagram-clone-704a1.appspot.com",
  messagingSenderId: "410227159859",
  appId: "1:410227159859:web:004ffdda1699e9f9db8446",
  measurementId: "G-E27W5C6HK8",
};

//returns the application
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFireStore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
