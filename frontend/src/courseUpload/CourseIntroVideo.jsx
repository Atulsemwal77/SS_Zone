import React, { useState } from "react";
import axios from "axios";

const CourseIntroVideo = ({ courseId,onUploaded  }) => {
  const [videoUrl, setVideoUrl] = useState("");

  const handleUploadVideo = async () => {
    if (!courseId) {
      alert("❌ Course ID is missing.");
      return;
    }

    try {
await axios.post(`http://localhost:5000/api/courses/${courseId}/upload-video`, {
        videoUrl
      });

      alert("✅ Video URL uploaded successfully!");
      setVideoUrl(""); // Optional: reset the field after upload
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload video.");
    }
  };

  return (
    <div className="border-1 p-6 rounded-lg mt-6 bg-white">
      <details open>
        <summary className="text-lg font-semibold cursor-pointer mb-4">
          Course Intro Video
        </summary>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Add Your Video URL
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="input"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: https://www.youtube.com/watch?v=yourvideoid
            </p>
          </div>

          <button
            onClick={handleUploadVideo}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Upload Video
          </button>
        </div>
      </details>
    </div>
  );
};

export default CourseIntroVideo;