
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
  position: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type AppView = 'tarot' | 'chat';
