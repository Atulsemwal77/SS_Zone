import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegClock, FaRegHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseList = ({ all_course }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND;
  

  const addToWishlist = async (course) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login to add items into wishlist.");
    return;
  }

  try {
    const response = await axios.post(
      `${BACKEND_URL}wishlist/addToWishlist`,
      {
        id: course.id,
        image: course.image,
        duration: course.duration,
        title: course.title,
        description: course.description,
        lectures: course.lessons,  // 🔁 changed to match backend field
        author: course.author,
        rating: course.rating,
        price: course.price,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Added to Wishlist");
    return response.data;  // optional: use this to update UI
  } catch (error) {
    if (error.response?.status === 409) {
      toast.error("Item already exists in the wishlist.");
    } else {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(message);
    }
  }
};


  return (
    <div className="px-4 sm:px-10  font-[Manrope] max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-x-10 gap-y-5">
        {all_course.map((course) => (
          <div
            key={course.id}
            className="min-w-[400px]  border-1 rounded-[12px] p-4 border-[#E3E3E3] hover:border-[#296AD2] flex flex-col gap-5"
          >
            {/* Image Section */}
            <div className="relative w-full">
              <Link to={`/courseDetailsOverview/${course.id}`} state={course}>
                <img src={course.image} alt="" className="rounded-[12px]" />
              </Link>

              {/* Duration */}
              <div className="absolute top-2 left-4 bg-[#296AD2] py-2 px-[21px] rounded-[40px] flex gap-2 items-center">
                <FaRegClock className="text-white" />
                <p className="text-[14px] font-normal text-white">
                  {course.duration}
                </p>
              </div>

              {/* Wishlist Icon */}
              <div
                onClick={() => addToWishlist(course)}
                className="cursor-pointer absolute top-2 right-4 bg-white rounded-full p-2"
              >
                <FaRegHeart className="text-gray-500" />
              </div>
            </div>

            {/* Content Section */}
            <div className="font-[Manrope] pb-2">
              <h3 className="pb-3 font-semibold text-[20px] text-[#292929]">
                {course.title}
              </h3>
              <p className="pb-3 font-normal text-[16px] text-[#6F6F6F]">
                {course.description}
              </p>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <TiDocumentText />
                  <p className="font-semibold text-[16px] text-[#292929]">
                    {course.lessons} Lessons
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <FaRegStar className="text-[#F04438E5]" />
                  <p className="font-semibold text-[16px]">{course.rating}</p>
                </div>
              </div>
            </div>

            {/* Price and Enroll Button */}
            <div className="flex justify-between items-center font-[Manrope]">
              <div className="flex items-center">
                <MdCurrencyRupee className="text-[#F04438] text-[20px]" />
                <p className="font-semibold text-[20px] text-[#F04438]">
                  {course.price}
                </p>
              </div>

              <Link to={`/courseDetailsOverview/${course.id}`} state={course}>
                <button className="cursor-pointer py-3 px-6 border-1 hover:bg-[#296AD2] hover:text-white border-[#296AD2] text-[#296AD2] font-medium text-[16px] rounded-[4px] ">
                  Enroll Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
