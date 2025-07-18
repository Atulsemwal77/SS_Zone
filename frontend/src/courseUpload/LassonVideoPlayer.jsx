// 📁 src/components/LessonVideoPlayer.jsx
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import LessonEditModal from './LessonEdit';

const LessonVideoPlayer = ({ lesson , modules }) => {


  const [showVideo, setShowVideo] = useState(false);

  const [editingLesson, setEditingLesson] = useState(null);
    const [localModules, setLocalModules] = useState(modules);
  
    // Sync initial modules prop
    useEffect(() => {
      setLocalModules(modules);
    }, [modules]);
  
    const handleEditClick = (lesson) => {
      setEditingLesson(lesson);
    };
  
    const handleLessonUpdate = (updatedLesson) => {
      const updatedModules = localModules.map((mod) => {
        return {
          ...mod,
          lessons: mod.lessons.map((lesson) =>
            lesson._id === updatedLesson._id ? updatedLesson : lesson
          ),
        };
      });
  
      setLocalModules(updatedModules);
      setEditingLesson(null); // close modal
    };

  const formattedTime = `${lesson.lessonHour || 0}h ${lesson.lessonMinute || 0}m ${lesson.lessonSecond || 0}s`;

  return (
    <>
    <li className="my-2">
      <button
        className="text-blue-700 hover:underline flex items-center gap-2 font-medium"
        onClick={() => setShowVideo(!showVideo)}
      >
        {showVideo ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
        {lesson.lessonTitle} <span className="text-gray-500 text-sm">({formattedTime})</span>
         
      </button>
      <button
                          onClick={() => handleEditClick(lesson)}
                          className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                        >
                          <FiEdit />
                          <span>Edit</span>
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
    
    {editingLesson && (
        <LessonEditModal
          lesson={editingLesson}
          onClose={() => setEditingLesson(null)}
          onLessonUpdated={handleLessonUpdate}
        />
      )}

    </>
  );
};

export default LessonVideoPlayer;
