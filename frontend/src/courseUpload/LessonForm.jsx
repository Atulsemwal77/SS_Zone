import React from "react";
import { useState } from "react";
import axios from "axios";

const LessonForm = ({ modules, onLessonAdded }) => {
  const [formData, setFormData] = useState({
    lessonTitle: "",
    lessonContent: "",
    lessonImage: "",
    lessonVideoSource: "",
    lessonHour: 0,
    lessonMinute: 0,
    lessonSecond: 0,
    moduleId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { moduleId, ...lessonData } = formData;
    if (!moduleId) return alert("Select a module");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/modules/${moduleId}/lessons`,
        lessonData
      );
      onLessonAdded(res.data.lesson);
      alert("✅ Lesson added");
    } catch (err) {
      alert("Error adding lesson");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-lg font-bold mb-2">Add Lesson</h2>

      <select
        name="moduleId"
        onChange={handleChange}
        value={formData.moduleId}
        className="input mb-2"
      >
        <option value="">Select Module</option>
        {modules.map((mod) => (
          <option key={mod._id} value={mod._id}>
            {mod.title}
          </option>
        ))}
      </select>

      <input
        name="lessonTitle"
        placeholder="Lesson Title"
        className="input mb-2"
        onChange={handleChange}
      />
      <textarea
        name="lessonContent"
        placeholder="Lesson Content"
        className="input mb-2"
        onChange={handleChange}
      />
      <input
        name="lessonVideoSource"
        placeholder="Video URL"
        className="input mb-2"
        onChange={handleChange}
      />

      <div className="flex gap-2 mb-2">
        <input
          name="lessonHour"
          type="number"
          placeholder="Hrs"
          className="input w-1/3"
          onChange={handleChange}
        />
        <input
          name="lessonMinute"
          type="number"
          placeholder="Min"
          className="input w-1/3"
          onChange={handleChange}
        />
        <input
          name="lessonSecond"
          type="number"
          placeholder="Sec"
          className="input w-1/3"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Lesson
      </button>
    </form>
  );
};

export default LessonForm;
