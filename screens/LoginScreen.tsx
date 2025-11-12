import React, { useState, useEffect } from 'react';
import type { User, UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Pre-fill for simulation, but allow user to change
    setEmail(role === 'student' ? 'student@smartlearn.com' : 'teacher@smartlearn.com');
    setPassword('password');
  }, [role]);
  
  const handleLogin = () => {
    // Specific admin user check
    if (email === 'brighttitan6@gmail.com' && password === 'grax2650') {
      onLogin({
        id: 'admin001',
        name: 'Bright Titan',
        role: 'teacher', // Admin logs in as a teacher
      });
      return;
    }

    // Simulate a successful login for other roles
    onLogin({
      id: role === 'student' ? 's123' : 't456',
      name: role === 'student' ? 'Alex Ray' : 'Dr. Evelyn Reed',
      role: role,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">SmartLearn</h1>
          <p className="mt-2 text-gray-600">Secondary Education, Reimagined.</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-700">Email Address</label>
            <input 
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700">Password</label>
            <input 
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-2">Select Your Role</h3>
          <div className="flex space-x-4">
            <button onClick={() => setRole('student')} className={`w-full py-3 text-sm font-semibold rounded-lg transition-all ${role === 'student' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'}`}>
              I am a Student
            </button>
            <button onClick={() => setRole('teacher')} className={`w-full py-3 text-sm font-semibold rounded-lg transition-all ${role === 'teacher' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'}`}>
              I am a Teacher
            </button>
          </div>
        </div>

        <button onClick={handleLogin} className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
          Login
        </button>

        <p className="text-xs text-center text-gray-500">Don't have an account? <a href="#" className="font-semibold text-blue-600 hover:underline">Sign up</a></p>
      </div>
    </div>
  );
};