import React from "react";
import { Outlet } from "react-router";
import { useAppSelector } from "../state/store";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isFetchingAuthUser] = useAppSelector((state) => [
    state.auth.isFetchingAuthUser,
  ]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="relative w-[calc(100%-16rem)] bg-blueGray-100 min-h-screen h-full">
        <div className="h-20">
          <Navbar />
        </div>
        {isFetchingAuthUser ? (
          <div className="absolute top-1/2 left-1/2 ">
            <div
              className="w-12 h-12 rounded-full animate-spin
          border-4 border-solid border-darkBlue-101 border-t-transparent"
            ></div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Layout;
