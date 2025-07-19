import React from "react";
import AdminNavbar from "./AdminNavBar";
import AdminSideBar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminTopBar from "./AdminTopBar";

const AdminOutlet = () => {
  return (
    <>
    <div className="max-w-screen-2xl mx-auto">

      <AdminNavbar />
      <div className="flex">
        <AdminSideBar />
        <div className="px-2 w-full">
          <AdminTopBar />
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminOutlet;
