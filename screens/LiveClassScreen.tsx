import React, { useState } from 'react';
import type { User } from '../types';

interface LiveClassScreenProps {
    user: User;
}

export const LiveClassScreen: React.FC<LiveClassScreenProps> = ({ user }) => {
    const [messages, setMessages] = useState([
        { user: "Ms. Smith", text: "Welcome everyone! We'll start in a moment." },
        { user: "Alex Ray", text: "Hi!" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [isLive, setIsLive] = useState(user.role === 'student'); // Students join a live class, teachers must start it.

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { user: user.name, text: newMessage.trim() }]);
            setNewMessage("");
        }
    };
    
    const LiveChat = () => (
        <div className="bg-white p-4 rounded-xl shadow-md flex-1">
            <h3 className="font-bold mb-2">Live Chat</h3>
            <div className="h-48 overflow-y-auto mb-2 space-y-2 pr-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.user === user.name ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-2 rounded-lg max-w-xs ${msg.user === user.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.user !== user.name && <p className="text-xs font-bold">{msg.user}</p>}
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );

    return (
        <div className="flex flex-col h-full">
            <header className="p-4 bg-white shadow-md">
                <h1 className="text-xl font-bold text-gray-800">Live Class: English</h1>
                <p className="text-sm text-gray-500">with Ms. Jane Smith</p>
            </header>
            
            {isLive ? (
                <>
                    <div className="aspect-video bg-black flex items-center justify-center relative">
                        <i className="fa-solid fa-video text-white text-5xl"></i>
                        <p className="text-white ml-4">Live Stream Placeholder</p>
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">LIVE</div>
                    </div>

                    <div className="flex-1 bg-gray-100 flex flex-col p-4 overflow-y-auto">
                        <LiveChat />
                        {user.role === 'teacher' && (
                            <button 
                                onClick={() => setIsLive(false)}
                                className="mt-4 w-full py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                End Class
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-4">
                    <div className="text-center">
                        <i className="fa-solid fa-video text-5xl text-blue-500 mb-4"></i>
                        <h2 className="text-2xl font-bold text-gray-800">You're about to go live</h2>
                        <p className="text-gray-600 mt-2 mb-6">Your students will be notified when you start the class.</p>
                        <button 
                            onClick={() => setIsLive(true)}
                            className="px-8 py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                        >
                            Start Live Class
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};