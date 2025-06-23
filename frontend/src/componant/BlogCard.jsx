import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function BlogCard({ blog, handleBlogClick }) {
  if (!blog) return null;

  return (
    <div
      className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col py-4 px-6 gap-4 items-start"
      onClick={() => handleBlogClick(blog)}
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="h-62 w-full object-cover rounded-xl px-2"
      />

      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1 md:mb-2">
        {blog.title}
      </h1>

      <h3 className="text-gray-600 md:text-lg">{blog.description}</h3>

      <div className="flex justify-between items-center w-full px-4 gap-3">
        <p className="text-gray-600">{blog.date}</p>
        <button
          className="text-blue-600 font-medium hover:underline flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            handleBlogClick(blog);
          }}
        >
          Read More <FaLongArrowAltRight className="ml-1" />
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
