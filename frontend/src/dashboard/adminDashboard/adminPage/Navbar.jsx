import React from 'react'
import logo from "../assets/logo.png"
import { FaSearch } from 'react-icons/fa'

// const Navbar = () => {
//   return (
//     <div className='border'>
//         <img src={logo} alt="" />
//         <div className="flex justify-between items-center mb-6">
//                   <div className="text-sm text-gray-500">Dashboard/Overview</div>
//                   <div className="flex items-center space-x-4">
//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="Search for course..."
//                         className="border px-3 py-1 rounded-md pl-10"
//                       />
//                       <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
//                     </div>
//                     <button className="bg-blue-600 text-white px-4 py-1 rounded">Sign In</button>
//                     <img
//                       src="https://i.pravatar.cc/40"
//                       alt="User"
//                       className="w-8 h-8 rounded-full"
//                     />
//                   </div>
//                 </div>
//     </div>
//   )
// }

// import { FaSearch } from "react-icons/fa";
// import logo from './path/to/logo.png'; // Update with actual path

export default function Header() {
  return (
    <div className="border-b bg-white px-6 py-4 shadow flex justify-between items-center w-full">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        {/* <span className="text-gray-700 text-sm">Dashboard/Overview</span> */}
      </div>

      {/* Search + Buttons */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for course..."
            className="border px-3 py-1 rounded-md pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          Sign In
        </button>
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
}


// export default Navbar