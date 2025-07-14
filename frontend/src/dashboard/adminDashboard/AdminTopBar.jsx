import React from 'react'
import img1 from "../../assets/image/img.jpg";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AdminTopBar = () => {
  return (
    <>
     <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-10 rounded-xl flex justify-between items-center mb-6 flex-col md:flex-row">
            <div className="flex items-center gap-2">
              <img
                src={img1}
                alt=""
                className="rounded-full w-20 h-20 border-4 border-white"
              />
              <div>
                <p className="text-sm">Hello</p>
                <h2 className="text-xl ">Michele Obema Admin</h2>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1 text-lg">
              <FaStar className="text-yellow-300" />
              4.0 (120 Reviews)
            </div>
            <Link to = '/admin/courses-add'>
            <button className=" text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 border border-white">
              Create a New Course <FaArrowRight />
            </button>
            </Link>
        </div>
    </>
  )
}

export default AdminTopBar