import React from "react";


import { FaBook, FaUserGraduate, FaMoneyBillWave } from "react-icons/fa";
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from 'recharts';
import { FaStar, FaUser, FaBookOpen, FaRegCommentDots } from "react-icons/fa";

const data = [
  { month: 'Jan', students: 100 },
  { month: 'Feb', students: 250 },
  { month: 'Mar', students: 300 },
  { month: 'Apr', students: 640 },
  { month: 'May', students: 1200 },
  { month: 'Jun', students: 900 },
  { month: 'Jul', students: 600 },
  { month: 'Aug', students: 700 },
  { month: 'Sept', students: 800 },
  { month: 'Oct', students: 900 },
  { month: 'Nov', students: 850 },
  { month: 'Dec', students: 780 },
];


const instructors = Array(6).fill({
  name: "Sanki Jho",
  reviews: "25,895 Reviews",
  courses: "15+ Courses",
  students: "692 Students",
  avatar: "https://i.pravatar.cc/40?img=3",
});

const notifications = [
  "Account has been created successfully.",
  "Successfully applied for a job Developer.",
  "Multi vendor course updated successfully.",
  "HTML course updated successfully.",
  "HTML course updated successfully.",
  "HTML course updated successfully.",
  "JavaScript course updated successfully.",
];

const feedbacks = [
  { name: "JavaScript", enrolled: "1,200", rating: 4.1 },
  { name: "PHP", enrolled: "1,500", rating: 3.9 },
  { name: "Graphics Designer", enrolled: "2,500", rating: 4.7 },
  { name: "Data Science", enrolled: "2,290", rating: 4.5 },
];

function EnrolledCoursesChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Courses Enrolled Status</h2>
        <select className="border text-sm rounded px-2 py-1">
          <option>HTML</option>
          <option>React</option>
          <option>JS</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const AdminOverview = () => {
  return (
    <>
    {/* <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-10 rounded-xl flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <img
            src={img1}
            alt=""
            className="rounded-full w-20 border-4 border-white"
          />
          <div>
            <p className="text-sm">Hello</p>
            <h2 className="text-xl ">Michele Obema</h2>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1 text-lg">
          <FaStar className="text-yellow-300" />
          4.0 (120 Reviews)
        </div>

        <button className=" text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 border border-white">
          Create a New Course <FaArrowRight />
        </button>
    </div> */}
    <div className="max-w-screen-2xl mx-auto">
      <p className="font-semibold text-lg mb-2">Summary</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
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

        <div className="bg-gray-100 rounded flex items-center justify-center text-gray-400">
          <EnrolledCoursesChart/>
        </div>

        <div className="p-6 space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Popular Instructor */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Popular Instructor</h3>
            <span className="text-sm text-gray-400 cursor-pointer">See More...</span>
          </div>
          <div className="space-y-4">
            {instructors.map((inst, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img src={inst.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                <div className="text-sm space-y-1">
                  <p className="font-semibold">{inst.name}</p>
                  <div className="flex gap-3 text-gray-500 text-xs items-center">
                    <span className="flex items-center gap-1"><FaRegCommentDots /> {inst.reviews}</span>
                    <span className="flex items-center gap-1"><FaBookOpen /> {inst.courses}</span>
                    <span className="flex items-center gap-1"><FaUser /> {inst.students}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Notifications</h3>
            <span className="text-sm text-gray-400 cursor-pointer">See More...</span>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            {notifications.map((note, idx) => (
              <div key={idx}>
                <p>{note}</p>
                <span className="text-xs text-gray-400">{(idx + 1)} Hour Ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Feedbacks */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Recent Feedbacks</h3>
          <span className="text-sm text-gray-400 cursor-pointer">See More...</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-50 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-2">Course Name</th>
                <th className="px-4 py-2">Enrolled</th>
                <th className="px-4 py-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((item, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}
                >
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.enrolled}</td>
                  <td className="px-4 py-2 flex items-center gap-1">
                    <FaStar className="text-yellow-400" /> {item.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default AdminOverview;
