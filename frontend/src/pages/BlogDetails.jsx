import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ins from "../assets/image/ins.jpg";
import related from "../assets/image/related.jpg";
import BlogCard from "../componant/BlogCard";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import {
  CiFacebook,
  CiLinkedin,
  CiTwitter,
  CiBasketball,
} from "react-icons/ci";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blogData, allBlogs } = location.state || {};

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [agree, setAgree] = useState(false);
  const [allcomment, setAllComment] = useState([]);

  const handleRelatedBlogClick = (blog) => {
    navigate(`/blogs/${blog.id}`, {
      state: { blogData: blog, allBlogs },
      replace: true,
    });
  };

  if (!blogData) {
    return <div className="text-center py-10">Blog not found</div>;
  }

  const relatedBlogs = allBlogs
    ?.filter((blog) => blog.id !== blogData?.id)
    .slice(0, 3);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}comment/getComment`
      );
      if (response.data.success) {
        setAllComment(response.data.data);
      } else {
        toast.error("Failed to fetch comments.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Something went wrong while fetching comments.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = { firstName, lastName, phone, email, comment };

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address.");
    }
    if (!validatePhone(phone)) {
      return toast.error("Please enter a valid 10-digit phone number.");
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND}comment/postComment`,
        commentData
      );
      toast.success("Comment sent successfully!");
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setComment("");
      setAgree(false);

      await fetchComments(); // ✅ Refresh comments
    } catch (error) {
      console.log("Error to send Comment", error);
      toast.error("Error to send Comment");
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND}comment/dltComment/${id}`);
      toast.success("Comment deleted!");
      setAllComment(allcomment.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <div className="w-full h-64 md:h-96 overflow-hidden rounded-xl">
        <img
          src={blogData.image}
          alt={blogData.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6 justify-between">
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md flex flex-col gap-5 items-start justify-start w-full md:w-2/3 px-3">
          <h1 className="text-3xl font-bold mb-4">{blogData.title}</h1>
          <p className="text-gray-600 mb-4">{blogData.date}</p>
          <p className="h-1/2">{blogData.about}</p>
          <div className="quote px-4 py-3 bg-gray-100 rounded">
            <h1 className="text-lg font-semibold">
              This blog offers a clear and beginner-friendly introduction to
              JavaScript, making it an excellent starting point for new
              learners.
            </h1>
            <pre className="text-sm text-blue-600 font-serif">Dhna wayle</pre>
          </div>

          <div className="px-2 py-8 flex flex-wrap items-start gap-6">
            <div className="tags flex flex-wrap gap-2">
              <h1 className="font-semibold text-lg">Tags:</h1>
              <button className="py-1 px-2 rounded-md bg-gray-300 text-gray-600">
                Education
              </button>
              <button className="py-1 px-2 rounded-md bg-gray-300 text-gray-600">
                Branding
              </button>
              <button className="py-1 px-2 rounded-md bg-gray-300 text-gray-600">
                JavaScript
              </button>
            </div>
            <div className="socialbtn flex flex-wrap items-center gap-4">
              <h1 className="font-semibold text-lg">Social Network</h1>
              <CiFacebook size={30} />
              <CiLinkedin size={30} />
              <CiTwitter size={30} />
              <CiBasketball size={30} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
            <ul className="space-y-6 py-4">
              {[...Array(5)].map((_, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 shadow-md shadow-gray-300 rounded-md p-2"
                >
                  <img
                    src={related}
                    alt="Recent Post"
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-500">📅 April 20, 2025</p>
                    <p className="font-medium">
                      Why online learning is the key to career growth
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Related Blogs */}
      <div className="mt-12 px-5">
        <h2 className="text-2xl font-bold mb-6">Related Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedBlogs?.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              handleBlogClick={handleRelatedBlogClick}
            />
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <section className="space-y-6 mt-12 px-5 py-6 bg-gray-50">
        <h2 className="text-2xl font-bold">
          Comments {allcomment.length > 0 ? allcomment.length : ""}
        </h2>

        <div className="max-w-full overflow-x-auto flex space-x-4 py-4 px-2 border border-gray-200 rounded-md bg-white">
         {allcomment.length > 0 ? (
          <>
           {allcomment.map((comment) => (
            <div
              key={comment._id}
              className="min-w-[300px] max-w-xs flex-shrink-0 bg-gray-50 p-4 rounded-xl shadow relative"
            >
              <div className="flex items-center gap-4">
                <img
                  src={comment.avatar || related}
                  alt="Commenter"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {comment.firstName} {comment.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{comment.comment}</p>
              <button
                onClick={() => deleteItem(comment._id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          </>
         ):(
          <>
          <p className="mx-auto font-semibold">Not Comments Yet!</p>
          </>
         )}        
         </div>

        {/* Comment Form */}
        <form className="bg-white p-6 rounded-xl shadow space-y-4 md:w-1/2">
          <h3 className="text-xl font-bold">Leave a Comment</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your First Name"
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your Last Name"
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your Phone Number"
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                className="w-full rounded border px-3 py-2 h-24 resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label className="text-sm text-gray-700">
              I agree that my data is collected and stored
            </label>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={
              !firstName || !lastName || !email || !phone || !comment || !agree
            }
            className={`px-6 py-2 rounded text-white ${
              !firstName || !lastName || !email || !phone || !comment || !agree
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Post Comment
          </button>
        </form>
      </section>
    </div>
  );
};

export default BlogDetails;
