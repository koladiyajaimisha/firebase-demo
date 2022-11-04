import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate, Outlet } from "react-router";
import Login from "./components/auth/Login";
import Register from "./components/auth/Signup";
import Layout from "./layout/Layout";
import Technologies from "./components/dashboard/technologies/Technologies";
import { useAppSelector } from "./state/store";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "./components/auth/redux/actions";
import AddProjects from "./components/dashboard/projects/AddProjects";

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
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/projects/add" element={<AddProjects />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
