export interface Spread {
  id: number;
  name: string;
  title: string;
  purpose: string;
  cardPositions: {
    number: number;
    meaning: string;
  }[];
  description: string;
}

export interface TarotCard {
  name: string;
  key: string;
  interpretation: {
    upright: string;
    reversed: string;
  };
}

export interface DrawnCard {
  card: TarotCard;
  orientation: 'upright' | 'reversed';
  position: string; // The meaning of the position
  positionNumber: number; // The number of the card in the spread
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  cards?: DrawnCard[];
  spreads?: Spread[];
  onSpreadSelect?: (spread: Spread) => void;
}

export type AppView = 'tarot' | 'chat';
