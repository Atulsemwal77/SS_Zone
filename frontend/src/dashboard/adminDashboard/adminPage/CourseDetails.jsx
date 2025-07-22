// src/pages/Admin/AdminCourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaEdit, FaTrash } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import avatar from "../../../assets/image/avatar.png";
import { MdCurrencyRupee } from "react-icons/md";
import { FaDribbble, FaLinkedin, FaTwitter } from "react-icons/fa";
import ReactPlayer from "react-player";
import LessonVideoPlayer from "../../../courseUpload/LassonVideoPlayer";
import EditCourseModal from "../../../courseUpload/CourseEdit";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModuleForm from "../../../courseUpload/ModuleForm";
import LessonForm from "../../../courseUpload/LessonForm";
import { FiX } from "react-icons/fi";

const AdminCourseDetails = () => {
  const location = useLocation();
  const course = location.state;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState(course);

  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  const [editModuleId, setEditModuleId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleUpdated = (newData) => {
    setUpdatedCourse(newData);
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3999/api/modules/${id}`, {
        title: editTitle,
      });
      toast.success("Module updated successfully");

      setEditModuleId(null);
      setEditTitle("");
    } catch (error) {
      toast.error("Failed to update module");
      console.error(error);
    }
  };

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

  const handleDeleteModule = async (id) => {
    try {
      await axios.delete(`http://localhost:3999/api/modules/${id}`);
      toast.success("Module deleted successfully");
      //  fetchCourseDetails()
      // Refresh module list after deletion
      // fetchModules(); // or update local state to remove the deleted module
    } catch (error) {
      toast.error("Failed to delete module");
      console.error(error);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3999/api/courses/${course._id}`
      );
      if (res.status === 200) {
        setUpdatedCourse(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch course:", err);
      toast.error("❌ Failed to load updated course");
    }
  };

  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:3999/api/courses/delete/${course._id}`
      );

      if (res.status === 200) {
        toast.success("✅ Course deleted!");
        navigate("/admin/enrollCourse");
        // Optionally remove course from list or refresh
      } else {
        toast.error("❌ Could not delete course");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete course");
    }
  };

  const handleStatusUpdate = async (courseId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:3999/api/courses/status/${courseId}`,
        { status: newStatus }
      );

      if (res.status === 200) {
        toast.success(`✅ Status updated to ${newStatus}`);
        navigate("/admin/enrollCourse");
        // Optionally refetch or update local state
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update course status");
    }
  };

  const content = {
    Overview: (
      <div className="px-6 md:px-12 my-6">
        <h1 className="text-xl font-bold mb-4">Description</h1>
        <p className="text-gray-600 mb-6">
          {course.overviewdescription || course.description}
        </p>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">What You Will Learn</h1>
          {course.whatYouWillLearn ||
            " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, tenetur voluptatem maiores ex alias libero in inventore? Nam, vitae amet. Assumenda non autem dolore earum nobis. Non perferendis maxime aliquam."}
        </div>
      </div>
    ),
    Curriculum: (
      <div className="px-6 md:px-12 my-6">
        <h2 className="text-xl font-bold mb-4">Course Modules</h2>

        <div className="flex justify-end gap-4 mb-4">
          <button
            onClick={() => setIsAddLessonOpen(true)}
            className="  px-4 py-1 rounded border"
          >
            + Add Lesson
          </button>
          <button
            onClick={() => setIsAddModuleOpen(true)}
            className=" border px-4 py-1 rounded"
          >
            + Add Module
          </button>
        </div>

        {isAddLessonOpen && (
          <div className="border p-4 mt-4 rounded bg-gray-50 relative">
            <button
              onClick={() => setIsAddLessonOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            <LessonForm
              courseId={course._id}
              modules={updatedCourse.modules}
              onClose={() => setIsAddLessonOpen(false)}
              onLessonAdded={() => {
                fetchCourseDetails();
                setIsAddLessonOpen(false);
                toast.success("✅ Lesson added!");
              }}
            />
          </div>
        )}

        {isAddModuleOpen && (
          <div className="border p-4 mt-4 rounded bg-gray-50 relative">
            <button
              onClick={() => setIsAddModuleOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>

            <ModuleForm
              courseId={course._id}
              onClose={() => setIsAddModuleOpen(false)}
              onModuleAdded={() => {
                fetchCourseDetails();
                toast.success("✅ Module added!");
              }}
            />
          </div>
        )}

        <p className="text-md font-medium mt-2 text-gray-400">
          Total Lessons:{" "}
          {updatedCourse.modules?.reduce(
            (sum, module) => sum + (module.lessons?.length || 0),
            0
          ) || 0}
        </p>

        {updatedCourse.modules?.map((module) => (
          <div
            key={module._id}
            className="mt-4 border border-gray-200 p-4 rounded"
          >
            <div className="flex items-center justify-between">
              {editModuleId === module._id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border "
                />
              ) : (
                <p className="font-semibold ">{module.title}</p>
              )}

              <div className="flex items-center gap-2">
                <FaEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    setEditModuleId(module._id);
                    setEditTitle(module.title);
                  }}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteModule(module._id)}
                />
                {editModuleId === module._id && (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                      onClick={() => handleUpdate(module._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded text-sm"
                      onClick={() => setEditModuleId(null)}
                    >
                      <FiX />
                    </button>
                  </>
                )}
              </div>
            </div>

            <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
              {module.lessons?.length > 0 ? (
                module.lessons.map((lesson) => (
                  <LessonVideoPlayer
                    key={lesson._id}
                    lesson={lesson}
                    modules={updatedCourse.modules}
                  />
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
        <p className="text-gray-600">
          No reviews yet. review added from enroll student
        </p>
      </div>
    ),
  };

  return (
    <>
      <div className="p-3">
        <img
          src={course.thumbnail}
          alt="Course Banner"
          className="h-[50vh] md:h-[70vh] w-full object-contain object-center rounded"
        />
      </div>

      <div className="relative">
        <div className="shadow-lg bg-white px-6 py-4 max-w-3xl md:mx-6 mx-auto rounded-xl  md:-mt-10">
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

        <aside className="w-full md:w-[400px] flex-shrink-0  p-4 rounded-xl bg-white lg:-mt-43 -mt-10 ">
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
          <div className="flex items-center ">
            <MdCurrencyRupee className="h-6 w-6" />
            <h2 className="text-2xl font-bold">{course.regularPrice}</h2>
          </div>
          <p className="text-xl font-semibold mb-2"> This Course Includes </p>
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
          <div className="mt-4">
            {course.status === "Pending" && (
              <>
                <button
                  className="border w-full mt-4 p-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  onClick={() => setIsModalOpen(true)}
                >
                  Edit Course
                </button>
                <button
                  className="border w-full p-1 text-blue-500 rounded-lg mt-2"
                  onClick={handleDelete}
                >
                  Delete Course
                </button>
              </>
            )}

            <p className="mt-2 text-gray-600">Status Update</p>
            <button
              onClick={() =>
                handleStatusUpdate(
                  course._id,
                  course.status === "Published" ? "Pending" : "Published"
                )
              }
              className=" w-full p-1 border rounded-lg  text-white bg-blue-500 hover:bg-blue-600"
            >
              {course.status === "Published" ? "Unpublish" : "Publish"}
            </button>

            {isModalOpen && (
              <EditCourseModal
                course={updatedCourse}
                onClose={() => setIsModalOpen(false)}
                onUpdated={handleUpdated}
              />
            )}
          </div>
          <ToastContainer position="top-right" autoClose={2000} />
        </aside>
      </div>
    </>
  );
};

export default AdminCourseDetails;
