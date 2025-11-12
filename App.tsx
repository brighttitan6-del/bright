import React, { useState } from 'react';
import type { User, Subject, Lesson, Page } from './types';

// Import screens
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { SubjectScreen } from './screens/SubjectScreen';
import { VideoPlayerScreen } from './screens/VideoPlayerScreen';
import { LiveClassScreen } from './screens/LiveClassScreen';
import { AITutorScreen } from './screens/AITutorScreen';
import { UploadLessonScreen } from './screens/UploadLessonScreen';

// Import components
import { BottomNavBar } from './components/BottomNavBar';
import { SUBJECTS } from './constants';

type AppState =
  | { name: 'login' }
  | { name: 'dashboard' }
  | { name: 'subject'; subject: Subject }
  | { name: 'lesson'; lesson: Lesson }
  | { name: 'live' }
  | { name: 'tutor' }
  | { name: 'uploadLesson' };

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [appState, setAppState] = useState<AppState>({ name: 'login' });
  const [activePage, setActivePage] = useState<Page>('dashboard');

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setAppState({ name: 'dashboard' });
    setActivePage('dashboard');
  };

  const handleSelectSubject = (subject: Subject) => {
    setAppState({ name: 'subject', subject });
  };
  
  const handleSelectLesson = (lesson: Lesson) => {
    setAppState({ name: 'lesson', lesson });
  };
  
  const handleNavigate = (page: Page) => {
    setActivePage(page);
    switch (page) {
        case 'dashboard':
            setAppState({ name: 'dashboard' });
            break;
        case 'live':
            setAppState({ name: 'live' });
            break;
        case 'tutor':
            setAppState({ name: 'tutor' });
            break;
    }
  };

  const renderScreen = () => {
    if (!user) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (appState.name) {
      case 'dashboard':
        return <DashboardScreen 
                    user={user} 
                    onSelectSubject={handleSelectSubject} 
                    onUploadLesson={() => setAppState({ name: 'uploadLesson' })}
                    onScheduleLive={() => setAppState({ name: 'live' })}
                />;
      case 'subject':
        return <SubjectScreen 
                    subject={appState.subject} 
                    onSelectLesson={handleSelectLesson} 
                    onBack={() => setAppState({ name: 'dashboard' })} 
                />;
      case 'lesson':
        const currentSubject = SUBJECTS.find(s => s.id === appState.lesson.subjectId);
        return <VideoPlayerScreen 
                    lesson={appState.lesson} 
                    onBack={() => {
                        if (currentSubject) {
                            setAppState({ name: 'subject', subject: currentSubject });
                        } else {
                            setAppState({ name: 'dashboard' }); // Fallback
                        }
                    }} 
                />;
      case 'live':
        return <LiveClassScreen user={user} />;
      case 'tutor':
        return <AITutorScreen />;
      case 'uploadLesson':
          return <UploadLessonScreen onBack={() => setAppState({ name: 'dashboard' })} />;
      default:
        // Render login if user is somehow null or state is invalid
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  const showNavBar = user && ['dashboard', 'live', 'tutor'].includes(appState.name);

  return (
    <div className="w-full max-w-md mx-auto h-screen bg-gray-100 flex flex-col font-sans">
        <main className="flex-1 overflow-y-auto">
            {renderScreen()}
        </main>
        {showNavBar && (
            <BottomNavBar activePage={activePage} onNavigate={handleNavigate} />
        )}
    </div>
  );
};

export default App;
