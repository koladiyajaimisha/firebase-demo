import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate, Outlet } from "react-router";
import Login from "./components/auth/Login";
import Register from "./components/auth/Signup";
import Layout from "./layout/Layout";
import Technologies from "./components/dashboard/technologies/Technologies";
import { useAppDispatch, useAppSelector } from "./state/store";
import {
  setAuthUser,
  setIsAuthenticated,
  setIsUserFetching,
} from "./components/auth/redux/actions";
import AddProjects from "./components/dashboard/projects/AddProjects";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AllProjects from "./components/dashboard/projects/AllProjects";
import { ToastContainer } from "react-toastify";
import ProjectDetail from "./components/dashboard/projects/ProjectDetail";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(
    (state) => state?.auth?.isAuthenticated
  );
  const token = localStorage.getItem("token");

  if (!(isAuthenticated || token)) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setIsUserFetching(true));
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        dispatch(setAuthUser({ uid: user.uid }));
      } else {
        dispatch(setIsAuthenticated(false));
      }
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/projects/add" element={<AddProjects />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/project/edit/:id" element={<AddProjects />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
