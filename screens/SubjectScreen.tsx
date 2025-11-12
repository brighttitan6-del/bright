
import React from 'react';
import type { Subject, Lesson } from '../types';
import { LESSONS } from '../constants';
import { Header } from '../components/Header';

interface LessonCardProps {
  lesson: Lesson;
  onWatch: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onWatch }) => (
  <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden">
    <img src={lesson.thumbnail} alt={lesson.title} className="w-1/3 object-cover" />
    <div className="p-4 flex flex-col justify-between w-2/3">
      <div>
        <h3 className="font-bold text-gray-800 text-md">{lesson.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{lesson.teacher} &bull; {lesson.duration}</p>
        <p className="text-sm text-gray-600 mt-2">{lesson.description}</p>
      </div>
      <button onClick={onWatch} className="self-end mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all">
        Watch Lesson
      </button>
    </div>
  </div>
);

interface SubjectScreenProps {
  subject: Subject;
  onSelectLesson: (lesson: Lesson) => void;
  onBack: () => void;
}

export const SubjectScreen: React.FC<SubjectScreenProps> = ({ subject, onSelectLesson, onBack }) => {
  const subjectLessons = LESSONS.filter(lesson => lesson.subjectId === subject.id);

  return (
    <div className="pb-16">
      <Header title={subject.name} onBack={onBack} />
      <div className="p-4 space-y-4">
        {subjectLessons.length > 0 ? (
          subjectLessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} onWatch={() => onSelectLesson(lesson)} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8">No lessons available for this subject yet.</p>
        )}
      </div>
    </div>
  );
};
