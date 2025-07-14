// 📁 src/components/LessonVideoPlayer.jsx
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const LessonVideoPlayer = ({ lesson }) => {
  const [showVideo, setShowVideo] = useState(false);

  const formattedTime = `${lesson.lessonHour || 0}h ${lesson.lessonMinute || 0}m ${lesson.lessonSecond || 0}s`;

  return (
    <li className="my-2">
      <button
        className="text-blue-700 hover:underline flex items-center gap-2 font-medium"
        onClick={() => setShowVideo(!showVideo)}
      >
        {showVideo ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
        {lesson.lessonTitle} <span className="text-gray-500 text-sm">({formattedTime})</span>
      </button>

      {showVideo && (
        <div className="mt-2 transition-all duration-300 ease-in-out">
          {lesson.lessonVideoSource && ReactPlayer.canPlay(lesson.lessonVideoSource) ? (
            <ReactPlayer
              url={lesson.lessonVideoSource}
              controls
              width="100%"
              height="360px"
              style={{ borderRadius: "10px", overflow: "hidden" }}
            />
          ) : (
            <p className="text-red-500 text-sm mt-1">⚠️ Invalid or missing video URL.</p>
          )}
        </div>
      )}
    </li>
  );
};

export default LessonVideoPlayer;
