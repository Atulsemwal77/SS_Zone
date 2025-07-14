import React, { useState } from "react";
import axios from "axios";

const AdditionalInfoForm = ({ courseId }) => {
  const [form, setForm] = useState({
    language: "",
    startDate: "",
    requirements: "",
    description: "",
    durationHour: "",
    durationMinute: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        tags: JSON.stringify(form.tags.split(",").map(tag => tag.trim())), // convert string to array
      };

      const res = await axios.post(
        `http://localhost:3999/api/courses/${courseId}/additional-info`,
        payload
      );

      console.log("✅ Course additional info updated:", res.data);
    } catch (err) {
      console.error("❌ Error saving additional info:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mt-10">
      <h2 className="text-lg font-semibold mb-4">Additional Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
        <input
          name="language"
          className="input"
          placeholder="Language"
          onChange={handleChange}
          value={form.language}
        />
        <input
          name="startDate"
          type="date"
          className="input"
          onChange={handleChange}
          value={form.startDate}
        />
        <textarea
          name="requirements"
          className="input"
          placeholder="Requirements"
          onChange={handleChange}
          value={form.requirements}
        />
        <textarea
          name="description"
          className="input"
          placeholder="Description"
          onChange={handleChange}
          value={form.description}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          name="durationHour"
          className="input"
          placeholder="Hours"
          type="number"
          onChange={handleChange}
          value={form.durationHour}
        />
        <input
          name="durationMinute"
          className="input"
          placeholder="Minutes"
          type="number"
          onChange={handleChange}
          value={form.durationMinute}
        />
      </div>

      <textarea
        name="tags"
        className="input mb-4"
        placeholder="Tags (comma separated)"
        onChange={handleChange}
        value={form.tags}
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Info
      </button>
    </form>
  );
};

export default AdditionalInfoForm;