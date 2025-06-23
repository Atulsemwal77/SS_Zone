import React, { useState , useEffect} from 'react';
import logo from "../assets/image/logo.png";
import { FaSearch } from 'react-icons/fa';
import {Link } from "react-router-dom"

export default function StuNavbar() {
  const [user , setUser] = useState({name : "Student"})
   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className=" bg-white px-4 md:px-6 py-4 shadow flex justify-between items-center w-full sticky top-0 z-50  ">
      
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Link to = '/'><img src={logo} alt="Logo" className="h-8 md:h-10 w-auto" /></Link>
      </div>

      {/* Search + Sign In */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for course..."
            className="border px-3 py-1.5 rounded-2xl pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 text-sm font-medium">
         {user?.name.slice(0, 2).toUpperCase()}
        </button>
      </div>
    </div>
  );
}
