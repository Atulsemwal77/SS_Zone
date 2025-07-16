import React, { useState, useEffect } from "react";
import img1 from "../../../assets/image/img1.png";
import { Link } from "react-router-dom";
import { FaBook, FaClock, FaRegStar, FaTimes } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import axios from "axios";

const coursesData = [
  {
    id: 1,
    title: "Learning JavaScript With Imagination",
    author: "Wilson",
    rating: 4.2,
    reviews: 2,
    lessons: 23,
    duration: "05 Weeks",
    thumbnail: img1,
    price: 4999,
    price2: 11999,
    description:
      "Master JavaScript through imagination-based interactive learning.",
    status: "Published",
  },
  {
    id: 2,
    title: "Mastering React Basics",
    author: "Anjali",
    rating: 4.5,
    reviews: 5,
    lessons: 30,
    duration: "06 Weeks",
    thumbnail: img1,
    price: 5999,
    price2: 12999,
    description: "Build modern UI with React and hooks.",
    status: "Published",
  },
  {
    id: 3,
    title: "Backend with Node.js & MongoDB",
    author: "Vikram",
    rating: 4.7,
    reviews: 8,
    lessons: 40,
    duration: "07 Weeks",
    thumbnail: img1,
    price: 6999,
    price2: 13999,
    description: "Learn to build full stack applications.",
    status: "Pending",
  },
  {
    id: 4,
    title: "Java Programming Essentials",
    author: "Priya",
    rating: 4.1,
    reviews: 3,
    lessons: 28,
    duration: "05 Weeks",
    thumbnail: img1,
    price: 4499,
    price2: 9999,
    description: "Learn Java syntax and OOPs basics.",
    status: "Published",
  },
  {
    id: 5,
    title: "Python for Data Analysis",
    author: "Rahul",
    rating: 4.3,
    reviews: 4,
    lessons: 35,
    duration: "06 Weeks",
    thumbnail: img1,
    price: 5299,
    price2: 10999,
    description: "Use Python to clean, analyze, and visualize data.",
    status: "Pending",
  },
  {
    id: 6,
    title: "UI/UX Design Fundamentals",
    author: "Sneha",
    rating: 4.0,
    reviews: 2,
    lessons: 20,
    duration: "04 Weeks",
    thumbnail: img1,
    price: 3999,
    price2: 8999,
    description: "Learn UI/UX basics for websites and apps.",
    status: "Pending",
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
      <img
        src={data.thumbnail}
        alt="course"
        className="w-full h-40 object-cover rounded-md"
      />
      <button className="absolute top-2 left-2 text-white  py-1 px-2 bg-[#296AD2] rounded-2xl text-sm">
        {" "}
        <span className="flex items-center  gap-1">
          {" "}
          <HiOutlineClock /> {data.duration}
        </span>
      </button>
    </div>
    <h2 className="text-[18px] font-semibold mt-2">{data.title}</h2>
    <p className="text-gray-600 text-md">{data.description}</p>
    <div className="flex justify-between  mt-2">
      <span className="flex items-center gap-1">
        {" "}
        <FaBook /> {data.lessons} Lessons
      </span>
      <span className="ml-2 flex gap-1 items-center text-base">
        {" "}
        <FaRegStar className="text-yellow-500" /> {data.rating}
      </span>
    </div>
    <div className="flex justify-between items-center mt-2">
      <p className="text-lg text-green-600">₹ {data.price} </p>
      <Link
        to={`/admin/adminCourseDetails/${data.id}`}
        state={data}
        className="flex  mt-4 text-[#296AD2] hover:underline "
      >
        <span className="border  p-2">View Details</span>
      </Link>
    </div>
  </div>
);

const AdminCourse = () => {
  const [activeTab, setActiveTab] = useState("Published");
  const [courses, setCourses] = useState([]);

  const filteredCourses = coursesData.filter(
    (course) => course.status === activeTab
  );
  const filteredCoursesMain = courses.filter(
    (course) => course.status === activeTab
  );


  console.log("courses", courses);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}courses/all/full`
        );
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };
    fetchAllCourses();
  }, []);

  return (
    <>
      <div className="p-6 font-sans">
        <h1 className="text-2xl font-bold mb-4">Enroll Courses</h1>
        <div className="flex space-x-6 border-b pb-2">
          <TabButton
            label="Published"
            active={activeTab === "Published"}
            onClick={() => setActiveTab("Published")}
          />
          <TabButton
            label="Pending"
            active={activeTab === "Pending"}
            onClick={() => setActiveTab("Pending")}
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          {filteredCourses.length === 0 ? (
            <p>No courses found for {activeTab}.</p>
          ) : (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} data={course} />
            ))
          )}
        </div>
      </div>
      <p>From Api</p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCoursesMain.length === 0 ? (
          <p>No courses found for {activeTab}.</p>
        ) : (
          filteredCoursesMain.map((data, index) => (
            <div
              key={data.id || index} // Unique key
              className="bg-white p-4 rounded-lg shadow-md w-72"
            >
              <div className="relative">
                <img
                  src={data.thumbnail}
                  alt="course"
                  className="w-full h-40 object-cover rounded-md"
                />
                <button className="absolute top-2 left-2 text-white py-1 px-2 bg-[#296AD2] rounded-2xl text-sm">
                  <span className="flex items-center gap-1">
                    <HiOutlineClock /> {data.durationHour}h{" "}
                    {data.durationMinute}m
                  </span>
                </button>
              </div>
              <h2 className="text-[18px] font-semibold mt-2">{data.title}</h2>
              <p className="text-gray-600 text-md">{data.description}</p>
              <div className="flex justify-between mt-2">
                <span className="flex items-center gap-1">
                  <FaBook />{" "}
                  {data.modules?.reduce(
                    (sum, module) => sum + (module.lessons?.length || 0),
                    0
                  ) || 0}{" "}
                  Lessons
                </span>
                <span className="ml-2 flex gap-1 items-center text-base">
                  <FaRegStar className="text-yellow-500" /> {data.rating}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-lg text-green-600">₹ {data.regularPrice} </p>
                <Link
                  to={`/admin/adminCourseDetails/${data.id}`}
                  state={data}
                  className="flex mt-4 text-[#296AD2] hover:underline"
                >
                  <span className="border p-2">View Details</span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminCourse;
