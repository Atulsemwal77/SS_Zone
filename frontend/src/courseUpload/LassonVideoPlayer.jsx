// 📁 src/components/LessonVideoPlayer.jsx
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay } from 'react-icons/fa';

const LessonVideoPlayer = ({ lesson }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <li className="my-2">
      <button
        className="text-blue-600 hover:underline flex items-center gap-2"
        onClick={() => setShowVideo(!showVideo)}
      >
        <FaPlay className="text-sm" />
        {lesson.lessonTitle} ({lesson.lessonHour}h {lesson.lessonMinute}m)
      </button>

      {showVideo && lesson.lessonVideoSource && (
        <div className="mt-2">
          <ReactPlayer
            url={lesson.lessonVideoSource}
            controls
            width="100%"
            height="360px"
          />
        </div>
      )}
    </li>
  );
};

export default LessonVideoPlayer;
