import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    tags: "",
    date: "",
    category: "",
    language: "",
    socialNetwork: {
      dribbble: "",
      linkedin: "",
      facebook: "",
      twitter: ""
    },
    review: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["dribbble", "linkedin", "facebook", "twitter"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        socialNetwork: {
          ...prev.socialNetwork,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        review: parseFloat(formData.review)
      };
      await axios.post("http://localhost:3999/api/blogs/addblogs", payload);
      toast.success("Blog uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        instructor: "",
        tags: "",
        date: "",
        category: "",
        language: "",
        socialNetwork: {
          dribbble: "",
          linkedin: "",
          facebook: "",
          twitter: ""
        },
        review: ""
      });
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload blog");
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3999/api/blogs/getblogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      {/* Add Blog Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Blog
        </button>
      </div>

      {/* Modal for Add Blog */}
      {isModalOpen && (
        <div className=" fixed inset-0  bg-gray-300 flex justify-center items-center  z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl relative shadow-xl max-h-[100vh] overflow-y-auto  mt-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
            >
              ×
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold">Add Blog</h2>

              <input name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" className="w-full border px-3 py-2 rounded" />

              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Blog Description" className="w-full border px-3 py-2 rounded" />

              <input name="instructor" value={formData.instructor} onChange={handleChange} placeholder="Instructor Name" className="w-full border px-3 py-2 rounded" />

              <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full border px-3 py-2 rounded" />

              <input name="date" type="date" value={formData.date} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

              <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full border px-3 py-2 rounded" />

              <input name="language" value={formData.language} onChange={handleChange} placeholder="Language" className="w-full border px-3 py-2 rounded" />

              {/* Social Links */}
              <input name="dribbble" value={formData.socialNetwork.dribbble} onChange={handleChange} placeholder="Dribbble" className="w-full border px-3 py-2 rounded" />
              <input name="linkedin" value={formData.socialNetwork.linkedin} onChange={handleChange} placeholder="LinkedIn" className="w-full border px-3 py-2 rounded" />
              <input name="facebook" value={formData.socialNetwork.facebook} onChange={handleChange} placeholder="Facebook" className="w-full border px-3 py-2 rounded" />
              <input name="twitter" value={formData.socialNetwork.twitter} onChange={handleChange} placeholder="Twitter" className="w-full border px-3 py-2 rounded" />

              <input name="review" value={formData.review} onChange={handleChange} placeholder="Review (0 to 5)" className="w-full border px-3 py-2 rounded" />

              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Upload Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog List */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">All Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src="https://picsum.photos/800/600"
                alt="Blog Cover"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{blog.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{blog.description}</p>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt />
                    <span>
                      {new Date(blog.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <Link
                    to={`/admin/blogs/${blog._id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminBlog;
