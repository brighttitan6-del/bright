
import React from 'react';
import type { Lesson } from '../types';
import { Header } from '../components/Header';

interface VideoPlayerScreenProps {
  lesson: Lesson;
  onBack: () => void;
}

export const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ lesson, onBack }) => {
  return (
    <div>
      <Header title={lesson.title} onBack={onBack} />
      <div className="aspect-video bg-black flex items-center justify-center">
        <i className="fa-solid fa-play text-white text-5xl"></i>
        <p className="text-white ml-4">Video Player Placeholder</p>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{lesson.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{lesson.teacher} &bull; {lesson.duration}</p>
        <p className="text-gray-700 mt-4">{lesson.description}</p>

        <div className="mt-6 flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <i className="fa-solid fa-heart"></i>
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <i className="fa-solid fa-comment"></i>
            <span>Comment</span>
          </button>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <h3 className="font-bold text-lg mb-4">Questions & Comments</h3>
        {/* Comment input */}
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex-shrink-0"></div>
          <div className="flex-1">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask a question or leave a comment..."
              rows={2}
            ></textarea>
            <button className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700">Post</button>
          </div>
        </div>
        {/* Example Comment */}
        <div className="mt-6 flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-green-200 flex-shrink-0"></div>
          <div className="flex-1 bg-gray-100 p-3 rounded-lg">
            <p className="font-semibold text-sm">Charlie</p>
            <p className="text-sm">This was a great explanation, thank you!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
