import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SUBJECTS } from '../constants';
import type { Subject } from '../types';

interface UploadLessonScreenProps {
  onBack: () => void;
}

export const UploadLessonScreen: React.FC<UploadLessonScreenProps> = ({ onBack }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<Subject | null>(SUBJECTS[0] || null);
  const [description, setDescription] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle file uploads and API calls here.
    if (isScheduled && scheduleDate && scheduleTime) {
      const scheduleDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      alert(`Lesson scheduled for ${scheduleDateTime.toLocaleString()}! (Simulation)`);
    } else {
      alert('Lesson submitted successfully! (Simulation)');
    }
    onBack();
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="Upload New Lesson" onBack={onBack} />
      <form onSubmit={handleSubmit} className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Lesson Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., Introduction to Photosynthesis"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <select
            id="subject"
            value={subject?.id || ''}
            onChange={(e) => setSubject(SUBJECTS.find(s => s.id === e.target.value) || null)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            required
          >
            {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Briefly describe what this lesson is about."
            required
          ></textarea>
        </div>
        
        <div className="space-y-2">
           <label className="block text-sm font-medium text-gray-700">Lesson Files</label>
           <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <i className="fa-solid fa-video mx-auto h-12 w-12 text-gray-400"></i>
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>Upload a video</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">MP4, MOV, AVI up to 500MB</p>
                </div>
            </div>
        </div>
        
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Publishing Options</label>
            <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                <input
                    id="publish-now"
                    name="publishing-option"
                    type="radio"
                    checked={!isScheduled}
                    onChange={() => setIsScheduled(false)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="publish-now" className="ml-2 block text-sm text-gray-900">
                    Publish Immediately
                </label>
                </div>
                <div className="flex items-center">
                <input
                    id="schedule-later"
                    name="publishing-option"
                    type="radio"
                    checked={isScheduled}
                    onChange={() => setIsScheduled(true)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="schedule-later" className="ml-2 block text-sm text-gray-900">
                    Schedule for Later
                </label>
                </div>
            </div>
        </div>

        {isScheduled && (
        <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
            <label htmlFor="schedule-date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
                type="date"
                id="schedule-date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required={isScheduled}
            />
            </div>
            <div>
            <label htmlFor="schedule-time" className="block text-sm font-medium text-gray-700">Time</label>
            <input
                type="time"
                id="schedule-time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required={isScheduled}
            />
            </div>
        </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isScheduled ? 'Schedule Lesson' : 'Upload Lesson'}
          </button>
        </div>
      </form>
    </div>
  );
};