// src/pages/Admin/AdminCourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";
import right from "../../../assets/image/checkmark-circle-02.png";
import arrow from "../../../assets/image/up_line 1.png";
import video from "../../../assets/image/video.jpg";
import avatar from "../../../assets/image/avatar.png";
import all_course from "../../../assets/Course_Data";
import Card from "../../../componant/Card";
import { MdCurrencyRupee } from "react-icons/md";
import { FaDribbble, FaLinkedin, FaTwitter } from "react-icons/fa";

const AdminCourseDetails = () => {
  const { courseId } = useParams();
  const location = useLocation()
  const course = location.state
  const BACKEND_URL = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("Overview");

  if (!course) {
    return <div className="text-center text-red-600 font-bold p-10">❌ Course not found!</div>;
  }

  const addToCart = async (course) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}cart/add-to-cart`,
        {
          id: course.id,
          title: course.title,
          author: course.author,
          rating: course.rating,
          duration: course.duration,
          lectures: course.lessons,
          price: course.price,
          image: course.image,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to Cart");
      return response.data;
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Item already exists in cart");
      } else {
        toast.error(error.message || "Error adding to cart");
      }
    }
  };

  const content = {
    Overview: (
      <div className="px-6 md:px-12 my-6">
        <h1 className="text-xl font-bold mb-4">Description</h1>
        <p className="text-gray-600 mb-6">{course.description}</p>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">What You Will Learn</h1>
          {[
            "Build responsive websites using HTML, CSS, and JavaScript.",
            "Develop dynamic web applications with front-end frameworks.",
            "Create and manage server-side logic with backend technologies.",
            "Work with databases and perform CRUD operations.",
          ].map((item, index) => (
            <p key={index} className="flex items-center gap-2">
              <img src={right} alt="check" className="w-4 h-4" /> {item}
            </p>
          ))}
        </div>
      </div>
    ),
    Curriculum: (
      <div className="px-6 md:px-12 my-6">
        <h2 className="text-xl font-bold mb-4">Course Modules</h2>
        <div className="flex flex-col gap-2 border border-gray-300 max-w-4xl">
          {[
            "HTML, CSS Basics",
            "JavaScript Essentials",
            "React Basics",
            "Node.js and Express",
            "MongoDB Integration",
            "Deployment",
          ].map((module, index) => (
            <h2 key={index} className="p-3 border-b flex justify-between items-center">
              {module} <img src={arrow} alt="arrow" className="w-5" />
            </h2>
          ))}
        </div>
      </div>
    ),
    Instructor: (
      <div className="px-6 md:px-12 my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img src={avatar} alt="Instructor" className="w-40 mx-auto md:mx-0" />
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">{course.author}</h1>
            <p className="text-blue-500 font-semibold">Full Stack Instructor</p>
            <p className="text-gray-600">
              A passionate developer and educator with years of experience in web development...
            </p>
          </div>
        </div>
      </div>
    ),
    Review: (
      <div className="px-6 md:px-12 my-6">
        <p className="text-gray-600">No reviews yet.</p>
      </div>
    ),
  };

  return (
    <>
      <div className="p-3">
        <img src={course.image} alt="Course Banner" className="h-[50vh] md:h-[70vh] w-full object-cover rounded" />
      </div>

      <div className="relative">
        <div className="shadow-lg bg-white px-6 py-4 max-w-4xl md:mx-20 mx-auto rounded-xl -mt-20 md:-mt-28">
          <h1 className="text-2xl font-bold mb-3">{course.title}</h1>
          <div className="flex flex-wrap md:flex-nowrap gap-6">
            <div className="flex-1">
              <h3 className="text-gray-500">Instructor</h3>
              <p className="font-semibold">{course.author}</p>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-500">Category</h3>
              <p className="font-semibold">Development</p>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-500">Review</h3>
              <div className="flex items-center gap-1 text-amber-300">
                {Array.from({ length: 5 }, (_, i) => {
                  if (i < Math.floor(course.rating)) return <FaStar key={i} />;
                  if (i < course.rating) return <FaRegStarHalfStroke key={i} />;
                  return <FaRegStar key={i} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 px-6 md:px-12 my-12">
        <div className="flex-1">
          <div className="flex gap-4 border-b mb-6 overflow-x-auto">
            {["Overview", "Curriculum", "Instructor", "Review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 md:px-4 px-3 font-medium ${
                  activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "border-transparent text-gray-600 hover:text-blue-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>{content[activeTab]}</div>
        </div>

        <aside className="w-full md:w-[400px] flex-shrink-0 shadow-lg p-6 rounded-xl bg-white">
          <img src={video} alt="Demo Video" className="rounded-md mb-6" />
          <div className="flex items-center justify-center mb-4">
            <MdCurrencyRupee className="h-6 w-6" />
            <h2 className="text-2xl font-bold">{course.price}</h2>
          </div>
          <button
            onClick={() => addToCart(course)}
            className="cursor-pointer w-full bg-blue-700 text-white py-3 rounded-lg mb-6 hover:bg-blue-800"
          >
            Add To Cart
          </button>
          <div className="flex flex-col gap-2 text-gray-600">
            <p>✅ 62 hours on-demand video</p>
            <p>✅ Instructor: {course.author}</p>
            <p>✅ Language: English</p>
            <p>✅ Level: Advanced</p>
            <p>✅ Certificate of Completion</p>
            <p>✅ Access on Mobile and TV</p>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <h3 className="font-bold">Share:</h3>
            <a href="#" className="p-2 bg-gray-300 rounded-full"><FaDribbble /></a>
            <a href="#" className="p-2 bg-gray-300 rounded-full"><FaLinkedin /></a>
            <a href="#" className="p-2 bg-gray-300 rounded-full"><FaTwitter /></a>
          </div>
        </aside>
      </div>

      <div className="px-6 md:px-12 my-20 text-center">
        <h2 className="text-blue-500 text-sm">Explore Recommended Courses</h2>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">You Might Also Like</h1>
        <p className="text-gray-600 mb-12">
          Discover personalized course recommendations curated to match your interests and learning goals.
        </p>
        <Card all_course={all_course.slice(0, 3)} />
      </div>
    </>
  );
};

export default AdminCourseDetails;
