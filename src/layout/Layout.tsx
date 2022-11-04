import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <div className="h-20">
        <Navbar/>
        </div>   
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
