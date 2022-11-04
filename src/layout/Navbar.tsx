import React from "react";
import { useNavigate } from "react-router";
import { setIsAuthenticated } from "../components/auth/redux/actions";
import { useAppDispatch } from "../state/store";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogOut = () => {
    dispatch(setIsAuthenticated(false));
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-black text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          <button
            className="bg-indigo-600 text-white py-2 px-5 rounded-md"
            onClick={onLogOut}
          >
            Logout
          </button>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
