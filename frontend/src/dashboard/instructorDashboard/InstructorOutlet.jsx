import React from "react";

import Sidebar from "./InstructorSidebar";
import InstructorTopBar from "./InstructorTopBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InstructorNavbar from "./instructorPage/Navbar";


const InstructorOutlet = () => {
  return (
    <>
    <div className="max-w-screen-2xl mx-auto">
      <InstructorNavbar/>
      <div className="flex">
        <Sidebar />

        <div className="px-2 w-full">
          <InstructorTopBar />
          <Outlet />
        </div>
      </div>
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default InstructorOutlet;
