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
import { FaRegHeart, FaTv } from "react-icons/fa";
import { FaMicroblog } from "react-icons/fa6";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const linkClass =
    "flex items-center space-x-2 p-2 rounded hover:bg-blue-100 transition-colors";
  const activeClass = "bg-blue-100 text-blue-600 font-medium";

  const navLinks = [
    { to: "/instructor", icon: <MdDashboard />, label: "Dashboard" },
    { to: "/instructor/profile", icon: <MdPerson />, label: "My Profile" },
    // { to: "/instructor/enrollCourse", icon: <BiBookBookmark />, label: "Enroll Courses" },
    { to: "/instructor/wishlist", icon: <FaRegHeart />, label: "Wishlist" },
    { to: "/instructor/message", icon: <MdMessage />, label: "Messages" },
    { to: "/instructor/review", icon: <MdRateReview />, label: "Reviews" },
    { to: "/instructor/mycourses", icon: <FaTv />, label: "My Course" },
    { to: "/instructor/myQuiz", icon: <MdQuiz />, label: "My Quiz" },
    { to: "/instructor/announcement", icon: <FaMicroblog />, label: "Announcement" },
    // { to: "/instructor/assignments", icon: <BiBookBookmark />, label: "Assignments" },
    { to: "/instructor/orderhistory", icon: <BiBookBookmark />, label: "Order History" },
    { isDivider: true },
    { to: "/instructor/setting", icon: <MdSettings />, label: "Settings" },
    { to: "/instructor/logout", icon: <MdLogout />, label: "Logout" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 font-sans">
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-white p-4 shadow-md md:hidden">
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-[25px] left-0 h-full bg-white shadow p-6 w-64 z-50 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end mb-4 md:hidden">
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-red-500">
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
  );
}
