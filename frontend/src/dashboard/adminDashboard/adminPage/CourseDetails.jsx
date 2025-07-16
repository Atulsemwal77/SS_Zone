// src/pages/Admin/AdminCourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import avatar from "../../../assets/image/avatar.png";
import { MdCurrencyRupee } from "react-icons/md";
import { FaDribbble, FaLinkedin, FaTwitter } from "react-icons/fa";
import ReactPlayer from "react-player";
import LessonVideoPlayer from "../../../courseUpload/LassonVideoPlayer";

const AdminCourseDetails = () => {
  const location = useLocation();
  const course = location.state;
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("Overview");

  if (!course) {
    return (
      <div className="text-center text-red-600 font-bold p-10">
        ❌ Course not found!
      </div>
    );
  }

  const content = {
    Overview: (
      <div className="px-6 md:px-12 my-6">
        <h1 className="text-xl font-bold mb-4">Description</h1>
        <p className="text-gray-600 mb-6">
          {course.overviewdescription || course.description}
        </p>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">What You Will Learn</h1>
          {course.whatYouWillLearn || " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, tenetur voluptatem maiores ex alias libero in inventore? Nam, vitae amet. Assumenda non autem dolore earum nobis. Non perferendis maxime aliquam." }
         
        </div>
      </div>
    ),
    Curriculum: (
      <div className="px-6 md:px-12 my-6">
        <h2 className="text-xl font-bold mb-4">Course Modules</h2>
        {/* <div className="flex flex-col gap-2 border border-gray-300 max-w-4xl">
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
        </div> */}
        <p className="text-md font-medium mt-2 text-green-600">
              Total Lessons:{" "}
              {course.modules?.reduce(
                (sum, module) => sum + (module.lessons?.length || 0),
                0
              ) || 0}
            </p>
        {course.modules?.map((module) => (
          <div
            key={module._id}
            className="mt-4 border border-gray-200 p-4 rounded"
          >
            <h4 className="font-bold text-blue-600 mb-2">{module.title}</h4>
            {/* <span className="text-sm text-gray-500 font-normal">
              ({module.lessons?.length || 0} Lessons)
            </span> */}
            

            <ul className="list-disc pl-5 space-y-1 text-sm">
              {module.lessons?.length > 0 ? (
                module.lessons.map((lesson) => (
                  <LessonVideoPlayer key={lesson._id} lesson={lesson} />
                ))
              ) : (
                <li className="text-gray-400 italic">
                  No lessons in this module.
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    ),
    Instructor: (
      <div className="px-6 md:px-12 my-6 ">
        <div className="flex justify-center p-4 gap-2  items-center">
          <img src={avatar} alt="Instructor" className="w-40 mx-auto md:mx-0" />
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">{course.overviewinstructor}</h1>
            <p className="text-blue-500 font-semibold">Full Stack Instructor</p>
            <p className="text-gray-600">
              A passionate developer and educator with years of experience in
              web development...
            </p>
          </div>
        </div>
      </div>
    ),
    Review: (
      <div className="px-6 md:px-12 my-6">
        <p className="text-gray-600">No reviews yet.  review added from enroll student</p>
      </div>
    ),
  };

  return (
    <>
      <div className="p-3">
        <img
          src={course.thumbnail}
          alt="Course Banner"
          className="h-[50vh] md:h-[70vh] w-full object-cover rounded"
        />
      </div>

      <div className="relative">
        <div className="shadow-lg bg-white px-6 py-4 max-w-3xl md:mx-6 mx-auto rounded-xl -mt-20 md:-mt-10">
          <h1 className="text-2xl font-bold mb-3">{course.title}</h1>
          <div className="flex flex-wrap md:flex-nowrap gap-6">
            <div className="flex-1">
              <h3 className="text-gray-500">Instructor</h3>
              <p className="font-semibold">{course.overviewinstructor}</p>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-500">Category</h3>
              <p className="font-semibold"> {course.categories?.join(", ")}</p>
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
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "border-transparent text-gray-600 hover:text-blue-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>{content[activeTab]}</div>
        </div>

        <aside className="w-full md:w-[400px] flex-shrink-0 shadow-lg p-6 rounded-xl bg-white -mt-43 ">
          {/* <img src={video} alt="Demo Video" className="rounded-md mb-6" /> */}
          {course.videoUrl && ReactPlayer.canPlay(course.videoUrl) && (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                📽️ Course Intro Video
              </h3>
              <ReactPlayer
                url={course.videoUrl}
                controls
                width="100%"
                height="360px"
              />
            </div>
          )}
          <div className="flex items-center justify-center mb-4">
            <MdCurrencyRupee className="h-6 w-6" />
            <h2 className="text-2xl font-bold">{course.regularPrice}</h2>
          </div>
          <button className="cursor-pointer w-full bg-blue-700 text-white py-3 rounded-lg mb-6 hover:bg-blue-800">
            Add To Cart
          </button>
          <div className="flex flex-col gap-2 text-gray-600">
            <p>✅ {course.videoHours}h on-demand video</p>
            <p>✅ Instructor: {course.overviewinstructor}</p>
            <p>✅ Language: {course.overviewlanguage}</p>
            <p>✅ Level: {course.courseLevel}</p>
            <p>
              {course.certificate ? "✅ " : "❌ "}
              Certificate
            </p>
            <p>
              {course.accessOnMobileAndTV ? "✅ " : "❌ "}
              Access on Mobile & TV
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <h3 className="font-bold">Share:</h3>
            <a href="#" className="p-2 bg-gray-300 rounded-full">
              <FaDribbble />
            </a>
            <a href="#" className="p-2 bg-gray-300 rounded-full">
              <FaLinkedin />
            </a>
            <a href="#" className="p-2 bg-gray-300 rounded-full">
              <FaTwitter />
            </a>
          </div>
        </aside>
      </div>

      {/* <div className="px-6 md:px-12 my-20 text-center">
        <h2 className="text-blue-500 text-sm">Explore Recommended Courses</h2>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">You Might Also Like</h1>
        <p className="text-gray-600 mb-12">
          Discover personalized course recommendations curated to match your interests and learning goals.
        </p>
        
        <Card all_course={all_course.slice(0, 3)} />
      </div> */}
    </>
  );
};

export default AdminCourseDetails;
