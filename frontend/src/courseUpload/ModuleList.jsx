import React from "react";
const ModuleList = ({ modules }) => (
  <div>
    <h2 className="text-lg font-bold mb-4">All Modules & Lessons</h2>
    {modules.map((mod) => (
      <div key={mod._id} className="mb-6 border p-4 rounded bg-white shadow">
        <h3 className="font-semibold text-lg mb-2">{mod.title}</h3>
        <ul className="list-disc pl-6 text-sm">
          {mod.lessons?.map((lesson) => (
            <li key={lesson._id}>
              <strong>{lesson.lessonTitle}</strong> – {lesson.lessonContent}
            </li>
          )) || <li>No lessons</li>}
        </ul>
      </div>
    ))}
  </div>
);

export default ModuleList;