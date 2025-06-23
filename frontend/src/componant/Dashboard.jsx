import React from "react";
import StuNavbar from "../studentDashboard/stuNavbar";
import StuSidebar from "../studentDashboard/stuSidebar";
import StuTopBar from "../studentDashboard/stuTopBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <StuNavbar />
      <div className="flex">
        <StuSidebar />
        <div className="px-2 w-full ">
          <StuTopBar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
