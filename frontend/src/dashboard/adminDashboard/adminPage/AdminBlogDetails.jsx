import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { useLocation } from "react-router-dom";



const recentPosts = [
  {
    id: 1,
    title: "Why online Learning is the Key to Career Growth",
    date: "April 20, 2025",
    image: "https://source.unsplash.com/300x200/?learning",
  },
  {
    id: 2,
    title: "Why online Learning is the Key to Career Growth",
    date: "April 20, 2025",
    image: "https://source.unsplash.com/300x200/?education",
  },
  {
    id: 3,
    title: "Why online Learning is the Key to Career Growth",
    date: "April 20, 2025",
    image: "https://source.unsplash.com/300x200/?students",
  },
  {
    id: 4,
    title: "Why online Learning is the Key to Career Growth",
    date: "April 20, 2025",
    image: "https://source.unsplash.com/300x200/?online",
  },
];

const AdminBlogDetailPage = () => {
    const location = useLocation()
    const blog = location.state 
  return (
    <>
    <div className="w-full h-72 md:h-[400px] rounded-xl overflow-hidden max-w-4xl mx-auto">
    <img
      src={`http://localhost:3999/${blog.image}`}


      alt="Blog Banner"
      className="w-full h-full object-cover "
    />
    </div>
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left/Main Blog Content */}
      <div className="col-span-2 space-y-6">
        {/* Title & Metadata */}
        <div className="bg-white p-4 ">
          <h1 className="text-2xl font-bold">{blog.title}</h1>
          <div className="flex justify-between  text-gray-600 mt-2">
            <p>
              <span className="font-semibold">Instructors:</span>{" "}
              {blog.author}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {new Date(blog.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-4  text-gray-800">
          <p>{blog.content}</p>
        </div>

        {/* Quote */}
        {/* <div className="bg-gray-100 p-4 rounded shadow">
          <blockquote className="italic border-l-4 border-blue-600 pl-4 text-gray-800">
            “{blog.quote}”
          </blockquote>
          <p className="text-right font-semibold mt-2">- {blog.author}</p>
        </div> */}

        {/* Tags & Social */}
        <div className="bg-white p-4 rounded shadow ">
          <div className="flex flex-wrap gap-2">
            <span className="font-semibold">Tags:</span>
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="font-semibold">Social Network:</span>
            <FaFacebook className="text-gray-600 hover:text-blue-600 cursor-pointer" />
            <FaTwitter className="text-gray-600 hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="text-gray-600 hover:text-pink-500 cursor-pointer" />
            <FaLinkedin className="text-gray-600 hover:text-blue-700 cursor-pointer" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit Blog
          </button>
          <button className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-100">
            Delete Blog
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="bg-white rounded shadow p-4 h-fit">
        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
        {recentPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-start gap-3 mb-4 border-b pb-3"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="flex items-center text-sm text-gray-500 mb-1">
                <FiCalendar className="mr-1" /> {post.date}
              </p>
              <h4 className="text-md font-medium text-gray-800">
                {post.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AdminBlogDetailPage;
