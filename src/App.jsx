import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./firebase/firebase";
import PageLayout from "./Layouts/PageLayout";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const [authUser] = useAuthState(auth);
  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to="/" />}
        />
        {/* users can still see the profile of others even if they are not authenticated 
        but they will not be able to do anything */}
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
