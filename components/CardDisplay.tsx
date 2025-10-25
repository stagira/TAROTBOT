
import React from 'react';
import { DrawnCard } from '../types';
import { BASE_URL } from '../constants';

interface CardDisplayProps {
  drawnCard: DrawnCard;
  showInterpretation: boolean;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ drawnCard, showInterpretation }) => {
  const { card, orientation, position } = drawnCard;

  const imageUrl = `${BASE_URL}${card.key}${orientation === 'reversed' ? '_r' : ''}.jpg`;
  const interpretationText = orientation === 'upright' ? card.interpretation.upright : card.interpretation.reversed;

  return (
    <div className="flex flex-col items-center text-center p-4 bg-slate-800/50 rounded-lg shadow-lg shadow-black/30">
      <h3 className="text-lg font-bold text-yellow-500 mb-2">{position}</h3>
      <div className={`transition-transform duration-500 ${orientation === 'reversed' ? 'rotate-180' : ''}`}>
        <img src={imageUrl} alt={card.name} className="w-32 md:w-48 rounded-lg shadow-md border-2 border-slate-600" />
      </div>
      <p className="mt-3 font-semibold text-slate-300">{card.name} {orientation === 'reversed' ? '(Renversée)' : ''}</p>
      {showInterpretation && (
        <p className="mt-2 text-sm text-slate-400 max-w-xs">{interpretationText}</p>
      )}
    </div>
  );
};

export default CardDisplay;
