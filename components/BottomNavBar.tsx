
import React from 'react';
import type { Page } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { LiveIcon } from './icons/LiveIcon';
import { TutorIcon } from './icons/TutorIcon';

interface BottomNavBarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { page: 'dashboard' as Page, icon: HomeIcon, label: 'Dashboard' },
    { page: 'live' as Page, icon: LiveIcon, label: 'Live' },
    { page: 'tutor' as Page, icon: TutorIcon, label: 'AI Tutor' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 shadow-t-md">
      <div className="flex justify-around h-16">
        {navItems.map(({ page, icon: Icon, label }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`flex flex-col items-center justify-center w-full text-sm font-medium transition-colors duration-200 ${
              activePage === page ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            <Icon className="h-6 w-6 mb-1" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
