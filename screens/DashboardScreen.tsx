import React, { useState } from 'react';
import type { User, Subject } from '../types';
import { SUBJECTS, LESSONS } from '../constants';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
    <img src={subject.coverImage} alt={subject.name} className="w-full h-32 object-cover"/>
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
      <p className="text-sm text-gray-500">{subject.teacher}</p>
    </div>
  </div>
);

interface DashboardScreenProps {
  user: User;
  onSelectSubject: (subject: Subject) => void;
  onUploadLesson: () => void;
  onScheduleLive: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, onSelectSubject, onUploadLesson, onScheduleLive }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubjects = SUBJECTS.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const teacherLessons = LESSONS.filter(lesson => lesson.teacher === user.name);

  const StudentDashboard = () => (
    <>
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search subjects or teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {filteredSubjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject} onClick={() => onSelectSubject(subject)} />
        ))}
      </div>
    </>
  );

  const TeacherDashboard = () => (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={onUploadLesson} className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center transform hover:-translate-y-1 transition-transform duration-300">
          <i className="fa-solid fa-upload text-3xl mb-2"></i>
          <span className="font-semibold text-center">Upload Lesson</span>
        </button>
        <button onClick={onScheduleLive} className="bg-white text-blue-600 p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center transform hover:-translate-y-1 transition-transform duration-300">
           <i className="fa-solid fa-video text-3xl mb-2"></i>
          <span className="font-semibold text-center">Start Live Class</span>
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Your Lessons</h2>
        <div className="space-y-3">
          {teacherLessons.length > 0 ? teacherLessons.map(lesson => (
            <div key={lesson.id} className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
              <div>
                <p className="font-semibold">{lesson.title}</p>
                <p className="text-sm text-gray-500">{SUBJECTS.find(s => s.id === lesson.subjectId)?.name}</p>
              </div>
              <span className="text-xs text-gray-400">{lesson.duration}</span>
            </div>
          )) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">You haven't uploaded any lessons yet.</p>
                <p className="text-sm text-gray-400 mt-1">Click "Upload Lesson" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="pb-16">
      <header className="bg-white p-4 sticky top-0 shadow-sm z-10">
        <h1 className="text-2xl font-bold text-gray-800">Hello, {user.name}!</h1>
        {user.role === 'student' ? (
          <p className="text-gray-500">What would you like to learn today?</p>
        ) : (
          <p className="text-gray-500">Manage your courses and engage with students.</p>
        )}
      </header>
      {user.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />}
    </div>
  );
};