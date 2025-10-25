import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, DrawnCard, Spread } from '../types';
import { getTarotInterpretation } from '../services/geminiService';
import { SendIcon } from './Icons';
import Spinner from './Spinner';
import { TAROT_DECK, BASE_URL } from '../constants';
import { SPREADS } from '../spreads';

type TarotChatStep = 'spread-selection' | 'question' | 'shuffling' | 'cutting' | 'interpreting' | 'done';

const Chatbot: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<TarotChatStep>('spread-selection');
    const userQuestionRef = useRef<string>('');
    const selectedSpreadRef = useRef<Spread | null>(null);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    
    const handleSelectSpread = useCallback((spread: Spread) => {
        selectedSpreadRef.current = spread;
        setChatHistory(prev => [
            ...prev,
            { role: 'user', text: `J'ai choisi le tirage "${spread.title}".` },
            { role: 'model', text: `Excellent choix. Le tirage du "${spread.name}" est idéal pour "${spread.purpose}".\n\nMaintenant, quelle est votre question ?` }
        ]);
        setStep('question');
    }, []);

    useEffect(() => {
        setChatHistory([
            {
                role: 'model',
                text: 'Bienvenue. Je suis votre guide IA pour le Tarot. Pour commencer, veuillez choisir le tirage qui correspond le mieux à votre interrogation.',
                spreads: SPREADS,
                onSpreadSelect: handleSelectSpread,
            }
        ]);
    }, [handleSelectSpread]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const drawCards = useCallback((): DrawnCard[] => {
        const spread = selectedSpreadRef.current;
        if (!spread) return [];

        let deck = [...TAROT_DECK];
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        
        const selectedCards: DrawnCard[] = [];
        for (let i = 0; i < spread.cardPositions.length; i++) {
            const card = deck.pop();
            const position = spread.cardPositions[i];
            if (card && position) {
                selectedCards.push({
                    card: card,
                    orientation: Math.random() > 0.5 ? 'upright' : 'reversed',
                    position: position.meaning,
                    positionNumber: position.number
                });
            }
        }
        return selectedCards;
    }, []);

    const runReadingSequence = useCallback(async (drawnCards: DrawnCard[]) => {
        setChatHistory(prev => [
            ...prev,
            { role: 'model', text: 'Voici votre tirage :', cards: drawnCards },
        ]);

        setIsLoading(true);
        setStep('interpreting');

        const spread = selectedSpreadRef.current;
        if (!spread) {
            setIsLoading(false);
            setStep('done');
            return;
        }

        const interpretation = await getTarotInterpretation(userQuestionRef.current, drawnCards, spread);
        
        setChatHistory(prev => [...prev, { role: 'model', text: interpretation }]);
        setIsLoading(false);
        setStep('done');
    }, []);
    
    useEffect(() => {
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
      selectedSpreadRef.current = null;
      userQuestionRef.current = '';
      setStep('spread-selection');
      setChatHistory([
        {
            role: 'model',
            text: 'Vous pouvez commencer un nouveau tirage. Veuillez choisir celui qui vous inspire.',
            spreads: SPREADS,
            onSpreadSelect: handleSelectSpread,
        }
      ]);
    }

    return (
        <div className="flex flex-col h-[75vh] max-w-4xl mx-auto bg-slate-800/50 rounded-lg shadow-lg shadow-black/30 mt-8">
            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {chatHistory.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xl p-3 rounded-lg ${message.role === 'user' ? 'bg-yellow-600 text-slate-900' : 'bg-slate-700 text-gray-200'}`}>
                                {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
                                {message.spreads && message.onSpreadSelect && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                                        {message.spreads.map(spread => (
                                            <button 
                                                key={spread.id} 
                                                onClick={() => message.onSpreadSelect?.(spread)}
                                                className="p-2 bg-slate-600 rounded-md text-sm text-yellow-300 hover:bg-slate-500 transition-colors"
                                            >
                                                {spread.title}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {message.cards && (
                                    <div className="grid grid-cols-3 gap-2 my-2">
                                        {message.cards.map((drawnCard) => {
                                            const imageUrl = `${BASE_URL}${drawnCard.card.key}${drawnCard.orientation === 'reversed' ? '_r' : ''}.jpg`;
                                            return (
                                                <div key={drawnCard.positionNumber} className="text-center">
                                                    <p className="text-xs font-bold leading-tight">{drawnCard.positionNumber}. {drawnCard.position}</p>
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
                    Commencer un nouveau tirage
                  </button>
                ) : (
                  <form onSubmit={handleSubmit} className="flex items-center gap-4">
                      <input
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          className="flex-1 p-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                          placeholder={step === 'question' ? 'Posez votre question...' : 'Veuillez patienter...'}
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
