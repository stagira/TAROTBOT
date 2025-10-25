import React from 'react';
import { DrawnCard } from '../types';
import { BASE_URL } from '../constants';

interface CardDisplayProps {
  drawnCard: DrawnCard;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ drawnCard }) => {
  const { card, orientation, position, positionNumber } = drawnCard;

  const imageUrl = `${BASE_URL}${card.key}${orientation === 'reversed' ? '_r' : ''}.jpg`;

  return (
    <div className="flex flex-col items-center text-center p-4 bg-slate-800/50 rounded-lg shadow-lg shadow-black/30 h-full">
      <h3 className="text-lg font-bold text-yellow-500 mb-2 leading-tight">
        <span className="text-2xl block">{positionNumber}</span>
        {position}
      </h3>
      <div className="my-auto py-2">
        <img src={imageUrl} alt={card.name} className="w-32 md:w-40 rounded-lg shadow-md border-2 border-slate-600" />
      </div>
      <p className="mt-3 font-semibold text-slate-300">{card.name} {orientation === 'reversed' ? '(Renversée)' : ''}</p>
    </div>
  );
};

export default CardDisplay;
