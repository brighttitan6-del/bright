
import type { Subject, Lesson } from './types';

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathematics', teacher: 'Mr. John Doe', coverImage: 'https://picsum.photos/seed/math/600/400' },
  { id: 'eng', name: 'English', teacher: 'Ms. Jane Smith', coverImage: 'https://picsum.photos/seed/english/600/400' },
  { id: 'bio', name: 'Biology', teacher: 'Dr. Alan Grant', coverImage: 'https://picsum.photos/seed/biology/600/400' },
  { id: 'chem', name: 'Chemistry', teacher: 'Dr. Marie Curie', coverImage: 'https://picsum.photos/seed/chemistry/600/400' },
  { id: 'phy', name: 'Physics', teacher: 'Mr. Albert Einstein', coverImage: 'https://picsum.photos/seed/physics/600/400' },
  { id: 'hist', name: 'History', teacher: 'Ms. Ada Lovelace', coverImage: 'https://picsum.photos/seed/history/600/400' },
];

export const LESSONS: Lesson[] = [
  // Mathematics
  { id: 'm1', subjectId: 'math', title: 'Introduction to Algebra', teacher: 'Mr. John Doe', duration: '15:30', description: 'Learn the basics of algebraic expressions.', thumbnail: 'https://picsum.photos/seed/m1/400/225', videoUrl: '' },
  { id: 'm2', subjectId: 'math', title: 'Geometry Fundamentals', teacher: 'Mr. John Doe', duration: '22:10', description: 'Explore shapes, angles, and their properties.', thumbnail: 'https://picsum.photos/seed/m2/400/225', videoUrl: '' },
  
  // English
  { id: 'e1', subjectId: 'eng', title: 'Shakespeare\'s Sonnets', teacher: 'Ms. Jane Smith', duration: '18:45', description: 'An analysis of Shakespearean poetry.', thumbnail: 'https://picsum.photos/seed/e1/400/225', videoUrl: '' },
  
  // Biology
  { id: 'b1', subjectId: 'bio', title: 'Cell Structure', teacher: 'Dr. Alan Grant', duration: '25:00', description: 'A deep dive into the components of a biological cell.', thumbnail: 'https://picsum.photos/seed/b1/400/225', videoUrl: '' },
  { id: 'b2', subjectId: 'bio', title: 'Photosynthesis Explained', teacher: 'Dr. Alan Grant', duration: '19:55', description: 'How plants convert light into energy.', thumbnail: 'https://picsum.photos/seed/b2/400/225', videoUrl: '' },

  // Chemistry
  { id: 'c1', subjectId: 'chem', title: 'The Periodic Table', teacher: 'Dr. Marie Curie', duration: '30:15', description: 'Understanding the elements and their organization.', thumbnail: 'https://picsum.photos/seed/c1/400/225', videoUrl: '' },

  // Physics
  { id: 'p1', subjectId: 'phy', title: 'Newton\'s Laws of Motion', teacher: 'Mr. Albert Einstein', duration: '28:30', description: 'The fundamental principles of classical mechanics.', thumbnail: 'https://picsum.photos/seed/p1/400/225', videoUrl: '' },
];
