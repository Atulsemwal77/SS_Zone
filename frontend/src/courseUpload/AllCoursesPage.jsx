// 📁 src/pages/AllCoursesPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import LessonVideoPlayer from "./LassonVideoPlayer";

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses/all/full");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };
    fetchAllCourses();
  }, []);

  if (courses.length === 0) return <div className="text-center p-8">Loading courses...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold text-center">All Courses</h1>

      {courses.map((course) => (
        <div key={course._id} className="bg-white p-6 rounded shadow space-y-6">
          {/* Thumbnail & Title */}
          <div className="space-y-2">
            {course.thumbnail && (
              <img
                src={course.thumbnail}
                alt="Thumbnail"
                className="w-full h-64 object-cover rounded"
              />
            )}
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <p className="text-sm text-gray-500">Course ID: {course._id}</p>
          </div>

          {/* Course Info */}
          <div>
            <p><strong>Slug:</strong> {course.slug}</p>
            <p><strong>Categories:</strong> {course.categories?.join(", ")}</p>
            <p><strong>Price:</strong> ₹{course.discountPrice} <span className="line-through text-gray-400">₹{course.regularPrice}</span></p>
            <p><strong>Language:</strong> {course.language}</p>
            <p><strong>Start Date:</strong> {course.startDate}</p>
            <p><strong>Requirements:</strong> {course.requirements}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Duration:</strong> {course.durationHour}h {course.durationMinute}m</p>
            <p><strong>Tags:</strong> {course.tags?.join(", ")}</p>
          </div>

          {/* Intro Video */}
          {course.videoUrl && (
            <div>
              <h3 className="text-lg font-semibold">Course Intro Video</h3>
              <ReactPlayer url={course.videoUrl} controls width="100%" height="360px" />
            </div>
          )}

          {/* Modules & Lessons */}
          <div>
            <h3 className="text-lg font-semibold">Modules & Lessons</h3>
            {course.modules?.map((module) => (
              <div key={module._id} className="mb-4">
                <h4 className="font-bold">{module.title}</h4>
                <ul className="list-disc pl-5 mt-2">
                  {module.lessons?.map((lesson) => (
                    <LessonVideoPlayer key={lesson._id} lesson={lesson} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCoursesPage;