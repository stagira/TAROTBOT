import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, DrawnCard } from '../types';
import { getTarotInterpretation } from '../services/geminiService';
import { SendIcon } from './Icons';
import Spinner from './Spinner';
import { TAROT_DECK, BASE_URL } from '../constants';

type TarotChatStep = 'question' | 'shuffling' | 'cutting' | 'drawing' | 'interpreting' | 'done';

const Chatbot: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
        { role: 'model', text: 'Bienvenue dans votre espace de tirage du Tarot de Marseille ! Formulez votre question ou votre intention ci-dessous.' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<TarotChatStep>('question');
    const userQuestionRef = useRef<string>('');

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const drawCards = useCallback((): DrawnCard[] => {
        let deck = [...TAROT_DECK];
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        
        const selectedCards: DrawnCard[] = [];
        const positions = ["Passé / Fondement", "Présent / Défi", "Futur / Tendance"];
        for (let i = 0; i < 3; i++) {
            const card = deck.pop();
            if (card) {
                selectedCards.push({
                    card: card,
                    orientation: Math.random() > 0.5 ? 'upright' : 'reversed',
                    position: positions[i]
                });
            }
        }
        return selectedCards;
    }, []);

    const runReadingSequence = useCallback(async (drawnCards: DrawnCard[]) => {
        setChatHistory(prev => [
            ...prev,
            { role: 'model', text: 'Voici votre tirage :', cards: drawnCards },
            { role: 'model', text: "Prenez un instant pour observer ces cartes. Je vais maintenant les interpréter." }
        ]);

        setIsLoading(true);
        setStep('interpreting');

        const interpretation = await getTarotInterpretation(userQuestionRef.current, drawnCards);
        
        setChatHistory(prev => [...prev, { role: 'model', text: interpretation }]);
        setIsLoading(false);
        setStep('done');
    }, []);
    
    useEffect(() => {
        // FIX: The type `NodeJS.Timeout` is not available in a browser environment.
        // `ReturnType<typeof setTimeout>` is a safe, portable way to get the correct type.
        let timers: ReturnType<typeof setTimeout>[] = [];
        if (step === 'shuffling') {
            const t1 = setTimeout(() => {
                setChatHistory(prev => [...prev, { role: 'model', text: 'Mentalement, coupez le jeu. L\'ordre est établi.' }]);
                setStep('cutting');
            }, 2000);
            timers.push(t1);
        } else if (step === 'cutting') {
            const t2 = setTimeout(() => {
                const cards = drawCards();
                runReadingSequence(cards);
            }, 2000);
            timers.push(t2);
        }
        return () => timers.forEach(clearTimeout);
    }, [step, drawCards, runReadingSequence]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || step !== 'question') return;

        userQuestionRef.current = userInput;
        const newUserMessage: ChatMessage = { role: 'user', text: userInput };
        
        setChatHistory(prev => [...prev, newUserMessage, { role: 'model', text: 'Je ressens votre question. Je brasse les 78 arcanes...' }]);
        setUserInput('');
        setStep('shuffling');
    };
    
    const handleNewTirage = () => {
      setChatHistory([{ role: 'model', text: 'Vous pouvez poser une nouvelle question.' }]);
      setStep('question');
      userQuestionRef.current = '';
    }

    return (
        <div className="flex flex-col h-[75vh] max-w-4xl mx-auto bg-slate-800/50 rounded-lg shadow-lg shadow-black/30 mt-8">
            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {chatHistory.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xl p-3 rounded-lg ${message.role === 'user' ? 'bg-yellow-600 text-slate-900' : 'bg-slate-700 text-gray-200'}`}>
                                {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
                                {message.cards && (
                                    <div className="flex flex-col sm:flex-row gap-4 my-2">
                                        {message.cards.map((drawnCard, i) => {
                                            const imageUrl = `${BASE_URL}${drawnCard.card.key}${drawnCard.orientation === 'reversed' ? '_r' : ''}.jpg`;
                                            return (
                                                <div key={i} className="text-center">
                                                    <p className="text-sm font-bold">{drawnCard.position}</p>
                                                    <img src={imageUrl} alt={drawnCard.card.name} className="w-24 rounded-md mt-1 border-2 border-slate-500 mx-auto" />
                                                    <p className="text-xs mt-1">{drawnCard.card.name} {drawnCard.orientation === 'reversed' ? '(R)' : ''}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-md p-3 rounded-lg bg-slate-700 text-gray-200 flex items-center">
                                <Spinner />
                                <span className="ml-2">Le guide interprète votre tirage...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-4 border-t border-slate-700">
                {step === 'done' ? (
                  <button onClick={handleNewTirage} className="w-full p-3 bg-yellow-600 text-slate-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300">
                    Poser une autre question
                  </button>
                ) : (
                  <form onSubmit={handleSubmit} className="flex items-center gap-4">
                      <input
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          className="flex-1 p-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                          placeholder={step === 'question' ? 'Posez votre question au guide...' : 'Veuillez patienter...'}
                          disabled={isLoading || step !== 'question'}
                      />
                      <button type="submit" className="p-3 bg-yellow-600 text-slate-900 rounded-full hover:bg-yellow-500 transition-colors duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed" disabled={isLoading || !userInput.trim() || step !== 'question'}>
                          <SendIcon />
                      </button>
                  </form>
                )}
            </div>
        </div>
    );
};

export default Chatbot;