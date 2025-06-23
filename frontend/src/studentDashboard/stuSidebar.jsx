import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdMessage,
  MdRateReview,
  MdQuiz,
  MdSettings,
  MdLogout,
  MdPerson,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { BiBookBookmark } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";

export default function StuSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const linkClass =
    "flex items-center space-x-2 p-2 rounded hover:bg-blue-100 transition-colors";
  const activeClass = "bg-blue-100 text-blue-600 font-medium";

  const navLinks = [
  { to: "/dashboard", icon: <MdDashboard />, label: "Dashboard" },
  { to: "/dashboard/profile", icon: <MdPerson />, label: "My Profile" },
  { to: "/dashboard/enrollCourse", icon: <BiBookBookmark />, label: "Enroll Courses" },
  { to: "/dashboard/wishlist", icon: <FaRegHeart />, label: "Wishlist" },
  { to: "/dashboard/message", icon: <MdMessage />, label: "Messages" },
  { to: "/dashboard/review", icon: <MdRateReview />, label: "Reviews" },
  { to: "/dashboard/myQuiz", icon: <MdQuiz />, label: "My Quiz" },
  { to: "/dashboard/assignments", icon: <BiBookBookmark />, label: "Assignments" },
  { isDivider: true },
  { to: "/dashboard/setting", icon: <MdSettings />, label: "Settings" },
  { to: "/dashboard/logout", icon: <MdLogout />, label: "Logout" },
];


  return (
    <>
    <div className="flex md:flex-row bg-red-100 font-sans min-h-screen  border-r  relative ">
      {/* Mobile Header */}
      <div className="flex items-center justify-between  p-4 shadow-md md:hidden w-full absolute ">
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-full bg-white shadow-md p-6 w-64 overflow-y-auto transition-transform duration-300 z-50 md:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end mb-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-red-500"
          >
            <MdClose size={24} />
          </button>
        </div>

        <nav className="space-y-2 text-gray-600">
          {navLinks.map((link, index) =>
            link.isDivider ? (
              <hr key={index} className="my-4" />
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            )
          )}
        </nav>
      </aside>
    </div>
    </>
  );
}
