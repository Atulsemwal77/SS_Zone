import React from "react";
import img1 from "../../assets/image/img.jpg";

import { FaBook, FaUserGraduate, FaMoneyBillWave } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const feedbacks = [
  { course: "JavaScript", enrolled: "1,200", rating: 4.1 },
  { course: "PHP", enrolled: "1,500", rating: 3.9 },
  { course: "Graphics Designer", enrolled: "2,500", rating: 4.7 },
  { course: "Data Science", enrolled: "2,290", rating: 4.5 },
];

const Overview = () => {
  return (
    <>
    

      <p className="font-semibold text-lg mb-2">Summary</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 ">
        <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
        <div className="border w-10 h-10 rounded-full flex items-center justify-center bg-[#296AD2]"><FaBook className="text-white text-2xl" /></div>
          <div>
            <h3 className="text-lg font-bold">27</h3>
            <p className="text-gray-500 text-sm">Total Courses</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
          <div className="border w-10 h-10 rounded-full flex items-center justify-center bg-[#296AD2]"><FaUserGraduate className="text-white text-2xl" /></div>
          <div>
            <h3 className="text-lg font-bold">08</h3>
            <p className="text-gray-500 text-sm">Total Students</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
        <div className="border w-10 h-10 rounded-full flex items-center justify-center bg-[#296AD2]"><FaMoneyBillWave className="text-white text-2xl" /></div>
          <div>
            <h3 className="text-lg font-bold">12</h3>
            <p className="text-gray-500 text-sm">Total Earning</p>
          </div>
        </div>
      </div>

      {/* Courses Enrolled Status (Placeholder) */}
      {/* <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Courses Enrolled Status</h3>
          <select className="border px-2 py-1 rounded">
            <option>HTML</option>
            <option>CSS</option>
            <option>React</option>
          </select>
        </div>
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
          [Chart Placeholder]
        </div>
      </div> */}

<div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Feedbacks</h2>

      <table className="min-w-full table-auto bg-white rounded-md shadow">
        <thead>
          <tr className="bg-blue-100 text-left text-sm font-medium text-gray-700">
            <th className="px-4 py-2">Course Name</th>
            <th className="px-4 py-2">Enrolled</th>
            <th className="px-4 py-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 1 ? 'bg-blue-50' : 'bg-white'}
            >
              <td className="px-4 py-2">{item.course}</td>
              <td className="px-4 py-2">{item.enrolled}</td>
              <td className="px-4 py-2 flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                {item.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
};

export default Overview;
