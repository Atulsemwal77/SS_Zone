// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FaCalendarAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const AdminBlog = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     instructor: "",
//     tags: "",
//     date: "",
//     category: "",
//     language: "",
//     socialNetwork: {
//       dribbble: "",
//       linkedin: "",
//       facebook: "",
//       twitter: ""
//     },
//     review: ""
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [blogs, setBlogs] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (["dribbble", "linkedin", "facebook", "twitter"].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         socialNetwork: {
//           ...prev.socialNetwork,
//           [name]: value
//         }
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         tags: formData.tags.split(",").map((tag) => tag.trim()),
//         review: parseFloat(formData.review)
//       };
//       await axios.post("${import.meta.env.VITE_BACKEND_URL}/api/blogs/addblogs", payload);
//       toast.success("Blog uploaded successfully!");
//       setFormData({
//         title: "",
//         description: "",
//         instructor: "",
//         tags: "",
//         date: "",
//         category: "",
//         language: "",
//         socialNetwork: {
//           dribbble: "",
//           linkedin: "",
//           facebook: "",
//           twitter: ""
//         },
//         review: ""
//       });
//       setIsModalOpen(false);
//       fetchBlogs();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to upload blog");
//     }
//   };

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get("${import.meta.env.VITE_BACKEND_URL}/api/blogs/getblogs");
//       setBlogs(res.data);
//     } catch (error) {
//       console.error("Failed to fetch blogs:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   return (
//     <>
//       {/* Add Blog Button */}
//       <div className="flex justify-end p-4">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           + Add Blog
//         </button>
//       </div>

//       {/* Modal for Add Blog */}
//       {isModalOpen && (
//         <div className=" fixed inset-0  bg-gray-300 flex justify-center items-center  z-50">
//           <div className="bg-white p-6 rounded-xl w-full max-w-2xl relative shadow-xl max-h-[100vh] overflow-y-auto mb-8  mt-10">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
//             >
//               ×
//             </button>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <h2 className="text-xl font-semibold">Add Blog</h2>

//               <input name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" className="w-full border px-3 py-2 rounded" />

//               <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Blog Description" className="w-full border px-3 py-2 rounded" />

//               <input name="instructor" value={formData.instructor} onChange={handleChange} placeholder="Instructor Name" className="w-full border px-3 py-2 rounded" />

//               <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full border px-3 py-2 rounded" />

//               <input name="date" type="date" value={formData.date} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

//               <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full border px-3 py-2 rounded" />

//               <input name="language" value={formData.language} onChange={handleChange} placeholder="Language" className="w-full border px-3 py-2 rounded" />

//               {/* Social Links */}
//               <input name="dribbble" value={formData.socialNetwork.dribbble} onChange={handleChange} placeholder="Dribbble" className="w-full border px-3 py-2 rounded" />
//               <input name="linkedin" value={formData.socialNetwork.linkedin} onChange={handleChange} placeholder="LinkedIn" className="w-full border px-3 py-2 rounded" />
//               <input name="facebook" value={formData.socialNetwork.facebook} onChange={handleChange} placeholder="Facebook" className="w-full border px-3 py-2 rounded" />
//               <input name="twitter" value={formData.socialNetwork.twitter} onChange={handleChange} placeholder="Twitter" className="w-full border px-3 py-2 rounded" />

//               <input name="review" value={formData.review} onChange={handleChange} placeholder="Review (0 to 5)" className="w-full border px-3 py-2 rounded" />

//               <div className="flex justify-end gap-4">
//                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded text-gray-600">
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
//                   Upload Blog
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Blog List */}
//       <div className="p-6">
//         <h1 className="text-2xl font-semibold mb-6">All Blogs</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {blogs.map((blog) => (
//             <div key={blog._id} className="bg-white rounded-xl shadow-md overflow-hidden">
//               <img
//                 src="https://picsum.photos/800/600"
//                 alt="Blog Cover"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-lg font-bold text-gray-800">{blog.title}</h2>
//                 <p className="text-sm text-gray-600 mt-1">{blog.description}</p>
//                 <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
//                   <div className="flex items-center gap-1">
//                     <FaCalendarAlt />
//                     <span>
//                       {new Date(blog.date).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </div>
//                   <Link
//                     to={`/admin/blogs/${blog._id}`}
//                     className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
//                   >
//                     Read More →
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminBlog;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Superscript from "@tiptap/extension-superscript";
// import Subscript from "@tiptap/extension-subscript";
// import Highlight from "@tiptap/extension-highlight";
// import TextAlign from "@tiptap/extension-text-align";
// import LinkExtension from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";
// import Placeholder from "@tiptap/extension-placeholder";
// import CustomMenuBar from "../components/Menu/CustomMenuBar";
// import { Link } from "react-router-dom";

// const BlogModalPage = () => {
//    const getTodayDate = () => {
//   return new Date().toISOString().split('T')[0];
//   };
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     date: getTodayDate(),
//     author: "",
//     tags: "",
//     content: "",
//   });
//   const [image, setImage] = useState(null);
//   const [blogs, setBlogs] = useState([]);

//   const [imagePreview, setImagePreview] = useState(null);

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Superscript,
//       Subscript,
//       Highlight,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//       LinkExtension.configure({ openOnClick: false }),
//       Image,
//       Placeholder.configure({ placeholder: "Start writing your post here..." }),
//     ],
//     content: "",
//     onUpdate: ({ editor }) => {
//       setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
//     },
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleRemoveImage = () => {
//     setImage(null);
//     setImagePreview(null);
//     document.getElementById("fileUpload").value = "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("date", formData.date);
//     data.append("author", formData.author);
//     data.append("tags", formData.tags);
//     data.append("content", formData.content);
//     if (image) data.append("image", image);

//     try {
//       await axios.post(`${import.meta.env.VITE_BACKEND}/api/blogs`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Blog uploaded!");
//       setShowModal(false);
//       setFormData({ title: "", date: "", author: "", tags: "", content: "" });
//       setImage(null);
//       setImagePreview(null);
//       if (editor) editor.commands.setContent("");
//       fetchBlogs(); // Refresh blog list
//     } catch (err) {
//       console.error("Upload failed", err);
//       alert("Failed to upload blog.");
//     }
//   };

//   // Fetch blogs from the backend

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/blogs`);
//       setBlogs(res.data);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   useEffect(() => {
//   setFormData((prev) => ({
//     ...prev,
//     date: getTodayDate(),
//   }));
// }, []);

//   return (
//     <div className="bg-[#D7D9DD] min-h-screen">
//       <div className="p-3">
//         <div className="text-right">
//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-black text-white px-4 py-2 rounded cursor-pointer"
//           >
//             Upload Blog
//           </button>
//         </div>

//         {showModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
//               >
//                 &times;
//               </button>

//               <h2 className="text-2xl font-bold mb-6 text-center">Upload Blog</h2>
//               <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Title"
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//                 <div className="flex gap-4">
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={(e) =>
//                       setFormData({ ...formData, date: e.target.value })
//                     }
//                     className="w-1/2 p-2 border rounded"
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="author"
//                     value={formData.author}
//                     onChange={handleChange}
//                     placeholder="Author"
//                     className="w-1/2 p-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   name="tags"
//                   value={formData.tags}
//                   onChange={handleChange}
//                   placeholder="Tags (comma-separated)"
//                   className="w-full p-2 border rounded"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   id="fileUpload"
//                   onChange={handleImageChange}
//                   className="w-full border rounded p-2"
//                 />
//                 {imagePreview && (
//                   <div className="relative mt-2">
//                     <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover border" />
//                     <button
//                       type="button"
//                       onClick={handleRemoveImage}
//                       className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 )}
//                 <div className="border rounded p-2">
//                   <CustomMenuBar editor={editor} />
//                   <EditorContent editor={editor} className="prose max-w-none min-h-[150px]" />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-black text-white p-2 rounded "
//                 >
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 z-10">
//         <h2 className="text-3xl font-bold text-center mb-8">Blog Posts</h2>
//         {blogs.length === 0 ? (
//           <p className="text-center text-gray-500">No blogs available</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {blogs.map((blog) => (
//               <Link
//                 to={`/dashboard/blogdetail/${blog._id}`}
//                 state={blog}
//                 key={blog._id}
//               >
//                 <div className="bg-[#f5f4ef] rounded-xl shadow-lg overflow-hidden border relative border-gray-200">
//                   <span className="inline-block border border-black bg-gray-50 px-4 py-1 rounded-full text-sm absolute top-2 left-2 font-medium">
//                     {blog.tags[0] || "Blog"}
//                   </span>

//                   {blog.image && (
//                     <img
//                       src={`${import.meta.env.VITE_BACKEND}/${blog.image.replace(/\\/g, '/')}`}
//                       alt={blog.title}
//                       className="w-full h-64 object-cover"
//                     />
//                   )}
//                   <div className="px-6 pb-6">
//                     <p className="text-sm text-gray-600 mb-1">
//                       {new Date(blog.date).toLocaleDateString()} • By {blog.author}
//                     </p>
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                       {blog.title.length > 25
//                         ? blog.title.substring(0, 25) + "..."
//                         : blog.title}
//                     </h3>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogModalPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
// import CustomMenuBar from "../components/Menu/CustomMenuBar";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomMenuBar from "./CustomMenuBar";

const BlogModalPage = () => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: getTodayDate(),
    author: "",
    tags: "",
    content: "",
    category: "",
    language: "",
    dribbble: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    review: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [loading, setLoading] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      LinkExtension.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Start writing your post here..." }),
    ],
    content: "",
    onUpdate: ({ editor }) =>
      setFormData((prev) => ({ ...prev, content: editor.getHTML() })),
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    document.getElementById("fileUpload").value = "";
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: getTodayDate(),
      author: "",
      tags: "",
      content: "",
      category: "",
      language: "",
      dribbble: "",
      linkedin: "",
      facebook: "",
      twitter: "",
      review: "",
    });
    setImage(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingBlogId(null);
    if (editor) editor.commands.setContent("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (image) data.append("image", image);

    try {
      if (isEditing) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND}blogs/blogs/${editingBlogId}`,
          data
        );
        toast.success("Blog updated!");
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND}blogs`, data);
        toast.success("Blog uploaded!");
      }
      setShowModal(false);
      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Failed to upload blog.");
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}blogs`);
      setBlogs(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND}blogs/blogs/${id}`);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };

  
  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      date: blog.date ? blog.date.split("T")[0] : getTodayDate(),
      author: blog.author,
      tags: blog.tags.join(", "),
      content: blog.content,
      category: blog.category,
      language: blog.language,
      dribbble: blog.dribbble,
      linkedin: blog.linkedin ,
      facebook: blog.facebook,
      twitter: blog.twitter ,
      review: blog.review || 3,
    });

    // Safe image preview setup
    setImagePreview(
      blog.image
        ? `${import.meta.env.VITE_BACKEND_URL}/${blog.image.replace(/\\/g, "/")}`
        : null
    );

    setEditingBlogId(blog._id);
    setIsEditing(true);
    setShowModal(true);

    if (editor) editor.commands.setContent(blog.content || "");
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className=" min-h-screen">
      <div className="p-3 text-right">
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Upload Blog
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isEditing ? "Edit Blog" : "Upload Blog"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-h-[80vh] overflow-y-auto pr-2"
            >
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author"
                  className="w-1/2 p-2 border rounded"
                  required
                />
              </div>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Tags (comma-separated)"
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                id="fileUpload"
                onChange={handleImageChange}
                className="w-full border rounded p-2"
              />
              {imagePreview && (
                <div className="relative mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}
              <div className="border rounded p-2">
                <CustomMenuBar editor={editor} />
                <EditorContent
                  editor={editor}
                  className="prose max-w-none min-h-[150px]"
                />
              </div>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                placeholder="Language"
                className="w-full p-2 border rounded"
              />

              <input
                type="number"
                name="review"
                
                value={formData.review}
                onChange={handleChange}
                placeholder="Review (0-5 or comment)"
                className="w-full p-2 border rounded"
              />

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin }
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                  className="p-2 border rounded"
                />
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter }
                  onChange={handleChange}
                  placeholder="Twitter URL"
                  className="p-2 border rounded"
                />
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="Facebook URL"
                  className="p-2 border rounded"
                />
                <input
                  type="url"
                  name="dribbble"
                  value={formData.dribbble}
                  onChange={handleChange}
                  placeholder="Dribbble URL"
                  className="p-2 border rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded"
              >
                {isEditing ? "Update Blog" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 mb-4">
        <h2 className="text-3xl font-bold text-center mb-8">Blog Posts</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available</p>
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-[#f5f4ef] rounded-xl shadow-lg overflow-hidden border relative border-gray-200"
              >
                <Link
                  to={`/admin/blogdetail/${blog._id}`}
                  state={blog}
                  className="block hover:shadow-xl transition-all"
                >
                  <span className="inline-block border border-black bg-gray-50 px-4 py-1 rounded-full text-sm absolute top-2 left-2 font-medium">
                    {blog.tags[0] || "Blog"}
                  </span>
                  <div className="w-full h-64 ">
                    {blog.image && (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-full "
                      />
                    )}
                  </div>
                </Link>

                <div className="">
                  <div className="px-2 pt-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {blog.title}
                    </h3>
                    {console.log(blog.content)}
                    {/* <p className="text-md text-gray-700"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                    >
                      {blog.content?.length > 25
                        ? `${blog.content.slice(0, 50)}...`
                        : blog.content || "No content"}
                    </p> */}
                    <div
                      className="text-md text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.content?.length > 50
                            ? `${blog.content.slice(0, 50)}...`
                            : blog.content || "No content",
                      }}
                    ></div>

                    <p className="text-sm text-gray-600 mb-1 flex items-center justify-between my-2">
                      {new Date(blog.date).toLocaleDateString()}
                      <span className="text-[#296AD2] flex items-center gap-1">
                        Read More <FaArrowRight />
                      </span>
                    </p>
                  </div>

                  <div className="flex  p-4 justify-end  h-full gap-2 ">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Blog"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Blog"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogModalPage;
