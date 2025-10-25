import React, { useState, useEffect, useCallback } from 'react';
import { DrawnCard, Spread } from '../types';
import { TAROT_DECK } from '../constants';
import { SPREADS } from '../spreads';
import CardDisplay from './CardDisplay';
import Spinner from './Spinner';

type ReadingStep = 'selection' | 'question' | 'shuffling' | 'cutting' | 'drawing' | 'synthesis';

const TarotReader: React.FC = () => {
    const [step, setStep] = useState<ReadingStep>('selection');
    const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
    const [question, setQuestion] = useState('');
    const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    const resetReading = () => {
        setStep('selection');
        setSelectedSpread(null);
        setQuestion('');
        setDrawnCards([]);
        setIsLoading(false);
        setLoadingMessage('');
    };

    const handleSelectSpread = (spread: Spread) => {
        setSelectedSpread(spread);
        setStep('question');
    };

    const drawCards = useCallback(() => {
        if (!selectedSpread) return;
        let deck = [...TAROT_DECK];
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        
        const selectedCards: DrawnCard[] = [];
        for (let i = 0; i < selectedSpread.cardPositions.length; i++) {
            const card = deck.pop();
            const position = selectedSpread.cardPositions[i];
            if (card && position) {
                selectedCards.push({
                    card: card,
                    orientation: Math.random() > 0.5 ? 'upright' : 'reversed',
                    position: position.meaning,
                    positionNumber: position.number,
                });
            }
        }
        setDrawnCards(selectedCards);
    }, [selectedSpread]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (step === 'shuffling') {
            setIsLoading(true);
            setLoadingMessage('Je ressens votre question. Je brasse les 78 arcanes...');
            timer = setTimeout(() => setStep('cutting'), 2500);
        } else if (step === 'cutting') {
            setLoadingMessage('Mentalement, coupez le jeu. L\'ordre est établi.');
            timer = setTimeout(() => {
                drawCards();
                setStep('drawing');
                setIsLoading(false);
            }, 2500);
        }
        return () => clearTimeout(timer);
    }, [step, drawCards]);

    const handleStartReading = (e: React.FormEvent) => {
        e.preventDefault();
        if (question.trim()) {
            setStep('shuffling');
        }
    };
    
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-64">
                    <Spinner />
                    <p className="mt-4 text-yellow-500 text-lg">{loadingMessage}</p>
                </div>
            );
        }

        switch (step) {
            case 'selection':
                return (
                    <div className="flex flex-col items-center p-4">
                        <h2 className="text-2xl md:text-3xl text-yellow-500 mb-2 text-center">Choisissez un Tirage</h2>
                        <p className="text-slate-400 mb-8 text-center">Chaque tirage est conçu pour éclairer un aspect différent de votre vie.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
                            {SPREADS.map(spread => (
                                <button key={spread.id} onClick={() => handleSelectSpread(spread)} className="p-6 bg-slate-800/50 rounded-lg shadow-lg shadow-black/30 text-left hover:bg-slate-700/70 transition-colors duration-300 border border-slate-700 h-full">
                                    <h3 className="text-xl font-bold text-yellow-500">{spread.title}</h3>
                                    <p className="text-slate-300 mt-2">{spread.purpose}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 'question':
                return (
                    <form onSubmit={handleStartReading} className="flex flex-col items-center gap-6 p-8 max-w-2xl mx-auto">
                        <button onClick={() => setStep('selection')} className="text-sm text-slate-400 hover:text-yellow-500 self-start">← Retour aux tirages</button>
                        <h2 className="text-2xl text-center text-yellow-500">Tirage : {selectedSpread?.title}</h2>
                        <p className="text-slate-400 text-center -mt-4">{selectedSpread?.purpose}</p>
                        <label htmlFor="question" className="text-xl text-center">Formulez votre question ou votre intention.</label>
                        <textarea
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            rows={4}
                            placeholder="Posez une question ouverte..."
                        />
                        <button type="submit" className="px-8 py-3 bg-yellow-600 text-slate-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300 disabled:bg-slate-500" disabled={!question.trim()}>
                            Commencer le Tirage
                        </button>
                    </form>
                );

            case 'drawing':
            case 'synthesis':
                const gridCols = drawnCards.length > 5 ? 'md:grid-cols-3 lg:grid-cols-5' : `md:grid-cols-${drawnCards.length}`;
                return (
                    <div className="flex flex-col items-center gap-8 p-4 md:p-8">
                        <h2 className="text-2xl text-yellow-500 mb-4 text-center">Voici votre tirage pour : "{question}"</h2>
                        <div className={`grid grid-cols-2 ${gridCols} gap-4 md:gap-6 w-full max-w-7xl`}>
                            {drawnCards.map((drawnCard) => (
                                <CardDisplay key={drawnCard.positionNumber} drawnCard={drawnCard} />
                            ))}
                        </div>
                        {step === 'drawing' && (
                            <button onClick={() => setStep('synthesis')} className="mt-6 px-8 py-3 bg-yellow-600 text-slate-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300">
                                Voir la Synthèse
                            </button>
                        )}
                        {step === 'synthesis' && (
                            <div className="mt-8 p-6 bg-slate-800/50 rounded-lg max-w-4xl w-full">
                               <h3 className="text-2xl text-yellow-500 mb-4 text-center">Message du {selectedSpread?.name}</h3>
                               <p className="text-slate-300 text-center whitespace-pre-wrap">
                                  {selectedSpread?.description}
                               </p>
                            </div>
                        )}
                         {step === 'synthesis' && (
                             <button onClick={resetReading} className="mt-6 px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition-colors duration-300">
                                Nouveau Tirage
                            </button>
                         )}
                    </div>
                );

            default:
                return null;
        }
    };
    
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            {renderContent()}
        </div>
    );
};

export default TarotReader;
