export type FlashCardState = "DEFAULT" | "ANSWER-DISPLAYED" | "EDIT";


export type FlashCard = {
  cardId: string;
  level: number;
  body: string;
  answer: string;
};

export type FlashCardProps = FlashCard & {
  deckLabel: string;
  state: FlashCardState;
  selected: boolean;
};

