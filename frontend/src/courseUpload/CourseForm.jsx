import React, { useState } from "react";
import axios from "axios";

const CourseForm = ({ onCourseCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    regularPrice: "",
    discountPrice: "",
    categories: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setFormData({ ...formData, thumbnail: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "categories") {
        data.append(key, JSON.stringify(value.split(",")));
      } else {
        data.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:3999/api/courses/create",
        data
      );
      alert("✅ Course created successfully!");
      // Call the callback to store new ID
      if (onCourseCreated) onCourseCreated(response.data._id);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create course");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 mt-8 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-xl font-bold">Course Info</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="input"
        />
        <input
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Course Slug"
          className="input"
        />
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="About Course"
        className="input h-24"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="regularPrice"
          value={formData.regularPrice}
          onChange={handleChange}
          placeholder="Regular Price (₹)"
          className="input"
        />
        <input
          type="number"
          name="discountPrice"
          value={formData.discountPrice}
          onChange={handleChange}
          placeholder="Discount Price (₹)"
          className="input"
        />
      </div>

      <input
        name="categories"
        value={formData.categories}
        onChange={handleChange}
        placeholder="Categories (comma-separated)"
        className="input"
      />

      <div className="border-2 border-dashed p-4 text-center">
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleChange}
        />
        <p className="text-sm text-gray-500">Choose an image (700x430px)</p>

        {formData.thumbnail && typeof formData.thumbnail !== "string" && (
          <img
            src={URL.createObjectURL(formData.thumbnail)}
            alt="Preview"
            className="mt-4 mx-auto h-40 object-cover rounded"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Course
      </button>
    </form>
  );
};

export default CourseForm;
