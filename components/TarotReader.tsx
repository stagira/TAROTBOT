
import React, { useState, useEffect, useCallback } from 'react';
import { DrawnCard, TarotCard } from '../types';
import { TAROT_DECK } from '../constants';
import CardDisplay from './CardDisplay';
import Spinner from './Spinner';

type ReadingStep = 'question' | 'shuffling' | 'cutting' | 'drawing' | 'interpreting' | 'synthesis';

const TarotReader: React.FC = () => {
    const [step, setStep] = useState<ReadingStep>('question');
    const [question, setQuestion] = useState('');
    const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    const resetReading = () => {
        setStep('question');
        setQuestion('');
        setDrawnCards([]);
        setIsLoading(false);
        setLoadingMessage('');
    };

    const drawCards = useCallback(() => {
        let deck = [...TAROT_DECK];
        // Fisher-Yates shuffle
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
        setDrawnCards(selectedCards);
    }, []);

    useEffect(() => {
        // FIX: The type `NodeJS.Timeout` is not available in a browser environment.
        // `ReturnType<typeof setTimeout>` is a safe, portable way to get the correct type.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            case 'question':
                return (
                    <form onSubmit={handleStartReading} className="flex flex-col items-center gap-6 p-8">
                        <label htmlFor="question" className="text-xl text-center">Formulez votre question ou votre intention.</label>
                        <textarea
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full max-w-lg p-3 bg-slate-800 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            rows={4}
                            placeholder="Posez une question ouverte..."
                        />
                        <button type="submit" className="px-8 py-3 bg-yellow-600 text-slate-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300 disabled:bg-slate-500" disabled={!question.trim()}>
                            Commencer le Tirage
                        </button>
                    </form>
                );

            case 'drawing':
            case 'interpreting':
            case 'synthesis':
                return (
                    <div className="flex flex-col items-center gap-8 p-4 md:p-8">
                        <h2 className="text-2xl text-yellow-500 mb-4">Voici votre tirage :</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
                            {drawnCards.map((drawnCard, index) => (
                                <CardDisplay key={index} drawnCard={drawnCard} showInterpretation={step === 'interpreting' || step === 'synthesis'} />
                            ))}
                        </div>
                        {step === 'drawing' && (
                            <button onClick={() => setStep('interpreting')} className="mt-6 px-8 py-3 bg-yellow-600 text-slate-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300">
                                Révéler l'Interprétation
                            </button>
                        )}
                        {(step === 'interpreting' || step === 'synthesis') && (
                            <div className="mt-8 p-6 bg-slate-800/50 rounded-lg max-w-4xl w-full">
                               <h3 className="text-2xl text-yellow-500 mb-4 text-center">Synthèse</h3>
                               <p className="text-slate-300 text-center">
                                  Votre tirage suggère que votre passé ({drawnCards[0]?.card.name}) a créé les fondations de votre situation actuelle. Le défi présent ({drawnCards[1]?.card.name}) vous demande de faire face à une énergie spécifique. En naviguant cette situation, la tendance future ({drawnCards[2]?.card.name}) se dessine. Méditez sur la façon dont ces trois énergies interagissent pour éclairer votre chemin.
                               </p>
                            </div>
                        )}
                         {(step === 'interpreting' || step === 'synthesis') && (
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
