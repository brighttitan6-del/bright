
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../services/geminiService';
import type { ChatMessage } from '../types';

interface AITutorScreenProps {}

export const AITutorScreen: React.FC<AITutorScreenProps> = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: "Hello! I'm Smarty, your AI Tutor. How can I help you with your studies today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponse = await sendMessageToAI(input, messages);
            const aiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { sender: 'system', text: "Oops! Something went wrong. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <header className="p-4 bg-white shadow-md">
                <h1 className="text-xl font-bold text-center text-gray-800">AI Tutor</h1>
            </header>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>}
                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                            msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 
                            msg.sender === 'ai' ? 'bg-white text-gray-800 shadow-sm rounded-bl-none' : 'bg-red-100 text-red-700'
                        }`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>
                        <div className="max-w-xs p-3 rounded-2xl bg-white shadow-sm rounded-bl-none">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></span>
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white border-t">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask a question..."
                        className="flex-1 px-4 py-3 bg-gray-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading} className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:bg-blue-300">
                        <i className="fa-solid fa-arrow-up"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
