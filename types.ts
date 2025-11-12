// Fix: Defining all the necessary types for the application.
export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface Subject {
  id: string;
  name: string;
  teacher: string;
  coverImage: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  teacher: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  releaseDate?: string; // Optional: For scheduled lessons
}

export type Page = 'dashboard' | 'live' | 'tutor';

export interface ChatMessage {
    sender: 'user' | 'ai' | 'system';
    text: string;
}