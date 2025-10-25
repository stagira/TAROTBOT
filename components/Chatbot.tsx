
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { runChat } from '../services/geminiService';
import { SendIcon } from './Icons';
import Spinner from './Spinner';

const Chatbot: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', text: userInput };
        setChatHistory(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        const modelResponse = await runChat(userInput);
        const newModelMessage: ChatMessage = { role: 'model', text: modelResponse };
        setChatHistory(prev => [...prev, newModelMessage]);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-[75vh] max-w-4xl mx-auto bg-slate-800/50 rounded-lg shadow-lg shadow-black/30 mt-8">
            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {chatHistory.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-md p-3 rounded-lg ${message.role === 'user' ? 'bg-yellow-600 text-slate-900' : 'bg-slate-700 text-gray-200'}`}>
                                <p className="whitespace-pre-wrap">{message.text}</p>
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-md p-3 rounded-lg bg-slate-700 text-gray-200 flex items-center">
                                <Spinner />
                                <span className="ml-2">Le guide réfléchit...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-4 border-t border-slate-700">
                <form onSubmit={handleSubmit} className="flex items-center gap-4">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="flex-1 p-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        placeholder="Posez votre question au guide..."
                        disabled={isLoading}
                    />
                    <button type="submit" className="p-3 bg-yellow-600 text-slate-900 rounded-full hover:bg-yellow-500 transition-colors duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed" disabled={isLoading || !userInput.trim()}>
                        <SendIcon />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
