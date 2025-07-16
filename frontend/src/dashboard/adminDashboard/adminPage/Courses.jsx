// src/pages/Admin/AdminCourse.jsx
import React, { useState } from "react";
import img1 from "../../../assets/image/img1.png";
import { Link } from "react-router-dom";

const coursesData = [
  {
    id: 1,
    title: "Learning JavaScript With Imagination",
    author: "Wilson",
    rating: 4.2,
    reviews: 2,
    lessons: 23,
    duration: "05 Weeks",
    image: img1,
    price: 4999,
    price2: 11999,
    description: "Master JavaScript through imagination-based interactive learning.",
  },
];

const TabButton = ({ label, active, onClick }) => (
  <button
    className={`px-4 py-2 font-semibold ${
      active ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const CourseCard = ({ data }) => (
  <div className="bg-white p-4 rounded-lg shadow-md w-72">
    <div className="relative">
      <img src={data.image} alt="course" className="w-full h-40 object-cover rounded-md" />
      <button className="absolute top-2 right-2 text-red-500 text-xl">🤍</button>
    </div>
    <span className="text-xs inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 mt-2">
      Development
    </span>
    <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
      <div className="flex items-center">
        <img
          src="https://i.pravatar.cc/24"
          alt="avatar"
          className="w-5 h-5 rounded-full mr-2"
        />
        {data.author}
      </div>
      <div>
        <span className="ml-2 text-yellow-500">★ {data.rating}</span>
        <span className="ml-1">({data.reviews} Reviews)</span>
      </div>
    </div>
    <h2 className="text-md font-semibold mt-2">{data.title}</h2>
    <div className="py-2">
      <p className="text-[14px] text-red-600">
        ₹ {data.price}
        <span className="text-[12px] text-black line-through pl-2">₹ {data.price2}</span>
      </p>
    </div>
    <div className="flex gap-6 text-sm text-gray-600 mt-2">
      <span>📘 {data.lessons} Lessons</span>
      <span>⏱ {data.duration}</span>
    </div>
    <Link
      to={`/admin/adminCourseDetails/${data.id}`}
      state={data}
      className="block mt-4 text-blue-600 hover:underline"
    >
      Go to full Course
    </Link>
  </div>
);

const AdminCourse = () => {
  const [activeTab, setActiveTab] = useState("published");

  const renderContent = () => (
    <div className="flex flex-wrap gap-4 mt-6">
      {coursesData.map((course, i) => (
        <CourseCard key={i} data={course} />
      ))}
    </div>
  );

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Enroll Courses</h1>
      <div className="flex space-x-6 border-b pb-2">
        <TabButton label="Published" active={activeTab === "published"} onClick={() => setActiveTab("published")} />
        <TabButton label="Pending" active={activeTab === "pending"} onClick={() => setActiveTab("pending")} />
      </div>
      {renderContent()}
    </div>
  );
};

export default AdminCourse;
