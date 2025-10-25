
import React, { useState } from 'react';
import Header from './components/Header';
import TarotReader from './components/TarotReader';
import Chatbot from './components/Chatbot';
import { AppView } from './types';
import { TarotIcon, ChatIcon } from './components/Icons';

const App: React.FC = () => {
    const [view, setView] = useState<AppView>('tarot');

    const activeBtnClasses = "bg-yellow-600 text-slate-900";
    const inactiveBtnClasses = "bg-slate-700 hover:bg-slate-600 text-slate-300";

    return (
        <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setView('tarot')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition-colors duration-300 ${view === 'tarot' ? activeBtnClasses : inactiveBtnClasses}`}
                    >
                        <TarotIcon/>
                        Tirage de Tarot
                    </button>
                    <button
                        onClick={() => setView('chat')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition-colors duration-300 ${view === 'chat' ? activeBtnClasses : inactiveBtnClasses}`}
                    >
                        <ChatIcon/>
                        Guide IA
                    </button>
                </div>

                {view === 'tarot' ? <TarotReader /> : <Chatbot />}
            </main>
            <footer className="text-center py-4 mt-8 border-t border-slate-800">
                <p className="text-sm text-slate-500">Créé avec expertise pour l'introspection et la découverte.</p>
            </footer>
        </div>
    );
};

export default App;
