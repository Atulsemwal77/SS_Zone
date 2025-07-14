import React from "react";

const ModuleList = ({ modules }) => {
  return (
    <div className=" max-w-3xl mx-auto p-8 mt-4 bg-white shadow-xl rounded-xl space-y-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📘 All Modules & Lessons
      </h2>

      {modules.length === 0 && (
        <p className="text-gray-500">No modules added yet.</p>
      )}

      {modules.map((mod, index) => (
        <div
          key={mod._id}
          className="mb-6 border border-gray-200 p-6 rounded-xl bg-white shadow-sm"
        >
          <h3 className="font-semibold text-lg text-blue-700 mb-3">
            Module {index + 1}: {mod.title}
          </h3>

          {mod.lessons && mod.lessons.length > 0 ? (
            <ul className="space-y-2">
              {mod.lessons.map((lesson, idx) => (
                <li
                  key={lesson._id}
                  className="border-b last:border-0 pb-2 text-sm text-gray-700"
                >
                  <span className="font-medium">{idx + 1}. {lesson.lessonTitle}</span>{" "}
                  <span className="text-gray-500">– {lesson.lessonContent}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">No lessons in this module yet.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModuleList;
