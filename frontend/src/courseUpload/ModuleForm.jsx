import React from "react";
import { useState } from "react";
import axios from "axios";

const ModuleForm = ({ courseId, onModuleCreated }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3999/api/modules", {
        title,
        courseId, // ✅ important
      });
      setTitle("");
      onModuleCreated(); // reload modules
    } catch (err) {
      console.error("Error creating module", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-lg font-bold mb-2">Create Module</h2>
      <input
        className="input mb-2"
        placeholder="Module title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Module
      </button>
    </form>
  );
};

export default ModuleForm;