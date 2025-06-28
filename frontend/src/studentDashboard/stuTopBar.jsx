import React, { useEffect, useState } from 'react';
import img1 from "../assets/image/img.jpg";
import { FaArrowRight } from "react-icons/fa";
import { PiBookOpenText, PiMedalDuotone } from 'react-icons/pi';

const StuTopBar = () => {
  const [user, setUser] = useState({ name: "Student" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-10 rounded-xl flex flex-wrap md:flex-nowrap justify-between items-center gap-6">
      {/* Profile Section */}
      <div className="flex items-center gap-5">
        <img
          src={img1}
          alt="Profile"
          className="rounded-full w-20 h-20 border-4 border-white"
        />
        <div>
          <h2 className="text-xl font-semibold pb-2">
            {/* {user?.name || "Student"} */}
            {user?.name && user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()} Student

          </h2>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <PiBookOpenText />
              <p>5 Courses Enrolled</p>
            </div>
            <div className="flex items-center gap-2">
              <PiMedalDuotone />
              <p>4 Certificates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="px-5 py-2 border border-white rounded-lg flex items-center gap-2 shadow hover:bg-white hover:text-purple-700 transition">
        Enroll in a New Course <FaArrowRight />
      </button>
    </div>
  );
};

export default StuTopBar;
