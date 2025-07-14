
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import LessonVideoPlayer from "../components/LessonVideoPlayer";

const CourseDisplayPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/courses/${id}/full`
        );
        setCourse(res.data);
      } catch (error) {
        console.error("Failed to fetch course data", error);
      }
    };
    fetchData();
  }, [id]);

  if (!course) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Course Thumbnail and Title */}
      <div className="space-y-4">
        {course.thumbnail && (
          <img
            src={course.thumbnail}
            alt="Thumbnail"
            className="w-full h-64 object-cover rounded"
          />
        )}

        <h1 className="text-3xl font-bold">{course.title}</h1>
        {/* <p className="text-sm text-gray-500">Course ID: {course._id}</p> */}
      </div>

      {/* Course Info Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Course Info</h2>
        <p>
          <strong>Slug:</strong> {course.slug}
        </p>
        <p>
          <strong>Categories:</strong> {course.categories?.join(", ")}
        </p>
        <p>
          <strong>Price:</strong> ₹{course.discountPrice}{" "}
          <span className="line-through text-gray-400">
            ₹{course.regularPrice}
          </span>
        </p>
        <p>
          <strong>Language:</strong> {course.language}
        </p>
        <p>
          <strong>Start Date:</strong> {course.startDate}
        </p>
        <p>
          <strong>Requirements:</strong> {course.requirements}
        </p>
        <p>
          <strong>Description:</strong> {course.description}
        </p>
        <p>
          <strong>Duration:</strong> {course.durationHour}h{" "}
          {course.durationMinute}m
        </p>
        <p>
          <strong>Tags:</strong> {course.tags?.join(", ")}
        </p>
      </div>

      {/* Intro Video Section */}
      {course.videoUrl && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Course Intro Video</h2>
          <ReactPlayer
            url={course.videoUrl}
            controls
            width="100%"
            height="360px"
          />
        </div>
      )}

      {/* Modules & Lessons Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Modules & Lessons</h2>
        {course.modules?.map((module) => (
          <div key={module._id} className="mb-6">
            <h3 className="font-semibold text-lg">{module.title}</h3>
            <ul className="list-disc pl-5 mt-2">
              {module.lessons?.map((lesson) => (
                <LessonVideoPlayer key={lesson._id} lesson={lesson} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDisplayPage;
